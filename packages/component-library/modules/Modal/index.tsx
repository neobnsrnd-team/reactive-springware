/**
 * @file index.tsx
 * @description 오버레이 모달 컴포넌트.
 * React Portal로 document.body에 렌더링하며, z-modal(50)으로 최상위 레이어를 유지한다.
 *
 * 반응형 레이아웃:
 * - 모바일(md 미만): 화면 하단 Bottom Sheet
 * - 데스크톱(md 이상): 화면 중앙 다이얼로그
 *
 * @example
 * <Modal open={open} onClose={() => setOpen(false)} title="이체 확인"
 *   footer={
 *     <div className="flex gap-sm">
 *       <Button variant="outline" fullWidth onClick={() => setOpen(false)}>취소</Button>
 *       <Button fullWidth onClick={handleConfirm}>이체 확인</Button>
 *     </div>
 *   }
 * >
 *   <CardRow label="받는 분" value="홍길동" />
 *   <CardRow label="금액" value="1,000,000원" />
 * </Modal>
 */
import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@lib/cn';
import type { ModalProps, ModalSize } from './types';

/** 데스크톱(md 이상)에서 적용할 최대 너비 클래스 */
const PANEL_SIZE: Record<ModalSize, string> = {
  sm:         'md:max-w-sm',
  md:         'md:max-w-md',
  lg:         'md:max-w-lg',
  /* fullscreen: w-screen(=100vw) 대신 w-full 사용 — 스크롤바 너비 포함 가로 스크롤 방지 */
  fullscreen: 'md:max-w-none md:w-full md:max-h-none md:rounded-none',
};

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  disableBackdropClose = false,
  className,
}: ModalProps) {
  /* ESC 키로 닫기 */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

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
     * 백드롭: fixed inset-0으로 뷰포트 전체 덮기
     * flex items-end → Bottom Sheet (모바일)
     * md:items-center → 중앙 다이얼로그 (데스크톱)
     */
    <div
      role="presentation"
      onClick={disableBackdropClose ? undefined : onClose}
      className="fixed inset-0 z-modal flex items-end justify-center md:items-center bg-black/50 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={e => e.stopPropagation()}
        className={cn(
          'flex flex-col',
          'w-full max-h-[90dvh] overflow-hidden',
          'bg-surface shadow-2xl',
          'rounded-t-2xl md:rounded-2xl',
          PANEL_SIZE[size],
          className,
        )}
      >
        {/* 드래그 핸들 — 모바일 Bottom Sheet 전용 */}
        <div className="flex shrink-0 justify-center pt-3 pb-1 md:hidden" aria-hidden="true">
          <span className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* 헤더 (고정) */}
        <div className="flex shrink-0 items-center justify-between px-xl pt-md pb-md">
          {title ? (
            <h2 id="modal-title" className="text-base font-bold text-text-heading">
              {title}
            </h2>
          ) : (
            /* 닫기 버튼을 오른쪽으로 밀기 위한 spacer */
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

        {/*
         * 본문 (스크롤 영역)
         * flex-1 + min-h-0: 헤더·푸터를 제외한 공간을 차지하면서 내부 스크롤 허용
         * min-h-0 없으면 flex 컬럼에서 overflow-y-auto가 동작하지 않음
         */}
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
    document.body,
  );
}