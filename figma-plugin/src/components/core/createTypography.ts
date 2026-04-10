/**
 * @file createTypography.ts
 * @description Figma Typography 컴포넌트 세트 생성.
 * React Text의 variant(heading|subheading|body-lg|body|body-sm|caption)를 Figma variant로 매핑한다.
 * 컴포넌트 이름: "Typography" / Variant 형식: "Variant=Heading, Weight=Bold"
 */
import { COLOR, FONT_SIZE, LINE_HEIGHT, COLOR_VAR, SIZE_VAR } from '../../tokens';
import { createComponent, combineVariants, clearFill, addTextWithVar, setLineHeightVar } from '../../helpers';

type TypographyVariant = 'Heading' | 'Subheading' | 'BodyLg' | 'Body' | 'BodySm' | 'Caption';
type TypographyWeight  = 'Normal' | 'Bold';

const VARIANT_CONFIG: Record<TypographyVariant, {
  fontSize: number; fontSizeVar: string;
  lineHeight: number; lineHeightVar: string;
}> = {
  Heading:    { fontSize: FONT_SIZE['2xl'], fontSizeVar: SIZE_VAR.fontSize2xl,  lineHeight: LINE_HEIGHT['2xl'], lineHeightVar: SIZE_VAR.lineHeight2xl  },
  Subheading: { fontSize: FONT_SIZE.xl,    fontSizeVar: SIZE_VAR.fontSizeXl,   lineHeight: LINE_HEIGHT.xl,    lineHeightVar: SIZE_VAR.lineHeightXl   },
  BodyLg:     { fontSize: FONT_SIZE.lg,    fontSizeVar: SIZE_VAR.fontSizeLg,   lineHeight: LINE_HEIGHT.lg,    lineHeightVar: SIZE_VAR.lineHeightLg   },
  Body:       { fontSize: FONT_SIZE.base,  fontSizeVar: SIZE_VAR.fontSizeBase, lineHeight: LINE_HEIGHT.base,  lineHeightVar: SIZE_VAR.lineHeightBase },
  BodySm:     { fontSize: FONT_SIZE.sm,    fontSizeVar: SIZE_VAR.fontSizeSm,   lineHeight: LINE_HEIGHT.sm,    lineHeightVar: SIZE_VAR.lineHeightSm   },
  Caption:    { fontSize: FONT_SIZE.xs,    fontSizeVar: SIZE_VAR.fontSizeXs,   lineHeight: LINE_HEIGHT.xs,    lineHeightVar: SIZE_VAR.lineHeightXs   },
};

async function createTypographyVariant(variant: TypographyVariant, weight: TypographyWeight): Promise<ComponentNode> {
  const { fontSize, fontSizeVar, lineHeight, lineHeightVar } = VARIANT_CONFIG[variant];
  const comp = createComponent(`Variant=${variant}, Weight=${weight}`);
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  clearFill(comp);
  const text = await addTextWithVar(
    comp, `${variant} 텍스트 예시`, fontSize,
    COLOR_VAR.textHeading, COLOR.textHeading, weight === 'Bold', fontSizeVar,
  );
  await setLineHeightVar(text, lineHeightVar, lineHeight);
  return comp;
}

export async function createTypography(): Promise<ComponentSetNode> {
  const variants: TypographyVariant[] = ['Heading', 'Subheading', 'BodyLg', 'Body', 'BodySm', 'Caption'];
  const weights: TypographyWeight[]   = ['Normal', 'Bold'];
  const components: ComponentNode[] = [];
  for (const variant of variants) {
    for (const weight of weights) {
      components.push(await createTypographyVariant(variant, weight));
    }
  }
  /* cols=2: Normal / Bold를 한 행에 나란히 */
  return combineVariants(components, 'Typography', 2);
}
