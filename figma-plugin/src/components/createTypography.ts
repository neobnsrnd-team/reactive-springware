/**
 * @file createTypography.ts
 * @description Figma Typography 컴포넌트 세트 생성.
 * React Text의 variant(heading|subheading|body-lg|body|body-sm|caption)를 Figma variant로 매핑한다.
 * 컴포넌트 이름: "Typography" / Variant 형식: "Variant=Heading, Weight=Bold"
 */
import { COLOR, FONT_SIZE, LINE_HEIGHT } from '../tokens';
import { createComponent, combineVariants, clearFill, addText } from '../helpers';

type TypographyVariant = 'Heading' | 'Subheading' | 'BodyLg' | 'Body' | 'BodySm' | 'Caption';
type TypographyWeight  = 'Normal' | 'Bold';

const VARIANT_CONFIG: Record<TypographyVariant, { fontSize: number; lineHeight: number }> = {
  Heading:    { fontSize: FONT_SIZE['2xl'], lineHeight: LINE_HEIGHT['2xl'] },
  Subheading: { fontSize: FONT_SIZE.xl,    lineHeight: LINE_HEIGHT.xl     },
  BodyLg:     { fontSize: FONT_SIZE.lg,    lineHeight: LINE_HEIGHT.lg     },
  Body:       { fontSize: FONT_SIZE.base,  lineHeight: LINE_HEIGHT.base   },
  BodySm:     { fontSize: FONT_SIZE.sm,    lineHeight: LINE_HEIGHT.sm     },
  Caption:    { fontSize: FONT_SIZE.xs,    lineHeight: LINE_HEIGHT.xs     },
};

/* Promise<ComponentNode>를 반환해야 한다 — async 함수는 항상 Promise를 반환한다 */
async function createTypographyVariant(variant: TypographyVariant, weight: TypographyWeight): Promise<ComponentNode> {
  const { fontSize } = VARIANT_CONFIG[variant];
  const comp = createComponent(`Variant=${variant}, Weight=${weight}`);
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  clearFill(comp);
  await addText(comp, `${variant} 텍스트 예시`, fontSize, COLOR.textHeading, weight === 'Bold');
  return comp;
}

export async function createTypography(): Promise<ComponentSetNode> {
  const variants: TypographyVariant[] = ['Heading', 'Subheading', 'BodyLg', 'Body', 'BodySm', 'Caption'];
  const weights: TypographyWeight[]   = ['Normal', 'Bold'];
  const components: ComponentNode[] = [];
  for (const variant of variants) {
    for (const weight of weights) {
      /* await 없이 push하면 Promise가 배열에 들어가 combineVariants가 SceneNode 대신
       * Promise를 받아 appendChild에서 크래시 → catch → figma.closePlugin() →
       * 잔여 Promise들이 VM 파괴 후 resolve되어 "This VM has been destroyed" 발생 */
      components.push(await createTypographyVariant(variant, weight));
    }
  }
  /* cols=2: Normal / Bold를 한 행에 나란히 */
  return combineVariants(components, 'Typography', 2);
}
