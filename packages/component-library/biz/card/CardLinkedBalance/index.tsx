/**
 * @file index.tsx
 * @description 내카드관리 화면 연결계좌 잔액 컴포넌트.
 *
 * "연결계좌 잔액" 레이블과 금액을 표시한다.
 * hidden=true이면 금액을 '•••••'로 마스킹하고, 보기/숨기기 배지 버튼으로 전환한다.
 * hidden 상태 관리는 외부 Hook 담당.
 *
 * @param balance  - 연결계좌 잔액 (원)
 * @param hidden   - true: 금액 마스킹
 * @param onToggle - 보기/숨기기 버튼 클릭 핸들러
 *
 * @example
 * const [hidden, setHidden] = useState(false);
 * <CardLinkedBalance balance={1200000} hidden={hidden} onToggle={() => setHidden(h => !h)} />
 */
import React from 'react';
import { cn } from '@lib/cn';
import type { CardLinkedBalanceProps } from './types';

/** 금액을 한국식 원화 형식으로 변환. 예: 1200000 → '1,200,000원' */
function formatAmount(amount: number): string {
  return `${amount.toLocaleString('ko-KR')}원`;
}

export function CardLinkedBalance({ balance, hidden, onToggle, className }: CardLinkedBalanceProps) {
  return (
    <div className={cn('flex flex-col gap-xs', className)}>
      <span className="text-xs text-text-muted">연결계좌 잔액</span>

      <div className="flex items-center gap-sm">
        {/* hidden이면 마스킹 문자 표시, 아니면 실제 금액 */}
        <span className="text-xl font-bold text-text-heading">
          {hidden ? '•••••' : formatAmount(balance)}
        </span>

        {/* 보기/숨기기 배지 버튼 */}
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            'px-xs py-[2px] rounded-full',
            'text-[10px] font-bold',
            'bg-surface-raised text-text-muted',
            'hover:bg-surface-subtle transition-colors duration-150',
          )}
        >
          {hidden ? '보기' : '숨기기'}
        </button>
      </div>
    </div>
  );
}
