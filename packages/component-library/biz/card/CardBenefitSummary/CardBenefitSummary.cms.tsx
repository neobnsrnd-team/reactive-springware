/**
 * @file CardBenefitSummary.cms.tsx
 * @description CardBenefitSummary 컴포넌트의 CMS BlockDefinition.
 * 카드 포인트 잔액과 이번달 혜택(할인·캐시백 등) 항목 목록을 요약해서 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CardBenefitSummary } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CardBenefitSummary",
    category: "biz",
    domain: "card",
    defaultProps: {
      points: 12500,
      benefits: [
        { label: "이번달 할인", amount: 5000, unit: "원" },
        { label: "캐시백", amount: 1200, unit: "원" },
      ],
    },
    propSchema: {
      points: {
        type: "number",
        label: "보유 포인트 잔액",
        default: 0,
      },
      benefits: {
        type: "array",
        label: "혜택 항목 목록",
        // 각 항목: { label, amount, unit }
      },
      onPointDetail: {
        type: "event",
        label: "포인트 상세 클릭",
      },
      onBenefitDetail: {
        type: "event",
        label: "혜택 상세 클릭",
      },
    },
  },
  component: (p) => <CardBenefitSummary {...(p as any)} />,
};

export default definition;
