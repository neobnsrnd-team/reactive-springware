/**
 * @file UserProfile.cms.tsx
 * @description UserProfile 컴포넌트의 CMS BlockDefinition.
 * 인증된 사용자의 아바타·이름·최근 접속 시각·설정 버튼을 표시하는 금융 도메인 전용 컴포넌트.
 * 전체 메뉴 화면 상단 프로필 영역에 사용한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { UserProfile } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "UserProfile",
    category: "biz",
    domain: "common",
    defaultProps: {
      name: "김하나님",
      lastLogin: "2026.04.08 09:30:15",
    },
    propSchema: {
      name: {
        type: "string",
        label: "사용자 이름",
        default: "김하나님",
      },
      lastLogin: {
        type: "string",
        label: "최근 접속 일시 (예: 2026.04.08 09:30:15)",
        // 미입력 시 최근 접속 행 미노출
        default: "",
      },
      onSettingsClick: {
        // 미전달 시 설정 버튼 미노출
        type: "event",
        label: "설정 버튼 클릭",
      },
    },
  },
  component: (p) => <UserProfile {...(p as any)} />,
};

export default definition;
