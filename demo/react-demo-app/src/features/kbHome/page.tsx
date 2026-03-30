/**
 * @file page.tsx
 * @description KB국민은행 홈 페이지 (Figma node-id: 332-267).
 *
 * 레이아웃 구조:
 * HomePageLayout (상단 헤더 + 스크롤 본문 + 하단 여백)
 *   ├── 인사말 텍스트       — "안녕하세요, 홍길동 님!"
 *   ├── AccountSummaryCard  — KB 주거래 통장 잔액 + 거래내역 / 이체 버튼
 *   ├── QuickMenuGrid       — 8개 퀵메뉴 (4열 × 2행)
 *   ├── BannerCarousel      — 프로모션 배너
 *   └── BrandBanner         — KB 브랜드 프로모션 배너
 * BottomNav                 — 자산 / 상품 / 홈 / 카드 / 챗봇 (fixed)
 *
 * API 호출이 없으므로 hook / repository 파일은 생성하지 않는다.
 */
import React from 'react';
import {
  Wallet,
  ShoppingBag,
  Home,
  CreditCard,
  MessageSquare,
  ArrowRightLeft,
  Clock,
  Search,
  Send,
  BarChart2,
  Landmark,
  Gift,
  Star,
} from 'lucide-react';
import {
  HomePageLayout,
  BottomNav,
  AccountSummaryCard,
  BannerCarousel,
  BrandBanner,
  QuickMenuGrid,
  Button,
  Stack,
} from '@reactive-springware/component-library';

/** KB국민은행 로고 자리표시자 — 실제 배포 시 SVG 에셋으로 교체 */
function KbLogo() {
  return (
    <span
      aria-label="KB국민은행 로고"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
        borderRadius: 6,
        /* KB 브랜드 컬러: --brand-primary 토큰 참조 */
        background: 'var(--color-brand)',
        color: '#fff',
        fontSize: 10,
        fontWeight: 800,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      KB
    </span>
  );
}

export function KbHomePage() {
  /* ── 하단 네비게이션 탭 ──────────────────────────── */
  const bottomNavItems = [
    { id: 'asset', icon: <Wallet className="size-5" />, label: '자산', onClick: () => {} },
    { id: 'product', icon: <ShoppingBag className="size-5" />, label: '상품', onClick: () => {} },
    { id: 'home', icon: <Home className="size-6" />, label: '홈', onClick: () => {} },
    { id: 'card', icon: <CreditCard className="size-5" />, label: '카드', onClick: () => {} },
    { id: 'chat', icon: <MessageSquare className="size-5" />, label: '챗봇', onClick: () => {} },
  ];

  /* ── 퀵메뉴 항목 (4열 × 2행 = 8개) ─────────────── */
  const quickMenuItems = [
    {
      id: 'transfer',
      icon: <ArrowRightLeft className="size-5" />,
      label: '이체',
      onClick: () => {},
    },
    { id: 'history', icon: <Clock className="size-5" />, label: '거래내역', onClick: () => {} },
    { id: 'lookup', icon: <Search className="size-5" />, label: '조회', onClick: () => {} },
    { id: 'remit', icon: <Send className="size-5" />, label: '송금', onClick: () => {} },
    { id: 'invest', icon: <BarChart2 className="size-5" />, label: '투자', onClick: () => {} },
    { id: 'loan', icon: <Landmark className="size-5" />, label: '대출', onClick: () => {} },
    { id: 'benefit', icon: <Gift className="size-5" />, label: '혜택', onClick: () => {} },
    { id: 'all', icon: <CreditCard className="size-5" />, label: '전체메뉴', onClick: () => {} },
  ];

  return (
    /* data-brand="kb": KB국민은행 브랜드 토큰 적용 (파란색 계열)
       data-domain="banking": 뱅킹 도메인 배경색 토큰 적용 */
    <div data-brand="kb" data-domain="banking">
      <HomePageLayout title="KB국민은행" logo={<KbLogo />} hasNotification withBottomNav>
        {/* ── 인사말 ────────────────────────────────────
         * greeting prop이 제거되어 페이지 콘텐츠로 직접 표시한다. */}
        <Stack gap="none" className="px-standard pt-standard pb-xs">
          <p className="text-2xl font-bold text-text-heading">안녕하세요, 홍길동 님!</p>
        </Stack>

        {/* ── KB 주거래 통장 요약 카드 ──────────────── */}
        <Stack gap="none" className="px-standard pt-sm">
          <AccountSummaryCard
            type="deposit"
            accountName="KB 주거래 통장"
            accountNumber="123-456789-01207"
            balance={3000000}
            badgeText="주거래"
            moreButton="dots"
            actions={
              <>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Clock className="size-3.5" />}
                  onClick={() => {}}
                >
                  거래내역
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<ArrowRightLeft className="size-3.5" />}
                  onClick={() => {}}
                >
                  이체
                </Button>
              </>
            }
          />
        </Stack>

        {/* ── 퀵메뉴 그리드 (4열 × 2행) ────────────── */}
        <Stack gap="none" className="px-standard pt-standard">
          <QuickMenuGrid items={quickMenuItems} cols={4} />
        </Stack>

        {/* ── KB 브랜드 배너 ────────────────────────── */}
        <Stack gap="none" className="px-standard pt-standard pb-standard">
          <BrandBanner
            subtitle="나만의 금융 혜택"
            title="KB 멤버십으로 더 많은 혜택을"
            icon={<Star className="size-5 text-white" />}
            onClick={() => {}}
          />
        </Stack>

        {/* ── 프로모션 배너 캐러셀 ──────────────────── */}
        <Stack gap="none" className="px-standard pt-standard">
          <BannerCarousel
            items={[
              {
                id: 'promo-1',
                variant: 'promo',
                title: 'KB 특별 금리 이벤트',
                description: '최대 연 4.5% 우대금리 적용',
              },
              {
                id: 'promo-2',
                variant: 'info',
                title: 'KB 리브 Next 출시',
                description: '더 편리해진 금융 서비스를 경험해보세요',
              },
            ]}
          />
        </Stack>
      </HomePageLayout>

      {/* ── 하단 고정 탭바 ────────────────────────────
       * withBottomNav=true가 본문에 pb-nav 여백을 자동 확보한다. */}
      <BottomNav items={bottomNavItems} activeId="home" />
    </div>
  );
}
