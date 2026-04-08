/**
 * @file LoginPage.cms.tsx
 * @description LoginPage 컴포넌트의 CMS BlockDefinition.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { LoginPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "LoginPage",
    category: "pages",
    domain: "common",
    defaultProps: {
      hasError: false,
    },
    propSchema: {
      hasError: {
        type: "boolean",
        label: "비밀번호 에러 상태 (빨간 테두리 + 안내 문구)",
        default: false,
      },
    },
  },
  component: (p) => <LoginPage {...(p as any)} />,
};

export default definition;
