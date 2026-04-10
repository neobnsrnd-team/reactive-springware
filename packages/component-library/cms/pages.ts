/**
 * @file pages.ts
 * @description component-library pages 카테고리 블록 정의 통합 export.
 * 라우팅 단위 전체 페이지 컴포넌트(로그인·홈·이체·계좌 상세 등).
 *
 * @example
 * import { pageBlocks } from "@reactivespringware/component-library/cms/pages";
 * <CMSApp blocks={[...pageBlocks]} />
 */
// pages - common
import FullMenuPageDefinition         from "../pages/common/FullMenuPage/FullMenuPage.cms";
import HomeDashboardPageDefinition    from "../pages/common/HomeDashboardPage/HomeDashboardPage.cms";
import LoginPageDefinition            from "../pages/common/LoginPage/LoginPage.cms";
// pages - banking
import AccountDetailPageDefinition    from "../pages/banking/AccountDetailPage/AccountDetailPage.cms";
import AccountPasswordPageDefinition  from "../pages/banking/AccountPasswordPage/AccountPasswordPage.cms";
import AccountSelectPageDefinition    from "../pages/banking/AccountSelectPage/AccountSelectPage.cms";
import AllAccountsPageDefinition      from "../pages/banking/AllAccountsPage/AllAccountsPage.cms";
import BankSelectPageDefinition       from "../pages/banking/BankSelectPage/BankSelectPage.cms";
import TransactionDetailPageDefinition from "../pages/banking/TransactionDetailPage/TransactionDetailPage.cms";
import TransactionHistoryPageDefinition from "../pages/banking/TransactionHistoryPage/TransactionHistoryPage.cms";
import TransferConfirmPageDefinition  from "../pages/banking/TransferConfirmPage/TransferConfirmPage.cms";
import TransferInputPageDefinition    from "../pages/banking/TransferInputPage/TransferInputPage.cms";
import TransferSuccessPageDefinition  from "../pages/banking/TransferSuccessPage/TransferSuccessPage.cms";
// pages - card
import CardDashboardPageDefinition        from "../pages/card/CardDashboardPage/CardDashboardPage.cms";
import HanaCardMenuPageDefinition         from "../pages/card/HanaCardMenuPage/HanaCardMenuPage.cms";
import ImmediatePayCompletePageDefinition from "../pages/card/ImmediatePayCompletePage/ImmediatePayCompletePage.cms";
import ImmediatePayMethodPageDefinition   from "../pages/card/ImmediatePayMethodPage/ImmediatePayMethodPage.cms";
import ImmediatePayPageDefinition         from "../pages/card/ImmediatePayPage/ImmediatePayPage.cms";
import ImmediatePayRequestPageDefinition  from "../pages/card/ImmediatePayRequestPage/ImmediatePayRequestPage.cms";
import ImmediatePaymentPageDefinition     from "../pages/card/ImmediatePaymentPage/ImmediatePaymentPage.cms";
import MyCardManagementPageDefinition     from "../pages/card/MyCardManagementPage/MyCardManagementPage.cms";
import PaymentStatementPageDefinition     from "../pages/card/PaymentStatementPage/PaymentStatementPage.cms";
import UsageHistoryPageDefinition         from "../pages/card/UsageHistoryPage/UsageHistoryPage.cms";
import UserManagementPageDefinition       from "../pages/card/UserManagementPage/UserManagementPage.cms";

export {
  AccountDetailPageDefinition,
  AccountPasswordPageDefinition,
  AccountSelectPageDefinition,
  AllAccountsPageDefinition,
  BankSelectPageDefinition,
  CardDashboardPageDefinition,
  FullMenuPageDefinition,
  HanaCardMenuPageDefinition,
  HomeDashboardPageDefinition,
  ImmediatePayCompletePageDefinition,
  ImmediatePayMethodPageDefinition,
  ImmediatePayPageDefinition,
  ImmediatePayRequestPageDefinition,
  ImmediatePaymentPageDefinition,
  LoginPageDefinition,
  MyCardManagementPageDefinition,
  PaymentStatementPageDefinition,
  TransactionDetailPageDefinition,
  TransactionHistoryPageDefinition,
  TransferConfirmPageDefinition,
  TransferInputPageDefinition,
  TransferSuccessPageDefinition,
  UsageHistoryPageDefinition,
  UserManagementPageDefinition,
};

/** pages 카테고리 블록 목록 — CMSApp의 blocks prop에 바로 전달 가능 */
export const pageBlocks = [
  AccountDetailPageDefinition,
  AccountPasswordPageDefinition,
  AccountSelectPageDefinition,
  AllAccountsPageDefinition,
  BankSelectPageDefinition,
  CardDashboardPageDefinition,
  FullMenuPageDefinition,
  HanaCardMenuPageDefinition,
  HomeDashboardPageDefinition,
  ImmediatePayCompletePageDefinition,
  ImmediatePayMethodPageDefinition,
  ImmediatePayPageDefinition,
  ImmediatePayRequestPageDefinition,
  ImmediatePaymentPageDefinition,
  LoginPageDefinition,
  MyCardManagementPageDefinition,
  PaymentStatementPageDefinition,
  TransactionDetailPageDefinition,
  TransactionHistoryPageDefinition,
  TransferConfirmPageDefinition,
  TransferInputPageDefinition,
  TransferSuccessPageDefinition,
  UsageHistoryPageDefinition,
  UserManagementPageDefinition,
];
