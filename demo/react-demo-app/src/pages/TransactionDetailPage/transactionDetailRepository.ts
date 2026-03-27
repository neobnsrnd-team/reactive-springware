/**
 * @file transactionDetailRepository.ts
 * @description 거래 상세 정보 API 호출 및 데이터 변환 레이어.
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
  TransactionDetailRaw,
  TransactionDetail,
  FetchTransactionDetailParams,
  UpdateMemoParams,
} from './types';

// ──────────────────────────────────────────────
// 목(Mock) 데이터
// ──────────────────────────────────────────────

/**
 * 데모용 Mock 거래 상세 데이터.
 * Figma 디자인 시안의 "체크카드 -50,000원 (스타벅스)" 거래를 기준으로 작성.
 * 실제 서비스에서는 API 응답으로 대체한다.
 */
const MOCK_TRANSACTION_DETAILS: Record<string, TransactionDetailRaw> = {
  'txn-001': {
    id:                     'txn-001',
    amount:                 50000,
    type:                   'withdrawal',
    date:                   '2023-11-01T14:20:05',
    memo:                   '스타벅스 커피',
    transaction_category:   '체크카드',
    description:            '스타벅스 강남역점',
    counter_account:        '하나 123-456-789012',
    counter_account_holder: '스타벅스코리아',
  },
  'txn-002': {
    id:                     'txn-002',
    amount:                 2500000,
    type:                   'deposit',
    date:                   '2023-11-01T09:00:12',
    memo:                   '',
    transaction_category:   '급여이체',
    description:            '(주)하나테크',
    counter_account:        '하나 987-654-321098',
    counter_account_holder: '(주)하나테크',
  },
};

// ──────────────────────────────────────────────
// 변환 함수
// ──────────────────────────────────────────────

/**
 * 서버 응답 거래 상세 원시 데이터를 클라이언트 모델로 변환한다.
 * snake_case → camelCase 매핑 및 필드 정규화를 담당한다.
 *
 * @param raw - 서버 응답 원시 데이터
 * @returns 클라이언트 도메인 모델
 */
function toTransactionDetail(raw: TransactionDetailRaw): TransactionDetail {
  return {
    id:                   raw.id,
    amount:               raw.amount,
    type:                 raw.type,
    date:                 raw.date,
    memo:                 raw.memo,
    transactionCategory:  raw.transaction_category,
    description:          raw.description,
    counterAccount:       raw.counter_account,
    counterAccountHolder: raw.counter_account_holder,
  };
}

// ──────────────────────────────────────────────
// Repository 객체
// ──────────────────────────────────────────────

export const transactionDetailRepository = {
  /**
   * 거래 상세 정보를 조회한다.
   *
   * @param params - 조회 조건 (transactionId)
   * @returns 거래 상세 모델
   * @throws 존재하지 않는 거래 ID이거나 서버 오류 시 에러 throw
   */
  async getTransactionDetail(params: FetchTransactionDetailParams): Promise<TransactionDetail> {
    /* 실제 서비스: GET /transactions/{transactionId} */
    await new Promise(resolve => setTimeout(resolve, 400));

    const raw = MOCK_TRANSACTION_DETAILS[params.transactionId];
    if (!raw) {
      throw new Error('거래 상세 정보를 찾을 수 없습니다.');
    }

    return toTransactionDetail(raw);
  },

  /**
   * 거래 메모를 업데이트한다.
   *
   * @param params - 업데이트 조건 (transactionId, memo)
   * @throws 서버 오류 시 에러 throw
   */
  async updateMemo(params: UpdateMemoParams): Promise<void> {
    /* 실제 서비스: PATCH /transactions/{transactionId}/memo */
    await new Promise(resolve => setTimeout(resolve, 300));

    /* Mock: 대상 거래가 존재하는지만 확인 */
    if (!MOCK_TRANSACTION_DETAILS[params.transactionId]) {
      throw new Error('메모를 저장할 거래를 찾을 수 없습니다.');
    }

    /* Mock에서는 실제로 데이터를 변경하지 않음 — 실제 API 연동 시 서버에 저장 */
  },
};
