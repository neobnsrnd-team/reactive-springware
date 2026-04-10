/**
 * @file AccountSelectCard.cms.tsx
 * @description AccountSelectCard 컴포넌트의 CMS BlockDefinition.
 * 이체 시 출금 계좌를 선택하는 카드 항목. 은행명·마스킹 계좌번호·선택 상태를 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { AccountSelectCard } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "AccountSelectCard",
    category: "biz",
    domain: "card",
    defaultProps: {
      bankName: "하나은행",
      maskedAccount: "123-****-5678",
      isSelected: false,
    },
    propSchema: {
      bankName: {
        type: "string",
        label: "은행명",
        default: "하나은행",
      },
      maskedAccount: {
        type: "string",
        label: "마스킹된 계좌번호 (예: 123-****-5678)",
        default: "123-****-5678",
      },
      isSelected: {
        type: "boolean",
        label: "선택 여부",
        default: false,
      },
      onClick: {
        type: "event",
        label: "카드 클릭",
      },
    },
  },
  component: (p) => <AccountSelectCard {...(p as any)} />,
};

export default definition;
