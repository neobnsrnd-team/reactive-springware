/**
 * @file index.tsx
 * @description 하나카드 내카드관리 페이지 컴포넌트.
 *
 * 화면 구성:
 *   - 상단바: 뒤로가기 / "내카드관리" 타이틀 / 닫기(X) 아이콘
 *   - 카드 선택기: 현재 선택된 카드명 + ChevronDown → BottomSheet로 카드 목록 선택
 *   - CardVisual: 선택된 카드 이미지·브랜드·카드명
 *   - CardLinkedBalance: 연결계좌 잔액 (보기/숨기기 토글)
 *   - CardManagementPanel: 카드 관리 네비게이션 행 목록 (rows prop으로 동적 구성)
 *
 * Storybook 확인 목적으로 내부 useState 사용.
 * 실제 앱 구현 시 모든 상태·핸들러는 useMyCardManagement Hook으로 분리한다.
 *
 * @param cards           - 보유 카드 목록
 * @param initialCardId   - 초기 선택 카드 ID (기본: 첫 번째)
 * @param managementRows  - CardManagementPanel 행 목록
 * @param onBack          - 뒤로가기 핸들러
 * @param onClose         - 닫기 핸들러
 */
import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

import { PageLayout }          from '../../../layout/PageLayout';
import { Button }              from '../../../core/Button';
import { BottomSheet }         from '../../../modules/common/BottomSheet';
import { CardVisual }          from '../../../biz/card/CardVisual';
import { CardLinkedBalance }   from '../../../biz/card/CardLinkedBalance';
import { CardManagementPanel } from '../../../biz/card/CardManagementPanel';

import type { MyCardManagementPageProps, CardItem } from './types';

/** 카드 선택 BottomSheet 내 단일 항목 */
function CardSelectItem({
  card,
  selected,
  onSelect,
}: {
  card:     CardItem;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex items-center justify-between w-full px-md py-md hover:bg-surface-subtle transition-colors rounded-lg"
    >
      <div className="flex flex-col items-start gap-xs">
        <span className="text-xs text-text-muted font-medium">{card.brand}</span>
        <span className="text-sm font-bold text-text-heading">{card.name}</span>
      </div>
      {/* 선택된 카드는 브랜드 색상 원형 인디케이터로 표시 */}
      {selected && (
        <span className="size-2 rounded-full bg-brand shrink-0" aria-hidden="true" />
      )}
    </button>
  );
}

export function MyCardManagementPage({
  cards,
  initialCardId,
  managementRows,
  onBack,
  onClose,
}: MyCardManagementPageProps) {
  const [selectedCardId, setSelectedCardId] = useState(initialCardId ?? cards[0]?.id);
  const [isSheetOpen,    setIsSheetOpen]    = useState(false);
  const [balanceHidden,  setBalanceHidden]  = useState(false);

  const selectedCard = cards.find((c) => c.id === selectedCardId) ?? cards[0];

  return (
    <PageLayout
      title="내카드관리"
      onBack={onBack}
      rightAction={
        <Button
          variant="ghost"
          size="md"
          iconOnly
          leftIcon={<X className="size-5" />}
          onClick={onClose}
          aria-label="닫기"
        />
      }
    >
      <div className="flex flex-col gap-lg pt-standard">

        {/* ── 카드 선택기 ──────────────────────────────── */}
        <button
          type="button"
          onClick={() => setIsSheetOpen(true)}
          className="flex items-center gap-xs self-start px-md py-xs rounded-full bg-surface-raised hover:bg-surface-subtle transition-colors"
          aria-label="카드 선택"
        >
          <span className="text-sm font-bold text-text-heading">{selectedCard?.name}</span>
          <ChevronDown size={16} className="text-text-muted" aria-hidden="true" />
        </button>

        {/* ── 카드 비주얼 ─────────────────────────────── */}
        <CardVisual
          cardImage={selectedCard?.image}
          brand={selectedCard?.brand ?? 'VISA'}
          cardName={selectedCard?.name ?? ''}
          className="px-standard"
        />

        {/* ── 연결계좌 잔액 ────────────────────────────── */}
        <CardLinkedBalance
          balance={selectedCard?.balance ?? 0}
          hidden={balanceHidden}
          onToggle={() => setBalanceHidden((h) => !h)}
          className="px-standard"
        />

        {/* ── 카드 관리 패널 ───────────────────────────── */}
        <CardManagementPanel
          rows={managementRows}
          className="px-standard pb-standard"
        />
      </div>

      {/* ── 카드 선택 BottomSheet ────────────────────── */}
      <BottomSheet
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="카드 선택"
        snap="auto"
      >
        <div className="flex flex-col">
          {cards.map((card) => (
            <CardSelectItem
              key={card.id}
              card={card}
              selected={card.id === selectedCardId}
              onSelect={() => {
                setSelectedCardId(card.id);
                setIsSheetOpen(false);
              }}
            />
          ))}
        </div>
      </BottomSheet>
    </PageLayout>
  );
}
