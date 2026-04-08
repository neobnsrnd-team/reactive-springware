/**
 * @file biz.ts
 * @description component-library biz 카테고리 블록 정의 통합 export.
 * 금융 도메인 전용 컴포넌트(계좌·카드·보험·배너·홈 위젯 등).
 *
 * @example
 * import { bizBlocks } from "@reactivespringware/component-library/cms/biz";
 * <CMSApp blocks={[...bizBlocks]} />
 */
// biz - common
import BannerCarouselDefinition      from "../biz/common/BannerCarousel/BannerCarousel.cms";
import BrandBannerDefinition         from "../biz/common/BrandBanner/BrandBanner.cms";
import QuickMenuGridDefinition       from "../biz/common/QuickMenuGrid/QuickMenuGrid.cms";
import UserProfileDefinition         from "../biz/common/UserProfile/UserProfile.cms";
// biz - banking
import AccountSelectorCardDefinition from "../biz/banking/AccountSelectorCard/AccountSelectorCard.cms";
import AccountSummaryCardDefinition  from "../biz/banking/AccountSummaryCard/AccountSummaryCard.cms";
// biz - card
import CardSummaryCardDefinition     from "../biz/card/CardSummaryCard/CardSummaryCard.cms";
// biz - insurance
import InsuranceSummaryCardDefinition from "../biz/insurance/InsuranceSummaryCard/InsuranceSummaryCard.cms";

export {
  AccountSelectorCardDefinition,
  AccountSummaryCardDefinition,
  BannerCarouselDefinition,
  BrandBannerDefinition,
  CardSummaryCardDefinition,
  InsuranceSummaryCardDefinition,
  QuickMenuGridDefinition,
  UserProfileDefinition,
};

/** biz 카테고리 블록 목록 — CMSApp의 blocks prop에 바로 전달 가능 */
export const bizBlocks = [
  AccountSelectorCardDefinition,
  AccountSummaryCardDefinition,
  BannerCarouselDefinition,
  BrandBannerDefinition,
  CardSummaryCardDefinition,
  InsuranceSummaryCardDefinition,
  QuickMenuGridDefinition,
  UserProfileDefinition,
];
