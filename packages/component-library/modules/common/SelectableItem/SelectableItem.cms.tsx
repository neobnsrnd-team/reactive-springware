/**
 * @file SelectableItem.cms.tsx
 * @description SelectableItem 컴포넌트의 CMS BlockDefinition.
 * 아이콘 + 레이블로 구성된 선택 가능 카드 타일.
 * 금융권 선택(은행·증권사), 카테고리 선택 등 Grid 2열 배열에서 사용한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { SelectableItem } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "SelectableItem",
    category: "modules",
    domain: "common",
    defaultProps: {
      icon: "Building2",
      label: "하나은행",
      selected: false,
    },
    propSchema: {
      icon: {
        type: "icon-picker",
        label: "아이콘 (Lucide)",
        default: "Building2",
      },
      label: {
        type: "string",
        label: "레이블 텍스트",
        default: "하나은행",
      },
      selected: {
        type: "boolean",
        label: "선택 상태",
        // true: 브랜드 배경 + 브랜드 텍스트 / false: 중립 배경
        default: false,
      },
      onClick: {
        type: "event",
        label: "항목 클릭",
      },
    },
  },
  component: (p) => <SelectableItem {...(p as any)} />,
};

export default definition;
