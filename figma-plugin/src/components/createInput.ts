/**
 * @file createInput.ts
 * @description Figma Input 컴포넌트 세트 생성.
 * React Input의 size(md|lg) × validationState(default|error|success)를
 * Figma variant로 매핑한다.
 *
 * 컴포넌트 이름: "Input"
 * Variant 형식: "Size=Medium, State=Default"
 */

import { COLOR, SPACING, RADIUS, FONT_SIZE } from '../tokens';
import {
  createComponent, combineVariants, setAutoLayout, setPadding,
  setFill, setStroke, addText,
} from '../helpers';

type InputSize  = 'Medium' | 'Large';
type InputState = 'Default' | 'Error' | 'Success';

const SIZE_CONFIG: Record<InputSize, { height: number; fontSize: number; px: number }> = {
  Medium: { height: 48, fontSize: FONT_SIZE.sm,   px: SPACING.md       },
  Large:  { height: 56, fontSize: FONT_SIZE.base,  px: SPACING.standard },
};

/** validationState별 배경/테두리 색상 */
const STATE_CONFIG: Record<InputState, {
  bg: Parameters<typeof setFill>[1];
  border: Parameters<typeof setFill>[1];
}> = {
  Default: { bg: COLOR.surface,       border: COLOR.border        },
  Error:   { bg: COLOR.dangerSurface, border: COLOR.danger         },
  Success: { bg: COLOR.successSurface,border: COLOR.successBorder  },
};

function createInputVariant(size: InputSize, state: InputState): ComponentNode {
  const { height, fontSize, px } = SIZE_CONFIG[size];
  const { bg, border } = STATE_CONFIG[state];

  const comp = createComponent(`Size=${size}, State=${state}`);
  setAutoLayout(comp, 'HORIZONTAL', SPACING.xs);
  setPadding(comp, 0, px);
  comp.resize(280, height);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.cornerRadius = RADIUS.sm;
  setFill(comp, bg);
  setStroke(comp, border);

  /* placeholder 텍스트로 입력 영역 표현 */
  const placeholder = addText(comp, '입력해주세요', fontSize, COLOR.textPlaceholder);
  placeholder.layoutGrow = 1;
  placeholder.textAlignVertical = 'CENTER';

  return comp;
}

export async function createInput(): Promise<ComponentSetNode> {
  const sizes:  InputSize[]  = ['Medium', 'Large'];
  const states: InputState[] = ['Default', 'Error', 'Success'];

  const components: ComponentNode[] = [];
  for (const size of sizes) {
    for (const state of states) {
      components.push(createInputVariant(size, state));
    }
  }

  /* cols=3: 한 행에 state(Default·Error·Success) 3개, 행마다 size 변경 */
  return combineVariants(components, 'Input', 3);
}
