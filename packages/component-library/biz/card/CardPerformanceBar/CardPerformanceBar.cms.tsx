/**
 * @file CardPerformanceBar.cms.tsx
 * @description CardPerformanceBar 컴포넌트의 CMS BlockDefinition.
 * 카드 전월 실적 달성률을 프로그레스 바로 시각화한다.
 * 이번달 이용금액과 목표 실적 금액을 비교해 달성 혜택 설명을 함께 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CardPerformanceBar } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CardPerformanceBar",
    category: "biz",
    domain: "card",
    defaultProps: {
      cardName: "하나 머니 체크카드",
      currentAmount: 230000,
      targetAmount: 300000,
      benefitDescription: "전월 실적 달성 시 캐시백 1%",
    },
    propSchema: {
      cardName: {
        type: "string",
        label: "카드명",
        default: "하나 머니 체크카드",
      },
      currentAmount: {
        type: "number",
        label: "이번달 이용금액 (원)",
        default: 0,
      },
      targetAmount: {
        type: "number",
        label: "목표 실적 금액 (원)",
        default: 300000,
      },
      benefitDescription: {
        type: "string",
        label: "달성 혜택 설명 (예: 전월 실적 달성 시 캐시백 1%)",
        default: "",
      },
      onDetail: {
        type: "event",
        label: "실적 상세 클릭",
      },
    },
  },
  component: (p) => <CardPerformanceBar {...(p as any)} />,
};

export default definition;
