/**
 * @file LoanMenuBar.cms.tsx
 * @description LoanMenuBar 컴포넌트의 CMS BlockDefinition.
 * 대출 관련 메뉴 바. 단기카드대출·장기카드대출·리볼빙 등
 * 아이콘+레이블 형태의 수평 메뉴 항목 목록을 표시한다.
 * items 배열은 실제 앱에서 메뉴 구성에 따라 주입한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { LoanMenuBar } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "LoanMenuBar",
    category: "biz",
    domain: "card",
    defaultProps: {
      // CMS 미리보기용 샘플 데이터 (icon은 ReactNode라 실제 앱에서 주입)
      items: [
        { id: "short-loan", icon: null, label: "단기카드대출" },
        { id: "long-loan",  icon: null, label: "장기카드대출" },
        { id: "revolving",  icon: null, label: "리볼빙" },
      ],
    },
    propSchema: {
      // items는 ReactNode 타입의 icon 포함 복잡한 배열 구조라 CMS 에디터 대신 defaultProps로 미리보기 제공
    },
  },
  component: (p) => <LoanMenuBar {...(p as any)} />,
};

export default definition;
