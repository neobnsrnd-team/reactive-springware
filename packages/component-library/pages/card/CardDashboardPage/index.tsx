/**
 * @file index.tsx
 * @description 카드 대시보드 페이지 컴포넌트.
 *
 * 화면 구성:
 *   - 상단바: "마이" 타이틀 + 알림·메뉴 아이콘
 *   - StatementHeroCard: 이번 달 명세서 금액 + 결제일 (클릭 시 상세 이동)
 *   - QuickShortcutCard × 3: 카드추천 / 금융·대출 / 보험 (3열 그리드)
 *   - QuickMenuGrid: 카드별 실적 / 이용내역 / 보유카드 / 쿠폰함 / 한도조회 / 무이자할부 / 카드신청 (4열, 사각형 아이콘)
 *   - 하단 탭바: 마이 / 혜택·실적 / 결제 / 쇼핑·여행 / 자산
 *
 * Storybook 확인 목적으로 내부 useState 사용.
 * 실제 앱 구현 시 모든 상태·핸들러는 useCardDashboard Hook으로 분리한다.
 *
 * @param onNotification   - 알림 클릭
 * @param onMenu           - 메뉴 클릭
 * @param onStatementDetail - 명세서 상세 이동
 * @param onCardRecommend  - 카드추천 클릭
 * @param onFinanceLoan    - 금융/대출 클릭
 * @param onInsurance      - 보험 클릭
 * @param onCardPerformance - 카드별 실적 클릭
 * @param onUsageHistory   - 이용내역 클릭
 * @param onMyCards        - 보유카드 클릭
 * @param onCoupons        - 쿠폰함 클릭
 * @param onLimitCheck     - 한도조회 클릭
 * @param onInstallment    - 무이자할부 클릭
 * @param onCardApply      - 카드신청 클릭
 * @param activeBottomTab  - 하단 탭바 활성 ID (기본: 'my')
 * @param onBottomNavChange - 하단 탭바 탭 변경 핸들러
 */
import React, { useState } from 'react';
import {
  Bell,
  Menu,
  Star,
  Banknote,
  Shield,
  BarChart2,
  List,
  CreditCard,
  Ticket,
  Gauge,
  Percent,
  Plus,
  User,
  Gift,
  Wallet,
  ShoppingBag,
  PieChart,
} from 'lucide-react';

import { HomePageLayout } from '../../../layout/HomePageLayout';
import { BottomNav }      from '../../../layout/BottomNav';
import { Button }         from '../../../core/Button';
import { SectionHeader }  from '../../../modules/common/SectionHeader';
import { Card }           from '../../../modules/common/Card';
import { StatementHeroCard }  from '../../../biz/card/StatementHeroCard';
import { QuickShortcutCard }  from '../../../biz/card/QuickShortcutCard';
import { QuickMenuGrid }      from '../../../biz/common/QuickMenuGrid';

import type { CardDashboardPageProps } from './types';

/** 하단 탭바 항목 정의 */
const BOTTOM_NAV_ITEMS = (onBottomNavChange: (id: string) => void) => [
  { id: 'my',       icon: <User        className="size-5" />, label: '마이',      onClick: () => onBottomNavChange('my') },
  { id: 'benefit',  icon: <Gift        className="size-5" />, label: '혜택/실적', onClick: () => onBottomNavChange('benefit') },
  { id: 'payment',  icon: <Wallet      className="size-5" />, label: '결제',      onClick: () => onBottomNavChange('payment') },
  { id: 'shopping', icon: <ShoppingBag className="size-5" />, label: '쇼핑/여행', onClick: () => onBottomNavChange('shopping') },
  { id: 'asset',    icon: <PieChart    className="size-5" />, label: '자산',      onClick: () => onBottomNavChange('asset') },
];

export function CardDashboardPage({
  onNotification,
  onMenu,
  onStatementDetail,
  onCardRecommend,
  onFinanceLoan,
  onInsurance,
  onCardPerformance,
  onUsageHistory,
  onMyCards,
  onCoupons,
  onLimitCheck,
  onInstallment,
  onCardApply,
  activeBottomTab: activeBottomTabProp,
  onBottomNavChange,
}: CardDashboardPageProps) {
  /** Storybook 확인용 내부 상태 — 실제 앱에서는 Hook에서 관리 */
  const [activeBottomTab, setActiveBottomTab] = useState(activeBottomTabProp ?? 'my');

  const handleBottomNavChange = (id: string) => {
    setActiveBottomTab(id);
    onBottomNavChange?.(id);
  };

  /** QuickMenuGrid 항목 — iconShape="rounded"로 사각형 아이콘 */
  const quickMenuItems = [
    { id: 'performance', icon: <BarChart2 className="size-5" />, label: '카드별 실적', onClick: onCardPerformance, iconShape: 'rounded' as const },
    { id: 'history',     icon: <List      className="size-5" />, label: '이용내역',    onClick: onUsageHistory,    iconShape: 'rounded' as const },
    { id: 'my-cards',   icon: <CreditCard className="size-5" />, label: '보유카드',    onClick: onMyCards,         iconShape: 'rounded' as const },
    { id: 'coupons',    icon: <Ticket     className="size-5" />, label: '쿠폰함',      onClick: onCoupons,         iconShape: 'rounded' as const },
    { id: 'limit',      icon: <Gauge      className="size-5" />, label: '한도조회',    onClick: onLimitCheck,      iconShape: 'rounded' as const },
    { id: 'installment', icon: <Percent   className="size-5" />, label: '무이자할부',  onClick: onInstallment,     iconShape: 'rounded' as const },
    { id: 'apply',      icon: <Plus       className="size-5" />, label: '카드신청',    onClick: onCardApply,       iconShape: 'rounded' as const },
  ];

  return (
    <div data-brand="card" data-domain="card">
      <HomePageLayout
        title="마이"
        rightAction={
          /* 알림 + 메뉴 아이콘 2개 */
          <div className="flex items-center gap-xs">
            <Button variant="ghost" size="md" iconOnly leftIcon={<Bell className="size-5" />} onClick={onNotification} aria-label="알림" />
            <Button variant="ghost" size="md" iconOnly leftIcon={<Menu className="size-5" />} onClick={onMenu}         aria-label="메뉴" />
          </div>
        }
        withBottomNav
      >
        {/* ── 이번 달 명세서 히어로 카드 ────────────────── */}
        <div className="px-standard pt-standard">
          <StatementHeroCard
            amount={1_250_000}
            dueDate="1월 25일"
            onDetail={onStatementDetail}
          />
        </div>

        {/* ── 바로가기 카드 3열 (카드추천 / 금융·대출 / 보험) ── */}
        <div className="px-standard pt-standard">
          <SectionHeader title="바로가기" className="mb-sm" />
          <div className="grid grid-cols-3 gap-sm">
            <QuickShortcutCard title="카드추천" subtitle="맞춤 추천"    icon={<Star     className="size-5" />} onClick={onCardRecommend} />
            <QuickShortcutCard title="금융/대출" subtitle="한도 조회"   icon={<Banknote className="size-5" />} onClick={onFinanceLoan} />
            <QuickShortcutCard title="보험"     subtitle="내 보험 확인" icon={<Shield   className="size-5" />} onClick={onInsurance} />
          </div>
        </div>

        {/* ── 퀵메뉴 그리드 4열 (사각형 아이콘) ──────────── */}
        <div className="px-standard pt-standard pb-standard">
          <Card>
            <QuickMenuGrid items={quickMenuItems} cols={4} />
          </Card>
        </div>
      </HomePageLayout>

      {/* ── 하단 고정 탭바 ──────────────────────────────── */}
      <BottomNav items={BOTTOM_NAV_ITEMS(handleBottomNavChange)} activeId={activeBottomTab} />
    </div>
  );
}
