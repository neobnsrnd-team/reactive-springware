/**
 * @file Input.cms.tsx
 * @description Input 컴포넌트의 CMS BlockDefinition.
 * CMS 팔레트 'core' 카테고리에 Input을 등록한다.
 *
 * @example
 * // your-app/src/cms/index.ts 에서 import 후 blocks 배열에 추가
 * import InputDefinition from "@reactivespringware/component-library/core/Input/Input.cms";
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { Input } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "Input",
    category: "core",
    defaultProps: {
      label: "레이블",
      placeholder: "입력하세요",
      helperText: "",
      validationState: "default",
      size: "md",
      fullWidth: false,
      disabled: false,
      phoneFormat: false,
      formatPattern: "",
    },
    propSchema: {
      label: {
        type: "string",
        label: "레이블",
        default: "레이블",
      },
      placeholder: {
        type: "string",
        label: "플레이스홀더",
        default: "입력하세요",
      },
      helperText: {
        type: "string",
        label: "도움말 / 오류 메시지",
        default: "",
      },
      validationState: {
        type: "select",
        label: "유효성 상태",
        // error 선택 시 helperText가 danger 색상으로 표시됨
        default: "default",
        options: ["default", "error", "success"],
      },
      size: {
        type: "select",
        label: "크기",
        default: "md",
        options: ["md", "lg"],
      },
      fullWidth: {
        type: "boolean",
        label: "전체 너비 (w-full)",
        default: false,
      },
      disabled: {
        type: "boolean",
        label: "비활성화",
        default: false,
      },
      phoneFormat: {
        type: "boolean",
        label: "휴대폰번호 자동 포맷",
        // 자릿수에 따라 010-XXX-XXXX / 010-XXXX-XXXX 동적 전환
        default: false,
      },
      formatPattern: {
        type: "string",
        label: "포맷 패턴 (예: ###-######-#####)",
        // '#' 한 자리 숫자, 그 외는 구분자. phoneFormat이 true이면 무시됨
        default: "",
      },
      onChange: {
        // event: 값 변경 시 CMS 인터랙션 탭에서 액션 바인딩 가능
        type: "event",
        label: "값 변경",
      },
    },
  },
  component: (p) => <Input {...(p as any)} />,
};

export default definition;
