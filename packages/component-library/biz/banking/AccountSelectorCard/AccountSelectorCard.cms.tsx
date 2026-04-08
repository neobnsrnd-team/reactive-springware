/**
 * @file AccountSelectorCard.cms.tsx
 * @description AccountSelectorCard 컴포넌트의 CMS BlockDefinition.
 * 계좌 변경이 가능한 선택형 카드. AccountSummaryCard(잔액 표시 전용)와 구분된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { AccountSelectorCard } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "AccountSelectorCard",
    category: "biz",
    domain: "banking",
    defaultProps: {
      accountName: "하나 주거래 통장",
      accountNumber: "123-456-789012",
      availableBalance: "출금가능금액: 3,000,000원",
      iconAriaLabel: "계좌 상세",
    },
    propSchema: {
      accountName: {
        type: "string",
        label: "계좌명",
        default: "하나 주거래 통장",
      },
      accountNumber: {
        type: "string",
        label: "계좌번호",
        default: "123-456-789012",
      },
      availableBalance: {
        type: "string",
        label: "출금가능금액 문자열",
        // 예: '출금가능금액: 3,000,000원' — 전달 시 계좌번호 아래에 브랜드 색상으로 표시
        default: "",
      },
      iconAriaLabel: {
        type: "string",
        label: "아이콘 버튼 접근성 레이블",
        // 기본값 '계좌 상세'. 이체 등 다른 목적으로 재사용 시 실제 기능명으로 변경
        default: "계좌 상세",
      },
      onAccountChange: {
        type: "event",
        label: "계좌명 클릭 (계좌 변경)",
      },
      onIconClick: {
        type: "event",
        label: "아이콘 버튼 클릭",
      },
    },
  },
  component: (p) => <AccountSelectorCard {...(p as any)} />,
};

export default definition;
