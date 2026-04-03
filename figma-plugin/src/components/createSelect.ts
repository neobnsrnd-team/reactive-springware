/**
 * @file createSelect.ts
 * @description Figma Select 컴포넌트 세트 생성.
 * 드롭다운 닫힘/열림 두 상태를 Figma variant로 매핑한다.
 * 컴포넌트 이름: "Select" / Variant 형식: "State=Closed" | "State=Open"
 */
import { COLOR, BRAND, SPACING, RADIUS, FONT_SIZE } from '../tokens';
import { createComponent, combineVariants, setAutoLayout, setPadding, setFill, setStroke, addText } from '../helpers';
import { createIcon } from '../icons';

const SELECT_WIDTH = 280;

async function createSelectVariant(state: 'Closed' | 'Open'): ComponentNode {
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

  const label = await addText(comp, '옵션 선택', FONT_SIZE.sm, state === 'Open' ? BRAND.text : COLOR.textPlaceholder);
  label.layoutGrow = 1;

  /* ChevronDown 아이콘 */
  comp.appendChild(createIcon('ChevronDown', 16, COLOR.textMuted));

  return comp;
}

export async function createSelect(): Promise<ComponentSetNode> {
  return combineVariants(
    [createSelectVariant('Closed'), createSelectVariant('Open')],
    'Select', 2,
  );
}
