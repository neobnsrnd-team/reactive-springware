/**
 * @file Select.cms.tsx
 * @description Select 컴포넌트의 CMS BlockDefinition.
 * CMS 팔레트 'core' 카테고리에 Select를 등록한다.
 *
 * @example
 * // your-app/src/cms/index.ts 에서 import 후 blocks 배열에 추가
 * import SelectDefinition from "@reactivespringware/component-library/core/Select/Select.cms";
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { Select } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "Select",
    category: "core",
    defaultProps: {
      options: [
        { value: "option1", label: "옵션 1" },
        { value: "option2", label: "옵션 2" },
      ],
      value: "option1",
      "aria-label": "선택",
    },
    propSchema: {
      "aria-label": {
        type: "string",
        label: "접근성 레이블 (aria-label)",
        default: "선택",
      },
      value: {
        type: "string",
        label: "현재 선택 값",
        // options 배열의 value 중 하나와 일치해야 선택 항목이 표시됨
        default: "option1",
      },
      options: {
        type: "array",
        label: "선택지 목록",
        default: [
          { value: "option1", label: "옵션 1" },
          { value: "option2", label: "옵션 2" },
        ],
        itemFields: {
          value: {
            type: "string",
            label: "값 (value)",
            default: "",
          },
          label: {
            type: "string",
            label: "표시 텍스트 (label)",
            default: "",
          },
        },
      },
      onChange: {
        // event: 선택 변경 시 CMS 인터랙션 탭에서 액션 바인딩 가능
        type: "event",
        label: "선택 변경",
      },
    },
  },
  component: (p) => <Select {...(p as any)} />,
};

export default definition;
