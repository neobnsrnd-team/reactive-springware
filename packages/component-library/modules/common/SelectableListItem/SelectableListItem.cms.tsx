/**
 * @file SelectableListItem.cms.tsx
 * @description SelectableListItem 컴포넌트의 CMS BlockDefinition.
 * 단일 선택 가능한 목록 항목. 선택 시 체크 또는 하이라이트 상태로 표시된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { SelectableListItem } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "SelectableListItem",
    category: "modules",
    domain: "common",
    defaultProps: {
      label: "항목 레이블",
      isSelected: false,
    },
    propSchema: {
      label: {
        type: "string",
        label: "표시 레이블",
        default: "항목 레이블",
      },
      isSelected: {
        type: "boolean",
        label: "선택 여부",
        default: false,
      },
      onClick: {
        type: "event",
        label: "항목 클릭",
      },
    },
  },
  component: (p) => <SelectableListItem {...(p as any)} />,
};

export default definition;
