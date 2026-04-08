/**
 * @file AccountDetailPage.cms.tsx
 * @description AccountDetailPage 컴포넌트의 CMS BlockDefinition.
 * 계좌상세 페이지. 계좌 기본정보 + 거래내역 목록을 단일 페이지에서 보여준다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { AccountDetailPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "AccountDetailPage",
    category: "pages",
    domain: "banking",
    defaultProps: {
      accountType: "deposit",
      accountName: "급여 통장",
      accountNumber: "123-456-789012",
      balance: 3000000,
      availableBalance: 2950000,
      initialState: "data",
      transactions: [
        { id: "1", date: "2026-04-08T10:00:00Z", title: "편의점", amount: -5000,   type: "withdrawal" },
        { id: "2", date: "2026-04-08T09:00:00Z", title: "급여",   amount: 3000000, type: "deposit"    },
      ],
    },
    propSchema: {
      accountType: {
        type: "select",
        label: "계좌 유형",
        default: "deposit",
        options: ["deposit", "savings", "loan", "foreignDeposit", "retirement", "securities"],
      },
      accountName: {
        type: "string",
        label: "계좌명",
        default: "급여 통장",
      },
      accountNumber: {
        type: "string",
        label: "계좌번호",
        default: "123-456-789012",
      },
      balance: {
        type: "number",
        label: "잔액 (원화 숫자)",
        default: 0,
      },
      availableBalance: {
        type: "number",
        label: "출금가능액 (원화 숫자)",
        default: 0,
      },
      initialState: {
        type: "select",
        label: "초기 렌더링 상태 (Storybook 확인용)",
        // 실제 앱에서는 Hook의 isLoading·isError로 제어
        default: "data",
        options: ["loading", "data", "error"],
      },
      onBack: {
        type: "event",
        label: "뒤로가기 클릭",
      },
      onMenu: {
        type: "event",
        label: "메뉴 버튼 클릭",
      },
      onInsuranceInfo: {
        type: "event",
        label: "예금자보호 카드 클릭",
      },
      onTransactionSearch: {
        type: "event",
        label: "거래내역 검색 아이콘 클릭",
      },
      onTransactionMore: {
        type: "event",
        label: "거래내역 더보기 클릭",
      },
      onTransactionClick: {
        type: "event",
        label: "거래 항목 클릭",
      },
    },
  },
  component: (p) => <AccountDetailPage {...(p as any)} />,
};

export default definition;
