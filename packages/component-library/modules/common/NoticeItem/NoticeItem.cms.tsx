/**
 * @file NoticeItem.cms.tsx
 * @description NoticeItem 컴포넌트의 CMS BlockDefinition.
 * 아이콘 배경 원 + 제목 + 부제목 + 오른쪽 화살표로 구성된 공지/혜택 목록 항목.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { NoticeItem } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "NoticeItem",
    category: "modules",
    domain: "common",
    defaultProps: {
      icon: "Bell",
      title: "공지 제목",
      description: "",
      showDivider: true,
      iconBgClassName: "",
    },
    propSchema: {
      icon: {
        type: "icon-picker",
        label: "아이콘 (Lucide)",
        default: "Bell",
      },
      iconBgClassName: {
        type: "string",
        label: "아이콘 배경 className (기본: bg-brand-5)",
        // 예: 'bg-[#ecfdf5] text-success-text' — 초록색 배경
        default: "",
      },
      title: {
        type: "string",
        label: "공지 제목",
        default: "공지 제목",
      },
      description: {
        type: "string",
        label: "공지 부제목 (미입력 시 미노출)",
        default: "",
      },
      showDivider: {
        type: "boolean",
        label: "하단 구분선 표시",
        // 목록 마지막 항목에는 false 설정
        default: true,
      },
      onClick: {
        type: "event",
        label: "항목 클릭",
      },
    },
  },
  component: (p) => <NoticeItem {...(p as any)} />,
};

export default definition;
