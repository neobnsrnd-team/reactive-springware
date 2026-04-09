/**
 * @file CardPaymentSummary.cms.tsx
 * @description CardPaymentSummary 컴포넌트의 CMS BlockDefinition.
 * 카드 청구 요약 패널. 출금 예정일·청구 년월·총 청구금액과
 * 리볼빙·카드론·현금서비스 항목을 함께 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CardPaymentSummary } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CardPaymentSummary",
    category: "biz",
    domain: "card",
    defaultProps: {
      dateFull: "2026.04.14",
      dateYM: "26년 4월",
      dateMD: "04.14",
      totalAmount: 385000,
      revolving: 0,
      cardLoan: 0,
      cashAdvance: 0,
    },
    propSchema: {
      dateFull: {
        type: "string",
        label: "출금 예정일 (YYYY.MM.DD 형식)",
        default: "2026.04.14",
      },
      dateYM: {
        type: "string",
        label: "청구 년월 (예: '26년 4월')",
        default: "26년 4월",
      },
      dateMD: {
        type: "string",
        label: "오늘 날짜 (MM.DD 형식)",
        default: "04.14",
      },
      totalAmount: {
        type: "number",
        label: "총 청구금액 (원)",
        default: 0,
      },
      revolving: {
        type: "number",
        label: "리볼빙 금액 (원, 0이면 미노출)",
        default: 0,
      },
      cardLoan: {
        type: "number",
        label: "카드론 금액 (원, 0이면 미노출)",
        default: 0,
      },
      cashAdvance: {
        type: "number",
        label: "현금서비스 금액 (원, 0이면 미노출)",
        default: 0,
      },
      onRevolving: {
        type: "event",
        label: "리볼빙 버튼 클릭",
      },
      onCardLoan: {
        type: "event",
        label: "카드론 버튼 클릭",
      },
      onCashAdvance: {
        type: "event",
        label: "현금서비스 버튼 클릭",
      },
      onDateClick: {
        type: "event",
        label: "날짜 클릭 (모달 열기 등)",
      },
    },
  },
  component: (p) => <CardPaymentSummary {...(p as any)} />,
};

export default definition;
