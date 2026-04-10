/**
 * @file SidebarNav.cms.tsx
 * @description SidebarNav 컴포넌트의 CMS BlockDefinition.
 * 세로 방향 탭 네비게이션. 전체 메뉴 화면의 좌측 카테고리 목록 등에 사용한다.
 * 가로 방향 탭은 TabNav를 사용한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { SidebarNav } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "SidebarNav",
    category: "modules",
    domain: "common",
    defaultProps: {
      activeId: "banking",
      items: [
        { id: "banking",    label: "뱅킹" },
        { id: "management", label: "관리" },
        { id: "card",       label: "카드" },
      ],
    },
    propSchema: {
      activeId: {
        type: "string",
        label: "현재 활성 항목 ID",
        default: "",
      },
      items: {
        type: "array",
        label: "네비게이션 항목 목록",
        default: [{ id: "item-1", label: "항목 1" }],
        itemFields: {
          id: {
            type: "string",
            label: "항목 ID",
            default: "",
          },
          label: {
            type: "string",
            label: "레이블",
            default: "항목",
          },
        },
      },
      onItemChange: {
        type: "event",
        label: "항목 클릭 (선택된 id 전달)",
      },
    },
  },
  component: (p) => <SidebarNav {...(p as any)} />,
};

export default definition;
