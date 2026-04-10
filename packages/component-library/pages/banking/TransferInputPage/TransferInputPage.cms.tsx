/**
 * @file TransferInputPage.cms.tsx
 * @description TransferInputPage 컴포넌트의 CMS BlockDefinition.
 * 이체 수신 방식 선택 + 계좌번호/연락처 입력 화면.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { TransferInputPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "TransferInputPage",
    category: "pages",
    domain: "banking",
    defaultProps: {
      initialTab: "account",
      cmsSectionExpanded: false,
    },
    propSchema: {
      initialTab: {
        type: "select",
        label: "초기 활성 탭",
        // account: 계좌번호로 이체 / contact: 연락처 송금
        default: "account",
        options: ["account", "contact"],
      },
      cmsSectionExpanded: {
        type: "boolean",
        label: "통장표시내용/CMS 섹션 초기 펼침",
        default: false,
      },
    },
  },
  component: (p) => <TransferInputPage {...(p as any)} />,
};

export default definition;
