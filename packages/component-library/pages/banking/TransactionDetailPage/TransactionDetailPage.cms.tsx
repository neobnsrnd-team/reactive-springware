/**
 * @file TransactionDetailPage.cms.tsx
 * @description TransactionDetailPage 컴포넌트의 CMS BlockDefinition.
 * 거래 상세 BottomSheet 화면. 거래 유형·금액·일시·메모 등을 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { TransactionDetailPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "TransactionDetailPage",
    category: "pages",
    domain: "banking",
    defaultProps: {
      initialOpen: true,
      isLoading: false,
      editingMemo: false,
      // CMS 미리보기용 샘플 목업 데이터
      mockData: {
        type: "withdrawal",
        displayAmount: "- 50,000원",
        displayDate: "2026.04.08 14:20:05",
        memo: "",
        transactionCategory: "이체",
        description: "하나 주거래 → 국민 987-654-3210",
        counterAccount: "국민 987-654-3210",
        counterAccountHolder: "홍길동",
      },
    },
    propSchema: {
      initialOpen: {
        type: "boolean",
        label: "BottomSheet 초기 오픈 여부",
        default: true,
      },
      isLoading: {
        type: "boolean",
        label: "로딩 상태 시뮬레이션",
        default: false,
      },
      editingMemo: {
        type: "boolean",
        label: "메모 편집 모드 초기화",
        default: false,
      },
    },
  },
  component: (p) => <TransactionDetailPage {...(p as any)} />,
};

export default definition;
