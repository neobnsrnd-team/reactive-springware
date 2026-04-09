/**
 * @file StatementTotalCard.cms.tsx
 * @description StatementTotalCard 컴포넌트의 CMS BlockDefinition.
 * 카드 명세서 총 결제금액 카드. 분할납부·즉시결제·리볼빙 액션 버튼을 함께 제공한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { StatementTotalCard } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "StatementTotalCard",
    category: "biz",
    domain: "card",
    defaultProps: {
      amount: 385000,
      badge: "예정",
    },
    propSchema: {
      amount: {
        type: "number",
        label: "총 결제금액 (원)",
        default: 0,
      },
      badge: {
        type: "select",
        label: "배지 텍스트 (미선택 시 미노출)",
        // '예정' 배지는 아직 청구 확정 전임을 나타냄
        default: "예정",
        options: ["예정", ""],
      },
      onDetailClick: {
        type: "event",
        label: "금액 우측 화살표 클릭",
      },
      onInstallment: {
        type: "event",
        label: "분할납부 버튼 클릭",
      },
      onImmediatePayment: {
        type: "event",
        label: "즉시결제 버튼 클릭",
      },
      onRevolving: {
        type: "event",
        label: "리볼빙 버튼 클릭",
      },
    },
  },
  component: (p) => <StatementTotalCard {...(p as any)} />,
};

export default definition;
