/**
 * @file ErrorState.cms.tsx
 * @description ErrorState 컴포넌트의 CMS BlockDefinition.
 * API 호출 실패 등 에러 상태를 표시하는 컴포넌트.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { ErrorState } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "ErrorState",
    category: "modules",
    domain: "common",
    defaultProps: {
      title: "오류가 발생했어요",
      description: "잠시 후 다시 시도해주세요.",
      retryLabel: "다시 시도",
    },
    propSchema: {
      title: {
        type: "string",
        label: "에러 제목",
        default: "오류가 발생했어요",
      },
      description: {
        type: "string",
        label: "상세 설명",
        default: "잠시 후 다시 시도해주세요.",
      },
      retryLabel: {
        type: "string",
        label: "재시도 버튼 레이블",
        default: "다시 시도",
      },
      onRetry: {
        // 전달 시 재시도 버튼 노출
        type: "event",
        label: "재시도 버튼 클릭",
      },
    },
  },
  component: (p) => <ErrorState {...(p as any)} />,
};

export default definition;
