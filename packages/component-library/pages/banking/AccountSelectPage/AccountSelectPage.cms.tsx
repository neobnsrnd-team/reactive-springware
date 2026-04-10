/**
 * @file AccountSelectPage.cms.tsx
 * @description AccountSelectPage 컴포넌트의 CMS BlockDefinition.
 * 이체 화면에서 출금·입금 계좌를 선택하는 BottomSheet 페이지.
 * "해당금융" 탭(보유 계좌 목록)과 "다른 금융" 탭으로 구성된다.
 * accounts / otherAccounts 배열은 실제 앱에서 API 데이터를 주입한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { AccountSelectPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "AccountSelectPage",
    category: "pages",
    domain: "banking",
    defaultProps: {
      open: true,
      activeTab: "mine",
      selectedAccountId: "",
      selectedOtherAccountId: "",
      accounts: [
        { id: "acc-1", accountName: "하나 주거래 통장", accountNumber: "123-456-789012", balance: "3,000,000원" },
        { id: "acc-2", accountName: "급여 통장",        accountNumber: "234-567-890123", balance: "1,500,000원" },
      ],
      otherAccounts: [],
    },
    propSchema: {
      open: {
        type: "boolean",
        label: "BottomSheet 열림 여부",
        default: true,
      },
      activeTab: {
        type: "select",
        label: "초기 활성 탭",
        // mine: 해당금융(보유 계좌) / other: 다른 금융
        default: "mine",
        options: ["mine", "other"],
      },
      onClose: {
        type: "event",
        label: "닫기",
      },
      onTabChange: {
        type: "event",
        label: "탭 전환",
      },
      onAccountSelect: {
        type: "event",
        label: "보유 계좌 선택",
      },
      onOtherAccountSelect: {
        type: "event",
        label: "다른 금융 계좌 선택",
      },
      onConnectOtherAccount: {
        type: "event",
        label: "다른 금융 계좌 연결하기 CTA 클릭",
      },
    },
  },
  component: (p) => <AccountSelectPage {...(p as any)} />,
};

export default definition;
