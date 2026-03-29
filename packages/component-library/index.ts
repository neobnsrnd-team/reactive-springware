/**
 * @file index.ts
 * @description @reactive-springware/component-library 패키지 진입점.
 *
 * 카테고리별 모든 컴포넌트와 타입을 re-export합니다.
 * 외부에서 `import { Button } from '@reactive-springware/component-library'` 형태로 사용.
 */

// 디자인 토큰 + Tailwind 유틸리티 CSS를 빌드에 포함시킨다.
// 이 import가 있어야 vite build 시 tailwindcss() 플러그인이 globals.css를 처리하고
// globals.css 내부의 @source 지시어로 모든 컴포넌트 파일을 스캔하여
// 실제로 사용된 Tailwind 유틸리티 클래스를 dist/index.css에 출력한다.
import '../../design-tokens/globals.css';

/* ── Core (원자 컴포넌트) ─────────────────────────────────────── */
export * from './core/Badge';
export * from './core/Button';
export * from './core/Input';
export * from './core/Select';
export * from './core/Text';

/* ── Modules (분자 컴포넌트) ─────────────────────────────────── */
export * from './modules/AccountSelectItem';
export * from './modules/AlertBanner';
export * from './modules/BottomSheet';
export * from './modules/AmountInput';
export * from './modules/ActionLinkItem';
export * from './modules/InfoRow';
export * from './modules/NumberKeypad';
export * from './modules/PinDotIndicator';
export * from './modules/Card';
export * from './modules/CollapsibleSection';
export * from './modules/DatePicker';
export * from './modules/DividerWithLabel';
export * from './modules/EmptyState';
export * from './modules/LabelValueRow';
export * from './modules/Modal';
export * from './modules/OtpInput';
export * from './modules/NoticeItem';
export * from './modules/SectionHeader';
export * from './modules/SidebarNav';
export * from './modules/SuccessHero';
export * from './modules/TabNav';
export * from './modules/Checkbox';
export * from './modules/TransactionList';
export * from './modules/TransactionSearchFilter';
export * from './modules/SelectableItem';
export * from './modules/TransferForm';

/* ── Layout (레이아웃 컴포넌트) ─────────────────────────────── */
export * from './layout/AppBrandHeader';
export * from './layout/BlankPageLayout';
export * from './layout/BottomNav';
export * from './layout/Grid';
export * from './layout/HomePageLayout';
export * from './layout/Inline';
export * from './layout/PageLayout';
export * from './layout/Stack';

/* ── Hooks (상태·데이터 로직) ────────────────────────────────── */
export * from './hooks/useAccountPassword';
export * from './hooks/useAccountSelect';
export * from './hooks/useBankSelect';
export * from './hooks/useTransferConfirm';

/* ── Pages (페이지 컴포넌트) ─────────────────────────────────── */
export * from './pages/AccountSelectPage';
export * from './pages/LoginPage';
export * from './pages/HomeDashboardPage';
export * from './pages/FullMenuPage';
export * from './pages/TransactionHistoryPage';
export * from './pages/TransactionDetailPage';
export * from './pages/AccountPasswordPage';
export * from './pages/BankSelectPage';
export * from './pages/TransferConfirmPage';
export * from './pages/TransferInputPage';
export * from './pages/TransferSuccessPage';

/* ── Biz (금융 도메인 특화 컴포넌트) ──────────────────────────── */
export * from './biz/AccountSelectorCard';
export * from './biz/AccountSummaryCard';
export * from './biz/BannerCarousel';
export * from './biz/BrandBanner';
export * from './biz/CardSummaryCard';
export * from './biz/InsuranceSummaryCard';
export * from './biz/QuickMenuGrid';
export * from './biz/UserProfile';
