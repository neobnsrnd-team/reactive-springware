/**
 * @file index.tsx
 * @description 내카드관리 화면 연결계좌 잔액 컴포넌트.
 *
 * "연결계좌 잔액" 레이블과 금액을 표시한다.
 * 잔액 표시·숨김 전환은 modules/common/BalanceToggle 컴포넌트를 사용한다.
 * hidden 상태 관리는 외부 Hook 담당.
 *
 * 반응형 동작:
 * - 레이블: text-xs → sm:text-sm
 * - 금액: text-xl → sm:text-2xl
 *
 * @param balance  - 연결계좌 잔액 (원)
 * @param hidden   - true: 금액 마스킹
 * @param onToggle - 보기/숨기기 토글 클릭 핸들러
 *
 * @example
 * const [hidden, setHidden] = useState(false);
 * <CardLinkedBalance balance={1200000} hidden={hidden} onToggle={() => setHidden(h => !h)} />
 */
import React from 'react';
import { cn } from '@lib/cn';
import { BalanceToggle } from '../../../modules/common/BalanceToggle';
import type { CardLinkedBalanceProps } from './types';

/** 금액을 한국식 원화 형식으로 변환. 예: 1200000 → '1,200,000원' */
function formatAmount(amount: number): string {
  return `${amount.toLocaleString('ko-KR')}원`;
}

export function CardLinkedBalance({
  balance,
  hidden,
  onToggle,
  className,
}: CardLinkedBalanceProps) {
  return (
    <div className={cn('flex items-end justify-between gap-sm', className)}>
      {/* 좌: 레이블 + 금액 */}
      <div className="flex flex-col gap-xs">
        <span className="text-xs sm:text-sm text-text-muted">연결계좌 잔액</span>
        <span className="text-xl sm:text-2xl font-bold text-text-heading">
          {/* hidden이면 마스킹 문자, 아니면 실제 금액 */}
          {hidden ? '잔액 숨김 중' : formatAmount(balance)}
        </span>
      </div>

      {/* 우: BalanceToggle — 숨기기/보이기 토글 스위치 */}
      <BalanceToggle hidden={hidden} onToggle={onToggle} />
    </div>
  );
}
