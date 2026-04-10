/**
 * @file Checkbox.cms.tsx
 * @description Checkbox 컴포넌트의 CMS BlockDefinition.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { Checkbox } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "Checkbox",
    category: "modules",
    domain: "common",
    defaultProps: {
      checked: false,
      label: "동의합니다",
      disabled: false,
    },
    propSchema: {
      checked: {
        type: "boolean",
        label: "체크 상태",
        default: false,
      },
      label: {
        type: "string",
        label: "레이블 텍스트",
        default: "동의합니다",
      },
      ariaLabel: {
        type: "string",
        label: "접근성 레이블 (label 없을 때 필수)",
        default: "",
      },
      disabled: {
        type: "boolean",
        label: "비활성화",
        default: false,
      },
      onChange: {
        type: "event",
        label: "체크 상태 변경",
      },
    },
  },
  component: (p) => <Checkbox {...(p as any)} />,
};

export default definition;
