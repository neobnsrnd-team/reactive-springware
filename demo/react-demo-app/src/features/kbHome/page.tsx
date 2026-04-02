/**
 * @file page.tsx
 * @description KB국민은행 홈 페이지 (Figma node-id: 1-202, Hana Bank App 디자인 → KB 브랜드 적용).
 *
 * 레이아웃 구조:
 * HomePageLayout (상단 헤더 + 스크롤 본문 + 하단 여백)
 *   ├── 인사말 텍스트          — "안녕하세요, 홍길동 님!"
 *   ├── TabNav                 — 해당금융(active) / 다른금융 / 자산관리
 *   ├── AccountSummaryCard     — KB 주거래 통장 잔액 + 이체 / ATM출금 버튼
 *   ├── 다른 금융 연결 Card    — "계좌를 연결하고 한눈에 관리하세요" + 연결하기 버튼
 *   ├── QuickMenuGrid          — 3개 퀵메뉴 (전계좌 조회 / 이체 / 내역조회)
 *   ├── BrandBanner            — "참여하면 100% 당첨! 이벤트 확인하기"
 *   └── SectionHeader + NoticeItem 목록 — "공지 및 혜택" 3개 항목
 * BottomNav                    — 자산 / 상품 / 홈 / 카드 / 챗봇 (fixed)
 *
 * API 호출이 없으므로 hook / repository 파일은 생성하지 않는다.
 */
import React, { useState } from 'react';
import {
  Wallet,
  ShoppingBag,
  Home,
  CreditCard,
  MessageSquare,
  ArrowRightLeft,
  List,
  Clock,
  Link2,
  Megaphone,
  Percent,
  Wrench,
  Gift,
} from 'lucide-react';
import {
  HomePageLayout,
  BottomNav,
  AccountSummaryCard,
  BrandBanner,
  QuickMenuGrid,
  Button,
  Stack,
  TabNav,
  Card,
  SectionHeader,
  NoticeItem,
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
  /* ── 상단 탭 상태 (해당금융 / 다른금융 / 자산관리) ─── */
  const [activeTab, setActiveTab] = useState<string>('mine');

  const tabItems = [
    { id: 'mine', label: '해당금융' },
    { id: 'other', label: '다른금융' },
    { id: 'asset', label: '자산관리' },
  ];

  /* ── 하단 네비게이션 탭 ──────────────────────────── */
  const bottomNavItems = [
    { id: 'asset', icon: <Wallet className="size-5" />, label: '자산', onClick: () => {} },
    { id: 'product', icon: <ShoppingBag className="size-5" />, label: '상품', onClick: () => {} },
    { id: 'home', icon: <Home className="size-6" />, label: '홈', onClick: () => {} },
    { id: 'card', icon: <CreditCard className="size-5" />, label: '카드', onClick: () => {} },
    { id: 'chat', icon: <MessageSquare className="size-5" />, label: '챗봇', onClick: () => {} },
  ];

  /* ── 퀵메뉴 항목 (3열 × 1행) ─────────────────────
   * Figma 디자인 기준 3개: 전계좌 조회 / 이체 / 내역조회 */
  const quickMenuItems = [
    {
      id: 'allAccounts',
      icon: <List className="size-5" />,
      label: '전계좌 조회',
      onClick: () => {},
    },
    {
      id: 'transfer',
      icon: <ArrowRightLeft className="size-5" />,
      label: '이체',
      onClick: () => {},
    },
    {
      id: 'history',
      icon: <Clock className="size-5" />,
      label: '내역조회',
      onClick: () => {},
    },
  ];

  /* ── 공지 및 혜택 항목 ──────────────────────────── */
  const noticeItems = [
    {
      id: 'notice-1',
      icon: <Home className="size-4" />,
      /* 초록 계열 배경: 청약·주거 관련 항목을 시각적으로 구분 */
      iconBgClassName: 'bg-success-subtle text-success-text',
      title: '주택청약 종합저축 안내',
      description: '내 집 마련의 첫걸음을 시작하세요',
    },
    {
      id: 'notice-2',
      icon: <Percent className="size-4" />,
      /* 브랜드 배경: 금리 우대 혜택 항목 강조 */
      iconBgClassName: 'bg-brand-5 text-brand-text',
      title: '금리 우대 적금 홍보',
      description: '최대 연 4.5% 우대금리 이벤트 진행 중',
    },
    {
      id: 'notice-3',
      icon: <Wrench className="size-4" />,
      /* 경고 배경: 서비스 점검은 주의를 끌 수 있는 컬러 사용 */
      iconBgClassName: 'bg-warning-subtle text-warning-text',
      title: '서비스 점검 공지사항',
      description: '2026.04.01 02:00~04:00 일부 서비스 중단',
    },
  ];

  return (
    /* data-brand="kb": KB국민은행 브랜드 토큰 적용 (파란색 계열)
       data-domain="banking": 뱅킹 도메인 배경색 토큰 적용 */
    <div data-brand="kb" data-domain="banking">
      <HomePageLayout title="KB국민은행" logo={<KbLogo />} hasNotification withBottomNav>

        {/* ── 인사말 ────────────────────────────────────
         * Figma: "안녕하세요, 김하나님!" → KB 브랜드로 사용자명 교체 */}
        <Stack gap="none" className="px-standard pt-standard pb-xs">
          <p className="text-2xl font-bold text-text-heading">안녕하세요, 홍길동 님!</p>
        </Stack>

        {/* ── 금융 구분 탭 (해당금융 / 다른금융 / 자산관리) ─ */}
        <Stack gap="none" className="px-standard pt-sm">
          <TabNav
            items={tabItems}
            activeId={activeTab}
            onTabChange={setActiveTab}
            variant="underline"
            fullWidth
          />
        </Stack>

        {/* ── KB 주거래 통장 요약 카드 ──────────────── */}
        <Stack gap="none" className="px-standard pt-sm">
          <AccountSummaryCard
            type="deposit"
            accountName="KB 주거래 통장"
            accountNumber="123-456789-01207"
            balance={2500000}
            badgeText="주거래"
            moreButton="dots"
            actions={
              <>
                {/* ATM출금: Figma 원본 기준 outline 버튼 */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {}}
                >
                  ATM출금
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

        {/* ── 다른 금융 연결 유도 카드 ──────────────────
         * Figma: 브랜드 컬러 배경의 CTA 카드. "다른 금융 계좌를 연결하고 한눈에 관리하세요" */}
        <Stack gap="none" className="px-standard pt-sm">
          <Card className="bg-brand-5 border-brand-10">
            <Stack gap="sm">
              <Stack gap="xs">
                <p className="text-sm font-bold text-brand-text flex items-center gap-xs">
                  <Link2 className="size-4 shrink-0" aria-hidden="true" />
                  다른 금융 연결
                </p>
                <p className="text-xs text-text-secondary">
                  다른 금융 계좌를 연결하고 한눈에 관리하세요
                </p>
              </Stack>
              <div className="flex justify-end">
                <Button variant="primary" size="sm" onClick={() => {}}>
                  연결하기
                </Button>
              </div>
            </Stack>
          </Card>
        </Stack>

        {/* ── 퀵메뉴 그리드 (3열 × 1행) ────────────── */}
        <Stack gap="none" className="px-standard pt-standard">
          <QuickMenuGrid items={quickMenuItems} cols={3} />
        </Stack>

        {/* ── KB 이벤트 배너 ────────────────────────── */}
        <Stack gap="none" className="px-standard pt-standard">
          <BrandBanner
            subtitle="참여하면 100% 당첨!"
            title="이벤트 확인하기"
            icon={<Gift className="size-5 text-white" />}
            onClick={() => {}}
          />
        </Stack>

        {/* ── 공지 및 혜택 섹션 ─────────────────────── */}
        <Stack gap="none" className="px-standard pt-standard pb-standard">
          <SectionHeader
            title="공지 및 혜택"
            actionLabel="더보기"
            onAction={() => {}}
          />
          <Stack gap="none" className="mt-sm">
            {noticeItems.map((item, index) => (
              <NoticeItem
                key={item.id}
                icon={item.icon}
                iconBgClassName={item.iconBgClassName}
                title={item.title}
                description={item.description}
                /* 마지막 항목은 구분선 제거 */
                showDivider={index < noticeItems.length - 1}
                onClick={() => {}}
              />
            ))}
          </Stack>
        </Stack>

      </HomePageLayout>

      {/* ── 하단 고정 탭바 ────────────────────────────
       * withBottomNav=true가 본문에 pb-nav 여백을 자동 확보한다. */}
      <BottomNav items={bottomNavItems} activeId="home" />
    </div>
  );
}
