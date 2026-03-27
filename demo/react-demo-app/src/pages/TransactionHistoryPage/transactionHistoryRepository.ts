/**
 * @file transactionHistoryRepository.ts
 * @description 거래내역 조회 API 호출 및 데이터 변환 레이어.
 *
 * 책임:
 * - 서버 API 호출 (현재는 목(Mock) 데이터 반환)
 * - 서버 응답(snake_case) → 클라이언트 모델(camelCase) 변환
 * - HTTP 에러를 사용자 친화적 메시지로 변환
 *
 * 금지 사항:
 * - useState / useEffect 사용 금지
 * - UI 로직 포함 금지
 */

import type {
  FetchTransactionParams,
  TransactionListResult,
  TransactionItemRaw,
  Transaction,
  Account,
} from './types';

// ──────────────────────────────────────────────
// 목(Mock) 데이터
// ──────────────────────────────────────────────

/** 데모용 Mock 거래 내역 (실제 서비스에서는 API 호출로 대체) */
const MOCK_TRANSACTIONS: TransactionItemRaw[] = [
  {
    id: 'txn-001',
    date: '2023-11-01T14:20:05',
    title: '스타벅스',
    amount: 5400,
    balance: 2994600,
    type: 'withdrawal',
  },
  {
    id: 'txn-002',
    date: '2023-11-01T09:00:12',
    title: '급여',
    amount: 2500000,
    balance: 3000000,
    type: 'deposit',
  },
  {
    id: 'txn-003',
    date: '2023-10-31T21:15:40',
    title: 'GS25 강남점',
    amount: 3200,
    balance: 500000,
    type: 'withdrawal',
  },
  {
    id: 'txn-004',
    date: '2023-10-31T18:30:22',
    title: '쿠팡결제',
    amount: 28900,
    balance: 503200,
    type: 'withdrawal',
  },
  {
    id: 'txn-005',
    date: '2023-10-31T12:45:10',
    title: '이하나',
    amount: 50000,
    balance: 532100,
    type: 'deposit',
  },
  {
    id: 'txn-006',
    date: '2023-10-30T10:00:00',
    title: '카페베네',
    amount: 7500,
    balance: 482100,
    type: 'withdrawal',
  },
  {
    id: 'txn-007',
    date: '2023-10-30T08:30:00',
    title: '편의점',
    amount: 3500,
    balance: 489600,
    type: 'withdrawal',
  },
  {
    id: 'txn-008',
    date: '2023-10-29T15:22:00',
    title: '온라인쇼핑',
    amount: 45000,
    balance: 493100,
    type: 'withdrawal',
  },
];

/** 데모용 Mock 계좌 정보 */
const MOCK_ACCOUNT: Account = {
  id: 'acc-001',
  name: '하나 주거래 통장',
  accountNumber: '123-456-789012',
  balance: 2994600,
};

// ──────────────────────────────────────────────
// 변환 함수
// ──────────────────────────────────────────────

/**
 * 서버 응답 단일 거래 항목을 클라이언트 모델로 변환한다.
 * 현재는 snake_case→camelCase 변환이 없지만,
 * 실제 API 응답 구조가 다를 경우 이 함수에서 매핑한다.
 */
function toTransaction(raw: TransactionItemRaw): Transaction {
  return {
    id:      raw.id,
    date:    raw.date,
    title:   raw.title,
    amount:  raw.amount,
    balance: raw.balance,
    type:    raw.type,
  };
}

// ──────────────────────────────────────────────
// Repository 객체
// ──────────────────────────────────────────────

export const transactionHistoryRepository = {
  /**
   * 계좌 정보를 조회한다.
   * @param accountId - 조회할 계좌 ID
   * @returns 계좌 정보
   */
  async getAccount(accountId: string): Promise<Account> {
    /* 실제 서비스: GET /accounts/{accountId} */
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!MOCK_ACCOUNT) {
      throw new Error('계좌 정보를 불러오지 못했습니다.');
    }

    /* accountId 파라미터는 실제 API 연동 시 사용됨 */
    void accountId;
    return MOCK_ACCOUNT;
  },

  /**
   * 거래 내역 목록을 조회한다.
   * @param params - 조회 조건 (accountId, startDate, endDate, cursor)
   * @returns 거래 내역 목록 및 페이지네이션 정보
   */
  async getTransactions(params: FetchTransactionParams): Promise<TransactionListResult> {
    /* 실제 서비스: GET /accounts/{accountId}/transactions?startDate=...&endDate=...&cursor=... */
    await new Promise(resolve => setTimeout(resolve, 500));

    /* 날짜 범위로 필터링 */
    const start = new Date(params.startDate);
    const end   = new Date(params.endDate);
    /* 종료일은 해당 날짜 끝(23:59:59)까지 포함 */
    end.setHours(23, 59, 59);

    const filtered = MOCK_TRANSACTIONS.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });

    /* 초기 로드 시 5개만 반환, cursor 존재 시 나머지 반환 */
    const PAGE_SIZE = 5;
    const isFirstPage = !params.cursor;
    const items = isFirstPage ? filtered.slice(0, PAGE_SIZE) : filtered;

    return {
      items:      items.map(toTransaction),
      hasMore:    isFirstPage && filtered.length > PAGE_SIZE,
      nextCursor: isFirstPage && filtered.length > PAGE_SIZE ? 'page-2' : null,
    };
  },
};
