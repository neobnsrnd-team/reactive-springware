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
import { Button, ButtonGroup } from '../core/Button';

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
  const content         = (props?.content)       as string | undefined;
  const buttonNum = (props?.buttonNum as number | undefined) ?? 0;
  const button1 = (props?.button1 as string | undefined) ?? "확인";
  const button2 = (props?.button2 as string | undefined) ?? "취소";


  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={title}
      snap={snap as 'auto' | 'half' | 'full'}
      hideCloseButton={hideCloseButton}
      container={container}
      footer = { buttonNum == 2 ? (
        <ButtonGroup>
            <Button variant="outline" fullWidth onClick={onClose}>{button2}</Button>
            <Button fullWidth onClick={onClose}>{button1}</Button>
        </ButtonGroup>
      ) : ( buttonNum == 1 ? (
        <ButtonGroup>
            <Button fullWidth onClick={onClose}>{button1}</Button>
        </ButtonGroup>
      ): (
        undefined
      ))}
    >
      { content ?? children }
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
  const content             = props?.content               as string | undefined;
  const disableBackdropClose = (props?.disableBackdropClose as boolean | undefined) ?? false;
  const buttonNum = (props?.buttonNum as number | undefined) ?? 0;
  const button1 = (props?.button1 as string | undefined) ?? "확인";
  const button2 = (props?.button2 as string | undefined) ?? "취소";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title ?? "모달 제목"}
      disableBackdropClose={disableBackdropClose}
      container={container}
      footer = { buttonNum == 2 ? (
        <ButtonGroup>
            <Button variant="outline" fullWidth onClick={onClose}>{button2}</Button>
            <Button fullWidth onClick={onClose}>{button1}</Button>
        </ButtonGroup>
      ) : ( buttonNum == 1 ? (
        <ButtonGroup>
            <Button fullWidth onClick={onClose}>{button1}</Button>
        </ButtonGroup>
      ): (
        undefined
      ))}
    >
      { content ?? children }
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
 * | id                    | type         | 설명                         |
 * |-----------------------|--------------|------------------------------|
 * | tpl_bottomsheet       | BottomSheet  | 내부 블록 자유 구성 시트        |
 * | tpl_bottomsheet_content | BottomSheet  | 텍스트 구성 시트             |
 * | tpl_modal             | Modal        | 내부 블록 자유 구성 모달        |
 * | tpl_modal_content     | Modal        | 텍스트 구성 모달               |
 */
export const overlays: OverlayTemplate[] = [
  // ── 바텀시트 ─────────────────────────────────
  {
    id:          "tpl_bottomsheet",
    label:       "바텀시트",
    description: "블록을 자유롭게 추가할 수 있는 바텀 시트",
    type:        "BottomSheet",
    defaultId:   "bottomSheetWithBlocks",
    blocks:      [],
    props: {
      title:     "바텀시트 제목",
      hideCloseButton: false,
      buttonNum: 0,
      button1:   "확인",
      button2:   "취소"
    },
    propSchema: {
      title:     { type: "string", label: "제목", default: "바텀시트 제목" },
      hideCloseButton: { type: "boolean", label: "닫기 버튼 숨김 여부", default: false },
      buttonNum: { type: "select", label: "하단 고정 버튼 개수", options: ["0", "1", "2"], default: 0},
      button1:   { type: "string", label: "하단 고정 버튼1 이름", default: "확인" },
      button2:   { type: "string", label: "하단 고정 버튼2 이름", default: "취소" }
    },
    renderer: BottomSheetRenderer,
  },
  {
    id:          "tpl_bottomsheet_content",
    label:       "바텀시트 (텍스트 구성)",
    description: "텍스트로 구성하는 바텀 시트",
    type:        "BottomSheet",
    defaultId:   "bottomSheetWithContent",
    blocks: [],
    props: {
      title:    "바텀시트 제목",
      hideCloseButton: false,
      content: "바텀시트 내용",
      buttonNum: 0,
      button1:   "확인",
      button2:   "취소"
    },
    propSchema: {
      title:     { type: "string", label: "제목", default: "바텀시트 제목" },
      hideCloseButton: { type: "boolean", label: "닫기 버튼 숨김 여부", default: false },
      content:   { type: "string", label: "바텀시트 내용 입니다.", default: "바텀시트 내용" },
      buttonNum: { type: "select", label: "하단 고정 버튼 개수", options: ["0", "1", "2"], default: 0},
      button1:   { type: "string", label: "하단 고정 버튼1 이름", default: "확인" },
      button2:   { type: "string", label: "하단 고정 버튼2 이름", default: "취소" }
    },
    renderer: BottomSheetRenderer,
  },

  // ── 모달 ─────────────────────────────────────────────────
  {
    id:          "tpl_modal",
    label:       "모달",
    description: "블록을 자유롭게 추가할 수 있는 모달",
    type:        "Modal",
    defaultId:   "modalWithBlocks",
    blocks:      [],
    props: {
      title:     "모달 제목",
      buttonNum: 0,
      button1:   "확인",
      button2:   "취소"
    },
    propSchema: {
      title:     { type: "string", label: "제목", default: "모달 제목" },
      buttonNum: { type: "select", label: "하단 고정 버튼 개수", options: ["0", "1", "2"], default: 0},
      button1:   { type: "string", label: "하단 고정 버튼1 이름", default: "확인" },
      button2:   { type: "string", label: "하단 고정 버튼2 이름", default: "취소" }
    },
    renderer: ModalRenderer,
  },
  {
    id:          "tpl_modal_content",
    label:       "모달 (텍스트 구성)",
    description: "텍스트로 구성하는 모달",
    type:        "Modal",
    defaultId:   "modalWithContent",
    blocks:      [],
    props: {
      title:     "모달 제목",
      content:   "모달 내용 입니다.",
      buttonNum: 0,
      button1:   "확인",
      button2:   "취소"
    },
    propSchema: {
      title:     { type: "string", label: "제목", default: "모달 제목" },
      content:   { type: "string", label: "모달 내용", default: "모달 내용 입니다." },
      buttonNum: { type: "select", label: "하단 고정 버튼 개수", options: ["0", "1", "2"], default: 0},
      button1:   { type: "string", label: "하단 고정 버튼1 이름", default: "확인" },
      button2:   { type: "string", label: "하단 고정 버튼2 이름", default: "취소" }
    },
    renderer: ModalRenderer,
  },
];
