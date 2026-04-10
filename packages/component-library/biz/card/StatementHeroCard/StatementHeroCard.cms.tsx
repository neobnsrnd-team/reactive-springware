/**
 * @file StatementHeroCard.cms.tsx
 * @description StatementHeroCard 컴포넌트의 CMS BlockDefinition.
 * 카드 명세서 상단 히어로 카드. 이번 달 명세서 금액과 결제일을 강조 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { StatementHeroCard } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "StatementHeroCard",
    category: "biz",
    domain: "card",
    defaultProps: {
      amount: 385000,
      dueDate: "4월 14일",
      label: "이번 달 명세서",
    },
    propSchema: {
      amount: {
        type: "number",
        label: "명세서 금액 (원)",
        default: 0,
      },
      dueDate: {
        type: "string",
        label: "결제일 (예: '4월 14일')",
        default: "4월 14일",
      },
      label: {
        type: "string",
        label: "상단 레이블",
        // 기본값은 '이번 달 명세서'
        default: "이번 달 명세서",
      },
      onDetail: {
        type: "event",
        label: "상세 화살표 클릭",
      },
    },
  },
  component: (p) => <StatementHeroCard {...(p as any)} />,
};

export default definition;
