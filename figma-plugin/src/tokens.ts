/**
 * @file tokens.ts
 * @description design-tokens/globals.css의 CSS 변수를 Figma Plugin API용 RGB 값으로 변환한 상수.
 * Figma API는 0~1 범위의 RGB를 사용하므로 hex 값을 255로 나눠 변환한다.
 */

export type RGB = { r: number; g: number; b: number };

/** hex → 0~1 범위 RGB 변환 헬퍼 */
function hex(h: string): RGB {
  const v = parseInt(h.replace('#', ''), 16);
  return { r: ((v >> 16) & 255) / 255, g: ((v >> 8) & 255) / 255, b: (v & 255) / 255 };
}

/** --brand-* 토큰 (하나은행 기본값) */
export const BRAND = {
  primary: hex('#008485'),
  dark:    hex('#006e6f'),
  darker:  hex('#005859'),
  fg:      hex('#ffffff'),
  text:    hex('#008485'),
  bg:      hex('#f5f8f8'),
};

/** --color-* 토큰 */
export const COLOR = {
  surface:        hex('#ffffff'),
  surfaceSubtle:  hex('#f8fafc'),
  surfaceRaised:  hex('#f1f5f9'),
  border:         hex('#e2e8f0'),
  borderSubtle:   hex('#f1f5f9'),

  textHeading:    hex('#0f172a'),
  textBase:       hex('#1e293b'),
  textLabel:      hex('#334155'),
  textSecondary:  hex('#475569'),
  textMuted:      hex('#64748b'),
  textPlaceholder:hex('#94a3b8'),
  textDisabled:   hex('#cbd5e1'),

  danger:         hex('#e11d48'),
  dangerDark:     hex('#c01742'),
  dangerSurface:  hex('#fff1f2'),
  dangerBorder:   hex('#fda4af'),
  dangerText:     hex('#be123c'),

  success:        hex('#16a34a'),
  successSurface: hex('#f0fdf4'),
  successBorder:  hex('#86efac'),
  successText:    hex('#15803d'),

  warning:        hex('#d97706'),
  warningSurface: hex('#fffbeb'),
  warningBorder:  hex('#fcd34d'),
  warningText:    hex('#b45309'),

  primary:        hex('#2563eb'),
  primarySurface: hex('#eff6ff'),
  primaryText:    hex('#1e40af'),
};

/** --spacing-* 토큰 (px) */
export const SPACING = {
  xs:       4,
  sm:       8,
  md:       12,
  standard: 16,
  lg:       20,
  xl:       24,
  '2xl':    32,
  '3xl':    40,
  '4xl':    48,
  nav:      80,
} as const;

/** --radius-* 토큰 (px) */
export const RADIUS = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   24,
  full: 999, // Figma에서 9999는 overflow 문제가 생길 수 있어 999로 제한
} as const;

/** --text-* 토큰 (px) */
export const FONT_SIZE = {
  xs:   12,
  sm:   14,
  base: 16,
  lg:   18,
  xl:   20,
  '2xl':24,
  '3xl':30,
} as const;

export const LINE_HEIGHT = {
  xs:   16,
  sm:   20,
  base: 24,
  lg:   28,
  xl:   28,
  '2xl':32,
  '3xl':40,
} as const;

/** 컴포넌트 캔버스 배치 간격 */
export const CANVAS_GAP = 48;
