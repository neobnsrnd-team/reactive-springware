/**
 * @file QuickMenuGrid.cms.tsx
 * @description QuickMenuGrid 컴포넌트의 CMS BlockDefinition.
 * 홈 화면 퀵메뉴 2×N 그리드 전용.
 * icon(ReactNode)과 onClick(함수)는 CMS 스키마에서 직접 편집 불가이므로
 * 실제 앱 연동 시 컴포넌트 래퍼를 통해 주입해야 한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { QuickMenuGrid } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "QuickMenuGrid",
    category: "biz",
    domain: "common",
    defaultProps: {
      cols: 4,
      // icon과 onClick은 실제 앱에서 주입. CMS 미리보기용 최소 구성
      items: [
        { id: "menu-1", label: "이체",   badge: 0 },
        { id: "menu-2", label: "조회",   badge: 0 },
        { id: "menu-3", label: "내계좌", badge: 0 },
        { id: "menu-4", label: "전체메뉴", badge: 2 },
      ],
    },
    propSchema: {
      cols: {
        type: "select",
        label: "열 수",
        // 아이템 수에 따라 4열(기본) 또는 3열 권장
        default: "4",
        options: ["2", "3", "4"],
      },
      items: {
        type: "array",
        label: "퀵메뉴 항목",
        default: [{ id: "menu-1", label: "이체", badge: 0 }],
        itemFields: {
          id: {
            type: "string",
            label: "항목 ID",
            default: "",
          },
          label: {
            type: "string",
            label: "메뉴 레이블",
            default: "메뉴",
          },
          badge: {
            type: "number",
            label: "알림 배지 숫자 (0: 미노출)",
            default: 0,
          },
        },
      },
    },
  },
  component: (p) => <QuickMenuGrid {...(p as any)} />,
};

export default definition;
