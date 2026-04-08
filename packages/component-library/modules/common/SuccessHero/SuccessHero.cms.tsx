/**
 * @file SuccessHero.cms.tsx
 * @description SuccessHero 컴포넌트의 CMS BlockDefinition.
 * 이체·결제 완료 등 성공 결과 화면의 시각적 히어로 섹션.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { SuccessHero } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "SuccessHero",
    category: "modules",
    domain: "common",
    defaultProps: {
      recipientName: "홍길동",
      amount: "50,000원",
      subtitle: "성공적으로 이체되었습니다.",
    },
    propSchema: {
      recipientName: {
        type: "string",
        label: "받는 사람 이름",
        // 타이틀에 "{recipientName}님께" 형태로 삽입됨
        default: "홍길동",
      },
      amount: {
        type: "string",
        label: "이체 금액 문자열 (예: 50,000원)",
        // 타이틀에 "{amount} 이체 완료" 형태로 삽입됨
        default: "0원",
      },
      subtitle: {
        type: "string",
        label: "부제목",
        default: "성공적으로 이체되었습니다.",
      },
    },
  },
  component: (p) => <SuccessHero {...(p as any)} />,
};

export default definition;
