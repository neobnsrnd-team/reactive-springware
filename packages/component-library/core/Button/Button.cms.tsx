/**
 * @file Button.cms.tsx
 * @description Button 컴포넌트의 CMS BlockDefinition.
 * CMS 팔레트 'core' 카테고리에 Button을 등록한다.
 *
 * @example
 * // your-app/src/cms/index.ts 에서 import 후 blocks 배열에 추가
 * import ButtonDefinition from "@reactivespringware/component-library/core/Button/Button.cms";
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { Button } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "Button",
    category: "core",
    defaultProps: {
      variant: "primary",
      size: "md",
      children: "버튼",
      fullWidth: false,
      loading: false,
      disabled: false,
      iconOnly: false,
      justify: "center",
    },
    propSchema: {
      children: {
        type: "string",
        label: "버튼 텍스트",
        default: "버튼",
      },
      variant: {
        type: "select",
        label: "변형",
        default: "primary",
        options: ["primary", "outline", "ghost", "danger"],
      },
      size: {
        type: "select",
        label: "크기",
        default: "md",
        options: ["sm", "md", "lg"],
      },
      justify: {
        type: "select",
        label: "내부 정렬",
        // center: 일반 버튼 / between: 아코디언 트리거 등 좌우 분리 레이아웃
        default: "center",
        options: ["center", "between"],
      },
      fullWidth: {
        type: "boolean",
        label: "전체 너비 (w-full)",
        default: false,
      },
      loading: {
        type: "boolean",
        label: "로딩 중",
        default: false,
      },
      disabled: {
        type: "boolean",
        label: "비활성화",
        default: false,
      },
      iconOnly: {
        type: "boolean",
        label: "아이콘 전용 (정방형)",
        default: false,
      },
      onClick: {
        // event: CMS 인터랙션 탭에서 navigate / openOverlay 등 액션을 바인딩
        type: "event",
        label: "클릭",
      },
    },
  },
  component: (p) => <Button {...(p as any)} />,
};

export default definition;
