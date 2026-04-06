/**
 * @file createModal.ts
 * @description Figma Modal / BottomSheet 컴포넌트 세트 생성.
 * Modal: size(sm|md|lg) variants / BottomSheet: snap(auto|half|full) variants.
 */
import { COLOR, BRAND, SPACING, RADIUS, FONT_SIZE } from '../tokens';
import { createComponent, combineVariants, setAutoLayout, setPadding, setFill, addText } from '../helpers';
import { createIcon } from '../icons';

/* ── Modal ─────────────────────────────────────────────────── */
type ModalSize = 'Small' | 'Medium' | 'Large';
const MODAL_SIZE_CONFIG: Record<ModalSize, { w: number; h: number }> = {
  Small:  { w: 320, h: 200 },
  Medium: { w: 360, h: 280 },
  Large:  { w: 390, h: 360 },
};

async function createModalVariant(size: ModalSize): Promise<ComponentNode> {
  const { w, h } = MODAL_SIZE_CONFIG[size];
  const comp = createComponent(`Size=${size}`);
  setAutoLayout(comp, 'VERTICAL', SPACING.md);
  setPadding(comp, SPACING.xl, SPACING.xl);
  comp.resize(w, h);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.cornerRadius = RADIUS.xl;
  setFill(comp, COLOR.surface);

  /* 헤더 행: 타이틀 + X 닫기 버튼 */
  const modalHeader = figma.createFrame();
  setAutoLayout(modalHeader, 'HORIZONTAL', 0);
  modalHeader.layoutAlign = 'STRETCH';
  modalHeader.primaryAxisAlignItems = 'SPACE_BETWEEN';
  modalHeader.counterAxisAlignItems = 'CENTER';
  modalHeader.fills = [];
  const title = await addText(modalHeader, '모달 제목', FONT_SIZE.base, COLOR.textHeading, true);
  title.layoutGrow = 1;
  modalHeader.appendChild(createIcon('X', 20, COLOR.textMuted));
  comp.appendChild(modalHeader);

  const content = await addText(comp, '모달 내용 영역입니다.\n확인이 필요한 정보를 표시합니다.', FONT_SIZE.sm, COLOR.textBase);
  content.layoutAlign = 'STRETCH';
  content.layoutGrow = 1;

  /* 하단 버튼 영역 */
  const footer = figma.createFrame();
  setAutoLayout(footer, 'HORIZONTAL', SPACING.sm);
  footer.layoutAlign = 'STRETCH';
  footer.fills = [];

  const btnLabels = ['취소', '확인'];
  for (let i = 0; i < btnLabels.length; i++) {
    const btn = figma.createFrame();
    setAutoLayout(btn, 'HORIZONTAL', 0);
    btn.primaryAxisAlignItems = 'CENTER';
    btn.counterAxisAlignItems = 'CENTER';
    btn.layoutGrow = 1;
    btn.resize(120, 44);
    btn.cornerRadius = RADIUS.md;
    setFill(btn, i === 1 ? BRAND.primary : COLOR.surfaceRaised);
    await addText(btn, btnLabels[i], FONT_SIZE.sm, i === 1 ? BRAND.fg : COLOR.textBase, true);
    footer.appendChild(btn);
  }
  comp.appendChild(footer);

  return comp;
}

export async function createModal(): Promise<ComponentSetNode> {
  const components: ComponentNode[] = [];
  for (const s of ['Small', 'Medium', 'Large'] as ModalSize[]) {
    components.push(await createModalVariant(s));
  }
  return combineVariants(components, 'Modal', 3);
}

/* ── BottomSheet ───────────────────────────────────────────── */
type SnapMode = 'Auto' | 'Half' | 'Full';
const SNAP_HEIGHT: Record<SnapMode, number> = { Auto: 300, Half: 420, Full: 680 };

async function createBottomSheetVariant(snap: SnapMode): Promise<ComponentNode> {
  const comp = createComponent(`Snap=${snap}`);
  setAutoLayout(comp, 'VERTICAL', SPACING.md);
  setPadding(comp, SPACING.md, SPACING.xl, SPACING.xl, SPACING.xl);
  comp.resize(390, SNAP_HEIGHT[snap]);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.topLeftRadius = RADIUS.xl;
  comp.topRightRadius = RADIUS.xl;
  comp.bottomLeftRadius = 0;
  comp.bottomRightRadius = 0;
  setFill(comp, COLOR.surface);

  /* 드래그 핸들 */
  const handle = figma.createFrame();
  handle.resize(32, 4);
  handle.cornerRadius = 2;
  setFill(handle, COLOR.border);
  handle.layoutAlign = 'CENTER';
  comp.appendChild(handle);

  const title = await addText(comp, '바텀시트 제목', FONT_SIZE.base, COLOR.textHeading, true);
  title.layoutAlign = 'STRETCH';

  const content = figma.createFrame();
  content.layoutGrow = 1;
  content.layoutAlign = 'STRETCH';
  content.fills = [];
  comp.appendChild(content);

  return comp;
}

export async function createBottomSheet(): Promise<ComponentSetNode> {
  const components: ComponentNode[] = [];
  for (const s of ['Auto', 'Half', 'Full'] as SnapMode[]) {
    components.push(await createBottomSheetVariant(s));
  }
  return combineVariants(components, 'BottomSheet', 3);
}
