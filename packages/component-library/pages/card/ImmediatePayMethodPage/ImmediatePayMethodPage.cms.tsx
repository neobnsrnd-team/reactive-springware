/**
 * @file ImmediatePayMethodPage.cms.tsx
 * @description ImmediatePayMethodPage 컴포넌트의 CMS BlockDefinition.
 * 즉시결제 플로우 STEP 3 — 결제방식 선택 화면.
 * STEP 1·2에서 선택한 정보를 요약하고 출금계좌를 선택한 후 신청한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { ImmediatePayMethodPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "ImmediatePayMethodPage",
    category: "pages",
    domain: "card",
    defaultProps: {
      initialPaymentType: "total",
      summaryItems: [
        { label: "청구단위",    value: "하나 머니 체크카드" },
        { label: "결제유형",    value: "총 이용금액 결제" },
        { label: "결제금액",    value: "385,000원" },
      ],
      accounts: [
        { id: "acc-1", bankName: "하나은행", maskedAccount: "123-456789-01***" },
      ],
      initialAccountId: "acc-1",
    },
    propSchema: {
      initialPaymentType: {
        type: "select",
        label: "초기 결제 유형",
        // total: 총 이용금액 결제, per-item: 이용건별 결제
        default: "total",
        options: ["total", "per-item"],
      },
      summaryItems: {
        type: "array",
        label: "신청정보 확인 항목 목록 (label·value)",
        // STEP 1·2 선택값 요약 행 목록
      },
      accounts: {
        type: "array",
        label: "출금계좌 목록 (id·bankName·maskedAccount)",
      },
      initialAccountId: {
        type: "string",
        label: "초기 선택 계좌 ID",
        default: "",
      },
      onApply: {
        type: "event",
        label: "신청 버튼 클릭 (선택된 계좌 id 전달)",
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
  component: (p) => <ImmediatePayMethodPage {...(p as any)} />,
};

export default definition;
