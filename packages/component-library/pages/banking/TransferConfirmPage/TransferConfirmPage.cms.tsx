/**
 * @file TransferConfirmPage.cms.tsx
 * @description TransferConfirmPage 컴포넌트의 CMS BlockDefinition.
 * 이체 실행 직전 이체 정보를 요약·확인시키는 BottomSheet 화면.
 * PIN 입력(AccountPasswordPage) 이전 단계에 위치한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { TransferConfirmPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "TransferConfirmPage",
    category: "pages",
    domain: "banking",
    defaultProps: {
      open: true,
      recipientName: "홍길동",
      amount: 100000,
      fromAccount: "하나 123-456-789012",
      toAccount: "국민 987-654-3210 (홍길동)",
      fee: 0,
      myMemo: "",
      recipientMemo: "",
    },
    propSchema: {
      open: {
        type: "boolean",
        label: "BottomSheet 열림 여부",
        default: true,
      },
      recipientName: {
        type: "string",
        label: "수취인 이름 (타이틀 강조 표시)",
        default: "홍길동",
      },
      amount: {
        type: "number",
        label: "이체 금액 (원 단위 숫자)",
        // 내부에서 toLocaleString('ko-KR')으로 포맷
        default: 0,
      },
      fromAccount: {
        type: "string",
        label: "출금 계좌 문자열",
        default: "하나 123-456-789012",
      },
      toAccount: {
        type: "string",
        label: "입금 계좌 문자열",
        default: "국민 987-654-3210",
      },
      fee: {
        type: "number",
        label: "수수료 (원, 0: 브랜드 색상으로 '무료' 강조)",
        default: 0,
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
      onClose: {
        type: "event",
        label: "닫기 / 아니오 클릭",
      },
      onConfirm: {
        type: "event",
        label: "예 클릭 (다음 단계 진행)",
      },
      onAddTransfer: {
        type: "event",
        label: "추가이체 클릭 (미전달 시 미노출)",
      },
    },
  },
  component: (p) => <TransferConfirmPage {...(p as any)} />,
};

export default definition;
