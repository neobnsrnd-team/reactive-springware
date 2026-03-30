/**
 * @file types.ts
 * @description 거래내역 조회 화면에서 사용하는 타입 정의
 */

/** 단건 거래 내역 */
export interface Transaction {
  /** 거래 고유 ID */
  id: string;
  /** 거래처 또는 상대방 이름 (예: '스타벅스', '급여', '이하나') */
  merchant: string;
  /** 거래 시각 (HH:mm:ss 형식) */
  time: string;
  /**
   * 거래 금액 (원 단위 정수).
   * 양수 = 입금, 음수 = 출금.
   */
  amount: number;
  /** 거래 이후 계좌 잔액 (원 단위 정수) */
  balance: number;
}

/** 날짜별 거래 그룹 */
export interface TransactionGroup {
  /** 날짜 레이블 (예: '11월 01일') */
  date: string;
  /** 해당 날짜의 거래 목록 (최신순) */
  transactions: Transaction[];
}

/** 거래내역 조회 기준 계좌 정보 */
export interface TransactionAccount {
  /** 계좌명 (예: '하나 주거래 통장') */
  name: string;
  /** 계좌번호 (예: '123-456-789012') */
  accountNumber: string;
}
