/**
 * @file Badge.cms.tsx
 * @description Badge 컴포넌트의 CMS BlockDefinition.
 * CMS 팔레트 'core' 카테고리에 Badge를 등록한다.
 *
 * @example
 * // your-app/src/cms/index.ts 에서 import 후 blocks 배열에 추가
 * import BadgeDefinition from "@reactivespringware/component-library/core/Badge/Badge.cms";
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { Badge } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "Badge",
    category: "core",
    defaultProps: {
      variant: "neutral",
      children: "배지",
      dot: false,
    },
    propSchema: {
      children: {
        type: "string",
        label: "텍스트",
        default: "배지",
      },
      variant: {
        type: "select",
        label: "색상 변형",
        default: "neutral",
        // dot=true 일 때는 children 없이 동작하므로 variant만으로 색상 제어
        options: ["primary", "brand", "success", "danger", "warning", "neutral"],
      },
      dot: {
        type: "boolean",
        label: "점(dot) 표시",
        default: false,
      },
    },
  },
  // Badge는 children을 ReactNode로 받지만 CMS에서는 string만 허용
  component: (p) => <Badge {...(p as any)} />,
};

export default definition;
