/**
 * @file ImmediatePayCompletePage.cms.tsx
 * @description ImmediatePayCompletePage 컴포넌트의 CMS BlockDefinition.
 * 즉시결제 플로우 STEP 4 — 완료 화면.
 * 결제 카드명·금액·출금 계좌·처리일시를 표시하고 확인 버튼을 제공한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { ImmediatePayCompletePage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "ImmediatePayCompletePage",
    category: "pages",
    domain: "card",
    defaultProps: {
      cardName: "하나 머니 체크카드",
      amount: 385000,
      account: "하나은행 123-456789-01***",
      completedAt: "2026.04.09 14:32",
    },
    propSchema: {
      cardName: {
        type: "string",
        label: "결제 카드명",
        default: "하나 머니 체크카드",
      },
      amount: {
        type: "number",
        label: "결제 금액 (원)",
        default: 0,
      },
      account: {
        type: "string",
        label: "출금 계좌 (예: 하나은행 123-456789-01***)",
        default: "하나은행 123-456789-01***",
      },
      completedAt: {
        type: "string",
        label: "처리일시 (예: 2026.04.09 14:32)",
        default: "2026.04.09 14:32",
      },
      onConfirm: {
        type: "event",
        label: "확인 버튼 클릭 (홈으로 이동 등)",
      },
    },
  },
  component: (p) => <ImmediatePayCompletePage {...(p as any)} />,
};

export default definition;
