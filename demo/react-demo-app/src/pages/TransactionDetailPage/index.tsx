/**
 * @file index.tsx
 * @description 거래 상세 정보 페이지.
 *
 * Figma 화면 구성 (node-id: 1:1159):
 * - 배경: 거래내역 조회 화면 (반투명 오버레이)
 * - 바텀시트 헤더: "거래 상세 정보" 타이틀 + 닫기 버튼
 * - 금액 영역: 출금 금액(대형 빨간 텍스트) + 거래 유형 배지 + 날짜
 * - 상세 항목 행: 메모(편집 가능), 거래구분, 거래일시, 거래내용,
 *                출금금액, 상대계좌(이체하기 버튼), 상대계좌 예금주명
 * - 하단 고정 확인 버튼
 *
 * 이 컴포넌트는 UI 레이아웃만 담당한다.
 * 상태 및 이벤트 로직은 useTransactionDetail Hook에서 처리한다.
 */

import { Pencil, Check, X } from 'lucide-react';
import {
  PageLayout,
  Stack,
  Inline,
  BottomSheet,
  Badge,
  Button,
  Typography,
  Input,
  CardRowPlain,
  CardActionRowPlain,
  EmptyState,
} from '@reactive-springware/component-library';
import { useTransactionDetail } from './useTransactionDetail';

// ──────────────────────────────────────────────
// 서브 컴포넌트
// ──────────────────────────────────────────────

/**
 * 거래 금액 헤더 섹션 컴포넌트.
 * 대형 금액 텍스트, 거래 유형 배지, 거래 일시를 표시한다.
 *
 * @param displayAmount - 표시용 금액 문자열 (예: '- 50,000원')
 * @param type - 거래 유형 (출금/입금에 따라 배지 색상이 달라진다)
 * @param displayDate - 표시용 거래 일시 문자열 (예: '2023.11.01 14:20:05')
 */
function TransactionAmountHeader({
  displayAmount,
  type,
  displayDate,
}: {
  displayAmount: string;
  type:          'deposit' | 'withdrawal' | 'transfer';
  displayDate:   string;
}) {
  /* 거래 유형별 배지 변형: 출금은 danger, 입금은 success, 이체는 brand */
  const badgeVariant = type === 'withdrawal' ? 'danger' : type === 'deposit' ? 'success' : 'brand';
  const typeLabel    = type === 'withdrawal' ? '출금'  : type === 'deposit'    ? '입금'    : '이체';

  return (
    <Stack gap="sm" align="center" className="py-md border-b border-border-subtle">
      {/* 대형 금액 텍스트 — 출금은 danger 색상, 입금은 success 색상 */}
      <Typography
        variant="heading"
        color={type === 'deposit' ? 'success' : 'danger'}
        numeric
        as="span"
      >
        {displayAmount}
      </Typography>

      {/* 거래 유형 배지 + 거래 일시 */}
      <Inline gap="sm" align="center">
        <Badge variant={badgeVariant}>{typeLabel}</Badge>
        <Typography variant="caption" color="muted">
          {displayDate}
        </Typography>
      </Inline>
    </Stack>
  );
}

/**
 * 메모 행 컴포넌트.
 * - 표시 모드: 메모 텍스트 + 연필 아이콘 버튼 (클릭 시 편집 모드 진입)
 * - 편집 모드: 텍스트 입력 필드 + 저장(✓) / 취소(✗) 버튼
 *
 * @param value - 현재 메모 값 (입력 필드에 표시)
 * @param isEditing - 편집 모드 여부
 * @param isSaving - 저장 진행 중 여부
 * @param onEditStart - 연필 클릭 → 편집 모드 진입
 * @param onEditCancel - 취소 클릭 → 편집 모드 종료 및 원래 값 복구
 * @param onChange - 입력값 변경 핸들러
 * @param onSave - 저장 클릭 → API 호출 후 편집 모드 종료
 */
function MemoRow({
  value,
  isEditing,
  isSaving,
  onEditStart,
  onEditCancel,
  onChange,
  onSave,
}: {
  value:       string;
  isEditing:   boolean;
  isSaving:    boolean;
  onEditStart: () => void;
  onEditCancel:() => void;
  onChange:    (v: string) => void;
  onSave:      () => void;
}) {
  if (isEditing) {
    /* ── 편집 모드: 입력 필드 + 저장/취소 버튼 ── */
    return (
      <CardActionRowPlain label="메모">
        <Inline gap="xs" align="center">
          <Input
            value={value}
            onChange={e => onChange(e.target.value)}
            size="md"
            placeholder="메모를 입력하세요"
            /* 자동 포커스: 편집 모드 진입 시 즉시 타이핑 가능하도록 */
            autoFocus
            /* Enter 키로 저장, Escape 키로 취소 */
            onKeyDown={e => {
              if (e.key === 'Enter')  onSave();
              if (e.key === 'Escape') onEditCancel();
            }}
          />
          {/* 저장 버튼 — iconOnly이므로 leftIcon으로 아이콘 전달 */}
          <Button
            variant="primary"
            size="sm"
            iconOnly
            leftIcon={<Check className="size-3" aria-hidden="true" />}
            onClick={onSave}
            loading={isSaving}
            aria-label="메모 저장"
          />
          {/* 취소 버튼 */}
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            leftIcon={<X className="size-3" aria-hidden="true" />}
            onClick={onEditCancel}
            disabled={isSaving}
            aria-label="메모 편집 취소"
          />
        </Inline>
      </CardActionRowPlain>
    );
  }

  /* ── 표시 모드: 메모 텍스트 + 연필 아이콘 ── */
  return (
    <CardActionRowPlain label="메모">
      <Inline gap="xs" align="center" className="bg-surface-raised border-b border-border px-sm py-xs rounded-sm">
        <Typography variant="body-sm" color="heading" as="span">
          {value || '메모 없음'}
        </Typography>
        {/* pencil 클릭 시 편집 모드로 전환 — iconOnly이므로 leftIcon으로 아이콘 전달 */}
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          leftIcon={<Pencil className="size-3" aria-hidden="true" />}
          onClick={onEditStart}
          aria-label="메모 편집"
        />
      </Inline>
    </CardActionRowPlain>
  );
}

/**
 * 상대계좌 행 컴포넌트.
 * 상대방 계좌번호와 이체하기 버튼을 나란히 표시한다.
 *
 * @param counterAccount - 상대방 계좌번호 문자열
 * @param onTransfer - 이체하기 버튼 클릭 핸들러
 */
function CounterAccountRow({
  counterAccount,
  onTransfer,
}: {
  counterAccount: string;
  onTransfer:     () => void;
}) {
  return (
    <CardActionRowPlain label="상대계좌">
      <Typography variant="body-sm" color="heading" as="span">
        {counterAccount}
      </Typography>
      {/*
       * "이체하기" 버튼: Figma 디자인에서 브랜드 색상의 pill 모양 버튼이다.
       * ghost 변형에 className으로 브랜드 배경/텍스트 색상을 덮어 쓴다.
       */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onTransfer}
        className="rounded-full bg-brand-10 text-brand-text hover:bg-brand-20 px-md py-xs text-xs"
      >
        이체하기
      </Button>
    </CardActionRowPlain>
  );
}

// ──────────────────────────────────────────────
// 메인 페이지 컴포넌트
// ──────────────────────────────────────────────

/**
 * 거래 상세 정보 페이지 컴포넌트.
 * useTransactionDetail Hook에서 데이터와 핸들러를 받아 UI를 렌더링한다.
 *
 * 데모 시나리오:
 * 1. 페이지 진입 시 바텀시트가 자동으로 열린다.
 * 2. 확인 버튼 또는 닫기(X) 버튼으로 바텀시트를 닫을 수 있다.
 * 3. 닫힌 후 "거래 상세 보기" 버튼으로 다시 열 수 있다.
 */
export function TransactionDetailPage() {
  const {
    isOpen,
    detail,
    isLoading,
    isSavingMemo,
    error,
    memo,
    isEditingMemo,
    displayDate,
    displayAmount,
    handleOpen,
    handleClose,
    handleMemoEditStart,
    handleMemoEditCancel,
    handleMemoChange,
    handleMemoSave,
    handleTransfer,
    handleConfirm,
  } = useTransactionDetail('txn-001'); /* 데모: 첫 번째 거래(체크카드 50,000원) 고정 */

  return (
    /* data-brand="hana": 하나은행 브랜드 토큰 적용 */
    <div data-brand="hana" data-domain="banking">
      <PageLayout
        title="거래내역 조회"
        onBack={() => window.history.back()}
      >
        {/* ── 바텀시트 트리거 영역 ── */}
        <section className="flex flex-col items-center justify-center py-2xl px-standard gap-lg">
          <Typography variant="body-sm" color="secondary" className="text-center">
            아래 버튼을 눌러 거래 상세 정보를 확인하세요
          </Typography>
          <Button
            variant="outline"
            onClick={handleOpen}
            aria-label="거래 상세 정보 바텀시트 열기"
          >
            거래 상세 보기 (데모)
          </Button>
        </section>
      </PageLayout>

      {/* ── 거래 상세 정보 바텀시트 ── */}
      <BottomSheet
        open={isOpen}
        onClose={handleClose}
        title="거래 상세 정보"
        footer={
          /* 확인 버튼: 클릭 시 바텀시트를 닫는다 */
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleConfirm}
            aria-label="거래 상세 정보 확인"
          >
            확인
          </Button>
        }
      >
        {/* ── 로딩 상태 ── */}
        {isLoading && (
          <EmptyState
            title="불러오는 중"
            description="거래 상세 정보를 가져오고 있습니다."
          />
        )}

        {/* ── 에러 상태 ── */}
        {!isLoading && error && (
          <EmptyState
            title="오류 발생"
            description={error}
          />
        )}

        {/* ── 정상 데이터 렌더링 ── */}
        {!isLoading && !error && detail && (
          <Stack gap="xs">
            {/* 금액 헤더 섹션 */}
            <TransactionAmountHeader
              displayAmount={displayAmount}
              type={detail.type}
              displayDate={displayDate}
            />

            {/* 상세 항목 목록 */}
            <Stack gap="xs" className="py-xs">
              {/* 메모 — 표시/편집 모드 전환 행 */}
              <MemoRow
                value={memo}
                isEditing={isEditingMemo}
                isSaving={isSavingMemo}
                onEditStart={handleMemoEditStart}
                onEditCancel={handleMemoEditCancel}
                onChange={handleMemoChange}
                onSave={handleMemoSave}
              />

              {/* 거래구분 */}
              <CardRowPlain
                label="거래구분"
                value={detail.transactionCategory}
              />

              {/* 거래일시 */}
              <CardRowPlain
                label="거래일시"
                value={displayDate}
              />

              {/* 거래내용 */}
              <CardRowPlain
                label="거래내용"
                value={detail.description}
              />

              {/* 출금금액 — 출금은 danger 색상으로 강조 */}
              <CardRowPlain
                label="출금금액"
                value={displayAmount}
                valueClassName={detail.type === 'withdrawal' ? 'text-danger-text' : 'text-success-text'}
              />

              {/* 상대계좌 — 이체하기 버튼 포함 행 */}
              <CounterAccountRow
                counterAccount={detail.counterAccount}
                onTransfer={handleTransfer}
              />

              {/* 상대계좌 예금주명 */}
              <CardRowPlain
                label="상대계좌 예금주명"
                value={detail.counterAccountHolder}
              />
            </Stack>
          </Stack>
        )}
      </BottomSheet>
    </div>
  );
}
