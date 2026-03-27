/**
 * @file types.ts
 * @description 거래내역 조회 페이지에서 사용하는 TypeScript 타입 정의.
 *
 * 서버 응답 타입(raw)과 클라이언트 모델 타입을 분리하여
 * Repository 레이어에서 변환 책임을 명확히 한다.
 */

// ──────────────────────────────────────────────
// 서버 응답 원시 타입 (snake_case)
// ──────────────────────────────────────────────

/** 서버에서 내려오는 단일 거래 항목 (raw API 응답) */
export interface TransactionItemRaw {
  id:          string;
  /** ISO 8601 형식. 예: '2023-11-01T14:20:05' */
  date:        string;
  title:       string;
  /** 거래 금액 (원화 단위 숫자, 항상 양수) */
  amount:      number;
  /** 거래 후 잔액 */
  balance:     number;
  /** deposit(입금) | withdrawal(출금) | transfer(이체) */
  type:        'deposit' | 'withdrawal' | 'transfer';
}

/** 서버에서 내려오는 거래 목록 조회 응답 */
export interface TransactionListResponse {
  items:      TransactionItemRaw[];
  /** 다음 페이지 존재 여부 */
  hasMore:    boolean;
  /** 다음 페이지 커서 (없으면 null) */
  nextCursor: string | null;
}

// ──────────────────────────────────────────────
// 클라이언트 도메인 타입 (camelCase)
// ──────────────────────────────────────────────

/** 거래 유형 */
export type TransactionType = 'deposit' | 'withdrawal' | 'transfer';

/** 클라이언트에서 사용하는 단일 거래 항목 */
export interface Transaction {
  id:      string;
  /** ISO 8601 형식 날짜 문자열 */
  date:    string;
  title:   string;
  amount:  number;
  balance: number;
  type:    TransactionType;
}

/** 거래 목록 조회 파라미터 */
export interface FetchTransactionParams {
  accountId:  string;
  /** 조회 시작일 (YYYY-MM-DD) */
  startDate:  string;
  /** 조회 종료일 (YYYY-MM-DD) */
  endDate:    string;
  cursor?:    string;
}

/** 거래 목록 조회 결과 */
export interface TransactionListResult {
  items:      Transaction[];
  hasMore:    boolean;
  nextCursor: string | null;
}

/** 계좌 정보 */
export interface Account {
  id:          string;
  name:        string;
  accountNumber: string;
  balance:     number;
}
