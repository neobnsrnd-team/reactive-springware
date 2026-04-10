/**
 * @file RecentRecipientItem.cms.tsx
 * @description RecentRecipientItem 컴포넌트의 CMS BlockDefinition.
 * 최근 이체 수취인 목록의 단일 항목. 클릭 시 해당 수취인 정보로 이체 폼을 자동 입력한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { RecentRecipientItem } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "RecentRecipientItem",
    category: "modules",
    domain: "common",
    defaultProps: {
      name: "홍길동",
      bankName: "하나은행",
      maskedAccount: "123-****-5678",
    },
    propSchema: {
      name: {
        type: "string",
        label: "수취인명",
        default: "홍길동",
      },
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
      onClick: {
        type: "event",
        label: "수취인 선택 (이체 폼 자동 입력)",
      },
    },
  },
  component: (p) => <RecentRecipientItem {...(p as any)} />,
};

export default definition;
