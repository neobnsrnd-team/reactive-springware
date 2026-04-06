/**
 * @file createBizComponents.ts
 * @description Figma biz 컴포넌트 생성 모음.
 * AccountSummaryCard, AccountSelectorCard, QuickMenuGrid, BannerCarousel, UserProfile, BrandBanner
 */
import { COLOR, BRAND, SPACING, RADIUS, FONT_SIZE } from '../tokens';
import { createComponent, combineVariants, setAutoLayout, setPadding, setFill, setStroke, clearFill, addText } from '../helpers';
import { createIcon } from '../icons';

const CARD_WIDTH = 328;

/* ── AccountSummaryCard ──────────────────────────────────── */
type AccountType = 'Deposit' | 'Savings' | 'Loan';

async function createAccountSummaryVariant(type: AccountType): Promise<ComponentNode> {
  const isLoan = type === 'Loan';
  const comp = createComponent(`Type=${type}`);
  setAutoLayout(comp, 'VERTICAL', SPACING.sm);
  setPadding(comp, SPACING.lg, SPACING.lg);
  comp.resize(CARD_WIDTH, 140);
  comp.primaryAxisSizingMode = 'AUTO';
  comp.cornerRadius = RADIUS.md;
  setFill(comp, COLOR.surface);
  setStroke(comp, COLOR.borderSubtle);

  /* 헤더 */
  const header = figma.createFrame();
  setAutoLayout(header, 'HORIZONTAL', SPACING.sm);
  header.layoutAlign = 'STRETCH';
  header.fills = [];
  header.primaryAxisAlignItems = 'SPACE_BETWEEN';
  await addText(header, `하나 ${type === 'Loan' ? '신용대출' : type === 'Savings' ? '정기적금' : '급여통장'}`, FONT_SIZE.sm, COLOR.textHeading, true);
  const badge = figma.createFrame();
  setAutoLayout(badge, 'HORIZONTAL', 0);
  setPadding(badge, 2, SPACING.sm);
  badge.cornerRadius = RADIUS.full;
  setFill(badge, BRAND.bg);
  await addText(badge, '주거래', FONT_SIZE.xs, BRAND.text, true);
  header.appendChild(badge);
  comp.appendChild(header);

  await addText(comp, '123-456789-01234', FONT_SIZE.xs, COLOR.textMuted);

  const balanceRow = figma.createFrame();
  setAutoLayout(balanceRow, 'HORIZONTAL', SPACING.xs);
  balanceRow.layoutAlign = 'STRETCH';
  balanceRow.fills = [];
  balanceRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
  await addText(balanceRow, isLoan ? '대출 잔액' : '잔액', FONT_SIZE.xs, COLOR.textMuted);
  await addText(balanceRow, '1,234,567원', FONT_SIZE.sm, isLoan ? COLOR.danger : COLOR.textHeading, true);
  comp.appendChild(balanceRow);

  return comp;
}

export async function createAccountSummaryCard(): Promise<ComponentSetNode> {
  const components: ComponentNode[] = [];
  for (const t of ['Deposit', 'Savings', 'Loan'] as AccountType[]) {
    components.push(await createAccountSummaryVariant(t));
  }
  return combineVariants(components, 'AccountSummaryCard', 3);
}

/* ── AccountSelectorCard ─────────────────────────────────── */
export async function createAccountSelectorCard(): Promise<ComponentNode> {
  const comp = createComponent('AccountSelectorCard');
  setAutoLayout(comp, 'HORIZONTAL', SPACING.md);
  setPadding(comp, SPACING.lg, SPACING.lg);
  comp.resize(390, 100);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.cornerRadius = RADIUS.xl;
  setFill(comp, COLOR.surface);
  setStroke(comp, COLOR.borderSubtle);

  const left = figma.createFrame();
  setAutoLayout(left, 'VERTICAL', 4);
  left.layoutGrow = 1;
  left.fills = [];
  const nameRow = figma.createFrame();
  setAutoLayout(nameRow, 'HORIZONTAL', SPACING.xs);
  nameRow.fills = [];
  await addText(nameRow, '하나 급여통장', FONT_SIZE.sm, COLOR.textHeading, true);
  nameRow.appendChild(createIcon('ChevronDown', 14, COLOR.textMuted));
  left.appendChild(nameRow);
  await addText(left, '123-456789-01234', FONT_SIZE.xs, BRAND.text);
  await addText(left, '잔액 1,234,567원', FONT_SIZE.xs, COLOR.textMuted);
  comp.appendChild(left);

  /* 우측 원형 버튼 */
  const rightBtn = figma.createEllipse();
  rightBtn.resize(48, 48);
  setFill(rightBtn, BRAND.bg);
  comp.appendChild(rightBtn);

  figma.currentPage.appendChild(comp);
  return comp;
}

/* ── QuickMenuGrid ───────────────────────────────────────── */
type GridCols = 3 | 4;

async function createQuickMenuGridVariant(cols: GridCols): Promise<ComponentNode> {
  const itemSize = cols === 4 ? 72 : 88;
  const totalWidth = cols * itemSize + (cols - 1) * SPACING.sm;
  const comp = createComponent(`Cols=${cols}`);
  comp.resize(totalWidth, itemSize * 2 + SPACING.sm);
  comp.layoutMode = 'NONE';
  clearFill(comp);

  /* 2행 × cols열 그리드 표현 */
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < cols; col++) {
      const item = figma.createFrame();
      setAutoLayout(item, 'VERTICAL', SPACING.xs);
      item.resize(itemSize, itemSize);
      item.primaryAxisSizingMode = 'FIXED';
      item.counterAxisSizingMode = 'FIXED';
      item.primaryAxisAlignItems = 'CENTER';
      item.counterAxisAlignItems = 'CENTER';
      clearFill(item);

      const icon = figma.createRectangle();
      icon.resize(48, 48);
      icon.cornerRadius = RADIUS.md;
      setFill(icon, BRAND.bg);
      item.appendChild(icon);
      await addText(item, '메뉴', FONT_SIZE.xs, COLOR.textBase);

      item.x = col * (itemSize + SPACING.sm);
      item.y = row * (itemSize + SPACING.sm);
      comp.appendChild(item);
    }
  }

  return comp;
}

export async function createQuickMenuGrid(): Promise<ComponentSetNode> {
  const components: ComponentNode[] = [
    await createQuickMenuGridVariant(3),
    await createQuickMenuGridVariant(4),
  ];
  return combineVariants(components, 'QuickMenuGrid', 2);
}

/* ── BannerCarousel ──────────────────────────────────────── */
type BannerVariant = 'Promo' | 'Info' | 'Warning';

async function createBannerCarouselVariant(variant: BannerVariant): Promise<ComponentNode> {
  const BG_CONFIG: Record<BannerVariant, Parameters<typeof setFill>[1]> = {
    Promo:   BRAND.primary,
    Info:    COLOR.surfaceRaised,
    Warning: COLOR.warningSurface,
  };
  const TEXT_CONFIG: Record<BannerVariant, Parameters<typeof setFill>[1]> = {
    Promo:   BRAND.fg,
    Info:    COLOR.textHeading,
    Warning: COLOR.warningText,
  };

  const comp = createComponent(`Variant=${variant}`);
  setAutoLayout(comp, 'HORIZONTAL', SPACING.md);
  setPadding(comp, SPACING.lg, SPACING.lg);
  comp.resize(328, 80);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.cornerRadius = RADIUS.md;
  setFill(comp, BG_CONFIG[variant]);

  const textArea = figma.createFrame();
  setAutoLayout(textArea, 'VERTICAL', 4);
  textArea.layoutGrow = 1;
  textArea.fills = [];
  await addText(textArea, '배너 제목', FONT_SIZE.sm, TEXT_CONFIG[variant], true);
  await addText(textArea, '배너 설명 텍스트입니다.', FONT_SIZE.xs, TEXT_CONFIG[variant]);
  comp.appendChild(textArea);

  return comp;
}

export async function createBannerCarousel(): Promise<ComponentSetNode> {
  const components: ComponentNode[] = [];
  for (const v of ['Promo', 'Info', 'Warning'] as BannerVariant[]) {
    components.push(await createBannerCarouselVariant(v));
  }
  return combineVariants(components, 'BannerCarousel', 3);
}

/* ── UserProfile ─────────────────────────────────────────── */
export async function createUserProfile(): Promise<ComponentNode> {
  const comp = createComponent('UserProfile');
  setAutoLayout(comp, 'HORIZONTAL', SPACING.md);
  setPadding(comp, SPACING.lg, SPACING.standard);
  comp.resize(390, 88);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.counterAxisAlignItems = 'CENTER';
  clearFill(comp);

  /* 아바타 */
  const avatar = figma.createEllipse();
  avatar.resize(64, 64);
  setFill(avatar, BRAND.bg);
  comp.appendChild(avatar);

  const textArea = figma.createFrame();
  setAutoLayout(textArea, 'VERTICAL', 4);
  textArea.layoutGrow = 1;
  textArea.fills = [];
  await addText(textArea, '홍길동', FONT_SIZE.xl, COLOR.textHeading, true);
  await addText(textArea, '최근 접속: 2024.01.01 12:34', FONT_SIZE.xs, COLOR.textMuted);
  comp.appendChild(textArea);

  /* 설정 버튼 — Settings 아이콘 */
  const settingsBtn = figma.createFrame();
  setAutoLayout(settingsBtn, 'HORIZONTAL', 0);
  settingsBtn.resize(40, 40);
  settingsBtn.primaryAxisSizingMode = 'FIXED';
  settingsBtn.counterAxisSizingMode = 'FIXED';
  settingsBtn.primaryAxisAlignItems = 'CENTER';
  settingsBtn.counterAxisAlignItems = 'CENTER';
  settingsBtn.cornerRadius = 20;
  setFill(settingsBtn, COLOR.surfaceRaised);
  settingsBtn.appendChild(createIcon('Settings', 20, COLOR.textMuted));
  comp.appendChild(settingsBtn);

  figma.currentPage.appendChild(comp);
  return comp;
}

/* ── BrandBanner ──────────────────────────────────────────── */
export async function createBrandBanner(): Promise<ComponentNode> {
  const comp = createComponent('BrandBanner');
  setAutoLayout(comp, 'HORIZONTAL', SPACING.md);
  setPadding(comp, SPACING.md, SPACING.md);
  comp.resize(328, 64);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.cornerRadius = RADIUS.md;
  setFill(comp, BRAND.primary);

  const textArea = figma.createFrame();
  setAutoLayout(textArea, 'VERTICAL', 2);
  textArea.layoutGrow = 1;
  textArea.fills = [];
  await addText(textArea, '하나은행 광고 문구', FONT_SIZE.xs, BRAND.fg);
  await addText(textArea, '브랜드 배너 제목', FONT_SIZE.sm, BRAND.fg, true);
  comp.appendChild(textArea);

  /* 아이콘 원형 */
  const iconCircle = figma.createEllipse();
  iconCircle.resize(40, 40);
  setFill(iconCircle, BRAND.fg, 0.2);
  comp.appendChild(iconCircle);

  figma.currentPage.appendChild(comp);
  return comp;
}
