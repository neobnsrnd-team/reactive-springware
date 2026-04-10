/**
 * @file UserManagementPage.cms.tsx
 * @description UserManagementPage 컴포넌트의 CMS BlockDefinition.
 * 기업뱅킹 사용자 관리 페이지. 인터넷뱅킹 이용자 목록 조회·추가·수정·삭제 기능을 제공한다.
 * 각 이용자는 ID·이름·비밀번호 오류 횟수·계정 상태(정상/해지)를 갖는다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { UserManagementPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "UserManagementPage",
    category: "pages",
    domain: "card",
    defaultProps: {
      users: [
        {
          id: "user-1",
          userId: "hong123",
          userName: "홍길동",
          pwErrorCount: 0,
          status: "normal",
        },
      ],
    },
    propSchema: {
      users: {
        type: "array",
        label: "사용자 목록 (id·userId·userName·pwErrorCount·status)",
        // status: 'normal' | 'terminated'
      },
      onBack: {
        type: "event",
        label: "뒤로가기 클릭",
      },
      onMenuClick: {
        type: "event",
        label: "헤더 우측 메뉴 클릭",
      },
      onAddUser: {
        type: "event",
        label: "사용자 추가 저장 클릭 (AddUserForm 전달)",
      },
      onEditUser: {
        type: "event",
        label: "사용자 수정 저장 클릭 (EditUserForm 전달)",
      },
      onDeleteUser: {
        type: "event",
        label: "사용자 삭제 확인 클릭 (userId 전달)",
      },
    },
  },
  component: (p) => <UserManagementPage {...(p as any)} />,
};

export default definition;
