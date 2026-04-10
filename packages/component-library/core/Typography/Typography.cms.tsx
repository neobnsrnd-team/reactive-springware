/**
 * @file Typography.cms.tsx
 * @description Typography 컴포넌트의 CMS BlockDefinition.
 * CMS 팔레트 'core' 카테고리에 Typography를 등록한다.
 *
 * @example
 * // your-app/src/cms/index.ts 에서 import 후 blocks 배열에 추가
 * import TypographyDefinition from "@reactivespringware/component-library/core/Typography/Typography.cms";
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { Typography } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "Typography",
    category: "core",
    defaultProps: {
      variant: "body",
      color: "base",
      numeric: false,
      as: "p",
      children: "텍스트를 입력하세요",
    },
    propSchema: {
      children: {
        type: "string",
        label: "텍스트",
        default: "텍스트를 입력하세요",
      },
      variant: {
        type: "select",
        label: "크기 변형",
        // heading/subheading은 기본 weight=bold, 나머지는 normal
        default: "body",
        options: ["heading", "subheading", "body-lg", "body", "body-sm", "caption"],
      },
      weight: {
        type: "select",
        label: "폰트 굵기",
        // 미지정 시 variant별 기본값 적용 (heading→bold, body→normal 등)
        default: "normal",
        options: ["normal", "medium", "bold"],
      },
      color: {
        type: "select",
        label: "텍스트 색상",
        default: "base",
        options: [
          "heading",
          "base",
          "label",
          "secondary",
          "muted",
          "brand",
          "danger",
          "success",
        ],
      },
      as: {
        type: "select",
        label: "HTML 태그",
        // 시맨틱 마크업을 위해 heading에는 h1~h4, 본문에는 p, 인라인에는 span 권장
        default: "p",
        options: ["p", "span", "h1", "h2", "h3", "h4", "div"],
      },
      numeric: {
        type: "boolean",
        label: "숫자 폰트 (Manrope)",
        // 금액·숫자 표시 시 Manrope 폰트로 전환
        default: false,
      },
    },
  },
  component: (p) => <Typography {...(p as any)} />,
};

export default definition;
