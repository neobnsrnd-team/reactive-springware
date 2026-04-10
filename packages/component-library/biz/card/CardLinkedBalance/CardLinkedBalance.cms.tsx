/**
 * @file CardLinkedBalance.cms.tsx
 * @description CardLinkedBalance 컴포넌트의 CMS BlockDefinition.
 * 카드에 연결된 계좌 잔액 표시 컴포넌트. 잔액 보기/숨기기 토글 기능 포함.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CardLinkedBalance } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CardLinkedBalance",
    category: "biz",
    domain: "card",
    defaultProps: {
      balance: 1250000,
      hidden: false,
    },
    propSchema: {
      balance: {
        type: "number",
        label: "연결계좌 잔액 (원)",
        default: 0,
      },
      hidden: {
        type: "boolean",
        label: "금액 마스킹 여부",
        // true일 때 금액을 '****'으로 표시
        default: false,
      },
      onToggle: {
        type: "event",
        label: "잔액 보기/숨기기 클릭",
      },
    },
  },
  component: (p) => <CardLinkedBalance {...(p as any)} />,
};

export default definition;
