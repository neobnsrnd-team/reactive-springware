/**
 * @file BankSelectPage.cms.tsx
 * @description BankSelectPage 컴포넌트의 CMS BlockDefinition.
 * 이체 화면에서 금융기관을 선택하는 BottomSheet 페이지.
 * 은행 탭(2열 선택 그리드)과 증권사 탭으로 구성된다.
 * banks / securities 배열의 icon은 실제 앱에서 ReactNode로 주입한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { BankSelectPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "BankSelectPage",
    category: "pages",
    domain: "banking",
    defaultProps: {
      open: true,
      activeTab: "bank",
      selectedBankId: "",
      selectedSecuritiesId: "",
      // icon은 실제 앱에서 주입. CMS 미리보기용 최소 구성
      banks: [
        { id: "hana",    label: "하나은행" },
        { id: "kb",      label: "KB국민은행" },
        { id: "shinhan", label: "신한은행" },
        { id: "nh",      label: "NH농협은행" },
      ],
      securities: [],
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
        // bank: 은행 탭 / securities: 증권사 탭
        default: "bank",
        options: ["bank", "securities"],
      },
      onClose: {
        type: "event",
        label: "닫기",
      },
      onTabChange: {
        type: "event",
        label: "탭 전환",
      },
      onBankSelect: {
        type: "event",
        label: "은행 선택",
      },
      onSecuritiesSelect: {
        type: "event",
        label: "증권사 선택",
      },
      onConnectSecurities: {
        type: "event",
        label: "증권사 연결하기 CTA 클릭 (빈 상태)",
      },
    },
  },
  component: (p) => <BankSelectPage {...(p as any)} />,
};

export default definition;
