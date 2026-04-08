/**
 * @file AccountSelectItem.cms.tsx
 * @description AccountSelectItem 컴포넌트의 CMS BlockDefinition.
 * 출금/입금 계좌 선택 BottomSheet의 계좌 리스트 아이템.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { AccountSelectItem } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "AccountSelectItem",
    category: "modules",
    domain: "banking",
    defaultProps: {
      accountName: "하나 주거래 통장",
      accountNumber: "123-456-789012",
      balance: "3,000,000원",
      selected: false,
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
      balance: {
        type: "string",
        label: "잔액 표시 문자열 (포맷은 호출자 책임)",
        default: "0원",
      },
      selected: {
        type: "boolean",
        label: "선택 상태",
        // true: 브랜드 배경 + 체크 아이콘 / false: 기본 배경
        default: false,
      },
      icon: {
        type: "icon-picker",
        label: "아이콘 (Lucide)",
        default: "Landmark",
      },
      onClick: {
        type: "event",
        label: "계좌 항목 클릭",
      },
    },
  },
  component: (p) => <AccountSelectItem {...(p as any)} />,
};

export default definition;
