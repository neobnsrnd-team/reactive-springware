/**
 * @file TransactionList.cms.tsx
 * @description TransactionList 컴포넌트의 CMS BlockDefinition.
 * API 응답 flat 배열을 컴포넌트 내부에서 날짜별로 그룹핑하여 표시한다.
 * items 배열은 실제 앱에서 API 응답을 주입한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { TransactionList } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "TransactionList",
    category: "modules",
    domain: "banking",
    defaultProps: {
      loading: false,
      emptyMessage: "거래 내역이 없어요",
      dateHeaderFormat: "month-day",
      // CMS 미리보기용 샘플 데이터
      items: [
        { id: "1", date: "2026-04-08T10:00:00Z", title: "편의점",  amount: -5000,   type: "withdrawal" },
        { id: "2", date: "2026-04-08T09:00:00Z", title: "급여",    amount: 3000000, type: "deposit"    },
        { id: "3", date: "2026-04-07T15:00:00Z", title: "이체",    amount: -50000,  type: "transfer"   },
      ],
    },
    propSchema: {
      loading: {
        type: "boolean",
        label: "로딩 상태",
        default: false,
      },
      emptyMessage: {
        type: "string",
        label: "빈 목록 메시지",
        default: "거래 내역이 없어요",
      },
      dateHeaderFormat: {
        type: "select",
        label: "날짜 그룹 헤더 형식",
        // month-day: 'MM월 DD일' / year-month-day: 'YYYY년 MM월 DD일'
        default: "month-day",
        options: ["month-day", "year-month-day"],
      },
      onItemClick: {
        type: "event",
        label: "거래 항목 클릭",
      },
    },
  },
  component: (p) => <TransactionList {...(p as any)} />,
};

export default definition;
