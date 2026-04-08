/**
 * @file EmptyState.cms.tsx
 * @description EmptyState 컴포넌트의 CMS BlockDefinition.
 * 데이터 없음 상태를 표시하는 브랜드 중립 컴포넌트.
 * illustration / action 슬롯은 ReactNode로 실제 앱에서 주입한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { EmptyState } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "EmptyState",
    category: "modules",
    domain: "common",
    defaultProps: {
      title: "데이터가 없어요",
      description: "",
    },
    propSchema: {
      title: {
        type: "string",
        label: "제목",
        default: "데이터가 없어요",
      },
      description: {
        type: "string",
        label: "설명",
        default: "",
      },
    },
  },
  component: (p) => <EmptyState {...(p as any)} />,
};

export default definition;
