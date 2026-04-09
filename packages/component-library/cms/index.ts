/**
 * @file index.ts
 * @description component-library 전체 CMS 블록 정의 통합 export.
 * 카테고리별(core / biz / modules / pages)로 분리된 블록을 하나의 진입점에서 제공한다.
 *
 * @example
 * // 전체 블록 사용
 * import { allBlocks } from "@reactivespringware/component-library/cms";
 * <CMSApp blocks={allBlocks} />
 *
 * @example
 * // 전체 설정 사용
 * import { allBlocks, overlays, layoutRenderer } from "@reactivespringware/component-library/cms";
 * <CMSApp blocks={allBlocks} overlays={overlays} layoutRenderer={layoutRenderer} />
 */
export { coreBlocks }     from "./core";
export { bizBlocks }      from "./biz";
export { moduleBlocks }   from "./modules";
// export { pageBlocks }     from "./pages";
export { LAYOUT_TEMPLATES, HomePageLayout, PageLayout } from "./layouts";
export { overlays }       from "./overlays";

import { coreBlocks }   from "./core";
import { bizBlocks }    from "./biz";
import { moduleBlocks } from "./modules";
// import { pageBlocks }   from "./pages";

/** 전체 카테고리 블록 통합 목록 */
export const allBlocks = [
  ...coreBlocks,
  ...bizBlocks,
  ...moduleBlocks,
  // ...pageBlocks,
];
