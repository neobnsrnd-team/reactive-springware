/**
 * @file ActionLinkItem.cms.tsx
 * @description ActionLinkItem 컴포넌트의 CMS BlockDefinition.
 * 아이콘 원형 배경 + 텍스트 레이블 + 오른쪽 화살표로 구성된 탭 가능 링크 행.
 * 이체 완료 화면의 "카카오톡 공유", "자주 쓰는 계좌 등록" 같은 보조 액션 패턴.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { ActionLinkItem } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "ActionLinkItem",
    category: "modules",
    domain: "common",
    defaultProps: {
      label: "자주 쓰는 계좌 등록",
      size: "md",
      showBorder: true,
      iconBgClassName: "",
      icon: "Star",
    },
    propSchema: {
      label: {
        type: "string",
        label: "링크 레이블",
        default: "자주 쓰는 계좌 등록",
      },
      size: {
        type: "select",
        label: "크기",
        // md: py-standard(16px) 카드형 / sm: py-sm(8px) 목록 행형
        default: "md",
        options: ["sm", "md"],
      },
      showBorder: {
        type: "boolean",
        label: "카드 테두리 표시",
        // false: border·shadow 제거 → 목록 내 행(row) 형태
        default: true,
      },
      iconBgClassName: {
        type: "string",
        label: "아이콘 배경 className (기본: bg-brand-10)",
        // 예: 'bg-[#fee500]' — 카카오톡 노란색 배경
        default: "",
      },
      icon: {
        type: "icon-picker",
        label: "아이콘 (Lucide)",
        default: "Star",
      },
      onClick: {
        type: "event",
        label: "항목 클릭",
      },
    },
  },
  component: (p) => <ActionLinkItem {...(p as any)} />,
};

export default definition;
