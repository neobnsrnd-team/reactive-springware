/**
 * @file createSelect.ts
 * @description Figma Select 컴포넌트 세트 생성.
 * 드롭다운 닫힘/열림/옵션펼침 세 상태를 Figma variant로 매핑한다.
 * 컴포넌트 이름: "Select"
 * Variant 형식: "State=Closed" | "State=Open" | "State=OpenWithOptions"
 */
import { COLOR, BRAND, SPACING, RADIUS, FONT_SIZE } from '../tokens';
import { createComponent, combineVariants, setAutoLayout, setPadding, setFill, setStroke, clearFill, clearStroke, addText } from '../helpers';
import { createIcon } from '../icons';

const SELECT_WIDTH = 280;
/** 옵션 항목 높이 — 터치 최소 권장 크기 44px */
const OPTION_HEIGHT = 44;

function createSelectVariant(state: 'Closed' | 'Open'): ComponentNode {
  const comp = createComponent(`State=${state}`);
  setAutoLayout(comp, 'HORIZONTAL', SPACING.xs);
  setPadding(comp, 0, SPACING.md);
  comp.resize(SELECT_WIDTH, 48);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
  comp.cornerRadius = RADIUS.xl;

  if (state === 'Open') {
    setFill(comp, COLOR.surface);
    setStroke(comp, BRAND.primary);
  } else {
    setFill(comp, COLOR.surface);
    setStroke(comp, COLOR.border);
  }

  const label = addText(comp, '옵션 선택', FONT_SIZE.sm, state === 'Open' ? BRAND.text : COLOR.textPlaceholder);
  label.layoutGrow = 1;

  /* ChevronDown 아이콘 */
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
function createOptionItem(
  parent: FrameNode | ComponentNode,
  label: string,
  selected: boolean,
): void {
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
    setFill(item, BRAND.bg);
  } else {
    clearFill(item);
  }

  const text = addText(item, label, FONT_SIZE.sm, selected ? BRAND.text : COLOR.textBase);
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
function createOpenWithOptionsVariant(): ComponentNode {
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
  setFill(trigger, COLOR.surface);
  setStroke(trigger, BRAND.primary);

  const triggerLabel = addText(trigger, '옵션 선택', FONT_SIZE.sm, BRAND.text);
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
  setFill(container, COLOR.surface);
  setStroke(container, COLOR.border);
  container.cornerRadius = RADIUS.md;
  /* 모서리 밖으로 항목이 삐져나오지 않도록 클리핑 */
  container.clipsContent = true;

  createOptionItem(container, '옵션 1', true);
  createOptionItem(container, '옵션 2', false);
  createOptionItem(container, '옵션 3', false);
  createOptionItem(container, '옵션 4', false);

  comp.appendChild(container);
  return comp;
}

export async function createSelect(): Promise<ComponentSetNode> {
  return combineVariants(
    [createSelectVariant('Closed'), createSelectVariant('Open'), createOpenWithOptionsVariant()],
    'Select',
    /* variant가 3개이므로 3열로 배치 */
    3,
  );
}
