/**
 * @file OtpInput.cms.tsx
 * @description OtpInput 컴포넌트의 CMS BlockDefinition.
 * 6자리 PIN/OTP 입력 전용 컴포넌트.
 * 각 자릿수가 독립 input으로 구성되며, 자동 포커스 이동을 처리한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { OtpInput } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "OtpInput",
    category: "modules",
    domain: "banking",
    defaultProps: {
      length: 6,
      error: false,
      disabled: false,
      masked: false,
    },
    propSchema: {
      length: {
        type: "select",
        label: "OTP 자릿수",
        // 6: 일반 OTP / 4: PIN 입력 용도
        default: "6",
        options: ["4", "6"],
      },
      error: {
        type: "boolean",
        label: "에러 상태 (빨간 테두리)",
        default: false,
      },
      disabled: {
        type: "boolean",
        label: "비활성화",
        default: false,
      },
      masked: {
        type: "boolean",
        label: "숫자 마스킹 (비밀번호 스타일)",
        default: false,
      },
      onComplete: {
        type: "event",
        label: "입력 완료 (length개 모두 입력 시)",
      },
      onChange: {
        type: "event",
        label: "각 자릿수 변경",
      },
    },
  },
  component: (p) => <OtpInput {...(p as any)} />,
};

export default definition;
