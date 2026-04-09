/**
 * @file QuickShortcutCard.cms.tsx
 * @description QuickShortcutCard 컴포넌트의 CMS BlockDefinition.
 * 자주 쓰는 기능으로 이동하는 빠른 바로가기 카드.
 * 메인 타이틀·서브 텍스트·우측 아이콘으로 구성된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { QuickShortcutCard } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "QuickShortcutCard",
    category: "biz",
    domain: "card",
    defaultProps: {
      title: "이번 달 카드 실적",
      subtitle: "전월 대비 +12%",
      // icon은 ReactNode라 CMS에서 직접 편집 불가 — 실제 앱에서 주입
      icon: null,
    },
    propSchema: {
      title: {
        type: "string",
        label: "메인 타이틀",
        default: "이번 달 카드 실적",
      },
      subtitle: {
        type: "string",
        label: "서브 텍스트",
        default: "전월 대비 +12%",
      },
      onClick: {
        type: "event",
        label: "카드 클릭",
      },
    },
  },
  component: (p) => <QuickShortcutCard {...(p as any)} />,
};

export default definition;
