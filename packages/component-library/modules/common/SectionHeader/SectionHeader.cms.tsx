/**
 * @file SectionHeader.cms.tsx
 * @description SectionHeader 컴포넌트의 CMS BlockDefinition.
 * 섹션 제목(좌) + 선택적 액션 링크/버튼(우) 패턴.
 * "[타이틀] [전체보기 →]" 레이아웃을 표준화한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { SectionHeader } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "SectionHeader",
    category: "modules",
    domain: "common",
    defaultProps: {
      title: "섹션 제목",
      badge: 0,
      actionLabel: "",
    },
    propSchema: {
      title: {
        type: "string",
        label: "섹션 제목",
        default: "섹션 제목",
      },
      badge: {
        type: "number",
        label: "항목 수 배지 (0: 미노출)",
        default: 0,
      },
      actionLabel: {
        type: "string",
        label: "우측 액션 레이블 (예: 전체보기, 미입력 시 미노출)",
        default: "",
      },
      onAction: {
        // actionLabel과 함께 전달해야 동작
        type: "event",
        label: "액션 클릭",
      },
    },
  },
  component: (p) => <SectionHeader {...(p as any)} />,
};

export default definition;
