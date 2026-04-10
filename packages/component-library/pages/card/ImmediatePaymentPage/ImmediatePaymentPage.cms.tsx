/**
 * @file ImmediatePaymentPage.cms.tsx
 * @description ImmediatePaymentPage 컴포넌트의 CMS BlockDefinition.
 * 즉시결제(선결제) 유형 선택 진입 화면.
 * 하나은행·타행 결제계좌 카드와 즉시결제·건별즉시결제·매주 자동 선결제 버튼을 제공한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { ImmediatePaymentPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "ImmediatePaymentPage",
    category: "pages",
    domain: "card",
    defaultProps: {
      hanaAccount: {
        title: "하나은행 결제계좌",
        hours: "365일 06:00~23:30",
        icon: "Building2",
      },
      otherAccount: {
        title: "타행 결제계좌",
        hours: "평일 09:00~17:00",
        icon: "Building",
      },
      cautions: [
        { title: "출금 제한 안내", content: "출금 제한 시간에는 즉시결제가 불가합니다." },
      ],
    },
    propSchema: {
      hanaAccount: {
        type: "group",
        label: "하나은행 결제계좌 카드 정보",
        fields: {
          title: { type: "string", label: "명칭",            default: "하나은행 결제계좌" },
          hours: { type: "string", label: "출금 가능 시간",  default: "365일 06:00~23:30" },
          icon:  { type: "icon-picker", label: "아이콘" },
        },
      },
      otherAccount: {
        type: "group",
        label: "타행 결제계좌 카드 정보",
        fields: {
          title: { type: "string", label: "명칭",            default: "타행 결제계좌" },
          hours: { type: "string", label: "출금 가능 시간",  default: "평일 09:00~17:00" },
          icon:  { type: "icon-picker", label: "아이콘" },
        },
      },
      cautions: {
        type: "array",
        label: "유의사항 항목 목록 (title·content)",
      },
      onImmediatePayment: {
        type: "event",
        label: "즉시결제(선결제) 클릭",
      },
      onItemPayment: {
        type: "event",
        label: "건별즉시결제(건별선결제) 클릭",
      },
      onAutoPayment: {
        type: "event",
        label: "매주 자동 선결제 클릭",
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
  component: (p) => <ImmediatePaymentPage {...(p as any)} />,
};

export default definition;
