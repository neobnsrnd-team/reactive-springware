/**
 * @file TransactionHistoryFilterPage.tsx
 * @description 거래내역 조회 화면 — 조회 조건 필터 패널 포함 버전.
 *
 * Figma 원본: Hana Bank App (Transaction History1/2 완료)
 * 브랜드: 하나은행 (data-brand="hana")
 *
 * Image 1 (필터 접힘):
 *   조회 조건 영역이 "2023.10.01 ~ 2023.11.01 ∨" 한 줄로 표시된다.
 *
 * Image 2 (필터 펼침):
 *   "조회 조건 설정 ∧" 헤더 아래 다음 컨트롤이 표시된다.
 *   - 기간 탭    : 1개월(active) | 3개월 | 6개월 | 12개월 (TabNav pill)
 *   - 날짜 입력  : 시작일 / 종료일 Input (calender 아이콘)
 *   - 정렬/유형  : 최근순∨과거순 Select + 전체∨입금∨출금 Select + 조회 Button
 *
 * 구성 요소:
 * - PageLayout               : 헤더(뒤로가기 · '거래내역 조회' · 메뉴 아이콘)
 * - AccountSelectorCard      : 계좌 선택 카드
 * - FilterPanel(Card)        : 접힘/펼침 조회 조건 패널
 *   - TabNav(pill)           : 기간 선택 탭
 *   - Input(rightElement)    : 시작일/종료일 날짜 입력
 *   - Select × 2            : 정렬 기준 / 거래 유형
 *   - Button(primary)        : 조회 버튼
 * - TransactionGroupList     : 날짜별 거래내역 목록
 * - LoadMoreButton           : 더보기
 *
 * 데이터·상태는 useTransactionHistory 훅에서 관리하며, 이 컴포넌트는 UI 렌더링만 담당한다.
 */

import {
  AccountSelectorCard,
  Button,
  Card,
  Inline,
  Input,
  PageLayout,
  Select,
  Stack,
  TabNav,
  Text,
} from '@neobnsrnd-team/reactive-springware';
import { CalendarDays, ChevronDown, ChevronUp } from 'lucide-react';
import { useTransactionHistory } from './hook';
import type { Transaction } from './types';

/** 기간 탭 목록 — 정적 UI 데이터이므로 컴포넌트 파일에 위치 */
const PERIOD_TABS = [
  { id: '1m',  label: '1개월'  },
  { id: '3m',  label: '3개월'  },
  { id: '6m',  label: '6개월'  },
  { id: '12m', label: '12개월' },
];

/** 정렬 기준 옵션 */
const SORT_OPTIONS = [
  { value: 'recent', label: '최근순' },
  { value: 'oldest', label: '과거순' },
];

/** 거래 유형 옵션 */
const TYPE_OPTIONS = [
  { value: 'all',        label: '전체' },
  { value: 'deposit',    label: '입금' },
  { value: 'withdrawal', label: '출금' },
];

/** 금액 포매팅: 양수 → '+2,500,000원', 음수 → '-5,400원' */
const formatAmount = (amount: number): string =>
  (amount >= 0 ? '+' : '') + amount.toLocaleString('ko-KR') + '원';

/** 잔액 포매팅: 1234567 → '1,234,567' */
const formatBalance = (balance: number): string =>
  balance.toLocaleString('ko-KR');

export default function TransactionHistoryFilterPage() {
  const {
    account,
    transactionGroups,
    isFilterExpanded,
    selectedPeriod,
    startDate,
    endDate,
    sortOrder,
    transactionType,
    handleBack,
    handleAccountChange,
    handleFilterToggle,
    handlePeriodChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSortOrderChange,
    handleTransactionTypeChange,
    handleSearch,
    handleLoadMore,
  } = useTransactionHistory();

  return (
    /*
     * data-brand="hana": 하나은행 teal 색상 토큰 적용.
     * data-domain="banking": 은행 도메인 스타일 적용.
     */
    <div data-brand="hana" data-domain="banking">
      <PageLayout title="거래내역 조회" onBack={handleBack}>
        <Stack gap="md">

          {/* ── Section 1: 계좌 선택 카드 ─────────────────────── */}
          <AccountSelectorCard
            accountName={account.name}
            accountNumber={account.accountNumber}
            onAccountChange={handleAccountChange}
          />

          {/* ── Section 2: 조회 조건 패널 (접힘 ↔ 펼침) ──────── */}
          <Card>
            <Stack gap="md">

              {/*
               * 패널 헤더 토글 행.
               * 접힘: "2023.10.01 ~ 2023.11.01" + ChevronDown
               * 펼침: "조회 조건 설정"          + ChevronUp
               */}
              <Inline justify="between" align="center">
                <Text variant="body-sm" weight="medium" color="label">
                  {isFilterExpanded
                    ? '조회 조건 설정'
                    : `${startDate} ~ ${endDate}`}
                </Text>
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  onClick={handleFilterToggle}
                >
                  {isFilterExpanded
                    ? <ChevronUp size={16} />
                    : <ChevronDown size={16} />}
                </Button>
              </Inline>

              {/* 펼쳐진 경우에만 필터 컨트롤 렌더링 */}
              {isFilterExpanded && (
                <Stack gap="sm">

                  {/*
                   * 기간 선택 탭 (1개월 · 3개월 · 6개월 · 12개월).
                   * variant="pill": 세그먼트 컨트롤 스타일 — 선택된 탭은 brand 배경.
                   * fullWidth: 탭이 가로 전체를 균등하게 채운다.
                   */}
                  <TabNav
                    variant="pill"
                    fullWidth
                    items={PERIOD_TABS}
                    activeId={selectedPeriod}
                    onTabChange={handlePeriodChange}
                  />

                  {/*
                   * 조회 시작일 / 종료일 입력.
                   * rightElement: 캘린더 아이콘을 입력 필드 우측에 배치.
                   * fullWidth: 두 입력이 동일 너비로 나란히 표시.
                   */}
                  <Inline gap="sm">
                    <Input
                      value={startDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleStartDateChange(e.target.value)
                      }
                      rightElement={<CalendarDays size={16} />}
                      fullWidth
                    />
                    <Input
                      value={endDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleEndDateChange(e.target.value)
                      }
                      rightElement={<CalendarDays size={16} />}
                      fullWidth
                    />
                  </Inline>

                  {/*
                   * 정렬 기준 Select + 거래 유형 Select + 조회 Button.
                   * Select는 size/fullWidth prop 미지원 — Inline으로 균등 배분.
                   */}
                  <Inline gap="sm" align="center">
                    <Select
                      options={SORT_OPTIONS}
                      value={sortOrder}
                      onChange={handleSortOrderChange}
                    />
                    <Select
                      options={TYPE_OPTIONS}
                      value={transactionType}
                      onChange={handleTransactionTypeChange}
                    />
                    {/* 조회 버튼: primary → 하나은행 teal 색상 */}
                    <Button variant="primary" size="md" onClick={handleSearch}>
                      조회
                    </Button>
                  </Inline>

                </Stack>
              )}

            </Stack>
          </Card>

          {/* ── Section 3: 날짜별 거래내역 목록 ──────────────── */}
          <Stack gap="sm">
            {transactionGroups.map((group) => (
              <Stack key={group.date} gap="xs">

                {/* 날짜 헤더 (예: '11월 01일') — 연한 회색 캡션 */}
                <Text variant="caption" color="secondary">
                  {group.date}
                </Text>

                {group.transactions.map((t: Transaction) => (
                  <Card key={t.id}>
                    <Stack gap="xs">
                      {/*
                       * 상단 행: 거래처명(좌) + 금액(우).
                       * 출금 → danger(빨강), 입금 → brand(하나 teal).
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
