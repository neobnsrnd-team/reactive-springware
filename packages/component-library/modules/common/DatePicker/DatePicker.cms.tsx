/**
 * @file DatePicker.cms.tsx
 * @description DatePicker 컴포넌트의 CMS BlockDefinition.
 * 날짜 단일 선택(single) 또는 기간 선택(range) 모드를 지원한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { DatePicker } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "DatePicker",
    category: "modules",
    domain: "common",
    defaultProps: {
      mode: "single",
      label: "날짜",
      placeholder: "날짜를 선택하세요",
      disabled: false,
    },
    propSchema: {
      mode: {
        type: "select",
        label: "선택 모드",
        // single: 날짜 단일 선택 / range: 시작~종료 기간 선택
        default: "single",
        options: ["single", "range"],
      },
      label: {
        type: "string",
        label: "레이블",
        default: "날짜",
      },
      placeholder: {
        type: "string",
        label: "플레이스홀더",
        default: "날짜를 선택하세요",
      },
      disabled: {
        type: "boolean",
        label: "비활성화",
        default: false,
      },
      onChange: {
        type: "event",
        label: "날짜 변경 (single 모드)",
      },
      onRangeChange: {
        type: "event",
        label: "기간 변경 (range 모드)",
      },
    },
  },
  component: (p) => <DatePicker {...(p as any)} />,
};

export default definition;
