/**
 * @file InfoRow.cms.tsx
 * @description InfoRow 컴포넌트의 CMS BlockDefinition.
 * 이체 확인·계좌 상세 등에서 레이블(좌)과 값(우)을 한 행으로 표시하는 컴포넌트.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { InfoRow } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "InfoRow",
    category: "modules",
    domain: "common",
    defaultProps: {
      label: "출금계좌",
      value: "하나 123-456-789012",
      valueClassName: "",
      showBorder: true,
    },
    propSchema: {
      label: {
        type: "string",
        label: "행 좌측 레이블",
        default: "출금계좌",
      },
      value: {
        type: "string",
        label: "행 우측 값",
        default: "-",
      },
      valueClassName: {
        type: "string",
        label: "값 텍스트 추가 className",
        // 예: 'text-brand-text' — 수수료 0원 강조
        default: "",
      },
      showBorder: {
        type: "boolean",
        label: "하단 구분선 표시",
        // 목록 마지막 행에는 false 설정
        default: true,
      },
    },
  },
  component: (p) => <InfoRow {...(p as any)} />,
};

export default definition;
