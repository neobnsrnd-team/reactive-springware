/**
 * @file Card.cms.tsx
 * @description Card 컴포넌트의 CMS BlockDefinition.
 * 콘텐츠를 감싸는 기본 카드 컨테이너.
 * children은 CMS 캔버스에서 내부 블록으로 구성한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { Card } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "Card",
    category: "modules",
    domain: "common",
    defaultProps: {
      interactive: false,
      noPadding: false,
    },
    propSchema: {
      interactive: {
        type: "boolean",
        label: "인터랙션 스타일 (hover/active)",
        default: false,
      },
      noPadding: {
        type: "boolean",
        label: "내부 패딩 제거",
        // CardHighlight 등 카드 전체 너비 섹션 구성 시 사용
        default: false,
      },
      onClick: {
        // 전달 시 <button> 태그로 렌더링
        type: "event",
        label: "카드 클릭",
      },
    },
  },
  component: (p) => <Card {...(p as any)} />,
};

export default definition;
