/**
 * @file index.tsx
 * @description 내카드관리 화면 카드 관리 패널 컴포넌트.
 *
 * SectionHeader로 "카드 관리" 제목을 표시하고,
 * 4개의 네비게이션 행(레이블 + 서브텍스트 + ChevronRight)을 세로로 배치한다.
 *
 * 반응형 동작:
 * - 행 패딩: py-md → sm:py-lg
 * - 레이블: text-sm → sm:text-base
 * - 서브텍스트: text-xs → sm:text-sm
 *
 * @param maskedCardNumber    - 마스킹된 카드번호. 예: '1234 **** **** 5678'
 * @param paymentBank         - 결제 은행명. 예: '하나은행'
 * @param maskedAccountNumber - 마스킹된 계좌번호. 예: '123-****-5678'
 * @param onCardInfo          - 카드정보 확인 클릭
 * @param onPaymentAccount    - 결제계좌 클릭
 * @param onPasswordSetting   - 카드 비밀번호 설정 클릭
 * @param onOverseasPayment   - 해외 결제 신청 클릭
 *
 * @example
 * <CardManagementPanel
 *   maskedCardNumber="1234 **** **** 5678"
 *   paymentBank="하나은행"
 *   maskedAccountNumber="123-****-5678"
 *   onCardInfo={() => {}}
 *   onPaymentAccount={() => {}}
 *   onPasswordSetting={() => {}}
 *   onOverseasPayment={() => {}}
 * />
 */
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@lib/cn';
import { SectionHeader } from '../../../modules/common/SectionHeader';
import type { CardManagementPanelProps } from './types';

interface NavRowProps {
  label:    string;
  /** 우측 보조 텍스트. 미전달 시 미노출 */
  subText?: string;
  onClick?: () => void;
}

/** 카드 관리 네비게이션 단일 행 */
function NavRow({ label, subText, onClick }: NavRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-between w-full',
        'py-md sm:py-lg',
        'border-b border-border-subtle last:border-b-0',
        /* 음수 마진으로 컨테이너 패딩을 상쇄해 hover 영역을 전체 너비로 확장 */
        'hover:bg-surface-subtle transition-colors duration-150 -mx-md px-md',
      )}
    >
      <span className="text-sm sm:text-base font-medium text-text-heading">{label}</span>
      <div className="flex items-center gap-xs shrink-0">
        {subText && (
          <span className="text-xs sm:text-sm text-text-muted">{subText}</span>
        )}
        <ChevronRight size={16} className="text-text-muted" aria-hidden="true" />
      </div>
    </button>
  );
}

export function CardManagementPanel({
  maskedCardNumber,
  paymentBank,
  maskedAccountNumber,
  onCardInfo,
  onPaymentAccount,
  onPasswordSetting,
  onOverseasPayment,
  className,
}: CardManagementPanelProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* SectionHeader — "카드 관리" 섹션 제목 */}
      <SectionHeader title="카드 관리" className="mb-xs" />

      <NavRow
        label="카드정보 확인"
        subText={maskedCardNumber}
        onClick={onCardInfo}
      />
      <NavRow
        label="결제계좌"
        subText={`${paymentBank} ${maskedAccountNumber}`}
        onClick={onPaymentAccount}
      />
      <NavRow
        label="카드 비밀번호 설정"
        onClick={onPasswordSetting}
      />
      <NavRow
        label="해외 결제 신청"
        onClick={onOverseasPayment}
      />
    </div>
  );
}
