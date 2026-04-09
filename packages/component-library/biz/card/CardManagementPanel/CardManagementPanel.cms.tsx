/**
 * @file CardManagementPanel.cms.tsx
 * @description CardManagementPanel 컴포넌트의 CMS BlockDefinition.
 * 카드 관리 항목 목록. 카드 설정·이용정지·분실신고 등 내비게이션 행의 모음.
 * rows 배열은 실제 앱에서 메뉴 구성에 따라 주입한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { CardManagementPanel } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "CardManagementPanel",
    category: "biz",
    domain: "card",
    defaultProps: {
      // CMS 미리보기용 샘플 데이터
      rows: [
        { label: "카드 이용정지", subText: "" },
        { label: "분실/도난 신고", subText: "" },
        { label: "해외 결제 설정", subText: "허용" },
        { label: "카드 한도 조회", subText: "" },
      ],
    },
    propSchema: {
      // rows는 복잡한 배열 구조라 CMS 에디터 대신 defaultProps로 미리보기 제공
    },
  },
  component: (p) => <CardManagementPanel {...(p as any)} />,
};

export default definition;
