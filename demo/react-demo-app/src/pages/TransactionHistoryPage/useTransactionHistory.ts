/**
 * @file useTransactionHistory.ts
 * @description 거래내역 조회 페이지의 상태 및 이벤트 핸들러 Hook.
 *
 * 책임:
 * - 날짜 범위 필터 상태 관리 (로컬 UI 상태)
 * - 거래 내역 및 계좌 정보 데이터 페치 (React Query 사용)
 * - "더보기" 로직 처리
 * - 이벤트 핸들러 정의 후 Page에 전달
 *
 * 금지 사항:
 * - UI 렌더링 포함 금지
 * - 직접 axios 호출 금지 (Repository를 통해서만)
 */

import { useState, useCallback } from 'react';
import { transactionHistoryRepository } from './transactionHistoryRepository';
import type { Transaction, Account } from './types';

// ──────────────────────────────────────────────
// 날짜 유틸리티
// ──────────────────────────────────────────────

/** Date → 'YYYY-MM-DD' 형식 문자열 변환 */
function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** 'YYYY-MM-DD' → 'YYYY.MM.DD' 표시용 문자열 변환 */
function toDisplayDate(dateStr: string): string {
  return dateStr.replace(/-/g, '.');
}

// ──────────────────────────────────────────────
// 기본 날짜 범위: 직전 1개월
// ──────────────────────────────────────────────
const DEFAULT_END_DATE   = toDateString(new Date('2023-11-01'));
const DEFAULT_START_DATE = toDateString(new Date('2023-10-01'));
const DEFAULT_ACCOUNT_ID = 'acc-001';

// ──────────────────────────────────────────────
// Hook 반환 타입
// ──────────────────────────────────────────────

export interface UseTransactionHistoryReturn {
  /** 계좌 정보 */
  account:              Account | null;
  /** 거래 내역 목록 */
  transactions:         Transaction[];
  /** 데이터 로딩 상태 */
  isLoading:            boolean;
  /** 에러 메시지 (null이면 에러 없음) */
  error:                string | null;
  /** 현재 선택된 시작일 (YYYY-MM-DD) */
  startDate:            string;
  /** 현재 선택된 종료일 (YYYY-MM-DD) */
  endDate:              string;
  /** 표시용 날짜 범위 문자열 */
  dateRangeLabel:       string;
  /** 다음 페이지 존재 여부 */
  hasMore:              boolean;
  /** 더보기 로딩 중 여부 */
  isLoadingMore:        boolean;
  /** 더보기 버튼 클릭 핸들러 */
  handleLoadMore:       () => void;
  /** 날짜 범위 변경 핸들러 */
  handleDateRangeChange: (startDate: string, endDate: string) => void;
}

// ──────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────

export function useTransactionHistory(): UseTransactionHistoryReturn {
  /* ── 계좌 정보 상태 ── */
  const [account, setAccount] = useState<Account | null>(null);

  /* ── 거래 내역 상태 ── */
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  /* ── 날짜 필터 상태 (로컬 UI 상태) ── */
  const [startDate, setStartDate] = useState<string>(DEFAULT_START_DATE);
  const [endDate,   setEndDate]   = useState<string>(DEFAULT_END_DATE);

  /* ── 로딩 / 에러 상태 ── */
  const [isLoading,    setIsLoading]    = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error,        setError]        = useState<string | null>(null);
  const [hasMore,      setHasMore]      = useState<boolean>(false);
  const [nextCursor,   setNextCursor]   = useState<string | null>(null);

  /* ── 초기 데이터 로드 여부 추적 ── */
  const [initialized, setInitialized] = useState<boolean>(false);

  /* ── 초기 데이터 로드 (마운트 시 1회 실행) ── */
  const loadInitialData = useCallback(async (start: string, end: string) => {
    setIsLoading(true);
    setError(null);
    setTransactions([]);

    try {
      const [accountData, transactionData] = await Promise.all([
        transactionHistoryRepository.getAccount(DEFAULT_ACCOUNT_ID),
        transactionHistoryRepository.getTransactions({
          accountId: DEFAULT_ACCOUNT_ID,
          startDate: start,
          endDate:   end,
        }),
      ]);

      setAccount(accountData);
      setTransactions(transactionData.items);
      setHasMore(transactionData.hasMore);
      setNextCursor(transactionData.nextCursor);
    } catch (err) {
      /* 에러 메시지를 사용자 친화적으로 변환 */
      setError(err instanceof Error ? err.message : '거래 내역을 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* 컴포넌트 마운트 시 1회 초기 로드 */
  if (!initialized) {
    setInitialized(true);
    /* 동기적으로 setState 후 비동기 로드 트리거 — React 렌더링 사이클 안전 */
    void loadInitialData(startDate, endDate);
  }

  /* ── 더보기 핸들러 ── */
  const handleLoadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore || !nextCursor) return;

    setIsLoadingMore(true);
    try {
      const result = await transactionHistoryRepository.getTransactions({
        accountId: DEFAULT_ACCOUNT_ID,
        startDate,
        endDate,
        cursor:    nextCursor,
      });

      /* 기존 목록 뒤에 추가 */
      setTransactions(prev => [...prev, ...result.items]);
      setHasMore(result.hasMore);
      setNextCursor(result.nextCursor);
    } catch {
      setError('추가 거래 내역을 불러오지 못했습니다.');
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoadingMore, nextCursor, startDate, endDate]);

  /* ── 날짜 범위 변경 핸들러 ── */
  const handleDateRangeChange = useCallback((newStart: string, newEnd: string) => {
    setStartDate(newStart);
    setEndDate(newEnd);
    setInitialized(false); /* 재조회 트리거를 위해 초기화 상태 리셋 */
    void loadInitialData(newStart, newEnd);
  }, [loadInitialData]);

  /* 표시용 날짜 범위 레이블: 'YYYY.MM.DD ~ YYYY.MM.DD' */
  const dateRangeLabel = `${toDisplayDate(startDate)} ~ ${toDisplayDate(endDate)}`;

  return {
    account,
    transactions,
    isLoading,
    error,
    startDate,
    endDate,
    dateRangeLabel,
    hasMore,
    isLoadingMore,
    handleLoadMore,
    handleDateRangeChange,
  };
}
