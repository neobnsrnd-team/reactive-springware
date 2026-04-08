/**
 * @file FullMenuPage.cms.tsx
 * @description FullMenuPage 컴포넌트의 CMS BlockDefinition.
 * 전체 메뉴 화면. 좌측 카테고리 사이드바 + 우측 메뉴 목록으로 구성된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { FullMenuPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "FullMenuPage",
    category: "pages",
    domain: "common",
    defaultProps: {
      activeCategory: "banking",
    },
    propSchema: {
      activeCategory: {
        type: "select",
        label: "초기 활성 카테고리",
        default: "banking",
        options: ["banking", "management", "card", "product", "forex"],
      },
      onClose: {
        type: "event",
        label: "닫기(X) 클릭",
      },
      onHome: {
        type: "event",
        label: "홈 아이콘 클릭",
      },
      onLogout: {
        type: "event",
        label: "로그아웃 클릭",
      },
      onCategoryChange: {
        type: "event",
        label: "카테고리 전환",
      },
    },
  },
  component: (p) => <FullMenuPage {...(p as any)} />,
};

export default definition;
