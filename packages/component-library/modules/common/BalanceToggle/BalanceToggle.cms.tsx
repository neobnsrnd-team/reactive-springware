/**
 * @file BalanceToggle.cms.tsx
 * @description BalanceToggle 컴포넌트의 CMS BlockDefinition.
 * 잔액 보기/숨기기 토글 버튼. 눈 아이콘과 함께 표시되며
 * hidden 상태에 따라 '잔액 보기' 또는 '잔액 숨기기' 텍스트로 전환된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { BalanceToggle } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "BalanceToggle",
    category: "modules",
    domain: "common",
    defaultProps: {
      hidden: false,
    },
    propSchema: {
      hidden: {
        type: "boolean",
        label: "잔액 숨김 여부 (true: 숨기기 상태)",
        // true면 '잔액 보기' 버튼, false면 '잔액 숨기기' 버튼을 표시
        default: false,
      },
      onToggle: {
        type: "event",
        label: "토글 버튼 클릭",
      },
    },
  },
  component: (p) => <BalanceToggle {...(p as any)} />,
};

export default definition;
