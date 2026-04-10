/**
 * @file BankSelectGrid.cms.tsx
 * @description BankSelectGrid 컴포넌트의 CMS BlockDefinition.
 * 이체 시 은행을 그리드 형태로 선택하는 UI. 한 행에 3 또는 4열로 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { BankSelectGrid } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "BankSelectGrid",
    category: "modules",
    domain: "common",
    defaultProps: {
      banks: [
        { code: "hana",   name: "하나은행" },
        { code: "kb",     name: "KB국민은행" },
        { code: "shinhan", name: "신한은행" },
        { code: "nh",     name: "NH농협은행" },
      ],
      selectedCode: "",
      columns: 4,
    },
    propSchema: {
      banks: {
        type: "array",
        label: "은행 목록 (code·name)",
        // 각 항목: { code: string, name: string } — icon은 런타임에 주입
      },
      selectedCode: {
        type: "string",
        label: "선택된 은행 코드 (예: hana)",
        default: "",
      },
      columns: {
        type: "select",
        label: "열 수",
        // 3열: 좁은 영역, 4열: 기본 그리드
        default: 4,
        options: [3, 4],
      },
      onSelect: {
        type: "event",
        label: "은행 선택 (code 전달)",
      },
    },
  },
  component: (p) => <BankSelectGrid {...(p as any)} />,
};

export default definition;
