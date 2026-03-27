/**
 * @file helpers.ts
 * @description Figma Plugin API 반복 작업을 줄이기 위한 헬퍼 함수 모음.
 * ComponentNode / FrameNode 생성·스타일·레이아웃 설정을 단순화한다.
 */

import type { RGB } from './tokens';

/** SolidPaint 생성 */
export function solid(color: RGB, opacity = 1): SolidPaint {
  return { type: 'SOLID', color, opacity };
}

/** 단색 fill 적용 */
export function setFill(node: GeometryMixin, color: RGB, opacity = 1): void {
  node.fills = [solid(color, opacity)];
}

/** fill 제거 (투명) */
export function clearFill(node: GeometryMixin): void {
  node.fills = [];
}

/** 단색 stroke 적용 */
export function setStroke(
  node: GeometryMixin & IndividualStrokesMixin,
  color: RGB,
  weight = 1,
): void {
  node.strokes = [solid(color)];
  node.strokeWeight = weight;
  node.strokeAlign = 'INSIDE';
}

/** stroke 제거 */
export function clearStroke(node: GeometryMixin): void {
  node.strokes = [];
}

/**
 * Auto Layout(Flex) 설정.
 * @param direction 'HORIZONTAL' | 'VERTICAL'
 * @param gap itemSpacing (gap)
 * @param align counterAxisAlignItems — 기본 CENTER
 */
export function setAutoLayout(
  node: FrameNode | ComponentNode,
  direction: 'HORIZONTAL' | 'VERTICAL',
  gap = 0,
  align: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE' = 'CENTER',
): void {
  node.layoutMode = direction;
  node.itemSpacing = gap;
  node.counterAxisAlignItems = align;
  node.primaryAxisAlignItems = 'CENTER';
}

/**
 * 상하좌우 padding 설정.
 * 인자를 (vertical, horizontal) 또는 (top, right, bottom, left) 방식으로 전달.
 */
export function setPadding(
  node: FrameNode | ComponentNode,
  top: number,
  right: number,
  bottom = top,
  left = right,
): void {
  node.paddingTop = top;
  node.paddingRight = right;
  node.paddingBottom = bottom;
  node.paddingLeft = left;
}

/**
 * TextNode 폰트·크기·색상 일괄 설정.
 * loadFontAsync 호출 후 사용해야 한다.
 */
export function applyText(
  text: TextNode,
  characters: string,
  fontSize: number,
  color: RGB,
  bold = false,
): void {
  text.fontName = { family: 'Noto Sans KR', style: bold ? 'Bold' : 'Regular' };
  text.fontSize = fontSize;
  text.characters = characters;
  setFill(text, color);
}

/** TextNode를 생성하고 부모에 추가한 뒤 반환 */
export function addText(
  parent: FrameNode | ComponentNode,
  characters: string,
  fontSize: number,
  color: RGB,
  bold = false,
): TextNode {
  const text = figma.createText();
  applyText(text, characters, fontSize, color, bold);
  parent.appendChild(text);
  return text;
}

/**
 * ComponentNode 생성 헬퍼.
 * name은 Figma variant 형식 "Property=Value, ..." 또는 단순 이름.
 */
export function createComponent(name: string): ComponentNode {
  const node = figma.createComponent();
  node.name = name;
  clearFill(node);
  clearStroke(node);
  return node;
}

/**
 * 여러 ComponentNode를 그리드로 배치한 뒤 ComponentSetNode로 묶는다.
 * setName은 React 컴포넌트 이름과 동일하게 설정한다.
 *
 * combineAsVariants 호출 전에 각 variant의 x,y를 직접 지정해야
 * Figma 캔버스에서 겹치지 않고 나열된다.
 *
 * @param cols 한 행에 배치할 variant 수. 기본값 3.
 */
export function combineVariants(
  components: ComponentNode[],
  setName: string,
  cols = 3,
): ComponentSetNode {
  const GAP = 16;

  /* 열별 최대 너비, 행별 최대 높이 계산 — 크기가 다른 variant도 정렬 보장 */
  const colWidths  = new Array<number>(cols).fill(0);
  const rowHeights = new Array<number>(Math.ceil(components.length / cols)).fill(0);

  components.forEach((comp, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    if (comp.width  > colWidths[col])   colWidths[col]   = comp.width;
    if (comp.height > rowHeights[row])  rowHeights[row]  = comp.height;
  });

  /* 누적 offset 계산 */
  const colOffsets = colWidths.map((_, i) =>
    colWidths.slice(0, i).reduce((sum, w) => sum + w + GAP, 0),
  );
  const rowOffsets = rowHeights.map((_, i) =>
    rowHeights.slice(0, i).reduce((sum, h) => sum + h + GAP, 0),
  );

  /* 각 variant를 grid 위치에 배치한 뒤 page에 추가 */
  components.forEach((comp, i) => {
    comp.x = colOffsets[i % cols];
    comp.y = rowOffsets[Math.floor(i / cols)];
    figma.currentPage.appendChild(comp);
  });

  const set = figma.combineAsVariants(components, figma.currentPage);
  set.name = setName;
  clearFill(set);
  return set;
}

/** 사각형 레이어 생성 헬퍼 */
export function addRect(
  parent: FrameNode | ComponentNode,
  width: number,
  height: number,
  color: RGB,
  radius = 0,
): RectangleNode {
  const rect = figma.createRectangle();
  rect.resize(width, height);
  setFill(rect, color);
  rect.cornerRadius = radius;
  parent.appendChild(rect);
  return rect;
}

/** 구분선(Divider) 생성 헬퍼 */
export function addDivider(
  parent: FrameNode | ComponentNode,
  color: RGB,
): RectangleNode {
  const line = figma.createRectangle();
  /* layoutAlign STRETCH: Auto Layout 부모에서 가로폭을 꽉 채움 */
  line.layoutAlign = 'STRETCH';
  line.resize(parent.width || 100, 1);
  setFill(line, color);
  parent.appendChild(line);
  return line;
}
