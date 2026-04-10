/**
 * @file ImmediatePayRequestPage.cms.tsx
 * @description ImmediatePayRequestPage 컴포넌트의 CMS BlockDefinition.
 * 즉시결제 플로우 STEP 2 — 즉시결제 신청 화면.
 * STEP 1에서 선택한 카드 정보와 결제 가능 금액을 표시하고
 * 이용구분(일시불/금액선택)과 결제 금액을 입력한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { ImmediatePayRequestPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "ImmediatePayRequestPage",
    category: "pages",
    domain: "card",
    defaultProps: {
      initialPaymentType: "total",
      card: {
        id: "card-1",
        name: "하나 머니 체크카드",
        maskedNumber: "1234-56**-****-7890",
      },
      payableAmount: 385000,
      paymentBreakdown: [
        { dateLabel: "2026.04.14 결제", amount: 385000 },
      ],
      cautions: [
        { title: "즉시결제 안내", content: "즉시결제 신청 후 취소가 불가합니다." },
      ],
    },
    propSchema: {
      initialPaymentType: {
        type: "select",
        label: "STEP 1에서 선택된 결제 유형",
        // total: 총 이용금액, per-item: 이용건별
        default: "total",
        options: ["total", "per-item"],
      },
      card: {
        type: "group",
        label: "선택된 카드 정보",
        fields: {
          id:           { type: "string", label: "카드 ID",        default: "card-1" },
          name:         { type: "string", label: "카드명",          default: "하나 머니 체크카드" },
          maskedNumber: { type: "string", label: "마스킹된 카드번호", default: "1234-56**-****-7890" },
        },
      },
      payableAmount: {
        type: "number",
        label: "결제가능금액 (원)",
        default: 0,
      },
      paymentBreakdown: {
        type: "array",
        label: "날짜별 결제금액 분할 내역 (dateLabel·amount)",
        // 각 항목: { dateLabel: '2026.04.14 결제', amount: 385000 }
      },
      amountHelperText: {
        type: "string",
        label: "결제금액 입력란 안내 문구",
        default: "",
      },
      cautions: {
        type: "array",
        label: "꼭! 알아두세요 항목 목록 (title·content)",
      },
      onChangeCard: {
        type: "event",
        label: "변경하기 버튼 클릭 (STEP 1로 이동)",
      },
      onNext: {
        type: "event",
        label: "다음 버튼 클릭 (이용구분·결제금액 전달)",
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
  component: (p) => <ImmediatePayRequestPage {...(p as any)} />,
};

export default definition;
