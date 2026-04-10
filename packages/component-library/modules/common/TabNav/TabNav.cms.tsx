/**
 * @file TabNav.cms.tsx
 * @description TabNav 컴포넌트의 CMS BlockDefinition.
 * 홈 화면의 해당금융·다른금융·자산관리 같은 수평 탭 네비게이션.
 * 세로 방향 탭은 SidebarNav를 사용한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { TabNav } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "TabNav",
    category: "modules",
    domain: "common",
    defaultProps: {
      activeId: "tab-1",
      variant: "underline",
      fullWidth: false,
      items: [
        { id: "tab-1", label: "탭 1" },
        { id: "tab-2", label: "탭 2" },
        { id: "tab-3", label: "탭 3" },
      ],
    },
    propSchema: {
      activeId: {
        type: "string",
        label: "현재 활성 탭 ID",
        default: "",
      },
      variant: {
        type: "select",
        label: "탭 스타일",
        // underline: 하단 인디케이터 라인 (기본) / pill: 둥근 배경 채움
        default: "underline",
        options: ["underline", "pill"],
      },
      fullWidth: {
        type: "boolean",
        label: "전체 너비 균등 분할",
        // true: 각 탭이 flex-1 균등 / false: 콘텐츠 너비만큼
        default: false,
      },
      items: {
        type: "array",
        label: "탭 목록",
        default: [{ id: "tab-1", label: "탭 1" }],
        itemFields: {
          id: {
            type: "string",
            label: "탭 ID",
            default: "",
          },
          label: {
            type: "string",
            label: "탭 레이블",
            default: "탭",
          },
        },
      },
      onTabChange: {
        type: "event",
        label: "탭 변경 (클릭된 탭 id 전달)",
      },
    },
  },
  component: (p) => <TabNav {...(p as any)} />,
};

export default definition;
