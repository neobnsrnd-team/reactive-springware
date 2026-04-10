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
import AccountSelectCardDefinition      from "../biz/card/AccountSelectCard/AccountSelectCard.cms";
import BillingPeriodLabelDefinition     from "../biz/card/BillingPeriodLabel/BillingPeriodLabel.cms";
import CardBenefitSummaryDefinition     from "../biz/card/CardBenefitSummary/CardBenefitSummary.cms";
import CardChipItemDefinition           from "../biz/card/CardChipItem/CardChipItem.cms";
import CardLinkedBalanceDefinition      from "../biz/card/CardLinkedBalance/CardLinkedBalance.cms";
import CardManagementPanelDefinition    from "../biz/card/CardManagementPanel/CardManagementPanel.cms";
import CardPaymentActionsDefinition     from "../biz/card/CardPaymentActions/CardPaymentActions.cms";
import CardPaymentItemDefinition        from "../biz/card/CardPaymentItem/CardPaymentItem.cms";
import CardPaymentSummaryDefinition     from "../biz/card/CardPaymentSummary/CardPaymentSummary.cms";
import CardPerformanceBarDefinition     from "../biz/card/CardPerformanceBar/CardPerformanceBar.cms";
import CardPillTabDefinition            from "../biz/card/CardPillTab/CardPillTab.cms";
import CardSummaryCardDefinition        from "../biz/card/CardSummaryCard/CardSummaryCard.cms";
import CardVisualDefinition             from "../biz/card/CardVisual/CardVisual.cms";
import LoanMenuBarDefinition            from "../biz/card/LoanMenuBar/LoanMenuBar.cms";
import PaymentAccountCardDefinition     from "../biz/card/PaymentAccountCard/PaymentAccountCard.cms";
import QuickShortcutCardDefinition      from "../biz/card/QuickShortcutCard/QuickShortcutCard.cms";
import StatementHeroCardDefinition      from "../biz/card/StatementHeroCard/StatementHeroCard.cms";
import StatementTotalCardDefinition     from "../biz/card/StatementTotalCard/StatementTotalCard.cms";
import SummaryCardDefinition            from "../biz/card/SummaryCard/SummaryCard.cms";
import UsageTransactionItemDefinition   from "../biz/card/UsageTransactionItem/UsageTransactionItem.cms";
// biz - insurance
import InsuranceSummaryCardDefinition from "../biz/insurance/InsuranceSummaryCard/InsuranceSummaryCard.cms";

export {
  AccountSelectCardDefinition,
  AccountSelectorCardDefinition,
  AccountSummaryCardDefinition,
  BannerCarouselDefinition,
  BillingPeriodLabelDefinition,
  BrandBannerDefinition,
  CardBenefitSummaryDefinition,
  CardChipItemDefinition,
  CardLinkedBalanceDefinition,
  CardManagementPanelDefinition,
  CardPaymentActionsDefinition,
  CardPaymentItemDefinition,
  CardPaymentSummaryDefinition,
  CardPerformanceBarDefinition,
  CardPillTabDefinition,
  CardSummaryCardDefinition,
  CardVisualDefinition,
  InsuranceSummaryCardDefinition,
  LoanMenuBarDefinition,
  PaymentAccountCardDefinition,
  QuickMenuGridDefinition,
  QuickShortcutCardDefinition,
  StatementHeroCardDefinition,
  StatementTotalCardDefinition,
  SummaryCardDefinition,
  UsageTransactionItemDefinition,
  UserProfileDefinition,
};

/** biz 카테고리 블록 목록 — CMSApp의 blocks prop에 바로 전달 가능 */
export const bizBlocks = [
  AccountSelectCardDefinition,
  AccountSelectorCardDefinition,
  AccountSummaryCardDefinition,
  BannerCarouselDefinition,
  BillingPeriodLabelDefinition,
  BrandBannerDefinition,
  CardBenefitSummaryDefinition,
  CardChipItemDefinition,
  CardLinkedBalanceDefinition,
  CardManagementPanelDefinition,
  CardPaymentActionsDefinition,
  CardPaymentItemDefinition,
  CardPaymentSummaryDefinition,
  CardPerformanceBarDefinition,
  CardPillTabDefinition,
  CardSummaryCardDefinition,
  CardVisualDefinition,
  InsuranceSummaryCardDefinition,
  LoanMenuBarDefinition,
  PaymentAccountCardDefinition,
  QuickMenuGridDefinition,
  QuickShortcutCardDefinition,
  StatementHeroCardDefinition,
  StatementTotalCardDefinition,
  SummaryCardDefinition,
  UsageTransactionItemDefinition,
  UserProfileDefinition,
];
