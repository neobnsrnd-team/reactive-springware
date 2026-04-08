/**
 * @file index.tsx
 * @description 하나카드 내카드관리 페이지 컴포넌트.
 *
 * 화면 구성:
 *   - 상단바: 뒤로가기 / "내카드관리" 타이틀 / 닫기(X) 아이콘
 *   - 카드 선택기: 보유 카드를 가로 스크롤 칩 탭으로 표시, 클릭 시 즉시 전환
 *   - CardVisual: 선택된 카드 이미지·브랜드·카드명
 *   - Divider
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
import { X } from 'lucide-react';

import { PageLayout }          from '../../../layout/PageLayout';
import { Button }              from '../../../core/Button';
import { Divider }             from '../../../modules/common/Divider';
import { CardVisual }          from '../../../biz/card/CardVisual';
import { CardLinkedBalance }   from '../../../biz/card/CardLinkedBalance';
import { CardManagementPanel } from '../../../biz/card/CardManagementPanel';

import type { MyCardManagementPageProps } from './types';

export function MyCardManagementPage({
  cards,
  initialCardId,
  managementRows,
  onBack,
  onClose,
}: MyCardManagementPageProps) {
  const [selectedCardId, setSelectedCardId] = useState(initialCardId ?? cards[0]?.id);
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
      <div className="flex flex-col pt-standard">

        {/* ── 카드 선택 칩 탭 (가로 스크롤) ─────────────
         * 카드가 많아져도 가로 스크롤로 자연스럽게 확장.
         * 선택된 칩만 브랜드 색상 배경으로 강조.
         * -mx-standard + px-standard: 컨테이너 패딩을 상쇄해 끝까지 스크롤 가능. */}
        <div className="overflow-x-auto -mx-standard px-standard pb-md [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-xs w-max">
            {cards.map((card) => {
              const isSelected = card.id === selectedCardId;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setSelectedCardId(card.id)}
                  className={
                    isSelected
                      /* 선택: 브랜드 색상 배경 */
                      ? 'flex items-center gap-xs px-md py-xs rounded-full bg-brand text-brand-fg text-sm font-bold transition-colors duration-150 whitespace-nowrap'
                      /* 미선택: 회색 배경 */
                      : 'flex items-center gap-xs px-md py-xs rounded-full bg-surface-raised text-text-secondary text-sm font-medium transition-colors duration-150 whitespace-nowrap hover:bg-surface-subtle'
                  }
                  aria-pressed={isSelected}
                  aria-label={card.name}
                >
                  {card.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 카드 비주얼 ─────────────────────────────── */}
        <CardVisual
          cardImage={selectedCard?.image}
          brand={selectedCard?.brand ?? 'VISA'}
          cardName={selectedCard?.name ?? ''}
          className="px-standard pb-lg"
        />

        <Divider />

        {/* ── 연결계좌 잔액 ────────────────────────────── */}
        <CardLinkedBalance
          balance={selectedCard?.balance ?? 0}
          hidden={balanceHidden}
          onToggle={() => setBalanceHidden((h) => !h)}
          className="px-standard py-lg"
        />

        {/* ── 카드 관리 패널 ───────────────────────────── */}
        <CardManagementPanel
          rows={managementRows}
          className="px-standard pb-standard"
        />

      </div>
    </PageLayout>
  );
}
