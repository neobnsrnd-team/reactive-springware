/**
 * @file CardPaymentActions.cms.tsx
 * @description CardPaymentActions 컴포넌트의 CMS BlockDefinition.
 * 카드 결제 관련 액션 버튼 그룹. 분할납부·즉시결제·리볼빙 버튼을 제공한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CardPaymentActions } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CardPaymentActions",
    category: "biz",
    domain: "card",
    defaultProps: {},
    propSchema: {
      onInstallment: {
        type: "event",
        label: "분할납부 버튼 클릭",
      },
      onImmediatePayment: {
        type: "event",
        label: "즉시결제 버튼 클릭",
      },
      onRevolving: {
        type: "event",
        label: "리볼빙(일부결제금액이월약정) 버튼 클릭",
      },
    },
  },
  component: (p) => <CardPaymentActions {...(p as any)} />,
};

export default definition;
