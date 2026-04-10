/**
 * @file TransactionSearchFilter.cms.tsx
 * @description TransactionSearchFilter 컴포넌트의 CMS BlockDefinition.
 * 거래내역 조회 필터 조건: 기간(퀵 선택 또는 직접 입력), 정렬 순서, 거래 유형.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { TransactionSearchFilter } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "TransactionSearchFilter",
    category: "modules",
    domain: "banking",
    defaultProps: {
      defaultExpanded: false,
      value: {
        startDate: "2026-03-08",
        endDate: "2026-04-08",
        sortOrder: "recent",
        transactionType: "all",
      },
    },
    propSchema: {
      defaultExpanded: {
        type: "boolean",
        label: "초기 펼침 여부",
        // true: 필터 패널이 펼쳐진 상태로 시작
        default: false,
      },
      onSearch: {
        type: "event",
        label: "조회 버튼 클릭",
      },
    },
  },
  component: (p) => <TransactionSearchFilter {...(p as any)} />,
};

export default definition;
