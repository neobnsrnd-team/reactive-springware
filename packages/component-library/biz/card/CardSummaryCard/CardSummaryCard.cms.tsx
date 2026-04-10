/**
 * @file CardSummaryCard.cms.tsx
 * @description CardSummaryCard 컴포넌트의 CMS BlockDefinition.
 * 신용·체크·선불 카드 정보를 공통 레이아웃으로 표시하는 카드 도메인 요약 카드.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CardSummaryCard } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CardSummaryCard",
    category: "biz",
    domain: "card",
    defaultProps: {
      type: "credit",
      cardName: "하나 머니 체크카드",
      cardNumber: "1234 **** **** 5678",
      amount: 150000,
      limitAmount: 3000000,
      badgeText: "",
    },
    propSchema: {
      type: {
        type: "select",
        label: "카드 유형",
        // credit: 신용카드(사용금액+한도) / check: 체크카드(잔액) / prepaid: 선불카드(충전잔액)
        default: "credit",
        options: ["credit", "check", "prepaid"],
      },
      cardName: {
        type: "string",
        label: "카드 상품명",
        default: "하나 머니 체크카드",
      },
      cardNumber: {
        type: "string",
        label: "카드 번호 (마스킹 처리된 형식)",
        default: "1234 **** **** 5678",
      },
      amount: {
        type: "number",
        label: "금액 (credit: 당월 사용금액 / 그 외: 잔액)",
        default: 0,
      },
      limitAmount: {
        type: "number",
        label: "한도 금액 (credit 전용, 미입력 시 한도 미노출)",
        default: 0,
      },
      badgeText: {
        type: "string",
        label: "배지 텍스트 (미입력 시 미노출)",
        default: "",
      },
      onClick: {
        type: "event",
        label: "카드 클릭",
      },
    },
  },
  component: (p) => <CardSummaryCard {...(p as any)} />,
};

export default definition;
