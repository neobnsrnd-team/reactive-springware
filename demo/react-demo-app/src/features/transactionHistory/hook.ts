/**
 * @file hook.ts
 * @description 거래내역 조회 화면의 상태와 이벤트 핸들러를 관리하는 커스텀 훅.
 *
 * 현재는 Mock 데이터를 사용한다.
 * 실제 API 연동 시 repository.ts를 추가하고 React Query(useQuery)로 교체한다.
 *
 * 관리 상태:
 *  - account              : 조회 기준 계좌 정보 (Mock)
 *  - transactionGroups    : 날짜별 거래내역 그룹 목록 (Mock)
 *  - isFilterExpanded     : 조회 조건 패널 펼침/접힘 여부
 *  - selectedPeriod       : 선택된 조회 기간 탭 ID ('1m' | '3m' | '6m' | '12m')
 *  - startDate / endDate  : 직접 입력한 조회 시작/종료 날짜
 *  - sortOrder            : 정렬 기준 ('recent' | 'oldest')
 *  - transactionType      : 거래 유형 필터 ('all' | 'deposit' | 'withdrawal')
 *
 * @returns 거래내역 화면에 필요한 데이터와 이벤트 핸들러
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TransactionAccount, TransactionGroup } from './types';

/**
 * Mock 계좌 데이터.
 * 실제 구현 시 이전 화면에서 route state로 전달받거나 API로 조회한다.
 */
const mockAccount: TransactionAccount = {
  name: '하나 주거래 통장',
  accountNumber: '123-456-789012',
};

/**
 * Mock 거래내역 데이터 (날짜 내림차순, 각 날짜 내에서도 최신순).
 * 실제 구현 시 transactionRepository.getTransactionList(filter) 로 교체한다.
 */
const mockTransactionGroups: TransactionGroup[] = [
  {
    date: '11월 01일',
    transactions: [
      { id: 't1', merchant: '스타벅스',   time: '14:20:05', amount: -5_400,     balance: 2_994_600 },
      { id: 't2', merchant: '급여',        time: '09:00:12', amount: 2_500_000,  balance: 3_000_000 },
    ],
  },
  {
    date: '10월 31일',
    transactions: [
      { id: 't3', merchant: 'GS25 강남점', time: '21:15:40', amount: -3_200,    balance: 500_000   },
      { id: 't4', merchant: '쿠팡결제',    time: '18:30:22', amount: -28_900,   balance: 503_200   },
      { id: 't5', merchant: '이하나',      time: '12:45:10', amount: 50_000,    balance: 532_100   },
    ],
  },
];

export const useTransactionHistory = () => {
  const navigate = useNavigate();

  // ─ 기존 단순 조회 기간 레이블 (page.tsx에서 사용) ──────────────────
  const [dateRange] = useState('2023.10.01 ~ 2023.11.01');

  // ─ 조회 조건 패널 상태 (TransactionHistoryFilterPage에서 사용) ───────

  /** 조회 조건 패널 펼침 여부. 기본값: 접힘(false) */
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  /**
   * 선택된 조회 기간 탭.
   * '1m' = 1개월, '3m' = 3개월, '6m' = 6개월, '12m' = 12개월
   */
  const [selectedPeriod, setSelectedPeriod] = useState('1m');

  /**
   * 직접 입력하는 조회 시작/종료 날짜 (YYYY.MM.DD 형식).
   * 기간 탭 선택 시 자동 갱신된다.
   */
  const [startDate, setStartDate] = useState('2023.10.01');
  const [endDate,   setEndDate]   = useState('2023.11.01');

  /** 정렬 기준: 'recent' = 최근순, 'oldest' = 과거순 */
  const [sortOrder, setSortOrder] = useState('recent');

  /** 거래 유형: 'all' = 전체, 'deposit' = 입금, 'withdrawal' = 출금 */
  const [transactionType, setTransactionType] = useState('all');

  // ─ 이벤트 핸들러 ────────────────────────────────────────────────────

  /** 헤더 뒤로가기 버튼 */
  const handleBack = () => navigate(-1);

  /** 계좌 변경 (드롭다운 또는 바텀시트 연결 예정) */
  const handleAccountChange = () => {
    // TODO: 계좌 선택 UI 연결
  };

  /** 조회 기간 변경 (구 페이지에서 사용하는 캘린더 버튼) */
  const handleDateRangeChange = () => {
    // TODO: 날짜 선택 UI 연결
  };

  /** 더보기 — 다음 페이지 거래내역 추가 로드 */
  const handleLoadMore = () => {
    // TODO: React Query fetchNextPage 연결
  };

  /** 조회 조건 패널 토글 */
  const handleFilterToggle = () =>
    setIsFilterExpanded(prev => !prev);

  /**
   * 기간 탭 선택.
   * 탭 변경 시 startDate를 자동 계산한다.
   * 실제 구현 시 현재 날짜 기준으로 계산한다.
   */
  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    const periodStartMap: Record<string, string> = {
      '1m':  '2023.10.01',
      '3m':  '2023.08.01',
      '6m':  '2023.05.01',
      '12m': '2022.11.01',
    };
    // endDate는 현재 날짜(Mock: 2023.11.01) 고정
    setStartDate(periodStartMap[period] ?? startDate);
  };

  /** 조회 시작 날짜 직접 입력 */
  const handleStartDateChange = (date: string) => setStartDate(date);

  /** 조회 종료 날짜 직접 입력 */
  const handleEndDateChange = (date: string) => setEndDate(date);

  /** 정렬 기준 변경 */
  const handleSortOrderChange = (value: string) => setSortOrder(value);

  /** 거래 유형 필터 변경 */
  const handleTransactionTypeChange = (value: string) => setTransactionType(value);

  /**
   * 조회 버튼 클릭.
   * 실제 구현 시 React Query queryKey를 갱신해 목록을 재조회한다.
   */
  const handleSearch = () => {
    // TODO: transactionRepository.getTransactionList({ startDate, endDate, sortOrder, transactionType }) 연결
  };

  return {
    // 데이터
    account:           mockAccount,
    transactionGroups: mockTransactionGroups,
    // 기존 page.tsx 호환
    dateRange,
    // 필터 상태
    isFilterExpanded,
    selectedPeriod,
    startDate,
    endDate,
    sortOrder,
    transactionType,
    // 핸들러
    handleBack,
    handleAccountChange,
    handleDateRangeChange,
    handleLoadMore,
    handleFilterToggle,
    handlePeriodChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSortOrderChange,
    handleTransactionTypeChange,
    handleSearch,
  };
};
