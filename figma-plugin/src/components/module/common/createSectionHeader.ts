/**
 * @file createSectionHeader.ts
 * @description Figma SectionHeader 컴포넌트 생성.
 * 타이틀 + 선택적 배지 + 우측 액션 링크 구조.
 * 컴포넌트 이름: "SectionHeader" / Variant: "HasAction=True" | "HasAction=False"
 */
import { COLOR, BRAND, SPACING, FONT_SIZE, RADIUS } from '../tokens';
import { createComponent, combineVariants, setAutoLayout, setPadding, setFill, clearFill, addText } from '../helpers';

async function createSectionHeaderVariant(hasAction: boolean): ComponentNode {
  const comp = createComponent(`HasAction=${hasAction ? 'True' : 'False'}`);
  setAutoLayout(comp, 'HORIZONTAL', SPACING.sm);
  setPadding(comp, 0, SPACING.standard);
  comp.resize(390, 40);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
  comp.counterAxisAlignItems = 'CENTER';
  clearFill(comp);

  /* 왼쪽: 타이틀 + 배지 */
  const left = figma.createFrame();
  setAutoLayout(left, 'HORIZONTAL', SPACING.xs);
  left.primaryAxisSizingMode = 'AUTO';
  left.counterAxisSizingMode = 'AUTO';
  left.counterAxisAlignItems = 'CENTER';
  left.fills = [];
  await addText(left, '섹션 제목', FONT_SIZE.xl, COLOR.textHeading, true);

  /* 배지 */
  const badge = figma.createFrame();
  setAutoLayout(badge, 'HORIZONTAL', 0);
  setPadding(badge, 2, SPACING.sm);
  badge.primaryAxisSizingMode = 'AUTO';
  badge.counterAxisSizingMode = 'AUTO';
  badge.cornerRadius = RADIUS.full;
  setFill(badge, BRAND.bg);
  await addText(badge, '3', FONT_SIZE.xs, BRAND.text, true);
  left.appendChild(badge);
  comp.appendChild(left);

  /* 우측 액션 */
  if (hasAction) {
    await addText(comp, '전체보기', FONT_SIZE.sm, BRAND.text);
  }

  return comp;
}

export async function createSectionHeader(): Promise<ComponentSetNode> {
  return combineVariants(
    [createSectionHeaderVariant(false), createSectionHeaderVariant(true)],
    'SectionHeader', 1,
  );
}
