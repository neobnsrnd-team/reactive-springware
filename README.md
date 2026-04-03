# Reactive Springware

**Figma 디자인 URL을 Claude Code에 입력하면 React 화면 코드를 자동 생성하는 AI 개발 워크플로우**

금융 앱 특화 컴포넌트 라이브러리 + Claude 규칙 파일 세트로 구성되어 있으며,
설치 한 번으로 일관된 품질의 화면을 빠르게 만들 수 있습니다.

---

## 어떻게 동작하나요?

```
Figma URL + API 정보
        ↓
   Claude Code
        ↓
  React 코드 자동 생성
  (page / hook / repository / types)
```

Claude는 설치 시 함께 세팅되는 규칙 파일을 읽고, 컴포넌트 라이브러리만 사용하여
구조화된 코드를 생성합니다. HTML 태그 직접 사용, 하드코딩, 계층 혼용은 규칙이 자동으로 차단합니다.

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 컴포넌트 라이브러리 | 금융 앱 특화 UI 컴포넌트 (Button, Card, Input, Layout 등) |
| Claude 규칙 자동 세팅 | `rs-init` 한 번으로 CLAUDE.md + 규칙 11개 자동 설치 |
| Tailwind 자동 설정 | 플러그인 등록·중복 import 제거·CSS 주입 자동 처리 |
| Figma MCP 연동 | `.mcp.json` 자동 생성 → Claude Code 재시작 → Figma 로그인 한 번으로 연동 완료 |
| Storybook 자동 세팅 | `rs-init` 실행만으로 컴포넌트 브라우저 즉시 실행 가능 |

---

## 빠른 시작

```bash
# 1. 패키지 설치
npm install @reactive-springware/component-lib

# 2. 프로젝트 초기화 (규칙 파일·Tailwind·Storybook·Figma MCP 자동 설정)
npx rs-init

# 3. Claude Code 재시작

# 4. /mcp 입력 → figma 항목 Enter → 브라우저 Figma 로그인

# 5. figma connected 확인 후 Figma URL 입력 가능
```

초기화 상세 내용은 `rs-docs/setup-guide.md`를 확인하세요.

---

## 설치 후 바로 할 수 있는 것

```bash
# 컴포넌트 UI 브라우저 실행
npm run rs-storybook

# Figma URL을 Claude Code에 입력하면 화면 코드 자동 생성
# → src/features/{화면명}/page.tsx|hook.ts|repository.ts|types.ts 생성
```

---

## 패키지 제거

```bash
npx rs-cleanup
npm uninstall @reactive-springware/component-lib
```

---

## 더 자세한 정보

설치 후 프로젝트 루트의 `rs-docs/setup-guide.md`를 확인하세요.

- rs-init이 하는 모든 작업 상세 설명
- 코드 생성 흐름 및 규칙 파일 구조
- Figma MCP 연동 및 트러블슈팅

---

## 디자인 토큰 동기화 가이드

> 이 섹션은 **패키지 기여자·내부 개발자**를 위한 내용입니다.
> `design-tokens/globals.css`에 새 속성을 추가할 때 반드시 아래 세 곳을 함께 업데이트해야 합니다.

### 세 계층의 역할

```
design-tokens/globals.css          figma-plugin/src/tokens.ts          Figma Variables 패널
─────────────────────────          ───────────────────────────          ───────────────────
CSS 변수 (단일 진실 공급원)    →   플러그인용 상수 (두 가지 형태)   →   컴포넌트 자동 바인딩
```

| 계층 | 역할 | 예시 |
|------|------|------|
| `globals.css` | 디자인 시스템의 단일 진실 공급원. 색상·간격·타이포그래피를 CSS 변수로 정의 | `--spacing-md: 12px` |
| `tokens.ts` 값 상수 | CSS 값을 Figma Plugin API 형식으로 변환한 런타임 값. 변수 바인딩 실패 시 fallback으로도 사용 | `SPACING.md = 12` |
| `tokens.ts` 경로 상수 | Figma Variables 패널의 변수 경로 문자열. 플러그인이 컴포넌트 생성 시 이 경로로 변수를 찾아 바인딩 | `SIZE_VAR.spacingMd = 'spacing/md'` |
| Figma Variables | Figma 캔버스에 등록된 실제 변수. 값이 바뀌면 바인딩된 모든 컴포넌트에 자동 반영 | Primitives 컬렉션 > `spacing/md = 12` |

### 경로 명명 규칙

CSS 변수 이름에서 `--` 제거 후 `-`를 `/`로 치환하면 Figma 변수 경로가 됩니다.

```
CSS 변수                    tokens.ts 상수                Figma 변수 경로
──────────────────────────  ────────────────────────────  ─────────────────────────
--spacing-md                SPACING.md = 12               spacing/md
--radius-xl                 RADIUS.xl = 24                radius/xl
--text-sm (fontSize)        FONT_SIZE.sm = 14             text/sm/fontSize
--text-sm--line-height      LINE_HEIGHT.sm = 20           text/sm/lineHeight
--color-surface             COLOR.surface = #FFFFFF       color/surface
--brand-primary             BRAND.primary = #008485       color/brand
--font-sans                 FONT_FAMILY.sans              font/sans
```

### 새 CSS 변수 추가 시 체크리스트

`globals.css`에 새 변수를 추가했다면 아래 순서로 업데이트하세요.

```
1. design-tokens/globals.css
   └─ CSS 변수 추가 (예: --color-surface-overlay: rgba(0,0,0,0.4))

2. figma-plugin/src/tokens.ts
   ├─ 값 상수 추가
   │   └─ 색상이면 COLOR / BRAND에 hex() 값 추가
   │      숫자면 SPACING / RADIUS / FONT_SIZE 등에 숫자 추가
   │      폰트면 FONT_FAMILY에 문자열 추가
   └─ 경로 상수 추가
       └─ 색상이면 COLOR_VAR에 Figma 경로 추가
          숫자면 SIZE_VAR에 Figma 경로 추가
          폰트면 FONT_VAR에 Figma 경로 추가

3. Figma Variables 패널
   └─ 해당 컬렉션(Primitives 또는 Semantic)에 동일한 경로로 변수 등록
      경로는 tokens.ts의 경로 상수 값과 반드시 일치해야 합니다.
```

### 상수별 파일 위치 요약

| 상수 | 역할 | 파일 |
|------|------|------|
| `BRAND`, `COLOR` | 색상 RGB fallback | `figma-plugin/src/tokens.ts` |
| `SPACING`, `RADIUS`, `FONT_SIZE`, `LINE_HEIGHT`, `LETTER_SPACING` | 숫자 fallback | `figma-plugin/src/tokens.ts` |
| `FONT_FAMILY` | 폰트 패밀리 문자열 fallback | `figma-plugin/src/tokens.ts` |
| `COLOR_VAR` | 색상 Figma 변수 경로 | `figma-plugin/src/tokens.ts` |
| `SIZE_VAR` | 숫자 Figma 변수 경로 | `figma-plugin/src/tokens.ts` |
| `FONT_VAR` | 폰트 Figma 변수 경로 | `figma-plugin/src/tokens.ts` |

