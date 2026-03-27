/**
 * @file createText.ts
 * @description Figma Text 컴포넌트 세트 생성.
 * React Text의 variant(heading|subheading|body-lg|body|body-sm|caption)를 Figma variant로 매핑한다.
 * 컴포넌트 이름: "Text" / Variant 형식: "Variant=Heading, Weight=Bold"
 */
import { COLOR, FONT_SIZE, LINE_HEIGHT } from '../tokens';
import { createComponent, combineVariants, clearFill, addText } from '../helpers';

type TextVariant = 'Heading' | 'Subheading' | 'BodyLg' | 'Body' | 'BodySm' | 'Caption';
type TextWeight  = 'Normal' | 'Bold';

const VARIANT_CONFIG: Record<TextVariant, { fontSize: number; lineHeight: number }> = {
  Heading:    { fontSize: FONT_SIZE['2xl'], lineHeight: LINE_HEIGHT['2xl'] },
  Subheading: { fontSize: FONT_SIZE.xl,    lineHeight: LINE_HEIGHT.xl     },
  BodyLg:     { fontSize: FONT_SIZE.lg,    lineHeight: LINE_HEIGHT.lg     },
  Body:       { fontSize: FONT_SIZE.base,  lineHeight: LINE_HEIGHT.base   },
  BodySm:     { fontSize: FONT_SIZE.sm,    lineHeight: LINE_HEIGHT.sm     },
  Caption:    { fontSize: FONT_SIZE.xs,    lineHeight: LINE_HEIGHT.xs     },
};

function createTextVariant(variant: TextVariant, weight: TextWeight): ComponentNode {
  const { fontSize } = VARIANT_CONFIG[variant];
  const comp = createComponent(`Variant=${variant}, Weight=${weight}`);
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  clearFill(comp);
  addText(comp, `${variant} 텍스트 예시`, fontSize, COLOR.textHeading, weight === 'Bold');
  return comp;
}

export async function createText(): Promise<ComponentSetNode> {
  const variants: TextVariant[] = ['Heading', 'Subheading', 'BodyLg', 'Body', 'BodySm', 'Caption'];
  const weights: TextWeight[]   = ['Normal', 'Bold'];
  const components: ComponentNode[] = [];
  for (const variant of variants) {
    for (const weight of weights) {
      components.push(createTextVariant(variant, weight));
    }
  }
  /* cols=2: Normal / Bold를 한 행에 나란히 */
  return combineVariants(components, 'Text', 2);
}
