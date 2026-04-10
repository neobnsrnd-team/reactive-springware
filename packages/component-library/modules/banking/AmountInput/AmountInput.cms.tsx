/**
 * @file AmountInput.cms.tsx
 * @description AmountInput 컴포넌트의 CMS BlockDefinition.
 * 이체 폼 등에서 원화 금액을 입력받는 전용 필드.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { AmountInput } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "AmountInput",
    category: "modules",
    domain: "banking",
    defaultProps: {
      value: null,
      label: "금액",
      helperText: "",
      hasError: false,
      maxAmount: 0,
      transferLimitText: "",
      disabled: false,
      placeholder: "금액을 입력하세요",
    },
    propSchema: {
      label: {
        type: "string",
        label: "레이블",
        default: "금액",
      },
      placeholder: {
        type: "string",
        label: "플레이스홀더",
        default: "금액을 입력하세요",
      },
      helperText: {
        type: "string",
        label: "도움말 / 오류 메시지",
        default: "",
      },
      hasError: {
        type: "boolean",
        label: "에러 상태",
        default: false,
      },
      maxAmount: {
        type: "number",
        label: "최대 입력 가능 금액 (원, 0: 제한 없음)",
        default: 0,
      },
      transferLimitText: {
        type: "string",
        label: "이체 한도 안내 텍스트",
        // 예: '1회 5,000,000원 / 1일 10,000,000원'
        default: "",
      },
      disabled: {
        type: "boolean",
        label: "비활성화",
        default: false,
      },
      onChange: {
        type: "event",
        label: "금액 변경",
      },
    },
  },
  component: (p) => <AmountInput {...(p as any)} />,
};

export default definition;
