/**
 * @file CardVisual.cms.tsx
 * @description CardVisual 컴포넌트의 CMS BlockDefinition.
 * 카드 이미지와 브랜드 로고, 카드명을 함께 표시하는 카드 비주얼 영역.
 * compact 모드에서는 스티키헤더용 한 줄 레이아웃으로 전환된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CardVisual } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CardVisual",
    category: "biz",
    domain: "card",
    defaultProps: {
      // cardImage는 ReactNode라 CMS에서 직접 편집 불가 — 실제 앱에서 주입
      cardImage: null,
      brand: "VISA",
      cardName: "하나 머니 체크카드",
      compact: false,
    },
    propSchema: {
      brand: {
        type: "select",
        label: "카드 브랜드",
        default: "VISA",
        options: ["VISA", "Mastercard", "AMEX", "JCB", "UnionPay"],
      },
      cardName: {
        type: "string",
        label: "카드명",
        default: "하나 머니 체크카드",
      },
      compact: {
        type: "boolean",
        label: "compact 모드 (스티키헤더용 한 줄 레이아웃)",
        // true: 카드 이미지를 작게 줄이고 한 줄로 표시
        default: false,
      },
    },
  },
  component: (p) => <CardVisual {...(p as any)} />,
};

export default definition;
