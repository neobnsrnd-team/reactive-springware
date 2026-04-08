/**
 * @file types.ts
 * @description CardPaymentSummary 컴포넌트의 TypeScript 타입 정의.
 *
 * 카드 이용내역 화면 상단에 표시되는 청구 요약 카드 전용.
 * 총 청구금액·세부 항목(리볼빙·카드론·현금서비스)·결제 계좌·결제일을 표시한다.
 */

export interface CardPaymentSummaryProps {
  /** 청구 월. 예: '3월' */
  month:          string;
  /** 총 청구금액 (원) */
  totalAmount:    number;
  /** 리볼빙 금액 (원). 0이면 표시하지 않음 */
  revolving?:     number;
  /** 카드론 금액 (원). 0이면 표시하지 않음 */
  cardLoan?:      number;
  /** 현금서비스 금액 (원). 0이면 표시하지 않음 */
  cashAdvance?:   number;
  /** 결제 계좌. 예: '하나은행 123-456789-01234' */
  paymentAccount: string;
  /** 결제일. 예: '매월 14일' */
  paymentDate:    string;
  className?:     string;
}
