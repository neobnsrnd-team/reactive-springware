/**
 * @file core.ts
 * @description component-library core 카테고리 블록 정의 통합 export.
 * your-cms-app에서 blocks 배열에 spread해 사용한다.
 *
 * @example
 * import { coreBlocks } from "@reactivespringware/component-library/cms/core";
 * <CMSApp blocks={[...coreBlocks]} />
 */
import BadgeDefinition    from "../core/Badge/Badge.cms";
import ButtonDefinition   from "../core/Button/Button.cms";
import InputDefinition    from "../core/Input/Input.cms";
import SelectDefinition   from "../core/Select/Select.cms";
import TypographyDefinition from "../core/Text/Text.cms";

export { BadgeDefinition, ButtonDefinition, InputDefinition, SelectDefinition, TypographyDefinition };

/** core 카테고리 블록 목록 — CMSApp의 blocks prop에 바로 전달 가능 */
export const coreBlocks = [
  BadgeDefinition,
  ButtonDefinition,
  InputDefinition,
  SelectDefinition,
  TypographyDefinition,
];
