/**
 * @file PinDotIndicator.cms.tsx
 * @description PinDotIndicator 컴포넌트의 CMS BlockDefinition.
 * 계좌 비밀번호·PIN 입력 화면에서 입력 진행 상태를 도트(원형)로 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { PinDotIndicator } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "PinDotIndicator",
    category: "modules",
    domain: "banking",
    defaultProps: {
      length: 4,
      filledCount: 0,
    },
    propSchema: {
      length: {
        type: "number",
        label: "전체 도트 수 (비밀번호 자릿수)",
        // 기본: 4 — 계좌 비밀번호 4자리
        default: 4,
      },
      filledCount: {
        type: "number",
        label: "채워진 도트 수 (입력된 자릿수)",
        default: 0,
      },
    },
  },
  component: (p) => <PinDotIndicator {...(p as any)} />,
};

export default definition;
