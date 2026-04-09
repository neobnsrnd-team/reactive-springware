/**
 * @file MyCardManagementPage.cms.tsx
 * @description MyCardManagementPage 컴포넌트의 CMS BlockDefinition.
 * 보유카드 관리 페이지. 상단 카드 슬라이더로 카드를 전환하고
 * 선택한 카드의 관리 항목(이용정지·분실신고 등)을 하단 패널에 표시한다.
 * cards와 managementRows 배열은 실제 앱에서 API 응답을 주입한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { MyCardManagementPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "MyCardManagementPage",
    category: "pages",
    domain: "card",
    defaultProps: {
      // CMS 미리보기용 샘플 카드 데이터 (image는 ReactNode라 실제 앱에서 주입)
      cards: [
        { id: "card-1", name: "하나 머니 체크카드", brand: "VISA",       image: null, balance: 1250000 },
        { id: "card-2", name: "하나 1Q 신용카드",   brand: "Mastercard", image: null, balance: 0       },
      ],
      initialCardId: "card-1",
      managementRows: [
        { label: "카드 이용정지", subText: "" },
        { label: "분실/도난 신고", subText: "" },
        { label: "해외 결제 설정", subText: "허용" },
        { label: "카드 한도 조회", subText: "" },
      ],
    },
    propSchema: {
      // cards와 managementRows는 복잡한 배열 구조 + ReactNode 포함으로
      // CMS 에디터 대신 defaultProps로 미리보기 제공
      onBack: {
        type: "event",
        label: "뒤로가기 클릭",
      },
      onClose: {
        type: "event",
        label: "닫기(X) 버튼 클릭",
      },
    },
  },
  component: (p) => <MyCardManagementPage {...(p as any)} />,
};

export default definition;
