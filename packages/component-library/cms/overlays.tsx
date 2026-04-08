/**
 * @file overlays.tsx
 * @description CMS OverlayTemplate 정의.
 * CMS 빌더 캔버스에서 바텀시트·모달 오버레이를 미리보기·렌더링하기 위한 템플릿 목록.
 *
 * 지원 오버레이:
 * - "BottomSheet" : modules/BottomSheet — 내부 블록을 children으로 렌더링
 * - "Modal"       : modules/Modal      — 내부 블록을 children으로 렌더링
 *
 * renderer 주의사항:
 *   BottomSheet / Modal은 내부적으로 `createPortal(content, document.body)`를 사용한다.
 *   CMS 캔버스에서는 `container` prop으로 전달받은 요소를 portal 타깃으로 대체해
 *   CMS 미리보기 영역 안에서 오버레이가 올바르게 렌더링되도록 한다.
 *
 * @example
 * // your-cms-app/src/main.tsx
 * import { overlays } from "@reactivespringware/component-library/cms/overlays";
 * <CMSApp blocks={blocks} overlays={overlays} layoutRenderer={layoutRenderer} />
 */
import React from 'react';
import type { OverlayTemplate, OverlayRendererProps } from "@neobnsrnd-team/cms-core";
import { BottomSheet } from '../modules/common/BottomSheet';
import { Modal } from '../modules/common/Modal';

// ─────────────────────────────────────────────────────────────────────────────
// BottomSheet 렌더러
// ─────────────────────────────────────────────────────────────────────────────

/**
 * CMS 미리보기용 BottomSheet 렌더러.
 * modules/BottomSheet의 시각 구조를 유지하면서,
 * portal 타깃을 `container`(CMS 미리보기 요소)로 교체한다.
 *
 * props 필드:
 *   - title          : 시트 상단 제목 (string)
 *   - snap           : 높이 프리셋 'auto' | 'half' | 'full'
 *   - hideCloseButton: X 버튼 숨김 여부 (boolean)
 */
function BottomSheetRenderer({ open, onClose, children, container, props }: OverlayRendererProps) {
  if (!open) return null;

  const title           = props?.title           as string | undefined;
  const snap            = (props?.snap           as string | undefined) ?? 'auto';
  const hideCloseButton = (props?.hideCloseButton as boolean | undefined) ?? false;

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={title}
      snap={snap as 'auto' | 'half' | 'full'}
      hideCloseButton={hideCloseButton}
      container={container}
    >
      {children}
    </BottomSheet>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Modal 렌더러
// ─────────────────────────────────────────────────────────────────────────────

/**
 * CMS 미리보기용 Modal 렌더러.
 * modules/Modal의 시각 구조를 유지하면서,
 * portal 타깃을 `container`(CMS 미리보기 요소)로 교체한다.
 *
 * 반응형 레이아웃:
 *   - 모바일 (md 미만): 화면 하단 Bottom Sheet
 *   - 데스크톱 (md 이상): 화면 중앙 다이얼로그
 *
 * props 필드:
 *   - title              : 모달 제목 (string)
 *   - size               : 최대 너비 프리셋 'sm' | 'md' | 'lg' | 'fullscreen'
 *   - disableBackdropClose: 백드롭 클릭 닫기 비활성화 (boolean)
 */
function ModalRenderer({ open, onClose, children, container, props }: OverlayRendererProps) {
  if (!open) return null;

  const title               = props?.title               as string | undefined;
  const disableBackdropClose = (props?.disableBackdropClose as boolean | undefined) ?? false;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title ?? "모달 제목"}
      disableBackdropClose={disableBackdropClose}
      container={container}
    >
      {children}
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OverlayTemplate 목록
// ─────────────────────────────────────────────────────────────────────────────

/**
 * CMS 빌더에 제공하는 오버레이 템플릿 목록.
 * CMSApp의 `overlays` prop에 그대로 전달한다.
 *
 * | id                    | type         | 설명                          |
 * |-----------------------|--------------|-------------------------------|
 * | tpl_bottomsheet       | BottomSheet  | 내부 블록 자유 구성 시트       |
 * | tpl_bottomsheet_title | BottomSheet  | 제목 포함 시트                 |
 * | tpl_modal             | Modal        | 반응형 모달 (모바일: 시트)     |
 */
export const overlays: OverlayTemplate[] = [
  // ── 기본 바텀시트 (제목 없음) ─────────────────────────────────
  {
    id:          "tpl_bottomsheet",
    label:       "바텀시트",
    description: "블록을 자유롭게 추가할 수 있는 하단 시트",
    type:        "BottomSheet",
    defaultId:   "bottomSheet",
    blocks:      [],
    renderer: BottomSheetRenderer,
  },

  // ── 제목 포함 바텀시트 ────────────────────────────────────────
  {
    id:          "tpl_bottomsheet_title",
    label:       "바텀시트 (제목 포함)",
    description: "상단 제목과 닫기 버튼이 있는 하단 시트",
    type:        "BottomSheet",
    defaultId:   "bottomSheetWithTitle",
    blocks:      [],
    props: {
      title:           "시트 제목",
    },
    renderer: BottomSheetRenderer,
  },

  // ── 기본 모달 ─────────────────────────────────────────────────
  {
    id:          "tpl_modal",
    label:       "모달",
    description: "모바일에서는 하단 시트, 데스크톱에서는 중앙 다이얼로그",
    type:        "Modal",
    defaultId:   "modal",
    blocks:      [],
    renderer: ModalRenderer,
  },

  // ── 제목 포함 모달 ────────────────────────────────────────────
  {
    id:          "tpl_modal_title",
    label:       "모달 (제목 포함)",
    description: "제목이 있는 반응형 모달",
    type:        "Modal",
    defaultId:   "modalWithTitle",
    blocks:      [],
    props: {
      title:                "모달 제목",
    },
    renderer: ModalRenderer,
  },
];
