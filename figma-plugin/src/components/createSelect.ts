/**
 * @file createSelect.ts
 * @description Figma Select 컴포넌트 세트 생성.
 * 드롭다운 닫힘/열림/옵션펼침 세 상태를 Figma variant로 매핑한다.
 * 컴포넌트 이름: "Select"
 * Variant 형식: "State=Closed" | "State=Open" | "State=OpenWithOptions"
 *
 * 색상은 Figma 색상 변수에 바인딩하며, 변수가 없을 경우 tokens.ts의 RGB 값으로 fallback한다.
 */
import { COLOR, BRAND, COLOR_VAR, SPACING, RADIUS, FONT_SIZE } from '../tokens';
import {
  createComponent, combineVariants, setAutoLayout, setPadding,
  setFillWithVar, setStroke, clearFill, clearStroke, addText,
} from '../helpers';
import { createIcon } from '../icons';

const SELECT_WIDTH = 280;
/** 옵션 항목 높이 — 터치 최소 권장 크기 44px */
const OPTION_HEIGHT = 44;

async function createSelectVariant(state: 'Closed' | 'Open'): Promise<ComponentNode> {
  const comp = createComponent(`State=${state}`);
  setAutoLayout(comp, 'HORIZONTAL', SPACING.xs);
  setPadding(comp, 0, SPACING.md);
  comp.resize(SELECT_WIDTH, 48);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
  comp.cornerRadius = RADIUS.xl;

  /* 배경은 상태에 무관하게 surface — stroke만 상태에 따라 다름 */
  await setFillWithVar(comp, COLOR_VAR.surface, COLOR.surface);
  if (state === 'Open') {
    /* 열린 상태: 브랜드 컬러 테두리로 포커스 표현 */
    setStroke(comp, BRAND.primary);
  } else {
    setStroke(comp, COLOR.border);
  }

  /* 레이블 텍스트: Open이면 브랜드 텍스트, Closed이면 placeholder */
  const label = await addText(comp, '옵션 선택', FONT_SIZE.sm, state === 'Open' ? BRAND.text : COLOR.textPlaceholder);
  await setFillWithVar(
    label,
    state === 'Open' ? COLOR_VAR.brandText : COLOR_VAR.textPlaceholder,
    state === 'Open' ? BRAND.text : COLOR.textPlaceholder,
  );
  label.layoutGrow = 1;

  /* ChevronDown 아이콘 — 아이콘은 SVG fill이라 변수 바인딩 불필요 */
  comp.appendChild(createIcon('ChevronDown', 16, COLOR.textMuted));

  return comp;
}

/**
 * 옵션 항목 하나를 FrameNode로 생성해 부모 컨테이너에 추가한다.
 * selected=true인 항목은 브랜드 컬러 배경 + Check 아이콘으로 강조 표시된다.
 *
 * @param parent   - 항목을 추가할 부모 프레임 (옵션 목록 컨테이너)
 * @param label    - 옵션 텍스트
 * @param selected - 현재 선택된 항목 여부
 */
async function createOptionItem(
  parent: FrameNode | ComponentNode,
  label: string,
  selected: boolean,
): Promise<void> {
  const item = figma.createFrame();
  setAutoLayout(item, 'HORIZONTAL', 0);
  /* label은 좌측, Check 아이콘은 우측에 배치 */
  item.primaryAxisAlignItems = 'SPACE_BETWEEN';
  setPadding(item, SPACING.sm, SPACING.md);
  item.resize(SELECT_WIDTH, OPTION_HEIGHT);
  item.primaryAxisSizingMode = 'FIXED';
  item.counterAxisSizingMode = 'FIXED';
  /* 항목 간 구분은 컨테이너 VERTICAL gap이 아닌 배경색으로만 표현 */
  clearStroke(item);

  if (selected) {
    /* 선택된 항목: 브랜드 배경색으로 강조 */
    await setFillWithVar(item, COLOR_VAR.brandBg, BRAND.bg);
  } else {
    clearFill(item);
  }

  const text = await addText(item, label, FONT_SIZE.sm, selected ? BRAND.text : COLOR.textBase);
  await setFillWithVar(
    text,
    selected ? COLOR_VAR.brandText : COLOR_VAR.textBase,
    selected ? BRAND.text : COLOR.textBase,
  );
  /* 텍스트가 가로 공간을 채워 아이콘이 항상 우측 끝에 위치하도록 설정 */
  text.layoutGrow = 1;

  if (selected) {
    /* 선택 항목에만 Check 아이콘 표시 */
    item.appendChild(createIcon('Check', 16, BRAND.primary));
  }

  parent.appendChild(item);
}

/**
 * State=OpenWithOptions variant 생성.
 * 트리거 프레임(Open 스타일) 아래 옵션 목록 컨테이너(4개 항목)를 렌더링한다.
 * 첫 번째 항목이 선택된 상태로 표현된다.
 */
async function createOpenWithOptionsVariant(): Promise<ComponentNode> {
  const comp = createComponent('State=OpenWithOptions');
  setAutoLayout(comp, 'VERTICAL', SPACING.xs);
  /* 높이는 자식(트리거 + 컨테이너)에 맞게 자동 조정 */
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';

  /* ── 트리거 (Open 상태와 동일한 스타일) ── */
  const trigger = figma.createFrame();
  setAutoLayout(trigger, 'HORIZONTAL', SPACING.xs);
  setPadding(trigger, 0, SPACING.md);
  trigger.resize(SELECT_WIDTH, 48);
  trigger.primaryAxisSizingMode = 'FIXED';
  trigger.counterAxisSizingMode = 'FIXED';
  trigger.primaryAxisAlignItems = 'SPACE_BETWEEN';
  trigger.cornerRadius = RADIUS.xl;
  await setFillWithVar(trigger, COLOR_VAR.surface, COLOR.surface);
  setStroke(trigger, BRAND.primary);

  const triggerLabel = await addText(trigger, '옵션 선택', FONT_SIZE.sm, BRAND.text);
  await setFillWithVar(triggerLabel, COLOR_VAR.brandText, BRAND.text);
  triggerLabel.layoutGrow = 1;
  trigger.appendChild(createIcon('ChevronDown', 16, COLOR.textMuted));
  comp.appendChild(trigger);

  /* ── 옵션 목록 컨테이너 ── */
  const container = figma.createFrame();
  setAutoLayout(container, 'VERTICAL', 0);
  /* 높이는 항목 개수에 맞게 자동 조정 (hug content) */
  container.primaryAxisSizingMode = 'AUTO';
  container.counterAxisSizingMode = 'FIXED';
  container.resize(SELECT_WIDTH, OPTION_HEIGHT * 4);
  await setFillWithVar(container, COLOR_VAR.surface, COLOR.surface);
  setStroke(container, COLOR.border);
  container.cornerRadius = RADIUS.md;
  /* 모서리 밖으로 항목이 삐져나오지 않도록 클리핑 */
  container.clipsContent = true;

  await createOptionItem(container, '옵션 1', true);
  await createOptionItem(container, '옵션 2', false);
  await createOptionItem(container, '옵션 3', false);
  await createOptionItem(container, '옵션 4', false);

  comp.appendChild(container);
  return comp;
}

export async function createSelect(): Promise<ComponentSetNode> {
  const closed = await createSelectVariant('Closed');
  const open = await createSelectVariant('Open');
  const openWithOptions = await createOpenWithOptionsVariant();
  /* variant가 3개이므로 3열로 배치 */
  return combineVariants([closed, open, openWithOptions], 'Select', 3);
}
