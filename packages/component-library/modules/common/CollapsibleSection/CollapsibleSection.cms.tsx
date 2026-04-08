/**
 * @file CollapsibleSection.cms.tsx
 * @description CollapsibleSection 컴포넌트의 CMS BlockDefinition.
 * 헤더 클릭으로 내용을 펼치거나 접는 아코디언 패턴.
 * header / children 슬롯은 CMS 캔버스에서 내부 블록으로 구성한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CollapsibleSection } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CollapsibleSection",
    category: "modules",
    domain: "common",
    defaultProps: {
      defaultExpanded: true,
      headerAlign: "center",
    },
    propSchema: {
      defaultExpanded: {
        type: "boolean",
        label: "초기 펼침 여부",
        // 기본: true — 펼쳐진 상태로 렌더링
        default: true,
      },
      headerAlign: {
        type: "select",
        label: "헤더 텍스트 정렬",
        // left: 텍스트 왼쪽 정렬 / center: 가운데 정렬 (화살표는 항상 우측 고정)
        default: "center",
        options: ["left", "center"],
      },
    },
  },
  component: (p) => <CollapsibleSection {...(p as any)} />,
};

export default definition;
