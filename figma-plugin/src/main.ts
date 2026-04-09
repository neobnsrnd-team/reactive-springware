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
 * ● Modules/Common  — SectionHeader, AlertBanner, EmptyState, InfoRow, LabelValueRow,
 *                    DividerWithLabel, SelectableItem, ActionLinkItem, NoticeItem,
 *                    CollapsibleSection, Modal, BottomSheet, SuccessHero, Card, BalanceToggle
 * ● Modules/Banking — AccountSelectItem, AmountInput, OtpInput
 * ● Layout      — PageHeader, HomeHeader, BottomNav, TabNav
 * ● Biz         — AccountSummaryCard, AccountSelectorCard, QuickMenuGrid,
 *                 BannerCarousel, UserProfile, BrandBanner
 */

import { COLOR, BRAND, FONT_SIZE, SPACING, FONT_FAMILY, FONT_VAR } from './tokens';
import { solid } from './helpers';
import { createVariables } from './createVariables';

/* core */
import {
  createButton,
  createButtonWithIcon,
  createButtonIconOnly,
  createButtonFullWidth,
}                                  from './components/core/createButton';
import { createBadge }            from './components/core/createBadge';
import {
  createInput,
  createInputWithLabel,
  createInputWithHelper,
  createInputWithIcon,
  createInputFormat,
  createInputFullWidth,
}                                  from './components/core/createInput';
import { createTypography }       from './components/core/createTypography';
import { createSelect }           from './components/core/createSelect';

/* modules */
import { createSectionHeader }    from './components/module/common/createSectionHeader';
import { createAlertBanner }      from './components/module/common/createAlertBanner';
import { createEmptyState }       from './components/module/common/createEmptyState';
import { createInfoRow, createLabelValueRow } from './components/module/common/createInfoRow';
import { createDividerWithLabel } from './components/module/common/createDividerWithLabel';
import { createSelectableItem }   from './components/module/common/createSelectableItem';
import { createAccountSelectItem }from './components/module/banking/createAccountSelectItem';
import { createActionLinkItem }   from './components/module/common/createActionLinkItem';
import { createNoticeItem }       from './components/module/common/createNoticeItem';
import { createAmountInput }      from './components/module/banking/createAmountInput';
import { createOtpInput }         from './components/module/banking/createOtpInput';
import { createCollapsibleSection}from './components/module/common/createCollapsibleSection';
import { createModal, createBottomSheet } from './components/module/common/createModal';
import { createSuccessHero }      from './components/module/common/createSuccessHero';
import { createCard }             from './components/module/common/createCard';
import { createBalanceToggle }    from './components/module/common/createBalanceToggle';

/* layout */
import { createBottomNav }        from './components/layout/createBottomNav';
import { createTabNav }           from './components/layout/createTabNav';
import { createPageHeader, createHomeHeader } from './components/layout/createPageHeaders';

/* biz */
import { createAccountSummaryCard }  from './components/biz/createAccountSummaryCard';
import { createAccountSelectorCard } from './components/biz/createAccountSelectorCard';
import { createQuickMenuGrid }       from './components/biz/createQuickMenuGrid';
import { createBannerCarousel }      from './components/biz/createBannerCarousel';
import { createUserProfile }         from './components/biz/createUserProfile';
import { createBrandBanner }         from './components/biz/createBrandBanner';

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

  const dot = figma.createEllipse();
  dot.resize(10, 10);
  dot.fills = [solid(BRAND.primary)];
  frame.appendChild(dot);

  const label = figma.createText();
  label.fontName = { family: FONT_FAMILY.sans, style: 'Bold' };
  label.fontSize = FONT_SIZE.lg;
  label.characters = text;
  label.fills = [solid(COLOR.textHeading)];
  frame.appendChild(label);

  /* x, y는 페이지에 추가된 이후에 설정해야 실제 캔버스 위치에 반영된다.
   * appendChild 이전에 설정하면 페이지 삽입 시 (0, 0)으로 리셋된다. */
  figma.currentPage.appendChild(frame);
  frame.x = x;
  frame.y = y;
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
  /* ── 커맨드 분기 ──────────────────────────────────────────
   * manifest.json menu 항목에 따라 실행 흐름을 분기한다.
   * 'createVariables' : Primitives + Semantic 변수 일괄 등록
   * 'createComponents': 기존 컴포넌트 생성 로직
   * ────────────────────────────────────────────────────── */
  if (figma.command === 'createVariables') {
    const message = await createVariables();
    figma.closePlugin(message);
    return;
  }

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

  const moduleCommonNodes: SceneNode[] = [
    await createSectionHeader(),
    await createAlertBanner(),
    await createEmptyState(),
    await createInfoRow(),
    await createLabelValueRow(),
    await createDividerWithLabel(),
    await createSelectableItem(),
    await createActionLinkItem(),
    await createNoticeItem(),
    await createCollapsibleSection(),
    await createModal(),
    await createBottomSheet(),
    await createSuccessHero(),
    await createCard(),
    await createBalanceToggle(),
  ];

  const moduleBankingNodes: SceneNode[] = [
    await createAccountSelectItem(),
    await createAmountInput(),
    await createOtpInput(),
  ];

  const layoutNodes: SceneNode[] = [
    await createPageHeader(),
    await createHomeHeader(),
    await createBottomNav(),
    await createTabNav(),
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
  nextY = layoutSection('Core',            coreNodes,          nextY);
  nextY = layoutSection('Modules/Common',  moduleCommonNodes,  nextY);
  nextY = layoutSection('Modules/Banking', moduleBankingNodes, nextY);
  nextY = layoutSection('Layout',          layoutNodes,        nextY);
  nextY = layoutSection('Biz',             bizNodes,           nextY);

  /* 4. 뷰포트 맞춤 */
  figma.viewport.scrollAndZoomIntoView([
    ...coreNodes, ...moduleCommonNodes, ...moduleBankingNodes, ...layoutNodes, ...bizNodes,
  ]);
  figma.closePlugin('✅ React Component Library 생성 완료! (총 41개 컴포넌트)');
})().catch((err) => {
  /* 어떤 createXxx()에서 에러가 났는지 플러그인 알림으로 표시 */
  figma.closePlugin(`❌ 오류: ${err instanceof Error ? err.message : String(err)}`);
});
