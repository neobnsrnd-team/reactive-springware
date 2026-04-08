/**
 * @file index.tsx
 * @description 카드 대출 메뉴 가로 바 컴포넌트.
 *
 * 단기카드대출 / 장기카드대출 / 리볼빙 등 카드 금융 서비스 진입점을
 * 가로로 배열한 pill 형태의 메뉴 바다. 아이콘 + 텍스트 조합으로 각 서비스를 표시한다.
 * items 배열 길이에 따라 동일 너비로 분할되며, 항목이 많을 경우 가로 스크롤로 처리한다.
 *
 * @param items - 메뉴 항목 목록 (id / icon / label / onClick)
 *
 * @example
 * <LoanMenuBar
 *   items={[
 *     { id: 'short',    icon: <CreditCard size={14} />, label: '단기카드대출', onClick: () => {} },
 *     { id: 'long',     icon: <Banknote size={14} />,   label: '장기카드대출', onClick: () => {} },
 *     { id: 'revolving',icon: <RefreshCw size={14} />,  label: '리볼빙',       onClick: () => {} },
 *   ]}
 * />
 */
import React from 'react'
import { cn } from '@lib/cn'
import type { LoanMenuBarProps } from './types'

export function LoanMenuBar({ items, className }: LoanMenuBarProps) {
  return (
    /* 회색 pill 컨테이너 — 전체 너비, 고정 높이, 가로 스크롤 허용 */
    <div
      className={cn(
        'flex items-center w-full h-[60px]',
        'bg-surface-raised rounded-full',
        'overflow-x-auto scrollbar-none',
        'px-md gap-xs',
        className,
      )}
    >
      {items.map(item => (
        <button
          key={item.id}
          type="button"
          onClick={item.onClick}
          className={cn(
            'flex items-center gap-sm shrink-0',
            'px-md py-sm rounded-full',
            'text-sm font-bold text-text-label',
            'hover:bg-surface transition-colors duration-150',
            'whitespace-nowrap',
          )}
        >
          {/* 아이콘 */}
          <span className="text-text-secondary shrink-0">{item.icon}</span>
          {/* 레이블 */}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  )
}
