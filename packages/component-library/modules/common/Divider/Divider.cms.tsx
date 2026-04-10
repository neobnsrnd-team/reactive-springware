/**
 * @file Divider.cms.tsx
 * @description Divider 컴포넌트의 CMS BlockDefinition.
 * 텍스트 없이 순수한 수평선(border)만 렌더링하는 단순 구분선.
 * DividerWithLabel(텍스트 포함 구분선)과 구분된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { Divider } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "Divider",
    category: "modules",
    domain: "common",
    defaultProps: {},
    propSchema: {},
  },
  component: (p) => <Divider {...(p as any)} />,
};

export default definition;
