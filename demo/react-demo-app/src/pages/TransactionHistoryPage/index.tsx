/**
 * @file index.tsx
 * @description 거래내역 조회 페이지.
 *
 * Figma 화면 구성:
 * - 상단 헤더: "거래내역 조회" 타이틀 + 뒤로가기 + 우측 메뉴 아이콘
 * - 계좌 선택 카드: 계좌명 + 계좌번호 + 아이콘
 * - 날짜 범위 필터: 'YYYY.MM.DD ~ YYYY.MM.DD' 드롭다운 형태
 * - 날짜별 그룹 거래 목록 (TransactionList 컴포넌트 사용)
 * - 하단 "더보기" 버튼
 *
 * 이 컴포넌트는 UI 레이아웃만 담당한다.
 * 상태 및 데이터 로직은 useTransactionHistory Hook에서 처리한다.
 */

import { Menu, BookOpen, ChevronDown } from 'lucide-react';
import {
  PageLayout,
  Stack,
  Card,
  CardHeader,
  TransactionList,
  Button,
} from '@react-page-forge/component-library';
import { useTransactionHistory } from './useTransactionHistory';

// ──────────────────────────────────────────────
// 서브 컴포넌트
// ──────────────────────────────────────────────

/**
 * 계좌 정보 카드 컴포넌트.
 * 계좌명, 계좌번호, 뱅킹 아이콘을 표시한다.
 *
 * @param accountName - 계좌명
 * @param accountNumber - 계좌번호
 */
function AccountCard({
  accountName,
  accountNumber,
}: {
  accountName:   string;
  accountNumber: string;
}) {
  return (
    <Card className="mx-standard">
      <CardHeader
        title={accountName}
        subtitle={accountNumber}
        /* 뱅킹 아이콘 — 우측에 배치하기 위해 action 슬롯 사용 */
        action={
          <span className="flex items-center justify-center size-10 rounded-xl bg-brand-5 text-brand-text">
            <BookOpen className="size-5" aria-hidden="true" />
          </span>
        }
      />
    </Card>
  );
}

/**
 * 날짜 범위 필터 버튼 컴포넌트.
 * 현재 선택된 날짜 범위를 표시하고, 클릭 시 날짜 선택 UI를 여는 역할이다.
 * (현재 데모에서는 표시 전용)
 *
 * @param label - 표시할 날짜 범위 문자열 (예: '2023.10.01 ~ 2023.11.01')
 */
function DateRangeFilter({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-between w-full px-standard py-sm text-sm text-text-secondary bg-surface border-b border-border-subtle"
      aria-label={`조회 기간 ${label}, 클릭하여 변경`}
    >
      <span className="font-medium">{label}</span>
      <ChevronDown className="size-4 text-text-muted shrink-0" aria-hidden="true" />
    </button>
  );
}

// ──────────────────────────────────────────────
// 메인 페이지 컴포넌트
// ──────────────────────────────────────────────

/**
 * 거래내역 조회 페이지 컴포넌트.
 * useTransactionHistory Hook에서 데이터와 핸들러를 받아 UI를 렌더링한다.
 */
export function TransactionHistoryPage() {
  const {
    account,
    transactions,
    isLoading,
    error,
    dateRangeLabel,
    hasMore,
    isLoadingMore,
    handleLoadMore,
  } = useTransactionHistory();

  return (
    /* data-brand="hana" — 하나은행 브랜드 토큰 적용 */
    <div data-brand="hana" data-domain="banking">
      <PageLayout
        title="거래내역 조회"
        onBack={() => window.history.back()}
        rightAction={
          <button
            type="button"
            aria-label="메뉴 열기"
            className="flex items-center justify-center size-9 rounded-lg text-text-muted hover:bg-surface-raised transition-colors duration-150"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        }
      >
        <Stack gap="xs">
          {/* ── 계좌 카드 섹션 ── */}
          <section className="pt-standard pb-xs">
            {account ? (
              <AccountCard
                accountName={account.name}
                accountNumber={account.accountNumber}
              />
            ) : (
              /* 계좌 정보 로딩 중 스켈레톤 */
              <div className="mx-standard h-20 bg-surface-raised rounded-xl animate-pulse" aria-hidden="true" />
            )}
          </section>

          {/* ── 날짜 범위 필터 섹션 ── */}
          <section>
            <DateRangeFilter label={dateRangeLabel} />
          </section>

          {/* ── 거래 내역 목록 섹션 ── */}
          <section>
            {/* 에러 상태 */}
            {error && !isLoading && (
              <div
                className="flex items-center justify-center py-2xl px-standard text-sm text-danger-text"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* 거래 내역 목록 (loading/empty/data 상태를 TransactionList 내부에서 처리) */}
            {!error && (
              <TransactionList
                items={transactions}
                loading={isLoading}
                emptyMessage="조회된 거래 내역이 없어요"
              />
            )}
          </section>

          {/* ── 더보기 버튼 섹션 ── */}
          {(hasMore || isLoadingMore) && !isLoading && !error && (
            <section className="flex justify-center py-lg pb-2xl">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLoadMore}
                loading={isLoadingMore}
                /* 우측에 chevron 아이콘 표시 */
                rightIcon={!isLoadingMore ? <ChevronDown className="size-4" /> : undefined}
              >
                더보기
              </Button>
            </section>
          )}
        </Stack>
      </PageLayout>
    </div>
  );
}
