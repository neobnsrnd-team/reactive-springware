/**
 * @file TransferSuccessPage.cms.tsx
 * @description TransferSuccessPage 컴포넌트의 CMS BlockDefinition.
 * 이체 완료 결과 화면. SuccessHero + 이체 상세 정보 + 후속 액션 링크로 구성된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { TransferSuccessPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "TransferSuccessPage",
    category: "pages",
    domain: "banking",
    defaultProps: {
      recipientName: "홍길동",
      amount: 100000,
      targetAccount: "국민 987-654-321012",
      myMemo: "",
      recipientMemo: "",
      balanceAfterTransfer: 2900000,
      showKakaoShare: true,
    },
    propSchema: {
      recipientName: {
        type: "string",
        label: "받는 사람 이름",
        default: "홍길동",
      },
      amount: {
        type: "number",
        label: "이체 금액 (원화 숫자)",
        // 내부에서 포맷 처리
        default: 0,
      },
      targetAccount: {
        type: "string",
        label: "받는 계좌 표시 문자열",
        default: "국민 987-654-321012",
      },
      myMemo: {
        type: "string",
        label: "내 통장 표시 메모",
        default: "",
      },
      recipientMemo: {
        type: "string",
        label: "받는 분 통장 표시 메모",
        default: "",
      },
      balanceAfterTransfer: {
        type: "number",
        label: "이체 후 잔액 (원화 숫자)",
        default: 0,
      },
      showKakaoShare: {
        type: "boolean",
        label: "카카오톡 공유 액션 표시",
        default: true,
      },
    },
  },
  component: (p) => <TransferSuccessPage {...(p as any)} />,
};

export default definition;
