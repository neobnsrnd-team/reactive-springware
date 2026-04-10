/**
 * @file UsageTransactionItem.cms.tsx
 * @description UsageTransactionItem 컴포넌트의 CMS BlockDefinition.
 * 카드 이용내역 단건 행. 가맹점명·금액·날짜·거래구분·상태를 표시하며,
 * onClick 전달 시 클릭 가능한 버튼으로 렌더링되고 상세 BottomSheet를 노출한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { UsageTransactionItem } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "UsageTransactionItem",
    category: "biz",
    domain: "card",
    defaultProps: {
      tx: {
        id: "tx-001",
        merchant: "스타벅스 강남점",
        amount: 6500,
        date: "2026.04.08",
        type: "일시불",
        approvalNumber: "12345678",
        status: "승인",
        cardName: "하나 머니 체크카드",
      },
    },
    propSchema: {
      tx: {
        type: "group",
        label: "이용내역 정보",
        // Transaction 객체 필드를 그룹으로 편집
        fields: {
          id:             { type: "string", label: "거래 ID",      default: "tx-001" },
          merchant:       { type: "string", label: "사용처(가맹점명)", default: "스타벅스 강남점" },
          amount:         { type: "number", label: "결제 금액 (원, 음수=취소)", default: 6500 },
          date:           { type: "string", label: "거래일 (예: 2026.04.08)", default: "2026.04.08" },
          type:           { type: "string", label: "거래구분 (예: 일시불, 할부(3개월))", default: "일시불" },
          approvalNumber: { type: "string", label: "승인번호",     default: "12345678" },
          status:         { type: "string", label: "거래상태 (예: 승인, 결제확정, 취소)", default: "승인" },
          cardName:       { type: "string", label: "이용카드명",   default: "하나 머니 체크카드" },
        },
      },
      onClick: {
        type: "event",
        label: "행 클릭 (상세 BottomSheet 열기)",
      },
    },
  },
  component: (p) => <UsageTransactionItem {...(p as any)} />,
};

export default definition;
