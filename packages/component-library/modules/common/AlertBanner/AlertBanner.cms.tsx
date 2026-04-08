/**
 * @file AlertBanner.cms.tsx
 * @description AlertBanner 컴포넌트의 CMS BlockDefinition.
 * 아이콘 + 텍스트 메시지를 intent별 배경 색상으로 강조하는 인라인 배너.
 * 이체 확인 화면의 "착오송금 방지" 주의 문구처럼 화면 중간에 경고·안내를 삽입할 때 사용.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { AlertBanner } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "AlertBanner",
    category: "modules",
    domain: "common",
    defaultProps: {
      intent: "warning",
      children: "입금 전 계좌번호와 예금주를 반드시 확인하세요.",
    },
    propSchema: {
      children: {
        type: "string",
        label: "배너 텍스트",
        default: "입금 전 계좌번호와 예금주를 반드시 확인하세요.",
      },
      intent: {
        type: "select",
        label: "의도 (색상 조합)",
        // warning: amber / danger: red / success: green / info: blue
        default: "warning",
        options: ["warning", "danger", "success", "info"],
      },
      icon: {
        type: "icon-picker",
        label: "아이콘 override (미선택 시 intent별 기본 아이콘)",
        default: "",
      },
    },
  },
  component: (p) => <AlertBanner {...(p as any)} />,
};

export default definition;
