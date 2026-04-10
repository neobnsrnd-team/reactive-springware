/**
 * @file CardChipItem.cms.tsx
 * @description CardChipItem 컴포넌트의 CMS BlockDefinition.
 * 카드 선택 영역에서 카드명과 마스킹된 카드번호를 칩(chip) 형태로 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CardChipItem } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CardChipItem",
    category: "biz",
    domain: "card",
    defaultProps: {
      name: "하나 머니 체크카드",
      maskedNumber: "1234-****-****-5678",
    },
    propSchema: {
      name: {
        type: "string",
        label: "카드명",
        default: "하나 머니 체크카드",
      },
      maskedNumber: {
        type: "string",
        label: "마스킹된 카드번호 (예: 1234-****-****-5678)",
        default: "1234-****-****-5678",
      },
    },
  },
  component: (p) => <CardChipItem {...(p as any)} />,
};

export default definition;
