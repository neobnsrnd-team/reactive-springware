/**
 * @file page.tsx
 * @description 거래내역 조회 화면.
 *
 * Figma 원본: Hana Bank App node-id: 1-2201 (Hana Bank Transaction History1(완료))
 * 브랜드: KB 국민은행 (data-brand="kb")
 *
 * 구성 요소:
 * - PageLayout           : 헤더(뒤로가기 버튼 · '거래내역 조회' 제목)
 * - AccountSelectorCard  : 조회 기준 계좌 (계좌명 · 계좌번호 · 계좌 변경 버튼)
 * - DateRangeFilter      : 조회 기간 텍스트 + 캘린더 아이콘 버튼
 * - TransactionGroupList : 날짜별 거래내역 그룹 목록
 *   - DateLabel          : 날짜 헤더 (예: '11월 01일')
 *   - TransactionItem    : 거래 단건 (거래처 · 금액 · 시각 · 잔액)
 * - LoadMoreButton       : 더보기 버튼 (추가 거래내역 로드)
 *
 * 데이터·상태는 useTransactionHistory 훅에서 관리하며, 이 컴포넌트는 UI 렌더링만 담당한다.
 */

import {
  AccountSelectorCard,
  Button,
  Card,
  Inline,
  PageLayout,
  Stack,
  Text,
} from '@neobnsrnd-team/reactive-springware';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { useTransactionHistory } from './hook';
import type { Transaction } from './types';

/**
 * 금액을 한국어 통화 형식으로 포매팅.
 * 양수 → '+1,234원', 음수 → '-1,234원'
 */
const formatAmount = (amount: number): string =>
  (amount >= 0 ? '+' : '') + amount.toLocaleString('ko-KR') + '원';

/** 잔액을 천 단위 콤마 형식으로 포매팅 (예: 2994600 → '2,994,600') */
const formatBalance = (balance: number): string =>
  balance.toLocaleString('ko-KR');

export default function TransactionHistoryPage() {
  const {
    account,
    dateRange,
    transactionGroups,
    handleBack,
    handleAccountChange,
    handleDateRangeChange,
    handleLoadMore,
  } = useTransactionHistory();

  return (
    /*
     * data-brand="kb": KB 국민은행 색상 토큰 적용 (brand-primary: #ffbc00).
     * data-domain="banking": 은행 도메인 스타일 적용.
     * PageLayout이 data-brand prop을 미지원하므로 래퍼 div로 감싼다.
     */
    <div data-brand="kb" data-domain="banking">
      <PageLayout title="거래내역 조회" onBack={handleBack}>
        <Stack gap="md">

          {/* ── Section 1: 조회 기준 계좌 ─────────────────────── */}
          {/*
           * AccountSelectorCard: 계좌명 · 계좌번호 표시 + 계좌 변경 버튼.
           * component-lib Biz 컴포넌트를 사용하여 계좌 선택 UI를 통일한다.
           */}
          <AccountSelectorCard
            accountName={account.name}
            accountNumber={account.accountNumber}
            onAccountChange={handleAccountChange}
          />

          {/* ── Section 2: 조회 기간 필터 ─────────────────────── */}
          <Card>
            <Inline justify="between">
              {/* 현재 선택된 조회 기간 텍스트 */}
              <Text variant="body-sm" weight="medium" color="label">
                {dateRange}
              </Text>

              {/*
               * 캘린더 아이콘 버튼: 클릭 시 날짜 선택 UI를 연다.
               * iconOnly prop으로 버튼 패딩을 최소화한다.
               */}
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                onClick={handleDateRangeChange}
              >
                <CalendarDays size={16} />
              </Button>
            </Inline>
          </Card>

          {/* ── Section 3: 날짜별 거래내역 목록 ──────────────── */}
          <Stack gap="sm">
            {transactionGroups.map((group) => (
              <Stack key={group.date} gap="xs">

                {/* 날짜 헤더: 예) '11월 01일' */}
                <Text variant="caption" color="secondary">
                  {group.date}
                </Text>

                {/* 해당 날짜의 거래 목록 */}
                {group.transactions.map((t: Transaction) => (
                  <Card key={t.id}>
                    <Stack gap="xs">

                      {/*
                       * 상단 행: 거래처명(좌) + 거래금액(우).
                       * 출금은 danger(빨강), 입금은 brand(KB 골드) 색상으로 구분.
                       */}
                      <Inline justify="between">
                        <Text variant="body" color="heading">
                          {t.merchant}
                        </Text>
                        <Text
                          variant="body"
                          color={t.amount < 0 ? 'danger' : 'brand'}
                          numeric
                        >
                          {formatAmount(t.amount)}
                        </Text>
                      </Inline>

                      {/* 하단 행: 거래 시각(좌) + 거래 후 잔액(우) */}
                      <Inline justify="between">
                        <Text variant="caption" color="muted">
                          {t.time}
                        </Text>
                        <Text variant="caption" color="muted" numeric>
                          잔액 {formatBalance(t.balance)}원
                        </Text>
                      </Inline>

                    </Stack>
                  </Card>
                ))}

              </Stack>
            ))}
          </Stack>

          {/* ── 더보기 버튼 ───────────────────────────────────── */}
          {/*
           * 추가 거래내역을 로드한다.
           * 실제 구현 시 React Query의 fetchNextPage와 연결한다.
           */}
          <Card>
            <Inline justify="center">
              <Button
                variant="ghost"
                size="md"
                onClick={handleLoadMore}
                rightIcon={<ChevronDown size={16} />}
              >
                <Text variant="body-sm" color="muted">더보기</Text>
              </Button>
            </Inline>
          </Card>

        </Stack>
      </PageLayout>
    </div>
  );
}
