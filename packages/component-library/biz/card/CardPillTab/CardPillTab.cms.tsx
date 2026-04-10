/**
 * @file CardPillTab.cms.tsx
 * @description CardPillTab 컴포넌트의 CMS BlockDefinition.
 * 카드 선택 탭 UI에서 사용하는 알약(pill) 형태의 단일 탭 항목.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CardPillTab } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CardPillTab",
    category: "biz",
    domain: "card",
    defaultProps: {
      label: "하나 머니 체크카드",
      isSelected: false,
    },
    propSchema: {
      label: {
        type: "string",
        label: "탭 레이블 (카드명 등)",
        default: "하나 머니 체크카드",
      },
      isSelected: {
        type: "boolean",
        label: "선택 여부",
        default: false,
      },
      onClick: {
        type: "event",
        label: "탭 클릭",
      },
    },
  },
  component: (p) => <CardPillTab {...(p as any)} />,
};

export default definition;
