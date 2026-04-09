/**
 * @file SummaryCard.cms.tsx
 * @description SummaryCard 컴포넌트의 CMS BlockDefinition.
 * 자산·지출 요약 카드. variant에 따라 asset(자산) 또는 spending(지출) 레이아웃으로 전환된다.
 * 하단 actions 버튼으로 세부 분류별 필터링을 지원한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { SummaryCard } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "SummaryCard",
    category: "biz",
    domain: "card",
    defaultProps: {
      variant: "asset",
      title: "이번 달 지출",
      amount: 385000,
      // icon은 ReactNode라 CMS에서 직접 편집 불가 — 실제 앱에서 주입
      icon: null,
      // CMS 미리보기용 샘플 액션
      actions: [
        { label: "전체", active: true },
        { label: "식비", active: false },
        { label: "교통", active: false },
      ],
    },
    propSchema: {
      variant: {
        type: "select",
        label: "카드 유형",
        // asset: 자산 요약 / spending: 지출 요약
        default: "asset",
        options: ["asset", "spending"],
      },
      title: {
        type: "string",
        label: "메인 제목",
        default: "이번 달 지출",
      },
      amount: {
        type: "number",
        label: "원화 금액 (자동 포맷)",
        default: 0,
      },
      onClick: {
        type: "event",
        label: "카드 전체 클릭",
      },
    },
  },
  component: (p) => <SummaryCard {...(p as any)} />,
};

export default definition;
