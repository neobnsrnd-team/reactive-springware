/**
 * @file createBadge.ts
 * @description Figma Badge 컴포넌트 세트 생성.
 * React Badge의 variant(primary|brand|success|danger|warning|neutral)를
 * Figma variant로 매핑한다.
 *
 * 컴포넌트 이름: "Badge"
 * Variant 형식: "Variant=Brand"
 */

import { BRAND, COLOR, FONT_SIZE, RADIUS, SPACING } from '../tokens';
import {
  createComponent, combineVariants, setAutoLayout, setPadding,
  setFill, addText,
} from '../helpers';

type BadgeVariant = 'Primary' | 'Brand' | 'Success' | 'Danger' | 'Warning' | 'Neutral';

/** variant별 배경/텍스트 색상 */
const VARIANT_CONFIG: Record<BadgeVariant, {
  bg: Parameters<typeof setFill>[1];
  text: Parameters<typeof setFill>[1];
}> = {
  Primary: { bg: COLOR.primarySurface, text: COLOR.primaryText   },
  Brand:   { bg: BRAND.bg,             text: BRAND.text           },
  Success: { bg: COLOR.successSurface, text: COLOR.successText    },
  Danger:  { bg: COLOR.dangerSurface,  text: COLOR.dangerText     },
  Warning: { bg: COLOR.warningSurface, text: COLOR.warningText    },
  Neutral: { bg: COLOR.surfaceRaised,  text: COLOR.textSecondary  },
};

function createBadgeVariant(variant: BadgeVariant): ComponentNode {
  const { bg, text } = VARIANT_CONFIG[variant];

  const comp = createComponent(`Variant=${variant}`);
  setAutoLayout(comp, 'HORIZONTAL', SPACING.xs);
  setPadding(comp, 2, SPACING.sm);
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.cornerRadius = RADIUS.full;
  setFill(comp, bg);

  const label = addText(comp, variant, FONT_SIZE.xs, text, true);
  label.textAlignHorizontal = 'CENTER';

  return comp;
}

export async function createBadge(): Promise<ComponentSetNode> {
  const variants: BadgeVariant[] = ['Primary', 'Brand', 'Success', 'Danger', 'Warning', 'Neutral'];
  const components = variants.map(createBadgeVariant);
  /* cols=3: 6개 variant를 2행 3열로 배치 */
  return combineVariants(components, 'Badge', 3);
}
