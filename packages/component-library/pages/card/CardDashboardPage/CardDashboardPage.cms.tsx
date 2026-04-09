/**
 * @file CardDashboardPage.cms.tsx
 * @description CardDashboardPage 컴포넌트의 CMS BlockDefinition.
 * 카드 대시보드 홈 페이지. 명세서 요약·대출 메뉴바·카드 관리 바로가기·
 * 퀵 기능 메뉴(카드별 실적·이용내역·보유카드 등) 하단 탭 내비게이션으로 구성된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CardDashboardPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CardDashboardPage",
    category: "pages",
    domain: "card",
    defaultProps: {
      activeBottomTab: "my",
    },
    propSchema: {
      activeBottomTab: {
        type: "select",
        label: "활성 하단 탭 ID",
        // my: 내 카드 / benefit: 혜택 / more: 전체메뉴
        default: "my",
        options: ["my", "benefit", "more"],
      },
      onNotification: {
        type: "event",
        label: "알림 아이콘 클릭",
      },
      onMenu: {
        type: "event",
        label: "메뉴 아이콘 클릭",
      },
      onStatementDetail: {
        type: "event",
        label: "명세서 상세 화면 이동",
      },
      onShortLoan: {
        type: "event",
        label: "단기카드대출 클릭",
      },
      onLongLoan: {
        type: "event",
        label: "장기카드대출 클릭",
      },
      onRevolving: {
        type: "event",
        label: "리볼빙 클릭",
      },
      onCardRecommend: {
        type: "event",
        label: "카드추천 클릭",
      },
      onFinanceLoan: {
        type: "event",
        label: "금융/대출 클릭",
      },
      onInsurance: {
        type: "event",
        label: "보험 클릭",
      },
      onCardPerformance: {
        type: "event",
        label: "카드별 실적 클릭",
      },
      onUsageHistory: {
        type: "event",
        label: "이용내역 클릭",
      },
      onMyCards: {
        type: "event",
        label: "보유카드 클릭",
      },
      onCoupons: {
        type: "event",
        label: "쿠폰함 클릭",
      },
      onLimitCheck: {
        type: "event",
        label: "한도조회 클릭",
      },
      onInstallment: {
        type: "event",
        label: "무이자할부 클릭",
      },
      onCardApply: {
        type: "event",
        label: "카드신청 클릭",
      },
      onBottomNavChange: {
        type: "event",
        label: "하단 탭 전환",
      },
    },
  },
  component: (p) => <CardDashboardPage {...(p as any)} />,
};

export default definition;
