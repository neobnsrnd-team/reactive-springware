# Design Tokens

Multi-domain white-label 테마 엔진의 디자인 토큰 시스템입니다.
Tailwind CSS v4 기반으로 동작하며, **Tokens Studio for Figma** 플러그인과 연동합니다.

---

## 아키텍처 개요

```
globals.css               ← 단일 진실 공급원 (source of truth)
        ↓  값을 JS 상수로 유지
figma-plugin/src/tokens.ts ← 플러그인용 런타임 상수 + Figma 변수 경로
        ↓  플러그인 "변수 등록" 실행
Figma Variables 패널       ← 컴포넌트에 바인딩된 변수
        ↓  플러그인 "컴포넌트 생성" 실행
Figma 캔버스 컴포넌트      ← 변수 바인딩 완료 상태
```

> **토큰 업데이트 방법**: `globals.css`와 `tokens.ts`를 함께 수정한 뒤,
> Figma 플러그인에서 **변수 등록**을 실행하면 Figma Variables가 자동으로 업데이트됩니다.
> 이미 바인딩된 컴포넌트는 값만 변경되므로 바인딩을 다시 연결할 필요가 없습니다.

> **참고**: `figma-tokens/*.json`은 Tokens Studio Pro 사용 시 Figma와 양방향 sync에 활용할 수 있는 파일입니다.
> 현재는 참조용으로 보관 중이며, 실제 변수 등록은 플러그인을 통해 이루어집니다.

토큰은 **4개 레이어**로 적용됩니다:

| 레이어 | 선택자 | 역할 |
|---|---|---|
| Layer 1 | `[data-domain]` | 도메인별 배경색 등 도메인 고정값 |
| Layer 2 | `[data-brand]` | 브랜드별 가변 색상 (primary, alt 등) |
| Layer 3 | `@theme` | 공통 시맨틱 토큰 — Tailwind 클래스와 연결 |
| Layer 4 | `@layer base` | 전역 기본 스타일 |

---

## 파일 구조

```
design-tokens/
├── globals.css              # 전체 CSS 변수 정의 (Tailwind @theme 포함)
├── README.md                # 이 문서
└── figma-tokens/            # Tokens Studio 연동 JSON 파일
    ├── $themes.json         # 테마 그룹 정의 (Brand / Domain)
    ├── primitives.json      # 기본 토큰 (spacing, radius, shadow 등)
    ├── semantic.json        # 시맨틱 컬러 토큰 (color.brand, color.text 등)
    ├── domain.json          # 도메인별 페이지 배경색 (레거시, 참조용)
    ├── brand.hana.json      # 하나은행 브랜드 토큰
    ├── brand.ibk.json       # IBK기업은행 브랜드 토큰
    ├── brand.kb.json        # KB국민은행 브랜드 토큰
    ├── brand.nh.json        # NH농협은행 브랜드 토큰
    ├── brand.shinhan.json   # 신한은행 브랜드 토큰
    ├── brand.woori.json     # 우리은행 브랜드 토큰
    ├── domain.banking.json  # 뱅킹 도메인 토큰
    ├── domain.card.json     # 카드 도메인 토큰
    ├── domain.giro.json     # 지로 도메인 토큰
    └── domain.insurance.json# 보험 도메인 토큰
```

---

## 토큰 파일 상세

### primitives.json — 기본 토큰

브랜드/도메인에 무관하게 고정된 값입니다.

| 카테고리 | 예시 키 | 설명 |
|---|---|---|
| `font` | `font.sans`, `font.numeric` | 폰트 패밀리 |
| `text` | `text.sm.fontSize`, `text.lg.lineHeight` | 타이포그래피 |
| `spacing` | `spacing.xs` ~ `spacing.4xl` | 간격 (4px 그리드) |
| `radius` | `radius.sm` ~ `radius.full` | 모서리 반경 |
| `shadow` | `shadow.xs` ~ `shadow.2xl` | 박스 그림자 |
| `transition` | `transition.fast`, `transition.spring` | 애니메이션 |
| `breakpoint` | `breakpoint.mobile`, `breakpoint.tablet` | 반응형 기준점 |
| `nav` | `nav.topHeight`, `nav.bottomHeight` | 네비게이션 크기 |
| `z` | `z.modal`, `z.toast` | z-index |

### semantic.json — 시맨틱 컬러 토큰

`brand.*` / `domain.*` 토큰을 참조하여 의미 기반 색상을 정의합니다.
브랜드/도메인이 바뀌면 이 토큰들도 자동으로 변경됩니다.

```json
{
  "color": {
    "brand": {
      "$value": "{brand.primary}",   // 브랜드 대표색
      "alt":    { "$value": "{brand.alt}" },
      "fg":     { "$value": "{brand.fg}" },
      "5":      { "$value": "{brand.primary.5}" }
    },
    "surface": {
      "page": { "$value": "{domain.page.bg}" }  // 도메인 배경색
    }
  }
}
```

### brand.*.json — 브랜드 토큰

각 은행 브랜드의 색상을 정의합니다. 모든 브랜드 파일은 동일한 키 구조를 가집니다.

```json
{
  "brand": {
    "primary":  { "$value": "#008485" },   // 대표색
    "primary.5":  { "$value": "#0084850d" }, // 5% 투명도
    "primary.10": { "$value": "#0084851a" }, // 10% 투명도
    "primary.20": { "$value": "#00848533" }, // 20% 투명도
    "alt":      { "$value": "#14b8a6" },   // 보조색
    "fg":       { "$value": "#ffffff" },   // 전경색 (텍스트/아이콘)
    "text":     { "$value": "#008485" },   // 텍스트용 브랜드색
    "dark":     { "$value": "#006e6f" },   // 진한 브랜드색
    "darker":   { "$value": "#005859" },   // 더 진한 브랜드색
    "shadow":   { "$value": "#00848540" }, // 그림자용 브랜드색
    "bg":       { "$value": "#f5f8f8" },   // 브랜드 배경색
    "name":     { "$value": "하나은행" }    // 브랜드 표시명
  }
}
```

### domain.*.json — 도메인 토큰

카드/지로/보험처럼 은행 브랜드 없이 독립적으로 운영되는 도메인의 토큰입니다.
banking은 항상 은행 브랜드와 함께 사용되므로 배경색만 정의합니다.

```json
{
  "domain": {
    "page": {
      "bg": { "$value": "#f4f7ff" }  // 도메인 페이지 배경색
    },
    "primary": { "$value": "#1a56db" }, // 도메인 대표색
    "alt":     { "$value": "#4f86f7" }, // 도메인 보조색
    "name":    { "$value": "카드 기본" } // 도메인 표시명
  }
}
```

---

## CSS 변수 (globals.css)

### Brand 변수

`[data-brand]` 속성으로 활성화됩니다.

| CSS 변수 | 설명 |
|---|---|
| `--brand-primary` | 브랜드 대표색 |
| `--brand-alt` | 브랜드 보조색 |
| `--brand-fg` | 전경색 (버튼 텍스트 등) |
| `--brand-text` | 텍스트용 브랜드색 |
| `--brand-dark` | 진한 브랜드색 (hover 등) |
| `--brand-darker` | 더 진한 브랜드색 (active 등) |
| `--brand-5/10/20` | 투명도별 브랜드색 (배경, 테두리 등) |
| `--brand-shadow` | 그림자용 브랜드색 |
| `--brand-bg` | 브랜드 배경색 |

### Domain 변수

`[data-domain]` 속성으로 활성화됩니다.

| CSS 변수 | 설명 |
|---|---|
| `--domain-page-bg` | 도메인 페이지 배경색 |

### Tailwind 시맨틱 변수 (@theme)

컴포넌트에서 실제로 사용하는 Tailwind 클래스와 연결된 변수입니다.

| CSS 변수 | Tailwind 클래스 | 값 출처 |
|---|---|---|
| `--color-brand` | `text-brand`, `bg-brand` | `--brand-primary` |
| `--color-brand-alt` | `text-brand-alt` | `--brand-alt` |
| `--color-brand-fg` | `text-brand-fg` | `--brand-fg` |
| `--color-surface-page` | `bg-surface-page` | `--brand-bg` → `--domain-page-bg` |
| `--color-border-focus` | `border-border-focus` | `--brand-primary` |
| `--color-text-base` | `text-text-base` | `#1e293b` (고정) |
| `--color-danger` | `text-danger` | `#e11d48` (고정) |
| `--shadow-primary` | `shadow-primary` | `--brand-shadow` 기반 |

---

## React에서 사용하기

### 기본 패턴

페이지 루트 `div`에 `data-brand`와 `data-domain`을 함께 지정합니다.

```tsx
// 하나은행 뱅킹 화면
<div data-brand="hana" data-domain="banking">
  <div className="bg-surface-page text-text-base">
    <button className="bg-brand text-brand-fg">확인</button>
  </div>
</div>
```

### 브랜드별 예시

```tsx
// KB국민은행
<div data-brand="kb" data-domain="banking">...</div>

// 신한은행
<div data-brand="shinhan" data-domain="banking">...</div>
```

### 도메인 단독 사용 (카드/지로/보험)

카드·지로·보험은 `data-domain`만으로 브랜드 색상까지 적용됩니다.
`[data-domain]`에 `--brand-primary` 등이 함께 정의되어 있기 때문입니다.

```tsx
// 카드 도메인 — data-brand 없이 단독 사용 가능
<div data-domain="card">
  <button className="bg-brand text-brand-fg">카드 신청</button>
</div>
```

### 우선순위

같은 요소에 `data-brand`와 `data-domain`이 함께 있을 경우, CSS 선언 순서상 `[data-brand]`가 `[data-domain]`을 덮어씁니다.

```
data-domain="card"  → --brand-primary: #1A56DB (카드 파란색)
data-brand="hana"   → --brand-primary: #008485 (하나 청록색) ← 이 값이 적용됨
```

---

## 토큰 업데이트 방법

### 토큰 값 변경 (코드 → Figma)

색상·간격·폰트 등 토큰 값을 수정할 때는 아래 두 파일을 함께 업데이트한다.
두 파일이 항상 동기화되어 있어야 Figma Variables와 React 컴포넌트가 일치한다.

```
1. design-tokens/globals.css
   └─ CSS 변수 값 수정 (예: --color-success: #16a34a → #15803d)

2. figma-plugin/src/tokens.ts
   ├─ 값 상수 수정 (COLOR / BRAND / SPACING 등)
   └─ 경로 상수는 변수 이름이 바뀔 때만 수정 (COLOR_VAR / SIZE_VAR / FONT_VAR)
```

수정 후 Figma에서 플러그인 실행 → **변수 등록 (Primitives + Semantic)** 선택하면 완료.

### 신규 토큰 추가

```
1. globals.css   — CSS 변수 추가
2. tokens.ts     — 값 상수(COLOR 등) + 경로 상수(COLOR_VAR 등) 추가
3. createVariables.ts — COLOR_DEFINITIONS / FLOAT_DEFINITIONS 목록에 추가
4. Figma 플러그인 → 변수 등록 실행
```

> `createVariables.ts`에 추가하지 않으면 플러그인 실행 시 해당 변수만 등록되지 않는다.
> 세 파일을 함께 수정하는 습관을 유지한다.

### Figma 변수 경로 명명 규칙

CSS 변수 이름에서 `--` 제거 후 `-`를 `/`로 치환하면 Figma 변수 경로가 된다.

| CSS 변수 | Figma 변수 경로 | tokens.ts 상수 |
|---|---|---|
| `--spacing-md` | `spacing/md` | `SIZE_VAR.spacingMd` |
| `--color-surface` | `color/surface` | `COLOR_VAR.surface` |
| `--color-brand` | `color/brand` | `COLOR_VAR.brandPrimary` |
| `--font-sans` | `font/sans` | `FONT_VAR.sans` |

### figma-tokens/*.json (참조용)

Tokens Studio Pro 사용 시 Figma와 양방향 sync에 활용할 수 있는 파일이다.
현재는 플러그인 기반 등록으로 대체되어 **참조 문서**로 보관 중이다.
Tokens Studio Pro로 전환할 경우 이 파일들을 통해 sync를 재활성화할 수 있다.

---

## Storybook에서 확인하기

스토리북 실행 후 상단 툴바에서 **Brand**를 실시간으로 전환할 수 있습니다.
Domain은 `banking`으로 고정되어 있습니다.

```bash
npm run storybook   # http://localhost:6006
```

| 툴바 컨트롤 | 옵션 |
|---|---|
| Brand | hana / ibk / kb / nh / shinhan / woori |
| Domain | banking (고정) |

스토리 파일에서 Brand 기본값을 지정하려면:

```tsx
export default {
  parameters: {
    brand: 'kb',
  },
} satisfies Meta;
```

---

## 지원 브랜드 / 도메인

### Brand (은행)

| 키 | 이름 | 대표색 |
|---|---|---|
| `hana` | 하나은행 | `#008485` |
| `ibk` | IBK기업은행 | `#0068B7` |
| `kb` | KB국민은행 | `#FFBC00` |
| `nh` | NH농협은행 | `#00A859` |
| `shinhan` | 신한은행 | `#0046FF` |
| `woori` | 우리은행 | `#0067AC` |

### Domain (서비스)

| 키 | 이름 | 페이지 배경 | 대표색 |
|---|---|---|---|
| `banking` | 뱅킹 | `#f5f8f8` | 브랜드에 따라 결정 |
| `card` | 카드 | `#f4f7ff` | `#1A56DB` |
| `giro` | 지로 | `#f9f7ff` | `#5B21B6` |
| `insurance` | 보험 | `#fff8f7` | `#E03A1E` |
