/**
 * @file index.tsx
 * @description 카드 이용내역 화면 상단 청구 요약 카드 컴포넌트.
 *
 * 총 청구금액을 크게 강조하고, 리볼빙·카드론·현금서비스 세부 항목을
 * 3열 그리드로 표시한다. 하단 회색 영역에 결제 계좌와 결제일을 노출한다.
 *
 * 표시 규칙:
 * - revolving / cardLoan / cashAdvance 가 0 또는 미전달이면 '0원'으로 표시
 * - 중간 열에 border-x 구분선을 적용해 시각적 분리
 *
 * @param month          - 청구 월. 예: '3월'
 * @param totalAmount    - 총 청구금액 (원)
 * @param revolving      - 리볼빙 금액 (원)
 * @param cardLoan       - 카드론 금액 (원)
 * @param cashAdvance    - 현금서비스 금액 (원)
 * @param paymentAccount - 결제 계좌. 예: '하나은행 123-456789-01234'
 * @param paymentDate    - 결제일. 예: '매월 14일'
 *
 * @example
 * <CardPaymentSummary
 *   month="3월"
 *   totalAmount={350000}
 *   revolving={50000}
 *   cardLoan={0}
 *   cashAdvance={0}
 *   paymentAccount="하나은행 123-456789-01234"
 *   paymentDate="매월 14일"
 * />
 */
import React from 'react';
import { cn } from '@lib/cn';
import type { CardPaymentSummaryProps } from './types';

/** 금액을 한국식 원화 형식으로 변환. 예: 350000 → '350,000원' */
function formatAmount(amount: number): string {
  return `${amount.toLocaleString('ko-KR')}원`;
}

interface SummaryColProps {
  label: string;
  amount: number;
  /** 중간 열: 좌우 border 구분선 적용 */
  bordered?: boolean;
}

/** 청구 세부 항목 1열 — 레이블 + 금액 */
function SummaryCol({ label, amount, bordered }: SummaryColProps) {
  return (
    <div
      className={cn(
        'flex-1 flex flex-col items-center gap-[2px]',
        bordered && 'border-x border-border-subtle',
      )}
    >
      <span className="text-xs text-text-muted">{label}</span>
      <span className="text-sm font-bold text-text-heading">{formatAmount(amount)}</span>
    </div>
  );
}

export function CardPaymentSummary({
  month,
  totalAmount,
  revolving = 0,
  cardLoan = 0,
  cashAdvance = 0,
  paymentAccount,
  paymentDate,
  className,
}: CardPaymentSummaryProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-md',
        'bg-surface rounded-2xl overflow-hidden',
        'shadow-card',
        className,
      )}
    >
      {/* 상단: 총 청구금액 */}
      <div className="flex flex-col items-center gap-xs pt-lg px-md">
        <span className="text-sm text-text-muted">{month} 청구금액</span>
        <span className="text-3xl font-bold text-brand">{formatAmount(totalAmount)}</span>
      </div>

      {/* 중단: 세부 항목 3열 그리드 */}
      <div className="flex items-start px-md pb-md">
        <SummaryCol label="리볼빙" amount={revolving} />
        {/* 중간 열에 border-x 적용해 좌우 항목과 시각적으로 구분 */}
        <SummaryCol label="카드론" amount={cardLoan} bordered />
        <SummaryCol label="현금서비스" amount={cashAdvance} />
      </div>

      {/* 하단: 결제 계좌·결제일 메타 정보 */}
      <div className="bg-surface-subtle px-md py-sm flex flex-col gap-xs">
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-muted">결제계좌</span>
          <span className="text-xs font-medium text-text-base">{paymentAccount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-muted">결제일</span>
          <span className="text-xs font-medium text-text-base">{paymentDate}</span>
        </div>
      </div>
    </div>
  );
}
