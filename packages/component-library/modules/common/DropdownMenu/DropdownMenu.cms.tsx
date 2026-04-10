/**
 * @file DropdownMenu.cms.tsx
 * @description DropdownMenu 컴포넌트의 CMS BlockDefinition.
 * 트리거 요소를 클릭하면 펼쳐지는 드롭다운 메뉴 패널.
 * 'danger' variant 항목은 로그아웃·삭제 등 위험 액션에 사용한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { DropdownMenu } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "DropdownMenu",
    category: "modules",
    domain: "common",
    defaultProps: {
      align: "right",
      items: [
        { label: "마이페이지", variant: "default" },
        { label: "로그아웃",   variant: "danger" },
      ],
    },
    propSchema: {
      align: {
        type: "select",
        label: "패널 정렬 방향",
        // right: 트리거 우측 끝 기준(기본), left: 트리거 좌측 기준
        default: "right",
        options: ["left", "right"],
      },
      items: {
        type: "array",
        label: "메뉴 항목 목록 (label·variant)",
        // 각 항목: { label, variant: 'default' | 'danger', onClick }
      },
    },
  },
  component: (p) => <DropdownMenu {...(p as any)} />,
};

export default definition;
