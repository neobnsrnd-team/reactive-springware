/**
 * @file index.tsx
 * @description 전계좌 조회 페이지 컴포넌트.
 *
 * Figma 원본:
 *   - 해당금융 탭 (node-id: 1:3)  — 내 하나은행 계좌 목록 + 세그먼트 필터
 *   - 다른금융 탭 (node-id: 1:152) — 연결된 타행 계좌 없음 (빈 상태)
 *
 * 화면 구성:
 *   - 상단 헤더: 뒤로가기 + "전계좌 조회" 타이틀
 *   - TabNav (underline): 해당금융 | 다른금융
 *   - 해당금융 탭:
 *       · 세그먼트 TabNav (pill): 전체 | 예금 | 신탁 | 펀드 | 대출
 *       · CollapsibleSection: 예금 그룹 (계좌 2개 + 거래내역·이체 버튼)
 *       · CollapsibleSection: 외화예금 그룹 (계좌 1개)
 *       · CollapsibleSection: 퇴직연금 그룹 (빈 상태)
 *       · CollapsibleSection: 증권 그룹 (미보유 상태)
 *   - 다른금융 탭:
 *       · EmptyState + 연결하기 버튼
 *
 * 실제 앱 구현 시 주의사항:
 *   - 모든 상태와 핸들러는 useAllAccounts 훅에서 주입한다.
 *   - Page에서 직접 useState 사용 금지 (CLAUDE.md 아키텍처 원칙).
 *   - 여기서는 Storybook 시각 확인 목적으로만 예외 적용한다.
 *
 * @param initialTab    - 초기 활성 탭 ('mine' | 'other')
 * @param initialState  - 초기 렌더링 상태 (Storybook args 제어용)
 * @param onBack        - 뒤로가기 핸들러
 * @param onConnectAccount  - 연결하기 버튼 핸들러
 * @param onAccountClick    - 계좌 카드 클릭 핸들러
 * @param onTransactionHistory - 거래내역 버튼 핸들러
 * @param onTransfer    - 이체 버튼 핸들러
 */
import React, { useState } from 'react';
import { Landmark, Link } from 'lucide-react';

/* ── Layout ──────────────────────────────────────────────────── */
import { PageLayout } from '../../layout/PageLayout';
import { Stack }      from '../../layout/Stack';
import { Inline }     from '../../layout/Inline';

/* ── Core ────────────────────────────────────────────────────── */
import { Button }     from '../../core/Button';
import { Typography } from '../../core/Text';

/* ── Modules ─────────────────────────────────────────────────── */
import { TabNav }            from '../../modules/TabNav';
import { CollapsibleSection } from '../../modules/CollapsibleSection';
import { EmptyState }         from '../../modules/EmptyState';

/* ── Biz ─────────────────────────────────────────────────────── */
import { AccountSummaryCard } from '../../biz/AccountSummaryCard';

import type { AllAccountsPageProps, AllAccountsTab, AccountSegment } from './types';

// ── 상단 탭 정의 ──────────────────────────────────────────────

const TOP_TABS: { id: AllAccountsTab; label: string }[] = [
  { id: 'mine',  label: '해당금융' },
  { id: 'other', label: '다른금융' },
];

// ── 세그먼트 탭 정의 ──────────────────────────────────────────

const SEGMENT_TABS: { id: AccountSegment; label: string }[] = [
  { id: 'all',     label: '전체' },
  { id: 'deposit', label: '예금' },
  { id: 'trust',   label: '신탁' },
  { id: 'fund',    label: '펀드' },
  { id: 'loan',    label: '대출' },
];

// ── Mock 데이터 (Storybook 전용) ──────────────────────────────

/** Figma 시안 기준 예금 계좌 샘플 (2개) */
const MOCK_DEPOSIT_ACCOUNTS = [
  {
    id: 'acc-001',
    accountName: '하나 청년도약계좌',
    accountNumber: '180-910058-09304',
    balance: 1000000,
    badgeText: '주거래',
  },
  {
    id: 'acc-002',
    accountName: '하나 자유적금',
    accountNumber: '180-910058-12201',
    balance: 500000,
  },
];

/** Figma 시안 기준 외화예금 계좌 샘플 (1개) */
const MOCK_FOREIGN_ACCOUNTS = [
  {
    id: 'acc-003',
    accountName: '하나 외화예금 (USD)',
    accountNumber: '180-910059-00412',
    /** 외화는 USD 기준 표시 — balanceDisplay로 override */
    balance: 0,
    balanceDisplay: '$1,234.56',
    balanceLabel: '잔액(USD)',
  },
];

// ── 계좌 그룹 섹션 헤더 ───────────────────────────────────────

/**
 * CollapsibleSection 헤더 구성 — 그룹명 + 계좌 수 + 총 잔액 표시.
 *
 * Figma: 각 그룹 헤더는 "예금 [2] 1,500,000원" 형식으로 좌우 구분 레이아웃.
 */
function AccountGroupHeader({
  title,
  count,
  totalAmount,
}: {
  title: string;
  count: number;
  totalAmount?: string;
}) {
  return (
    <Inline justify="between" align="center" className="w-full">
      {/* 그룹명 + 계좌 수 배지 */}
      <Inline gap="xs" align="center">
        <Typography variant="body" weight="bold" color="heading" as="span">
          {title}
        </Typography>
        {/* 계좌 수 — 브랜드 색상 배지 */}
        <span className="inline-flex items-center rounded-full px-xs py-0.5 text-xs font-bold bg-brand-10 text-brand-text">
          {count}
        </span>
      </Inline>
      {/* 총 잔액 — 우측 표시, 숫자는 numeric 폰트 적용 */}
      {totalAmount && (
        <Typography variant="body-sm" color="secondary" numeric as="span">
          {totalAmount}
        </Typography>
      )}
    </Inline>
  );
}

// ── 해당금융 탭 콘텐츠 ────────────────────────────────────────

function MineTabContent({
  activeSegment,
  onSegmentChange,
  onAccountClick,
  onTransactionHistory,
  onTransfer,
}: {
  activeSegment: AccountSegment;
  onSegmentChange: (id: AccountSegment) => void;
  onAccountClick?: (id: string) => void;
  onTransactionHistory?: (id: string) => void;
  onTransfer?: (id: string) => void;
}) {
  return (
    <Stack gap="sm">
      {/* 세그먼트 탭: 예금·신탁·펀드·대출 유형 필터 */}
      <div className="bg-white rounded-lg px-md py-sm">
        <TabNav
          items={SEGMENT_TABS}
          activeId={activeSegment}
          onTabChange={(id) => onSegmentChange(id as AccountSegment)}
          variant="pill"
          fullWidth
        />
      </div>

      {/* ── 예금 그룹 ─────────────────────────────────────────── */}
      <CollapsibleSection
        header={
          <AccountGroupHeader
            title="예금"
            count={MOCK_DEPOSIT_ACCOUNTS.length}
            totalAmount="1,500,000원"
          />
        }
        defaultExpanded
      >
        <Stack gap="sm">
          {MOCK_DEPOSIT_ACCOUNTS.map((account) => (
            <AccountSummaryCard
              key={account.id}
              type="deposit"
              accountName={account.accountName}
              accountNumber={account.accountNumber}
              balance={account.balance}
              badgeText={account.badgeText}
              onClick={() => onAccountClick?.(account.id)}
              actions={
                /* 거래내역·이체 버튼 — Figma 시안 기준 2개 버튼 */
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      onTransactionHistory?.(account.id);
                    }}
                  >
                    거래내역
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      onTransfer?.(account.id);
                    }}
                  >
                    이체
                  </Button>
                </>
              }
            />
          ))}
        </Stack>
      </CollapsibleSection>

      {/* ── 외화예금 그룹 ─────────────────────────────────────── */}
      <CollapsibleSection
        header={
          <AccountGroupHeader
            title="외화예금"
            count={MOCK_FOREIGN_ACCOUNTS.length}
            totalAmount="$1,234.56"
          />
        }
        defaultExpanded
      >
        <Stack gap="sm">
          {MOCK_FOREIGN_ACCOUNTS.map((account) => (
            <AccountSummaryCard
              key={account.id}
              type="foreignDeposit"
              accountName={account.accountName}
              accountNumber={account.accountNumber}
              balance={account.balance}
              balanceDisplay={account.balanceDisplay}
              balanceLabel={account.balanceLabel}
              onClick={() => onAccountClick?.(account.id)}
              actions={
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      onTransactionHistory?.(account.id);
                    }}
                  >
                    거래내역
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      onTransfer?.(account.id);
                    }}
                  >
                    이체
                  </Button>
                </>
              }
            />
          ))}
        </Stack>
      </CollapsibleSection>

      {/* ── 퇴직연금 그룹 — 계좌 없음 빈 상태 ─────────────────── */}
      <CollapsibleSection
        header={
          <AccountGroupHeader title="퇴직연금" count={0} />
        }
        defaultExpanded={false}
      >
        <EmptyState
          title="퇴직연금 계좌가 없어요"
          description="하나은행 퇴직연금 계좌를 개설하시면 여기에 표시됩니다."
        />
      </CollapsibleSection>

      {/* ── 증권 그룹 — 미보유 빈 상태 ───────────────────────── */}
      <CollapsibleSection
        header={
          <AccountGroupHeader title="증권" count={0} />
        }
        defaultExpanded={false}
      >
        <EmptyState
          title="증권 계좌를 보유하고 있지 않아요"
          description="연결된 증권 계좌가 없습니다."
        />
      </CollapsibleSection>
    </Stack>
  );
}

// ── 다른금융 탭 콘텐츠 ────────────────────────────────────────

function OtherTabContent({
  onConnectAccount,
}: {
  onConnectAccount?: () => void;
}) {
  return (
    <Stack gap="lg" align="center" className="py-xl">
      <EmptyState
        illustration={<Landmark className="size-16 text-text-muted" aria-hidden="true" />}
        title="연결된 다른 금융 계좌가 없습니다."
        description="다른 금융사 계좌를 연결하면 한 곳에서 모든 계좌를 조회할 수 있어요."
      />
      {/* 연결하기 버튼 — 빈 상태에서 주요 CTA */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        leftIcon={<Link className="size-4" aria-hidden="true" />}
        onClick={onConnectAccount}
      >
        연결하기
      </Button>
    </Stack>
  );
}

// ── 로딩 스켈레톤 ─────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <Stack gap="sm">
      {/* 세그먼트 탭 스켈레톤 */}
      <div className="bg-white rounded-lg p-md animate-pulse">
        <div className="h-8 bg-border-subtle rounded-full" />
      </div>
      {/* 계좌 카드 스켈레톤 3개 */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg p-md animate-pulse">
          <div className="h-4 w-1/3 bg-border-subtle rounded mb-sm" />
          <div className="h-3 w-1/2 bg-border-subtle rounded mb-md" />
          <div className="h-6 w-2/5 bg-border-subtle rounded" />
        </div>
      ))}
    </Stack>
  );
}

// ── 메인 페이지 컴포넌트 ──────────────────────────────────────

export function AllAccountsPage({
  initialTab    = 'mine',
  initialState  = 'data',
  onBack,
  onConnectAccount,
  onAccountClick,
  onTransactionHistory,
  onTransfer,
}: AllAccountsPageProps) {
  /* 상단 탭 상태 (Storybook 확인용 — 실제 앱에서는 Hook에서 관리) */
  const [activeTab, setActiveTab] = useState<AllAccountsTab>(initialTab);

  /* 세그먼트 탭 상태 (Storybook 확인용) */
  const [activeSegment, setActiveSegment] = useState<AccountSegment>('all');

  return (
    <PageLayout
      title="전계좌 조회"
      onBack={onBack}
    >
      <Stack gap="sm">
        {/* 상단 탭: 해당금융 | 다른금융 */}
        <div className="bg-white -mx-standard px-standard">
          <TabNav
            items={TOP_TABS}
            activeId={activeTab}
            onTabChange={(id) => setActiveTab(id as AllAccountsTab)}
            variant="underline"
            fullWidth
          />
        </div>

        {/* 탭별 콘텐츠 렌더링 */}
        {activeTab === 'mine' && (
          <>
            {initialState === 'loading' && <LoadingSkeleton />}
            {initialState === 'data' && (
              <MineTabContent
                activeSegment={activeSegment}
                onSegmentChange={setActiveSegment}
                onAccountClick={onAccountClick}
                onTransactionHistory={onTransactionHistory}
                onTransfer={onTransfer}
              />
            )}
            {initialState === 'error' && (
              <EmptyState
                title="계좌 정보를 불러올 수 없어요"
                description="잠시 후 다시 시도해 주세요."
                action={<Button variant="outline" onClick={() => {}}>다시 시도</Button>}
              />
            )}
          </>
        )}

        {activeTab === 'other' && (
          <OtherTabContent onConnectAccount={onConnectAccount} />
        )}
      </Stack>
    </PageLayout>
  );
}
