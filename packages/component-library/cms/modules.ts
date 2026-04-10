/**
 * @file modules.ts
 * @description component-library modules 카테고리 블록 정의 통합 export.
 * 범용 UI 모듈(폼 입력, 네비게이션, 피드백, 오버레이, 레이아웃 등).
 *
 * @example
 * import { moduleBlocks } from "@reactivespringware/component-library/cms/modules";
 * <CMSApp blocks={[...moduleBlocks]} />
 */
// modules - banking
import AccountSelectItemDefinition       from "../modules/banking/AccountSelectItem/AccountSelectItem.cms";
import AmountInputDefinition             from "../modules/banking/AmountInput/AmountInput.cms";
import NumberKeypadDefinition            from "../modules/banking/NumberKeypad/NumberKeypad.cms";
import OtpInputDefinition                from "../modules/banking/OtpInput/OtpInput.cms";
import PinDotIndicatorDefinition         from "../modules/banking/PinDotIndicator/PinDotIndicator.cms";
import TransactionListDefinition         from "../modules/banking/TransactionList/TransactionList.cms";
import TransactionSearchFilterDefinition from "../modules/banking/TransactionSearchFilter/TransactionSearchFilter.cms";
import TransferFormDefinition            from "../modules/banking/TransferForm/TransferForm.cms";
// modules - common
import ActionLinkItemDefinition          from "../modules/common/ActionLinkItem/ActionLinkItem.cms";
import AlertBannerDefinition             from "../modules/common/AlertBanner/AlertBanner.cms";
import BalanceToggleDefinition           from "../modules/common/BalanceToggle/BalanceToggle.cms";
import BankSelectGridDefinition          from "../modules/common/BankSelectGrid/BankSelectGrid.cms";
import CardDefinition                    from "../modules/common/Card/Card.cms";
import CheckboxDefinition                from "../modules/common/Checkbox/Checkbox.cms";
import CollapsibleSectionDefinition      from "../modules/common/CollapsibleSection/CollapsibleSection.cms";
import DatePickerDefinition              from "../modules/common/DatePicker/DatePicker.cms";
import DividerDefinition                 from "../modules/common/Divider/Divider.cms";
import DividerWithLabelDefinition        from "../modules/common/DividerWithLabel/DividerWithLabel.cms";
import DropdownMenuDefinition            from "../modules/common/DropdownMenu/DropdownMenu.cms";
import EmptyStateDefinition              from "../modules/common/EmptyState/EmptyState.cms";
import ErrorStateDefinition              from "../modules/common/ErrorState/ErrorState.cms";
import InfoRowDefinition                 from "../modules/common/InfoRow/InfoRow.cms";
import LabelValueRowDefinition           from "../modules/common/LabelValueRow/LabelValueRow.cms";
import NoticeItemDefinition              from "../modules/common/NoticeItem/NoticeItem.cms";
import RecentRecipientItemDefinition     from "../modules/common/RecentRecipientItem/RecentRecipientItem.cms";
import SectionHeaderDefinition           from "../modules/common/SectionHeader/SectionHeader.cms";
import SelectableItemDefinition          from "../modules/common/SelectableItem/SelectableItem.cms";
import SelectableListItemDefinition      from "../modules/common/SelectableListItem/SelectableListItem.cms";
import SidebarNavDefinition              from "../modules/common/SidebarNav/SidebarNav.cms";
import StepIndicatorDefinition           from "../modules/common/StepIndicator/StepIndicator.cms";
import SuccessHeroDefinition             from "../modules/common/SuccessHero/SuccessHero.cms";
import TabNavDefinition                  from "../modules/common/TabNav/TabNav.cms";
import TransferLimitInfoDefinition       from "../modules/common/TransferLimitInfo/TransferLimitInfo.cms";

export {
  AccountSelectItemDefinition,
  ActionLinkItemDefinition,
  AlertBannerDefinition,
  AmountInputDefinition,
  BalanceToggleDefinition,
  BankSelectGridDefinition,
  CardDefinition,
  CheckboxDefinition,
  CollapsibleSectionDefinition,
  DatePickerDefinition,
  DividerDefinition,
  DividerWithLabelDefinition,
  DropdownMenuDefinition,
  EmptyStateDefinition,
  ErrorStateDefinition,
  InfoRowDefinition,
  LabelValueRowDefinition,
  NoticeItemDefinition,
  NumberKeypadDefinition,
  OtpInputDefinition,
  PinDotIndicatorDefinition,
  RecentRecipientItemDefinition,
  SectionHeaderDefinition,
  SelectableItemDefinition,
  SelectableListItemDefinition,
  SidebarNavDefinition,
  StepIndicatorDefinition,
  SuccessHeroDefinition,
  TabNavDefinition,
  TransactionListDefinition,
  TransactionSearchFilterDefinition,
  TransferFormDefinition,
  TransferLimitInfoDefinition,
};

/** modules 카테고리 블록 목록 — CMSApp의 blocks prop에 바로 전달 가능 */
export const moduleBlocks = [
  AccountSelectItemDefinition,
  ActionLinkItemDefinition,
  AlertBannerDefinition,
  AmountInputDefinition,
  BalanceToggleDefinition,
  BankSelectGridDefinition,
  CardDefinition,
  CheckboxDefinition,
  CollapsibleSectionDefinition,
  DatePickerDefinition,
  DividerDefinition,
  DividerWithLabelDefinition,
  DropdownMenuDefinition,
  EmptyStateDefinition,
  ErrorStateDefinition,
  InfoRowDefinition,
  LabelValueRowDefinition,
  NoticeItemDefinition,
  NumberKeypadDefinition,
  OtpInputDefinition,
  PinDotIndicatorDefinition,
  RecentRecipientItemDefinition,
  SectionHeaderDefinition,
  SelectableItemDefinition,
  SelectableListItemDefinition,
  SidebarNavDefinition,
  StepIndicatorDefinition,
  SuccessHeroDefinition,
  TabNavDefinition,
  TransactionListDefinition,
  TransactionSearchFilterDefinition,
  TransferFormDefinition,
  TransferLimitInfoDefinition,
];
