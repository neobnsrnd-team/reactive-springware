/**
 * @file ImmediatePayPage.cms.tsx
 * @description ImmediatePayPage 컴포넌트의 CMS BlockDefinition.
 * 즉시결제 플로우 STEP 1 — 결제정보 선택 화면.
 * 보유 카드 목록에서 결제 카드와 결제 유형(총 이용금액/이용건별)을 선택한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { ImmediatePayPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "ImmediatePayPage",
    category: "pages",
    domain: "card",
    defaultProps: {
      cards: [
        { id: "card-1", name: "하나 머니 체크카드", maskedNumber: "1234-56**-****-7890" },
        { id: "card-2", name: "하나 비자 신용카드",  maskedNumber: "9876-54**-****-3210" },
      ],
      initialCardId: "card-1",
      initialPaymentType: "total",
    },
    propSchema: {
      cards: {
        type: "array",
        label: "보유 카드 목록 (id·name·maskedNumber)",
      },
      initialCardId: {
        type: "string",
        label: "초기 선택 카드 ID",
        default: "",
      },
      initialPaymentType: {
        type: "select",
        label: "초기 결제 유형",
        // total: 총 이용금액 결제, per-item: 이용건별 결제
        default: "total",
        options: ["total", "per-item"],
      },
      onPaymentTypeChange: {
        type: "event",
        label: "결제 유형 변경",
      },
      onCardChange: {
        type: "event",
        label: "카드 변경",
      },
      onNext: {
        type: "event",
        label: "다음 버튼 클릭 (STEP 2로 이동)",
      },
      onBack: {
        type: "event",
        label: "뒤로가기 클릭",
      },
      onClose: {
        type: "event",
        label: "닫기(X) 클릭",
      },
    },
  },
  component: (p) => <ImmediatePayPage {...(p as any)} />,
};

export default definition;
