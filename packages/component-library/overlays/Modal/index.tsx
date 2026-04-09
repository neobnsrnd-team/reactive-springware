/**
 * @file index.tsx
 * @description 범용 모달 다이얼로그 컴포넌트.
 * 화면 중앙에 표시되는 오버레이. BottomSheet와 달리 데스크톱·모바일 모두 중앙 정렬된다.
 * createPortal로 document.body(또는 container)에 렌더링한다.
 *
 * @example
 * // 확인/취소 버튼 포함
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="이체 확인"
 *   bottomBtnCnt="2"
 *   bottomBtn1Label="확인"
 *   bottomBtn2Label="취소"
 *   onClickBtn1={handleConfirm}
 *   onClickBtn2={() => setOpen(false)}
 * >
 *   <p>이체를 진행하시겠습니까?</p>
 * </Modal>
 */
import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@lib/cn';
import type { ModalProps } from './types';
import { Button, ButtonGroup } from '../../core/Button';

export function Modal({
  open,
  onClose,
  title,
  children,
  bottomBtnCnt = "0",
  bottomBtn1Label = "확인",
  bottomBtn2Label = "취소",
  onClickBtn1 = () => {},
  onClickBtn2 = () => {},
  disableBackdropClose = false,
  container,
  className,
}: ModalProps) {
  /* ESC 키로 닫기 */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  const target = container ?? document.body;
  const isContainer = !!container;

  const overlayStyle = isContainer
    ? { position: 'absolute' as const, inset: 0 }
    : { position: 'fixed' as const, inset: 0 };

  useEffect(() => {
    if (!open) return;

    document.addEventListener('keydown', handleKeyDown);

    // container 모드일 때는 body scroll 막지 않음
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
    <>
    {/* Backdrop */}
    <div
      role="presentation"
      onClick={disableBackdropClose ? undefined : onClose}
      style={overlayStyle}
      className={cn(
        'z-overlay',
        'flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'
      )}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'flex flex-col',
          'w-full max-w-lg',
          'bg-surface shadow-2xl',
          'rounded-2xl',
          'pointer-events-auto',
          isContainer
            ? 'max-h-full'
            : 'max-h-[calc(100dvh-80px)]',
          className,
        )}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between px-xl pt-md pb-md">
          {title ? (
            <h2
              id="modal-title"
              className="text-base font-bold text-text-heading"
            >
              {title}
            </h2>
          ) : (
            <span aria-hidden="true" />
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
            className={cn(
              'ml-auto flex items-center justify-center size-8 rounded-lg',
              'text-text-muted hover:bg-surface-raised hover:text-text-heading',
              'transition-colors duration-150',
            )}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-xl pb-md">
          {children}
        </div>

        {/* Footer */}
        {(Number(bottomBtnCnt) > 0) && (
          <ButtonGroup className='shrink-0 border-t border-border-subtle px-xl pt-md pb-xl'>
            {((Number(bottomBtnCnt) == 2)) && <Button variant="outline" fullWidth onClick={onClickBtn2}>{bottomBtn2Label}</Button>}
            <Button variant="primary" fullWidth onClick={onClickBtn1}>{bottomBtn1Label}</Button>
          </ButtonGroup>
        )}
      </div>
    </div>
    </>,
    target,
  );
}
