/**
 * @file UsageHistoryPage.cms.tsx
 * @description UsageHistoryPage 컴포넌트의 CMS BlockDefinition.
 * 카드 이용내역 목록 페이지. 상단 결제 요약 카드, 이용내역 목록, 필터 바텀시트,
 * 분할납부·즉시결제·리볼빙 액션 버튼으로 구성된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { UsageHistoryPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "UsageHistoryPage",
    category: "pages",
    domain: "card",
    defaultProps: {
      transactions: [
        {
          id: "tx-001",
          merchant: "스타벅스 강남점",
          amount: 6500,
          date: "2026.04.08",
          type: "일시불",
          approvalNumber: "12345678",
          status: "승인",
          cardName: "하나 머니 체크카드",
        },
      ],
      totalCount: 1,
      paymentSummary: {
        date: "2026년 4월 14일",
        totalAmount: 385000,
      },
      cardOptions: [
        { value: "all",    label: "전체" },
        { value: "card-1", label: "하나 머니 체크카드" },
      ],
    },
    propSchema: {
      transactions: {
        type: "array",
        label: "이용내역 목록 (merchant·amount·date·type·status·cardName 등)",
        // 각 항목: Transaction 객체
      },
      totalCount: {
        type: "number",
        label: "전체 이용내역 건수",
        default: 0,
      },
      paymentSummary: {
        type: "group",
        label: "결제 요약 카드 데이터",
        fields: {
          date:        { type: "string", label: "결제 예정일 (예: 2026년 4월 14일)", default: "" },
          totalAmount: { type: "number", label: "총 청구금액 (원)",                  default: 0 },
        },
      },
      cardOptions: {
        type: "array",
        label: "카드 필터 옵션 목록 (value·label)",
      },
      onLoadMore: {
        type: "event",
        label: "더 보기 클릭 (다음 페이지 로드)",
      },
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
        label: "리볼빙 버튼 클릭",
      },
      onSearch: {
        type: "event",
        label: "필터 적용 (SearchFilter 객체 전달)",
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
  component: (p) => <UsageHistoryPage {...(p as any)} />,
};

export default definition;
