/**
 * @file index.tsx
 * @description 계좌상세 페이지 컴포넌트.
 *
 * Figma 원본: node-id: 1:692
 *
 * 화면 구성:
 *   - 상단 헤더: 뒤로가기 + "계좌상세" 타이틀 + 메뉴 버튼
 *   - 계좌 정보 Hero 영역:
 *       · 계좌 유형 배지 (예금)
 *       · 계좌번호 (small text)
 *       · 계좌명 (large text)
 *       · 잔액 (숫자 대형 표시, 3,000,000원)
 *       · 출금가능액 행 (InfoRow)
 *   - 구분선 (Divider)
 *   - 예금자보호법 정보 행 (InfoRow, 클릭 가능)
 *   - 구분선 (Divider)
 *   - 거래내역 섹션 헤더
 *   - 거래내역 목록 (TransactionList)
 *
 * 실제 앱 구현 시 주의사항:
 *   - 모든 상태와 핸들러는 useAccountDetail 훅에서 주입한다.
 *   - Page에서 직접 useState 사용 금지 (CLAUDE.md 아키텍처 원칙).
 *   - 여기서는 Storybook 시각 확인 목적으로만 예외 적용한다.
 *
 * @param accountType       - 계좌 유형 (배지 텍스트·금액 색상 결정)
 * @param accountName       - 계좌명
 * @param accountNumber     - 계좌번호
 * @param balance           - 잔액 (원화 정수)
 * @param availableBalance  - 출금가능액 (원화 정수)
 * @param transactions      - 거래내역 목록
 * @param initialState      - 초기 렌더링 상태 (Storybook args 제어용)
 * @param onBack            - 뒤로가기 핸들러
 * @param onMenu            - 메뉴 버튼 핸들러
 * @param onInsuranceInfo   - 예금자보호 정보 행 클릭 핸들러
 * @param onTransactionClick - 거래 항목 클릭 핸들러
 */
import React from 'react';
import { Menu, ChevronRight, ShieldCheck } from 'lucide-react';

/* ── Layout ──────────────────────────────────────────────────── */
import { PageLayout } from '../../layout/PageLayout';
import { Stack }      from '../../layout/Stack';
import { Inline }     from '../../layout/Inline';

/* ── Core ────────────────────────────────────────────────────── */
import { Badge }      from '../../core/Badge';
import { Button }     from '../../core/Button';
import { Typography } from '../../core/Text';

/* ── Modules ─────────────────────────────────────────────────── */
import { SectionHeader }     from '../../modules/SectionHeader';
import { TransactionList }   from '../../modules/TransactionList';

/* ── 신규 컴포넌트 ───────────────────────────────────────────── */
import { Divider } from '../../modules/Divider';

import type { TransactionItem }         from '../../modules/TransactionList/types';
import type { AccountDetailPageProps, AccountDetailType } from './types';

// ── 원화 포맷터 ──────────────────────────────────────────────

const krwFormatter = new Intl.NumberFormat('ko-KR');

/** 숫자를 "N,NNN,NNN원" 형식으로 변환 */
function formatKrw(amount: number): string {
  return `${krwFormatter.format(amount)}원`;
}

// ── 계좌 유형 → 배지 텍스트 매핑 ────────────────────────────

const accountTypeBadgeLabel: Record<AccountDetailType, string> = {
  deposit:        '예금',
  savings:        '적금',
  loan:           '대출',
  foreignDeposit: '외화예금',
  retirement:     '퇴직연금',
  securities:     '증권',
};

// ── Mock 데이터 (Storybook 전용) ──────────────────────────────

/** Figma 시안 기준 거래내역 샘플 데이터 */
const MOCK_TRANSACTIONS: TransactionItem[] = [
  /* 오늘 */
  {
    id: 'txn-001',
    date:   '2024-03-15T14:20:05',
    title:  '스타벅스 강남점',
    amount: 5400,
    balance: 2994600,
    type: 'withdrawal',
  },
  {
    id: 'txn-002',
    date:   '2024-03-15T09:00:12',
    title:  '급여',
    amount: 3000000,
    balance: 3000000,
    type: 'deposit',
  },
  /* 어제 */
  {
    id: 'txn-003',
    date:   '2024-03-14T21:15:40',
    title:  'GS25 강남점',
    amount: 3200,
    balance: 500000,
    type: 'withdrawal',
  },
  {
    id: 'txn-004',
    date:   '2024-03-14T18:30:22',
    title:  '쿠팡결제',
    amount: 28900,
    balance: 503200,
    type: 'withdrawal',
  },
  {
    id: 'txn-005',
    date:   '2024-03-14T12:45:10',
    title:  '이하나',
    amount: 50000,
    balance: 532100,
    type: 'deposit',
  },
];

// ── 로딩 스켈레톤 ─────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <Stack gap="md">
      {/* Hero 영역 스켈레톤 */}
      <div className="animate-pulse py-md">
        <div className="h-5 w-10 bg-border-subtle rounded-full mb-sm" />
        <div className="h-3 w-36 bg-border-subtle rounded mb-xs" />
        <div className="h-4 w-48 bg-border-subtle rounded mb-md" />
        <div className="h-8 w-40 bg-border-subtle rounded mb-sm" />
        <div className="h-4 w-32 bg-border-subtle rounded" />
      </div>
      <Divider />
      {/* 거래내역 스켈레톤 */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse flex justify-between py-sm">
          <div>
            <div className="h-3 w-24 bg-border-subtle rounded mb-xs" />
            <div className="h-3 w-16 bg-border-subtle rounded" />
          </div>
          <div className="text-right">
            <div className="h-3 w-20 bg-border-subtle rounded mb-xs" />
            <div className="h-3 w-24 bg-border-subtle rounded" />
          </div>
        </div>
      ))}
    </Stack>
  );
}

// ── 메인 페이지 컴포넌트 ──────────────────────────────────────

export function AccountDetailPage({
  accountType       = 'deposit',
  accountName       = '하나 청년도약계좌',
  accountNumber     = '180-910058-09304',
  balance           = 3000000,
  availableBalance  = 2950000,
  transactions      = MOCK_TRANSACTIONS,
  initialState      = 'data',
  onBack,
  onMenu,
  onInsuranceInfo,
  onTransactionClick,
}: AccountDetailPageProps) {
  return (
    <PageLayout
      title="계좌상세"
      onBack={onBack}
      rightAction={
        /* 우측 메뉴 버튼 — 계좌 설정·해지 등 추가 액션 진입점 */
        <button
          type="button"
          onClick={onMenu}
          aria-label="계좌 메뉴 열기"
          className="flex items-center justify-center size-9 rounded-lg text-text-muted hover:bg-surface-raised hover:text-text-heading transition-colors duration-150"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      }
    >
      {initialState === 'loading' && <LoadingSkeleton />}

      {initialState === 'error' && (
        <Stack gap="md" align="center" className="py-xl">
          <Typography variant="body" color="secondary">
            계좌 정보를 불러올 수 없어요.
          </Typography>
          <Button variant="outline" onClick={() => {}}>다시 시도</Button>
        </Stack>
      )}

      {initialState === 'data' && (
        <Stack gap="xs">
          {/* ── 계좌 정보 Hero 영역 ─────────────────────── */}
          <Stack gap="xs" className="py-md">
            {/* 계좌 유형 배지 */}
            <Inline gap="xs" align="center">
              <Badge variant="brand">
                {accountTypeBadgeLabel[accountType]}
              </Badge>
            </Inline>

            {/* 계좌번호 — secondary 색상으로 계좌명보다 낮은 강조도 */}
            <Typography variant="body-sm" color="secondary" numeric>
              {accountNumber}
            </Typography>

            {/* 계좌명 */}
            <Typography variant="body" weight="medium" color="heading">
              {accountName}
            </Typography>

            {/* 잔액 — 대형 숫자 표시, Manrope 폰트로 가독성 향상 */}
            <Typography variant="heading" weight="bold" color="heading" numeric>
              {formatKrw(balance)}
            </Typography>

            {/* 출금가능액 행 */}
            <Inline justify="between" align="center" className="mt-xs">
              <Typography variant="body-sm" color="secondary">출금가능액</Typography>
              <Typography variant="body-sm" color="base" numeric>
                {formatKrw(availableBalance)}
              </Typography>
            </Inline>
          </Stack>

          <Divider />

          {/* ── 예금자보호법 정보 행 ─────────────────────
              InfoRow는 string만 받으므로 Inline으로 직접 구성.
              클릭 시 예금자보호 상세 안내로 이동 — ChevronRight으로 탐색 가능 표시 */}
          <button
            type="button"
            onClick={onInsuranceInfo}
            className="w-full text-left hover:bg-surface-raised transition-colors duration-150 -mx-standard px-standard py-sm"
            aria-label="예금자보호 안내 상세 보기"
          >
            <Inline justify="between" align="center">
              <Inline gap="xs" align="center">
                <ShieldCheck className="size-4 text-success shrink-0" aria-hidden="true" />
                <Typography variant="body-sm" color="secondary">
                  예금자보호법에 의해 보호됩니다
                </Typography>
              </Inline>
              <ChevronRight className="size-4 text-text-muted" aria-hidden="true" />
            </Inline>
          </button>

          <Divider />

          {/* ── 거래내역 섹션 ────────────────────────────── */}
          <Stack gap="sm" className="pt-md">
            <SectionHeader title="거래내역" />
            <TransactionList
              items={transactions}
              onItemClick={onTransactionClick}
            />
          </Stack>
        </Stack>
      )}
    </PageLayout>
  );
}
