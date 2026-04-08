/**
 * @file DividerWithLabel.cms.tsx
 * @description DividerWithLabel 컴포넌트의 CMS BlockDefinition.
 * 좌우 수평선 사이에 텍스트 레이블을 표시하는 구분선.
 * 로그인 화면의 "다른 로그인 방식" 같은 섹션 구분에 사용한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { DividerWithLabel } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "DividerWithLabel",
    category: "modules",
    domain: "common",
    defaultProps: {
      label: "다른 로그인 방식",
    },
    propSchema: {
      label: {
        type: "string",
        label: "구분선 중앙 텍스트",
        default: "다른 로그인 방식",
      },
    },
  },
  component: (p) => <DividerWithLabel {...(p as any)} />,
};

export default definition;
