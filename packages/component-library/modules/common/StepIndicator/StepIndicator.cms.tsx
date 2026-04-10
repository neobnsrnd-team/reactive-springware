/**
 * @file StepIndicator.cms.tsx
 * @description StepIndicator 컴포넌트의 CMS BlockDefinition.
 * 다단계 플로우(이체·가입 등)에서 현재 진행 단계를 시각적으로 표시하는 인디케이터.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { StepIndicator } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "StepIndicator",
    category: "modules",
    domain: "common",
    defaultProps: {
      total: 3,
      current: 1,
    },
    propSchema: {
      total: {
        type: "number",
        label: "전체 단계 수",
        default: 3,
      },
      current: {
        type: "number",
        label: "현재 단계 (1-based)",
        // 1-based: 1이 첫 번째 단계
        default: 1,
      },
    },
  },
  component: (p) => <StepIndicator {...(p as any)} />,
};

export default definition;
