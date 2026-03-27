/**
 * @file types.ts
 * @description 거래 상세 정보 페이지에서 사용하는 TypeScript 타입 정의.
 *
 * 서버 응답 원시 타입(raw)과 클라이언트 도메인 모델을 분리하여
 * Repository 레이어에서 변환 책임을 명확히 한다.
 */

// ──────────────────────────────────────────────
// 서버 응답 원시 타입 (snake_case)
// ──────────────────────────────────────────────

/**
 * 서버에서 내려오는 거래 상세 원시 응답.
 * 실제 API 연동 시 이 타입에 맞춰 응답 구조를 정의한다.
 */
export interface TransactionDetailRaw {
  id:                     string;
  /** 출금·입금 금액 (원화 단위 숫자, 항상 양수) */
  amount:                 number;
  /** 거래 유형: deposit(입금) | withdrawal(출금) | transfer(이체) */
  type:                   'deposit' | 'withdrawal' | 'transfer';
  /** ISO 8601 형식 거래 일시. 예: '2023-11-01T14:20:05' */
  date:                   string;
  /** 사용자가 입력한 메모 */
  memo:                   string;
  /** 거래 구분 명칭. 예: '체크카드', '인터넷뱅킹' */
  transaction_category:   string;
  /** 거래 내용(가맹점명). 예: '스타벅스 강남역점' */
  description:            string;
  /** 상대방 계좌번호. 예: '하나 123-456-789012' */
  counter_account:        string;
  /** 상대방 계좌 예금주명. 예: '스타벅스코리아' */
  counter_account_holder: string;
}

// ──────────────────────────────────────────────
// 클라이언트 도메인 타입 (camelCase)
// ──────────────────────────────────────────────

/** 거래 유형 */
export type TransactionType = 'deposit' | 'withdrawal' | 'transfer';

/**
 * 클라이언트에서 사용하는 거래 상세 모델.
 * Repository에서 raw 응답을 변환하여 생성한다.
 */
export interface TransactionDetail {
  id:                   string;
  /** 금액 (항상 양수; 출금 시 UI에서 '-' 부호를 붙인다) */
  amount:               number;
  type:                 TransactionType;
  date:                 string;
  memo:                 string;
  transactionCategory:  string;
  description:          string;
  counterAccount:       string;
  counterAccountHolder: string;
}

/** 거래 상세 조회 파라미터 */
export interface FetchTransactionDetailParams {
  transactionId: string;
}

/** 메모 업데이트 파라미터 */
export interface UpdateMemoParams {
  transactionId: string;
  memo:          string;
}
