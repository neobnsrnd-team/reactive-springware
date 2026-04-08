import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@lib/cn';
import type { ModalProps } from './types';

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  disableBackdropClose = false,
  container,
  className,
}: ModalProps) {
  /* ESC 키로 닫기 */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  // container가 있을 때는 absolute, 없으면 fixed (viewport 기준)
  const pos = container ? "absolute" : "fixed";

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    /* 모달이 열린 동안 body 스크롤 잠금 */
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    /*
     * 백드롭: 모든 해상도에서 중앙 정렬 (items-center)
     */
    <div
      role="presentation"
      onClick={disableBackdropClose ? undefined : onClose}
      className={`${pos} inset-0 z-modal flex items-center justify-center bg-black/50 backdrop-blur-sm p-4`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={e => e.stopPropagation()}
        className={cn(
          'flex flex-col',
          'w-full max-w-full', // 기본적으로 전체 너비 사용
          'bg-surface shadow-2xl',
          'rounded-2xl', // 모든 해상도 동일 라운드 처리
          'max-h-[calc(100dvh-80px)]', // 화면 높이를 벗어나지 않도록 제한
          className,
        )}
      >
        {/* 헤더 (고정) */}
        <div className="flex shrink-0 items-center justify-between px-xl pt-md pb-md">
          {title ? (
            <h2 id="modal-title" className="text-base font-bold text-text-heading">
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

        {/* 본문 (스크롤 영역) */}
        <div className="flex-1 min-h-0 overflow-y-auto px-xl pb-md">
          {children}
        </div>

        {/* 푸터 (고정) */}
        {footer && (
          <div className="shrink-0 border-t border-border-subtle px-xl pt-md pb-xl">
            {footer}
          </div>
        )}
      </div>
    </div>,
    container ?? document.body,
  );
}