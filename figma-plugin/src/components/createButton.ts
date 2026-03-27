/**
 * @file createButton.ts
 * @description Figma Button 컴포넌트 세트 생성.
 * React Button의 variant(primary|outline|ghost|danger) × size(sm|md|lg)를
 * Figma variant로 매핑한다.
 *
 * 컴포넌트 이름: "Button" (React 컴포넌트명 유지)
 * Variant 형식: "Variant=Primary, Size=Medium"
 */

import { BRAND, COLOR, SPACING, RADIUS, FONT_SIZE } from '../tokens';
import {
  createComponent, combineVariants, setAutoLayout, setPadding,
  setFill, setStroke, clearStroke, addText,
} from '../helpers';

type ButtonVariant = 'Primary' | 'Outline' | 'Ghost' | 'Danger';
type ButtonSize    = 'Small' | 'Medium' | 'Large';

/** size별 height / padding-x / font-size / border-radius */
const SIZE_CONFIG: Record<ButtonSize, {
  height: number; px: number; fontSize: number; radius: number;
}> = {
  Small:  { height: 32,  px: SPACING.md,       fontSize: FONT_SIZE.xs,   radius: RADIUS.sm },
  Medium: { height: 40,  px: SPACING.standard,  fontSize: FONT_SIZE.sm,   radius: RADIUS.md },
  Large:  { height: 56,  px: SPACING.xl,        fontSize: FONT_SIZE.lg,   radius: RADIUS.md },
};

/** variant별 fill / text / stroke */
const VARIANT_CONFIG: Record<ButtonVariant, {
  bg: Parameters<typeof setFill>[1] | null;
  bgOpacity?: number;
  text: Parameters<typeof setFill>[1];
  hasBorder: boolean;
}> = {
  Primary: { bg: BRAND.primary,  text: BRAND.fg,       hasBorder: false },
  Outline: { bg: null,           text: BRAND.text,     hasBorder: true  },
  Ghost:   { bg: null,           text: BRAND.text,     hasBorder: false },
  Danger:  { bg: COLOR.danger,   text: { r:1, g:1, b:1 }, hasBorder: false },
};

/** Button 단일 variant 컴포넌트 생성 */
function createButtonVariant(variant: ButtonVariant, size: ButtonSize): ComponentNode {
  const { height, px, fontSize, radius } = SIZE_CONFIG[size];
  const { bg, text, hasBorder } = VARIANT_CONFIG[variant];

  /* variant 이름 — Figma가 variant property로 인식하는 형식 */
  const comp = createComponent(`Variant=${variant}, Size=${size}`);

  /* Auto Layout: 가로 방향, 내부 요소 중앙 정렬 */
  setAutoLayout(comp, 'HORIZONTAL', SPACING.sm);
  setPadding(comp, 0, px);
  comp.resize(120, height);
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.cornerRadius = radius;

  /* 배경색 */
  if (bg) {
    setFill(comp, bg);
  } else {
    comp.fills = [{ type: 'SOLID', color: COLOR.surface, opacity: 0 }];
  }

  /* 테두리 (Outline variant) */
  if (hasBorder) {
    setStroke(comp, BRAND.primary);
  } else {
    clearStroke(comp);
  }

  /* 레이블 텍스트 */
  const label = addText(comp, '버튼', fontSize, text, true);
  label.textAlignHorizontal = 'CENTER';

  return comp;
}

/** Button ComponentSet 생성 후 반환 */
export async function createButton(): Promise<ComponentSetNode> {
  const variants: ButtonVariant[] = ['Primary', 'Outline', 'Ghost', 'Danger'];
  const sizes:    ButtonSize[]    = ['Small', 'Medium', 'Large'];

  const components: ComponentNode[] = [];
  for (const variant of variants) {
    for (const size of sizes) {
      components.push(createButtonVariant(variant, size));
    }
  }

  /* cols=3: 한 행에 size(Small·Medium·Large) 3개, 행마다 variant 변경 */
  return combineVariants(components, 'Button', 3);
}
