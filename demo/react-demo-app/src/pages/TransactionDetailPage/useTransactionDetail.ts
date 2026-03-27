/**
 * @file useTransactionDetail.ts
 * @description 거래 상세 정보 바텀시트의 상태 및 이벤트 핸들러 Hook.
 *
 * 책임:
 * - 바텀시트 열림/닫힘 상태 관리
 * - 거래 상세 데이터 페치 (Repository를 통해서만)
 * - 메모 편집 상태 및 저장 로직
 * - 이체하기 네비게이션 핸들러 제공
 * - 이벤트 핸들러 정의 후 Page에 전달
 *
 * 금지 사항:
 * - UI 렌더링 포함 금지
 * - 직접 axios 호출 금지 (Repository를 통해서만)
 */

import { useState, useCallback, useEffect } from 'react';
import { transactionDetailRepository } from './transactionDetailRepository';
import type { TransactionDetail } from './types';

// ──────────────────────────────────────────────
// 유틸리티
// ──────────────────────────────────────────────

/**
 * ISO 8601 날짜 문자열을 화면 표시용 'YYYY.MM.DD HH:MM:SS' 형식으로 변환한다.
 *
 * @param isoDate - ISO 8601 형식 문자열 (예: '2023-11-01T14:20:05')
 * @returns 표시용 문자열 (예: '2023.11.01 14:20:05')
 */
function formatDisplayDate(isoDate: string): string {
  /* 'T' 구분자를 공백으로 교체하고 '-' 를 '.'으로 변환 */
  return isoDate.replace('T', ' ').replace(/-/g, '.');
}

/**
 * 금액을 한국 원화 표시 형식으로 변환한다.
 *
 * @param amount - 금액 (양수)
 * @param type - 거래 유형 (출금 시 '-' 부호 추가)
 * @returns 표시용 문자열 (예: '- 50,000원', '+2,500,000원')
 */
export function formatAmount(amount: number, type: 'deposit' | 'withdrawal' | 'transfer'): string {
  const formatted = amount.toLocaleString('ko-KR');
  if (type === 'withdrawal') return `- ${formatted}원`;
  if (type === 'deposit')    return `+${formatted}원`;
  /* transfer(이체)는 방향에 따라 다르나 데모에서는 출금과 동일하게 표시 */
  return `- ${formatted}원`;
}

// ──────────────────────────────────────────────
// Hook 반환 타입
// ──────────────────────────────────────────────

export interface UseTransactionDetailReturn {
  /** 바텀시트 열림 여부 */
  isOpen:                boolean;
  /** 거래 상세 데이터 (로딩 중이거나 에러 시 null) */
  detail:                TransactionDetail | null;
  /** 데이터 로딩 상태 */
  isLoading:             boolean;
  /** 메모 저장 중 상태 */
  isSavingMemo:          boolean;
  /** 에러 메시지 (null이면 에러 없음) */
  error:                 string | null;
  /** 현재 편집 중인 메모 값 */
  memo:                  string;
  /** 메모 편집 모드 여부 */
  isEditingMemo:         boolean;
  /** 화면 표시용 거래 일시 문자열 */
  displayDate:           string;
  /** 화면 표시용 금액 문자열 (부호 포함) */
  displayAmount:         string;
  /** 바텀시트 열기 핸들러 */
  handleOpen:            () => void;
  /** 바텀시트 닫기 핸들러 */
  handleClose:           () => void;
  /** 메모 편집 모드 진입 핸들러 */
  handleMemoEditStart:   () => void;
  /** 메모 편집 취소 핸들러 (원래 값으로 복구) */
  handleMemoEditCancel:  () => void;
  /** 메모 입력값 변경 핸들러 */
  handleMemoChange:      (value: string) => void;
  /** 메모 저장 핸들러 */
  handleMemoSave:        () => Promise<void>;
  /** 이체하기 버튼 핸들러 (실제 연동 시 이체 화면으로 이동) */
  handleTransfer:        () => void;
  /** 확인 버튼 핸들러 (바텀시트 닫기) */
  handleConfirm:         () => void;
}

// ──────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────

/**
 * 거래 상세 정보 바텀시트 Hook.
 *
 * @param transactionId - 조회할 거래 ID
 * @param defaultOpen - 초기 열림 여부. 기본값 true (데모: 처음부터 열린 상태로 표시)
 */
export function useTransactionDetail(
  transactionId: string,
  defaultOpen = true,
): UseTransactionDetailReturn {
  /* ── 바텀시트 열림 상태 ── */
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  /* ── 거래 상세 데이터 상태 ── */
  const [detail, setDetail] = useState<TransactionDetail | null>(null);

  /* ── 로딩 / 에러 상태 ── */
  const [isLoading,    setIsLoading]    = useState<boolean>(false);
  const [isSavingMemo, setIsSavingMemo] = useState<boolean>(false);
  const [error,        setError]        = useState<string | null>(null);

  /* ── 메모 편집 상태 (로컬 UI 상태) ── */
  const [memo,          setMemo]          = useState<string>('');
  const [isEditingMemo, setIsEditingMemo] = useState<boolean>(false);

  /* ── 데이터 로드 ── */
  useEffect(() => {
    let cancelled = false; /* 컴포넌트 언마운트 시 상태 업데이트 방지 */

    const loadDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await transactionDetailRepository.getTransactionDetail({ transactionId });
        if (!cancelled) {
          setDetail(data);
          /* 서버에서 받은 메모 값으로 편집 상태 초기화 */
          setMemo(data.memo);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '거래 상세 정보를 불러오지 못했습니다.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadDetail();

    return () => { cancelled = true; };
  }, [transactionId]);

  /* ── 바텀시트 열기 ── */
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  /* ── 바텀시트 닫기 ── */
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  /* ── 메모 편집 모드 진입 ── */
  const handleMemoEditStart = useCallback(() => {
    setIsEditingMemo(true);
  }, []);

  /* ── 메모 편집 취소 (서버에 저장된 원래 값으로 복구) ── */
  const handleMemoEditCancel = useCallback(() => {
    /* detail.memo: 마지막으로 저장된 서버 값 */
    setMemo(detail?.memo ?? '');
    setIsEditingMemo(false);
  }, [detail]);

  /* ── 메모 입력값 변경 ── */
  const handleMemoChange = useCallback((value: string) => {
    setMemo(value);
  }, []);

  /* ── 메모 저장 ── */
  const handleMemoSave = useCallback(async () => {
    if (!detail) return;

    setIsSavingMemo(true);
    try {
      await transactionDetailRepository.updateMemo({
        transactionId: detail.id,
        memo,
      });
      /* 저장 성공 시 detail 상태도 동기화하고 편집 모드 종료 */
      setDetail(prev => prev ? { ...prev, memo } : prev);
      setIsEditingMemo(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '메모를 저장하지 못했습니다.');
    } finally {
      setIsSavingMemo(false);
    }
  }, [detail, memo]);

  /* ── 이체하기 핸들러 ── */
  const handleTransfer = useCallback(() => {
    /* 실제 서비스에서는 이체 화면으로 라우팅 */
    /* 예: navigate('/transfer', { state: { targetAccount: detail?.counterAccount } }) */
    console.info('[Demo] 이체하기 클릭 — 이체 화면으로 이동');
  }, []);

  /* ── 확인 버튼 핸들러 (바텀시트 닫기) ── */
  const handleConfirm = useCallback(() => {
    setIsOpen(false);
  }, []);

  /* ── 화면 표시용 파생 값 ── */
  const displayDate   = detail ? formatDisplayDate(detail.date)        : '';
  const displayAmount = detail ? formatAmount(detail.amount, detail.type) : '';

  return {
    isOpen,
    detail,
    isLoading,
    isSavingMemo,
    error,
    memo,
    isEditingMemo,
    displayDate,
    displayAmount,
    handleOpen,
    handleClose,
    handleMemoEditStart,
    handleMemoEditCancel,
    handleMemoChange,
    handleMemoSave,
    handleTransfer,
    handleConfirm,
  };
}
