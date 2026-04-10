/**
 * @file HanaCardMenuPage.cms.tsx
 * @description HanaCardMenuPage 컴포넌트의 CMS BlockDefinition.
 * 하나카드 전체메뉴 페이지. 좌측 카테고리 사이드바(전체·이용내역·결제·카드관리·혜택·서비스)와
 * 우측 메뉴 항목 그리드로 구성되며, 상단에 사용자 프로필과 드롭다운 메뉴를 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { HanaCardMenuPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "HanaCardMenuPage",
    category: "pages",
    domain: "card",
    defaultProps: {
      userName: "홍길동님",
      lastLogin: "2026.04.09 10:00:00",
      categories: [
        { id: "all",        label: "전체" },
        { id: "history",    label: "이용내역" },
        { id: "payment",    label: "결제" },
        { id: "management", label: "카드관리" },
        { id: "benefit",    label: "혜택" },
        { id: "service",    label: "서비스" },
      ],
      menuItems: [],
    },
    propSchema: {
      userName: {
        type: "string",
        label: "사용자 이름 (예: 홍길동님)",
        default: "홍길동님",
      },
      lastLogin: {
        type: "string",
        label: "최근 접속 일시 (예: 2026.04.09 10:00:00)",
        default: "2026.04.09 10:00:00",
      },
      categories: {
        type: "array",
        label: "좌측 카테고리 목록 (id·label)",
        // id: 'all' | 'history' | 'payment' | 'management' | 'benefit' | 'service'
      },
      menuItems: {
        type: "array",
        label: "우측 메뉴 항목 목록 (id·category·label)",
        // 각 항목: { id, category, label, onClick }
      },
      onBack: {
        type: "event",
        label: "뒤로가기 클릭",
      },
      onProfileManage: {
        type: "event",
        label: "내 정보 관리 클릭 (드롭다운)",
      },
      onLogout: {
        type: "event",
        label: "로그아웃 클릭",
      },
    },
  },
  component: (p) => <HanaCardMenuPage {...(p as any)} />,
};

export default definition;
