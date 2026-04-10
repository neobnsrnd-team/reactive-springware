/**
 * @file TransferForm.cms.tsx
 * @description TransferForm 컴포넌트의 CMS BlockDefinition.
 * 단일 페이지 이체 폼 (받는 계좌번호 + 금액 + 메모).
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { TransferForm } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "TransferForm",
    category: "modules",
    domain: "banking",
    defaultProps: {
      availableBalance: 3000000,
      submitting: false,
    },
    propSchema: {
      availableBalance: {
        type: "number",
        label: "이체 가능 최대 금액 (원화 숫자)",
        // 내 계좌 잔액. AmountInput의 maxAmount로 전달됨
        default: 0,
      },
      submitting: {
        type: "boolean",
        label: "폼 제출 처리 중 (버튼 로딩 상태)",
        default: false,
      },
      onSubmit: {
        type: "event",
        label: "폼 제출 (최종 확인 전 호출)",
      },
    },
  },
  component: (p) => <TransferForm {...(p as any)} />,
};

export default definition;
