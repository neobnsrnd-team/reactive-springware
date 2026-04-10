/**
 * @file CardPaymentItem.cms.tsx
 * @description CardPaymentItem 컴포넌트의 CMS BlockDefinition.
 * 카드 결제 내역 단건 행. 가맹점 아이콘·카드명·결제금액을 표시하며
 * 금액이 음수일 경우 취소/환불로 표시된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CardPaymentItem } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CardPaymentItem",
    category: "biz",
    domain: "card",
    defaultProps: {
      // icon은 ReactNode라 CMS에서 직접 편집 불가 — 실제 앱에서 주입
      icon: null,
      cardEnName: "HANA MONEY",
      cardName: "하나 머니 체크카드",
      amount: -38000,
    },
    propSchema: {
      cardEnName: {
        type: "string",
        label: "카드 영문명",
        default: "HANA MONEY",
      },
      cardName: {
        type: "string",
        label: "카드 한글명",
        default: "하나 머니 체크카드",
      },
      amount: {
        type: "number",
        label: "결제 금액 (음수: 취소/환불)",
        default: 0,
      },
      onDetailClick: {
        type: "event",
        label: "상세보기 버튼 클릭",
      },
      onClick: {
        type: "event",
        label: "행 전체 클릭",
      },
    },
  },
  component: (p) => <CardPaymentItem {...(p as any)} />,
};

export default definition;
