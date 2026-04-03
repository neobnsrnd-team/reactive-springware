/**
 * @file main.ts
 * @description Figma 플러그인 진입점.
 * React component-library의 모든 컴포넌트를 카테고리별 섹션으로 배치한다.
 *
 * 캔버스 레이아웃:
 * ● Core        — Button, Button/WithIcon, Button/IconOnly, Button/FullWidth,
 *                 Badge,
 *                 Input, Input/WithLabel, Input/WithHelper, Input/WithIcon, Input/Format, Input/FullWidth,
 *                 Typography, Select
 * ● Modules     — SectionHeader, AlertBanner, EmptyState, InfoRow, LabelValueRow,
 *                 DividerWithLabel, SelectableItem, AccountSelectItem,
 *                 ActionLinkItem, NoticeItem, AmountInput, OtpInput,
 *                 CollapsibleSection, Modal, BottomSheet, SuccessHero
 * ● Layout      — PageHeader, HomeHeader, BottomNav
 * ● Biz         — AccountSummaryCard, AccountSelectorCard, QuickMenuGrid,
 *                 BannerCarousel, UserProfile, BrandBanner
 */

import { COLOR, BRAND, FONT_SIZE, SPACING, FONT_FAMILY, FONT_VAR } from './tokens';
import { solid } from './helpers';

/* core */
import {
  createButton,
  createButtonWithIcon,
  createButtonIconOnly,
  createButtonFullWidth,
}                                  from './components/createButton';
import { createBadge }            from './components/createBadge';
import {
  createInput,
  createInputWithLabel,
  createInputWithHelper,
  createInputWithIcon,
  createInputFormat,
  createInputFullWidth,
}                                  from './components/createInput';
import { createTypography }             from './components/createTypography';
import { createSelect }           from './components/createSelect';

/* modules */
import { createSectionHeader }    from './components/createSectionHeader';
import { createAlertBanner }      from './components/createAlertBanner';
import { createEmptyState }       from './components/createEmptyState';
import { createInfoRow, createLabelValueRow } from './components/createInfoRow';
import { createDividerWithLabel } from './components/createDividerWithLabel';
import { createSelectableItem }   from './components/createSelectableItem';
import { createAccountSelectItem }from './components/createAccountSelectItem';
import { createActionLinkItem }   from './components/createActionLinkItem';
import { createNoticeItem }       from './components/createNoticeItem';
import { createAmountInput }      from './components/createAmountInput';
import { createOtpInput }         from './components/createOtpInput';
import { createCollapsibleSection}from './components/createCollapsibleSection';
import { createModal, createBottomSheet } from './components/createModal';
import { createSuccessHero }      from './components/createSuccessHero';

/* layout */
import { createBottomNav }        from './components/createBottomNav';
import { createPageHeader, createHomeHeader } from './components/createPageHeaders';

/* biz */
import {
  createAccountSummaryCard,
  createAccountSelectorCard,
  createQuickMenuGrid,
  createBannerCarousel,
  createUserProfile,
  createBrandBanner,
} from './components/createBizComponents';

/* ── 레이아웃 상수 ──────────────────────────────────────────── */
const COMPONENT_GAP = 48;  // 같은 행 내 컴포넌트 간격
const SECTION_GAP   = 100; // 섹션 간 세로 간격
const LABEL_GAP     = 28;  // 섹션 레이블과 첫 컴포넌트 간격

/** 섹션 레이블 — "● 섹션명" 형태로 브랜드 점 + Bold 텍스트 */
function createSectionLabel(text: string, x: number, y: number): FrameNode {
  const frame = figma.createFrame();
  frame.name = `_section/${text}`;
  frame.layoutMode = 'HORIZONTAL';
  frame.itemSpacing = SPACING.sm;
  frame.counterAxisAlignItems = 'CENTER';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.fills = [];
  frame.x = x;
  frame.y = y;

  const dot = figma.createEllipse();
  dot.resize(10, 10);
  dot.fills = [solid(BRAND.primary)];
  frame.appendChild(dot);

  const label = figma.createTypography();
  label.fontName = { family: FONT_FAMILY.sans, style: 'Bold' };
  label.fontSize = FONT_SIZE.lg;
  label.characters = text;
  label.fills = [solid(COLOR.textHeading)];
  frame.appendChild(label);

  figma.currentPage.appendChild(frame);
  return frame;
}

/**
 * 컴포넌트 노드 배열을 가로로 나열하고 최대 높이를 반환한다.
 * 컴포넌트 너비가 달라도 각 노드의 실제 width를 사용하므로 겹치지 않는다.
 */
function layoutRow(nodes: SceneNode[], startX: number, startY: number): number {
  let cursorX = startX;
  let maxHeight = 0;
  nodes.forEach((node) => {
    node.x = cursorX;
    node.y = startY;
    cursorX += node.width + COMPONENT_GAP;
    if (node.height > maxHeight) maxHeight = node.height;
  });
  return maxHeight;
}

/** 섹션 레이블 + 컴포넌트 행을 배치하고 다음 섹션의 시작 y를 반환한다. */
function layoutSection(name: string, nodes: SceneNode[], startY: number): number {
  const label = createSectionLabel(name, 0, startY);
  const rowY = startY + label.height + LABEL_GAP;
  const rowHeight = layoutRow(nodes, 0, rowY);
  return rowY + rowHeight + SECTION_GAP;
}

/* ── 메인 ──────────────────────────────────────────────────── */
(async () => {
  /* 1. 폰트 사전 로드 */
  await figma.loadFontAsync({ family: FONT_FAMILY.sans, style: 'Regular' });
  await figma.loadFontAsync({ family: FONT_FAMILY.sans, style: 'Bold' });

  /* 2. 컴포넌트 생성 */
  const coreNodes: SceneNode[] = [
    await createButton(),
    await createButtonWithIcon(),
    await createButtonIconOnly(),
    await createButtonFullWidth(),
    await createBadge(),
    await createInput(),
    await createInputWithLabel(),
    await createInputWithHelper(),
    await createInputWithIcon(),
    await createInputFormat(),
    await createInputFullWidth(),
    await createTypography(),
    await createSelect(),
  ];

  const moduleNodes: SceneNode[] = [
    await createSectionHeader(),
    await createAlertBanner(),
    await createEmptyState(),
    await createInfoRow(),
    await createLabelValueRow(),
    await createDividerWithLabel(),
    await createSelectableItem(),
    await createAccountSelectItem(),
    await createActionLinkItem(),
    await createNoticeItem(),
    await createAmountInput(),
    await createOtpInput(),
    await createCollapsibleSection(),
    await createModal(),
    await createBottomSheet(),
    await createSuccessHero(),
  ];

  const layoutNodes: SceneNode[] = [
    createPageHeader(),
    createHomeHeader(),
    await createBottomNav(),
  ];

  const bizNodes: SceneNode[] = [
    await createAccountSummaryCard(),
    await createAccountSelectorCard(),
    await createQuickMenuGrid(),
    await createBannerCarousel(),
    await createUserProfile(),
    await createBrandBanner(),
  ];

  /* 3. 섹션별 배치 */
  let nextY = 0;
  nextY = layoutSection('Core',    coreNodes,   nextY);
  nextY = layoutSection('Modules', moduleNodes, nextY);
  nextY = layoutSection('Layout',  layoutNodes, nextY);
  nextY = layoutSection('Biz',     bizNodes,    nextY);

  /* 4. 뷰포트 맞춤 */
  figma.viewport.scrollAndZoomIntoView([
    ...coreNodes, ...moduleNodes, ...layoutNodes, ...bizNodes,
  ]);
  figma.closePlugin('✅ React Component Library 생성 완료! (총 38개 컴포넌트)');
})().catch((err) => {
  /* 어떤 createXxx()에서 에러가 났는지 플러그인 알림으로 표시 */
  figma.closePlugin(`❌ 오류: ${err instanceof Error ? err.message : String(err)}`);
});
