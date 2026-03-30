# Reactive Springware 셋업 가이드

## 목차

1. [개요](#1-개요)
2. [사전 준비](#2-사전-준비)
3. [설치](#3-설치)
4. [rs-init이 하는 일](#4-rs-init이-하는-일)
   - 4-8. Figma MCP 자동 설정
5. [초기화 후 프로젝트 구조](#5-초기화-후-프로젝트-구조)
6. [코드 생성 흐름](#6-코드-생성-흐름)
7. [주의사항](#7-주의사항)
8. [패키지 제거](#8-패키지-제거)
9. [트러블슈팅](#9-트러블슈팅)

---

## 1. 개요

Reactive Springware는 Figma 디자인을 기반으로 React 코드를 자동 생성하는 개발 플랫폼입니다.
컴포넌트 라이브러리 + Claude 규칙 파일을 바탕으로 일관된 품질의 화면을 빠르게 구축할 수 있습니다.

컴포넌트 UI는 `npm run storybook`으로 확인하세요.

---

## 2. 사전 준비

| 항목 | 버전 / 조건 |
|------|-------------|
| Node.js | 18 이상 |
| 패키지 매니저 | npm |
| 번들러 | Vite (React 프로젝트 권장) |
| AI | Claude Code |

---

## 3. 설치

```bash
# 1. 컴포넌트 라이브러리 설치
npm install @reactive-springware/component-lib

# 2. 프로젝트 초기화
npx rs-init
```

---

## 4. rs-init이 하는 일

`npx rs-init` 실행 시 아래 작업을 자동으로 수행합니다.

### 4-1. CLAUDE.md 복사

```
docs/CLAUDE.md → <project-root>/CLAUDE.md
```

Claude Code는 프로젝트 루트의 `CLAUDE.md`를 자동으로 읽습니다.
코드 생성 원칙, 아키텍처 방향, 금지 항목 등 Claude가 따라야 할 전체 규칙이 담겨 있습니다.

- 기존 `CLAUDE.md`가 있으면 덮어쓰지 않고 `CLAUDE.md.bak`으로 백업 후 복사합니다.

### 4-2. .claude.rules 복사

```
docs/.claude.rules → <project-root>/.claude.rules
```

Claude Code가 루트의 `.claude.rules`를 자동으로 읽습니다.
GOOD/BAD 예시 중심의 핵심 규칙 Quick Reference입니다.

- 기존 `.claude.rules`가 있으면 덮어쓰지 않고 `.claude.rules.bak`으로 백업 후 복사합니다.

### 4-3. rs-rules/ 복사

```
rules/ → <project-root>/rs-rules/
```

CLAUDE.md가 참조하는 상세 규칙 파일 9개를 복사합니다.

| 파일 | 내용 |
|------|------|
| `rs-rules/01-architecture.md` | 프로젝트 구조 + feature-based 폴더 규칙 |
| `rs-rules/02-naming.md` | 네이밍 규칙 |
| `rs-rules/03-component.md` | 컴포넌트 사용 규칙 |
| `rs-rules/04-state-data.md` | 상태 관리 규칙 |
| `rs-rules/05-repository.md` | Repository 패턴 규칙 |
| `rs-rules/06-event.md` | 이벤트 핸들러 규칙 |
| `rs-rules/07-figma.md` | Figma 해석 기준 |
| `rs-rules/08-generation.md` | 페이지 생성 절차 |
| `rs-rules/09-confirmation.md` | 개발자 확인 필요 상황 |

### 4-4. rs-docs/ 복사

```
docs/component-map.md  → <project-root>/rs-docs/component-map.md
docs/setup-guide.md    → <project-root>/rs-docs/setup-guide.md
```

Figma 컴포넌트 → React 컴포넌트 매핑표와 이 셋업 가이드를 복사합니다.

### 4-5. Tailwind 플러그인 자동 등록

`vite.config.ts` (또는 `vite.config.js`)에 `@tailwindcss/vite` 플러그인을 자동으로 등록합니다.

```ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), ...],
});
```

이미 등록되어 있으면 건너뜁니다.

### 4-6. Tailwind 중복 import 자동 주석 처리

`src/**/*.css` 파일에서 `@import "tailwindcss"` 구문을 자동으로 주석 처리합니다.

```css
/* [rs-init] Tailwind가 dist/index.css에 번들링되어 있으므로 중복 import를 비활성화합니다.
   @import "tailwindcss"; */
```

`dist/index.css`에 Tailwind 유틸리티가 이미 번들링되어 있으므로 중복 시 preflight(CSS reset)가 두 번 적용되어 컴포넌트 스타일이 깨집니다.

### 4-7. CSS import 자동 주입

`src/main.tsx` (또는 `src/main.jsx`, `src/index.tsx` 등) 진입 파일 상단에 아래 한 줄을 자동으로 추가합니다.

```ts
import '@reactive-springware/component-lib/dist/index.css';
```

이 파일 하나에 Tailwind 유틸리티 클래스·디자인 토큰·브랜드 변수·폰트가 모두 번들링되어 있습니다.
별도로 Tailwind를 설치하거나 설정할 필요가 없습니다.

### 4-8. Figma MCP 자동 설정

`.mcp.json`에 Figma MCP 서버 설정을 추가합니다.

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "YOUR_FIGMA_PERSONAL_ACCESS_TOKEN_HERE"
      }
    }
  }
}
```

**Figma MCP가 필요한 이유**: Claude Code가 Figma URL만으로는 디자인 레이어 구조를 읽지 못합니다. MCP 없이 생성하면 섹션 누락·불완전 구현이 발생할 수 있습니다.

**설정 후 필수 작업**: `.mcp.json`의 `YOUR_FIGMA_PERSONAL_ACCESS_TOKEN_HERE`를 실제 Figma PAT으로 교체하세요.

> Figma PAT 발급: Figma → Settings → Account → Personal access tokens

이미 `.mcp.json`에 `figma` 서버가 있으면 건너뜁니다.

### 4-9. Storybook 자동 설정

`npx storybook init` 없이 바로 Storybook을 사용할 수 있도록 자동으로 설정합니다.

**package.json 스크립트 추가**

```json
{
  "scripts": {
    "rs-storybook": "storybook dev -p 6006",
    "build-rs-storybook": "storybook build"
  }
}
```

**`.storybook/` 설정 파일 생성**

```
.storybook/
  main.ts      — src/features/**/*.stories.@(ts|tsx) 탐색, tailwindcss 플러그인 주입
  preview.ts   — dist/index.css import, 모바일 뷰포트, 브랜드 데코레이터
```

이미 존재하면 건너뜁니다.

---

## 5. 초기화 후 프로젝트 구조

```
<project-root>/
  CLAUDE.md              ← Claude Code 자동 로드 (코드 생성 전체 규칙)
  CLAUDE.md.bak          ← 기존 CLAUDE.md 백업 (있던 경우)
  .claude.rules          ← Claude Code 자동 로드 (핵심 규칙 Quick Reference)
  .claude.rules          ← 기존 .claude.rules.md 백업 (있던 경우)
  .storybook/
    main.ts              ← Storybook 빌드 설정
    preview.ts           ← 전역 CSS·뷰포트·브랜드 데코레이터
  rs-rules/              ← CLAUDE.md가 참조하는 상세 규칙 9개
  rs-docs/
    component-map.md     ← Figma → React 컴포넌트 매핑표
    setup-guide.md       ← 이 파일
  src/
    main.tsx             ← CSS import 자동 주입됨
    features/            ← Figma 화면별 생성 코드
    router/
      routes.tsx         ← 페이지 URL 등록
  vite.config.ts         ← tailwindcss() 플러그인 자동 등록됨
```

---

## 6. 코드 생성 흐름

### Step 1. Storybook으로 컴포넌트 확인

```bash
npm run rs-storybook
```

사용 가능한 컴포넌트와 props를 Storybook에서 먼저 확인합니다.
이후 Claude에게 어떤 컴포넌트를 사용할지 명시하면 더 정확한 코드가 생성됩니다.

### Step 2. Figma 화면 준비

컴포넌트 기반으로 설계된 Figma 화면을 준비합니다.

### Step 3. Claude Code 실행

Claude Code에 아래 정보를 입력합니다.

```
이 화면은 거래 내역 상세 화면이다.
상단에 금액과 수신자 정보가 있고, 하단에 상세 항목 목록이 있다.
API: GET /api/transactions/:id
```

### Step 4. 코드 자동 생성

Claude는 `src/features/{화면명}/` 폴더 아래에 아래 순서로 파일을 생성합니다.

1. **types.ts** — API 응답 타입 정의
2. **repository.ts** — HTTP 호출·데이터 가공
3. **hook.ts** — 데이터 패칭·상태 관리
4. **page.tsx** — 라우팅 단위 페이지
5. **라우터 등록** — `src/router/routes.tsx`에 URL 경로 등록

### Step 5. 개발자 마무리

| 항목 | 설명 |
|------|------|
| API 연동 | 실제 엔드포인트 연결 |
| 비즈니스 로직 | 화면별 핵심 기능 구현 |
| 예외 처리 | 에러 케이스 대응 |

---

## 7. 주의사항

- `CLAUDE.md`가 프로젝트 루트에 없으면 Claude Code가 규칙을 읽지 못합니다.
- `rs-rules/` 폴더가 없으면 CLAUDE.md가 참조하는 규칙 파일을 읽지 못합니다.
- CSS import가 없으면 컴포넌트 스타일이 전혀 적용되지 않습니다.
- HTML 태그(`div`, `button` 등)를 직접 사용하지 말고 컴포넌트 라이브러리만 사용합니다.
- 고객사 CSS에 `@import "tailwindcss"`가 있으면 스타일 충돌이 발생합니다. `rs-init`이 자동으로 주석 처리합니다.

---

## 8. 패키지 제거

`rs-init`이 복사한 파일을 정리한 뒤 패키지를 제거합니다.

```bash
npx rs-cleanup
npm uninstall @reactive-springware/component-lib
```

`rs-cleanup`이 삭제하는 항목: `CLAUDE.md`, `.claude.rules`, `rs-rules/`, `rs-docs/`

---

## 9. 트러블슈팅

### Claude가 규칙을 따르지 않고 코드를 생성하는 경우

- `CLAUDE.md`가 프로젝트 루트에 있는지 확인
- `rs-rules/` 폴더가 프로젝트 루트에 있는지 확인
- `rs-init`을 다시 실행해 파일을 재복사

### 컴포넌트 스타일이 적용되지 않는 경우

`src/main.tsx` (또는 진입 파일) 상단에 아래 import가 있는지 확인합니다.

```ts
import '@reactive-springware/component-lib/dist/index.css';
```

없으면 직접 추가하거나 `rs-init`을 다시 실행합니다.

### 버튼 곡선·폰트 크기 등 컴포넌트 스타일이 깨지는 경우

`src/` 하위 CSS 파일에 `@import "tailwindcss"`가 있으면 preflight가 중복 적용되어 스타일이 덮어써집니다.
해당 줄을 주석 처리하거나 `rs-init`을 다시 실행합니다.

### Storybook이 실행되지 않는 경우

`rs-init`을 실행했는지 확인합니다. `.storybook/` 폴더와 `rs-storybook` 스크립트가 자동으로 생성됩니다.

```bash
npx rs-init   # 재실행 (이미 있는 파일은 건너뜀)
npm run rs-storybook
```

### vite.config에서 Tailwind 관련 오류가 나는 경우

`vite.config.ts`에 아래 내용이 있는지 확인합니다.

```ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), ...],
});
```

없으면 직접 추가하거나 `rs-init`을 다시 실행합니다.

### `@reactive-springware/component-lib` import 오류가 나는 경우

패키지가 정상 설치되어 있는지 확인합니다.

```bash
npm install @reactive-springware/component-lib
```
