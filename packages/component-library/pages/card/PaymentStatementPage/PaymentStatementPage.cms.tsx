/**
 * @file PaymentStatementPage.cms.tsx
 * @description PaymentStatementPage 컴포넌트의 CMS BlockDefinition.
 * 결제예정금액(payment) / 이용대금명세서(statement) 두 탭을 포함하는 카드 결제 내역 페이지.
 * 카드 선택 드롭다운으로 카드를 전환하며, 탭별로 CardPaymentSummary·카드별 결제 항목을 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { PaymentStatementPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "PaymentStatementPage",
    category: "pages",
    domain: "card",
    defaultProps: {
      initialTab: "payment",
      cardOptions: [
        { value: "card-1", label: "하나 머니 체크카드" },
      ],
      initialCardValue: "card-1",
      paymentData: {
        dateFull: "2026.04.14",
        dateYM:   "26년 4월",
        dateMD:   "04.14",
        totalAmount: 385000,
        revolving: 0,
        cardLoan: 0,
        cashAdvance: 0,
        infoSections: [],
        paymentItems: [],
      },
      statementData: {
        totalAmount: 385000,
        badge: "예정",
        paymentItems: [],
        infoSections: [],
      },
    },
    propSchema: {
      initialTab: {
        type: "select",
        label: "초기 활성 탭",
        // payment: 결제예정금액, statement: 이용대금명세서
        default: "payment",
        options: ["payment", "statement"],
      },
      cardOptions: {
        type: "array",
        label: "카드 선택 드롭다운 목록 (value·label)",
      },
      initialCardValue: {
        type: "string",
        label: "초기 선택 카드 value",
        default: "",
      },
      paymentData: {
        type: "group",
        label: "결제예정금액 탭 데이터",
        fields: {
          dateFull:    { type: "string", label: "출금예정일 (YYYY.MM.DD)", default: "2026.04.14" },
          dateYM:      { type: "string", label: "청구 년월 (예: 26년 4월)", default: "26년 4월" },
          dateMD:      { type: "string", label: "기준 날짜 (MM.DD)",       default: "04.14" },
          totalAmount: { type: "number", label: "총 청구금액 (원)",         default: 0 },
          revolving:   { type: "number", label: "리볼빙 금액 (원)",         default: 0 },
          cardLoan:    { type: "number", label: "카드론 금액 (원)",         default: 0 },
          cashAdvance: { type: "number", label: "현금서비스 금액 (원)",     default: 0 },
        },
      },
      statementData: {
        type: "group",
        label: "이용대금명세서 탭 데이터",
        fields: {
          totalAmount: { type: "number", label: "총 결제금액 (원)", default: 0 },
          badge:       { type: "string", label: "배지 텍스트 (예: 예정)", default: "" },
        },
      },
      onCardChange: {
        type: "event",
        label: "카드 변경",
      },
      onDateClick: {
        type: "event",
        label: "날짜(년월) 클릭",
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
      onStatementDetail: {
        type: "event",
        label: "이용내역 화살표 클릭",
      },
      onInstallment: {
        type: "event",
        label: "분할납부 버튼 클릭",
      },
      onImmediatePayment: {
        type: "event",
        label: "즉시결제 버튼 클릭",
      },
      onBack: {
        type: "event",
        label: "뒤로가기 클릭",
      },
      onClose: {
        type: "event",
        label: "닫기(X) 클릭",
      },
    },
  },
  component: (p) => <PaymentStatementPage {...(p as any)} />,
};

export default definition;
