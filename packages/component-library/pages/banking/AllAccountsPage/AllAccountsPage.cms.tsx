/**
 * @file AllAccountsPage.cms.tsx
 * @description AllAccountsPage 컴포넌트의 CMS BlockDefinition.
 * 전계좌 조회 페이지. 해당금융(내 계좌)과 다른금융(연결 계좌) 탭 전환을 하나의 페이지에서 처리한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { AllAccountsPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "AllAccountsPage",
    category: "pages",
    domain: "banking",
    defaultProps: {
      initialTab: "mine",
      initialState: "data",
    },
    propSchema: {
      initialTab: {
        type: "select",
        label: "초기 활성 탭",
        // mine: 해당금융 / other: 다른금융
        default: "mine",
        options: ["mine", "other"],
      },
      initialState: {
        type: "select",
        label: "초기 렌더링 상태 (Storybook 확인용)",
        default: "data",
        options: ["loading", "data", "error"],
      },
      onBack: {
        type: "event",
        label: "뒤로가기 클릭",
      },
      onConnectAccount: {
        type: "event",
        label: "연결하기 버튼 클릭 (다른금융 빈 상태)",
      },
      onAccountClick: {
        type: "event",
        label: "계좌 카드 클릭",
      },
      onTransactionHistory: {
        type: "event",
        label: "거래내역 버튼 클릭",
      },
      onTransfer: {
        type: "event",
        label: "이체 버튼 클릭",
      },
    },
  },
  component: (p) => <AllAccountsPage {...(p as any)} />,
};

export default definition;
