/**
 * @file TransactionHistoryPage.cms.tsx
 * @description TransactionHistoryPage 컴포넌트의 CMS BlockDefinition.
 * 거래내역 조회 페이지. 조회 필터 + 거래 목록으로 구성된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { TransactionHistoryPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "TransactionHistoryPage",
    category: "pages",
    domain: "banking",
    defaultProps: {
      initialState: "data",
      filterExpanded: false,
    },
    propSchema: {
      initialState: {
        type: "select",
        label: "초기 렌더링 상태",
        // 실제 앱에서는 useTransactionHistory 훅에서 파생
        default: "data",
        options: ["data", "loading", "empty", "error"],
      },
      filterExpanded: {
        type: "boolean",
        label: "조회 조건 패널 초기 펼침",
        // true: 퀵 기간·날짜 입력·드롭다운·조회 버튼이 펼쳐진 상태로 시작
        default: false,
      },
    },
  },
  component: (p) => <TransactionHistoryPage {...(p as any)} />,
};

export default definition;
