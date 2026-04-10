/**
 * @file index.tsx
 * @description 모바일 전용 하단 오버레이 시트 컴포넌트.
 *
 * Modal과의 차이:
 * - 뷰포트 너비와 무관하게 항상 화면 하단에 고정 (Modal은 md 이상에서 중앙 다이얼로그로 전환)
 * - snap prop으로 높이 프리셋 제어 ('auto' | 'half' | 'full')
 * - 이체 확인, 약관 동의, 옵션 선택 등 모바일 액션 시트에 사용
 *
 * @example
 * // 이체 확인 시트 (버튼 2개)
 * <BottomSheet
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="이체 확인"
 *   hideCloseButton
 *   bottomBtnCnt="2"
 *   bottomBtn1Label="예"
 *   bottomBtn2Label="아니오"
 *   onClickBtn1={handleConfirm}
 *   onClickBtn2={() => setOpen(false)}
 * >
 *   <CardRow label="받는 분" value="홍길동" />
 *   <CardRow label="금액" value="50,000원" />
 * </BottomSheet>
 */
import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@lib/cn';
import type { BottomSheetProps, BottomSheetSnap } from './types';
import { Button, ButtonGroup } from '../../core/Button';

export type { BottomSheetProps, BottomSheetSnap } from './types';

/** snap 프리셋 → 높이 Tailwind 클래스
 * half/full은 명시적 h-[...]로 height를 확정값으로 지정해 flex-1이 정상 동작.
 * auto는 h-[min(fit-content,90%)]로 콘텐츠 높이를 기본으로 하되 90% 상한을 지정.
 * max-h만 사용하면 flex 부모 height가 indefinite가 되어 body flex-1이 붕괴된다. */
const SNAP_CLASS: Record<BottomSheetSnap, string> = {
  auto: 'h-[min(fit-content,90%)]',
  half: 'h-[50%] max-h-[50%]',
  full: 'h-[90%] max-h-[90%]',
};

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  bottomBtnCnt = '0',
  bottomBtn1Label = "확인",
  bottomBtn2Label = "취소",
  onClickBtn1 = () => {},
  onClickBtn2 = () => {},
  snap = 'auto',
  disableBackdropClose = false,
  hideCloseButton = false,
  container,
  className,
}: BottomSheetProps) {
  /* ESC 키로 닫기 */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  // container가 있을 때는 absolute, 없으면 fixed (viewport 기준)
  // const pos = container ? "absolute" : "fixed";
  const target = container ?? document.body;
  const isContainer = !!container;

  const overlayStyle = isContainer
    ? { position: 'absolute' as const, inset: 0 }
    : { position: 'fixed' as const, inset: 0 };

  useEffect(() => {
    if (!open) return;

    document.addEventListener('keydown', handleKeyDown);
    
    /* 시트가 열린 동안 body 스크롤 잠금 */
    if (!isContainer) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      if (!isContainer) {
        document.body.style.overflow = '';
      }
    };
  }, [open, handleKeyDown, isContainer]);

  if (!open) return null;

  return createPortal(
    /*
     * 백드롭: fixed inset-0으로 뷰포트 전체 덮기
     * items-end justify-center: 항상 하단 고정
     */
    <div
      role="presentation"
      onClick={disableBackdropClose ? undefined : onClose}
      style={overlayStyle}
      className={cn(
        'z-modal flex items-end justify-center bg-black/50 backdrop-blur-sm'
      )}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'flex flex-col w-full',
          SNAP_CLASS[snap],
          'bg-surface shadow-2xl',
          'rounded-t-2xl',
          className,
        )}
      >
        {/* 드래그 핸들 */}
        <div className="flex shrink-0 justify-center pt-3 pb-1" aria-hidden="true">
          <span className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* 헤더 — 타이틀 중앙 정렬, 닫기 버튼 우측 절대 배치 */}
        {/* title 또는 닫기 버튼 중 하나라도 있을 때만 헤더 영역 렌더링 */}
        {(title || !hideCloseButton) && (
          <div className="relative flex shrink-0 items-center justify-center px-xl pt-sm pb-md">
            {title && (
              <h2
                id="bottom-sheet-title"
                className="text-base font-bold text-text-heading text-center"
              >
                {title}
              </h2>
            )}
            {/* hideCloseButton=false(기본)일 때만 X 버튼 렌더링.
                absolute 배치로 타이틀 중앙 정렬에 영향을 주지 않음 */}
            {!hideCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="시트 닫기"
                className={cn(
                  'absolute right-xl flex items-center justify-center size-8 rounded-lg',
                  'text-text-muted hover:bg-surface-raised hover:text-text-heading',
                  'transition-colors duration-150',
                )}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        {/*
         * 본문 (스크롤 영역)
         * flex-1 + min-h-0: 헤더·푸터 제외 공간을 차지하면서 내부 스크롤 허용
         * pt-md: 헤더 유무와 관계없이 콘텐츠 상단 여백 보장
         *   - 헤더 있음: 헤더 pb-md(12px) + 본문 pt-md(12px) = 24px 간격
         *   - 헤더 없음: 드래그 핸들 pb-1(4px) + 본문 pt-md(12px) = 16px 간격
         */}
        <div
          className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden p-md"
          style={{ scrollbarWidth: 'none' }}
        >
          {children}
        </div>

        {/* 푸터 (고정) — 하단 안전 영역(Safe Area) 여백 pb-safe 포함 */}
        {(Number(bottomBtnCnt) > 0) && (
          <ButtonGroup className='shrink-0 border-t border-border-subtle px-xl pt-md pb-[calc(env(safe-area-inset-bottom,0px)+theme(spacing.xl))]'>
            {((Number(bottomBtnCnt) == 2)) && <Button variant="outline" fullWidth onClick={onClickBtn2}>{bottomBtn2Label}</Button>}
            <Button variant="primary" fullWidth onClick={onClickBtn1}>{bottomBtn1Label}</Button>
          </ButtonGroup>
        )}
      </div>
    </div>,
    target,
  );
}
