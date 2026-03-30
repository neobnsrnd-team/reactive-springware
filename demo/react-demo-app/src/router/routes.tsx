/**
 * @file routes.tsx
 * @description 앱 전체 라우트 정의.
 *
 * 페이지 추가 시 반드시 이 파일에 route를 등록한다.
 * - path는 kebab-case 사용 (예: /transfer-success)
 * - 동적 세그먼트는 콜론 prefix 사용 (예: :id)
 */

import { HomeDashboardPage } from '@/pages/HomeDashboardPage';
import { AccountListPage } from '@/pages/AccountListPage';
import { TransactionHistoryPage } from '@/pages/TransactionHistoryPage';
import { TransactionDetailPage } from '@/pages/TransactionDetailPage';
import { TransferSuccessPage } from '@/pages/TransferSuccessPage';
import { KbHomePage } from '@/features/kbHome/page';
import { KbTransactionHistoryListPage } from '@/features/kbTransactionHistory/page';
import { HanaTransactionHistoryListPage } from '@/features/hanaTransactionHistory/page';

const routes = [
  {
    path: '/home',
    element: <HomeDashboardPage />,
  },
  {
    path: '/accounts',
    element: <AccountListPage />,
  },
  {
    path: '/transactions',
    element: <TransactionHistoryPage />,
  },
  {
    path: '/transactions/:id',
    element: <TransactionDetailPage />,
  },
  {
    path: '/transfer/success',
    element: <TransferSuccessPage />,
  },
  {
    path: '/kb-home',
    element: <KbHomePage />,
  },
  {
    path: '/kb-transactions',
    element: <KbTransactionHistoryListPage />,
  },
  {
    path: '/hana-transactions',
    element: <HanaTransactionHistoryListPage />,
  },
];

export default routes;
