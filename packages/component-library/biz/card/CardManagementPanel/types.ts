/**
 * @file types.ts
 * @description CardManagementPanel 컴포넌트의 TypeScript 타입 정의.
 */

export interface CardManagementPanelProps {
  /** 마스킹된 카드번호. 예: '1234 **** **** 5678' */
  maskedCardNumber:    string;
  /** 결제 은행명. 예: '하나은행' */
  paymentBank:         string;
  /** 마스킹된 결제 계좌번호. 예: '123-****-5678' */
  maskedAccountNumber: string;
  /** 카드정보 확인 클릭 */
  onCardInfo?:         () => void;
  /** 결제계좌 클릭 */
  onPaymentAccount?:   () => void;
  /** 카드 비밀번호 설정 클릭 */
  onPasswordSetting?:  () => void;
  /** 해외 결제 신청 클릭 */
  onOverseasPayment?:  () => void;
  className?:          string;
}
