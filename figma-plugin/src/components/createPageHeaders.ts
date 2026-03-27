/**
 * @file createPageHeaders.ts
 * @description Figma PageLayout / HomePageLayout 헤더 컴포넌트 생성.
 *
 * 컴포넌트:
 * - "PageHeader" (PageLayout 상단 헤더: 뒤로가기 + 타이틀 + 우측 액션)
 * - "HomeHeader"  (HomePageLayout 상단 헤더: 인사말 + 타이틀 + 알림 아이콘)
 */

import { COLOR, SPACING, FONT_SIZE } from '../tokens';
import { createComponent, setAutoLayout, setPadding, setFill, clearFill, addText } from '../helpers';
import { createIcon } from '../icons';

const HEADER_WIDTH  = 390;
const HEADER_HEIGHT = 56;

export function createPageHeader(): ComponentNode {
  const comp = createComponent('PageHeader');
  setAutoLayout(comp, 'HORIZONTAL', 0);
  setPadding(comp, 0, SPACING.standard);
  comp.resize(HEADER_WIDTH, HEADER_HEIGHT);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
  comp.counterAxisAlignItems = 'CENTER';
  setFill(comp, COLOR.surface);

  /* 뒤로가기 버튼 — ChevronLeft 아이콘 */
  const backBtn = figma.createFrame();
  backBtn.name = 'BackButton';
  setAutoLayout(backBtn, 'HORIZONTAL', 0);
  backBtn.resize(36, 36);
  backBtn.primaryAxisAlignItems = 'CENTER';
  backBtn.counterAxisAlignItems = 'CENTER';
  backBtn.cornerRadius = 8;
  clearFill(backBtn);
  backBtn.appendChild(createIcon('ChevronLeft', 20, COLOR.textMuted));
  comp.appendChild(backBtn);

  const title = addText(comp, '페이지 제목', FONT_SIZE.base, COLOR.textHeading, true);
  title.textAlignHorizontal = 'CENTER';
  title.layoutGrow = 1;

  /* 우측 액션 슬롯 (빈 공간 — 너비 맞춤용) */
  const actionSlot = figma.createFrame();
  actionSlot.name = 'RightAction';
  actionSlot.resize(36, 36);
  clearFill(actionSlot);
  comp.appendChild(actionSlot);

  figma.currentPage.appendChild(comp);
  return comp;
}

export function createHomeHeader(): ComponentNode {
  const comp = createComponent('HomeHeader');
  setAutoLayout(comp, 'HORIZONTAL', SPACING.sm);
  setPadding(comp, 0, SPACING.standard);
  comp.resize(HEADER_WIDTH, HEADER_HEIGHT);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
  comp.counterAxisAlignItems = 'CENTER';
  setFill(comp, COLOR.surface);

  const left = figma.createFrame();
  left.name = 'TitleArea';
  setAutoLayout(left, 'VERTICAL', 2);
  left.layoutGrow = 1;
  left.primaryAxisSizingMode = 'AUTO';
  left.counterAxisSizingMode = 'FIXED';
  clearFill(left);
  addText(left, '홍길동님, 안녕하세요', FONT_SIZE.xs, COLOR.textMuted);
  addText(left, '하나은행', FONT_SIZE.base, COLOR.textHeading, true);
  comp.appendChild(left);

  /* 알림 버튼 — Bell 아이콘 */
  const bellBtn = figma.createFrame();
  bellBtn.name = 'BellButton';
  setAutoLayout(bellBtn, 'HORIZONTAL', 0);
  bellBtn.resize(36, 36);
  bellBtn.primaryAxisAlignItems = 'CENTER';
  bellBtn.counterAxisAlignItems = 'CENTER';
  bellBtn.cornerRadius = 8;
  clearFill(bellBtn);
  bellBtn.appendChild(createIcon('Bell', 20, COLOR.textMuted));
  comp.appendChild(bellBtn);

  figma.currentPage.appendChild(comp);
  return comp;
}
