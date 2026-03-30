# Reactive Springware 셋업 가이드

## 목차

1. [사전 준비](#1-사전-준비)
2. [설치](#2-설치)
3. [rs-init이 하는 일](#3-rs-init이-하는-일)
4. [Figma MCP 토큰 설정](#4-figma-mcp-토큰-설정)
5. [초기화 후 프로젝트 구조](#5-초기화-후-프로젝트-구조)
6. [코드 생성 흐름](#6-코드-생성-흐름)
7. [규칙 파일 구조](#7-규칙-파일-구조)
8. [핵심 원칙](#8-핵심-원칙)
9. [패키지 제거](#9-패키지-제거)
10. [트러블슈팅](#10-트러블슈팅)

---

## 1. 사전 준비

| 항목 | 버전 / 조건 |
|------|-------------|
| Node.js | 18 이상 |
| 패키지 매니저 | npm |
| 번들러 | Vite (React 프로젝트 권장) |
| AI | Claude Code |

---

## 2. 설치

```bash
# 1. 컴포넌트 라이브러리 설치
npm install @reactive-springware/component-lib

# 2. 프로젝트 초기화
npx rs-init
```

---

## 3. rs-init이 하는 일

`npx rs-init` 실행 시 아래 작업을 자동으로 수행합니다.

### 3-1. CLAUDE.md 복사

Claude Code가 프로젝트 루트의 `CLAUDE.md`를 자동으로 읽습니다.
코드 생성 원칙, 아키텍처 방향, 금지 항목 등 Claude가 따라야 할 전체 규칙이 담겨 있습니다.

- 기존 `CLAUDE.md`가 있으면 `CLAUDE.md.bak`으로 백업 후 복사합니다.

### 3-2. .claude.rules 복사

GOOD/BAD 예시 중심의 핵심 규칙 Quick Reference입니다. Claude Code가 자동으로 읽습니다.

- 기존 `.claude.rules`가 있으면 `.claude.rules.bak`으로 백업 후 복사합니다.

### 3-3. rs-rules/ 복사

CLAUDE.md가 참조하는 상세 규칙 파일 9개를 복사합니다. [규칙 파일 구조](#7-규칙-파일-구조) 참조.

### 3-4. rs-docs/ 복사

```
docs/component-map.md  → <project-root>/rs-docs/component-map.md
docs/setup-guide.md    → <project-root>/rs-docs/setup-guide.md
```

Figma 컴포넌트 → React 컴포넌트 매핑표와 이 셋업 가이드를 복사합니다.

### 3-5. Tailwind 플러그인 자동 등록

`vite.config.ts`에 `@tailwindcss/vite` 플러그인을 자동으로 등록합니다.

```ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), ...],
});
```

이미 등록되어 있으면 건너뜁니다.

### 3-6. Tailwind 중복 import 자동 주석 처리

`src/**/*.css`에서 `@import "tailwindcss"` 구문을 자동으로 주석 처리합니다.

`dist/index.css`에 Tailwind 유틸리티가 이미 번들링되어 있으므로, 중복 시 preflight(CSS reset)가 두 번 적용되어 컴포넌트 스타일이 깨집니다.

### 3-7. CSS import 자동 주입

진입 파일(`src/main.tsx` 등) 상단에 아래 한 줄을 자동으로 추가합니다.

```ts
import '@reactive-springware/component-lib/dist/index.css';
```

이 파일 하나에 Tailwind 유틸리티·디자인 토큰·브랜드 변수·폰트가 모두 번들링되어 있습니다.

### 3-8. Figma MCP 자동 설정

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

**Figma MCP가 필요한 이유**: MCP 없이 Figma URL만 주면 Claude가 디자인 레이어를 읽지 못하고 추측으로 생성합니다. 섹션 누락이나 불완전 구현이 발생할 수 있습니다.

이미 `.mcp.json`에 `figma` 서버가 있으면 건너뜁니다. → [토큰 설정 방법](#4-figma-mcp-토큰-설정)

### 3-9. Storybook 자동 설정

`npx storybook init` 없이 바로 Storybook을 사용할 수 있도록 자동으로 설정합니다.

**추가되는 스크립트**

```json
{
  "scripts": {
    "rs-storybook": "storybook dev -p 6006",
    "build-rs-storybook": "storybook build"
  }
}
```

**생성되는 설정 파일**

```
.storybook/
  main.ts      — 컴포넌트 라이브러리 stories 탐색, tailwindcss 플러그인 주입
  preview.ts   — dist/index.css import, 모바일 뷰포트, 브랜드 데코레이터
```

이미 존재하면 건너뜁니다.

---

## 4. Figma MCP 토큰 설정

`rs-init` 실행 후 `.mcp.json`의 토큰 값을 실제 Figma PAT으로 교체해야 합니다.

```json
{
  "mcpServers": {
    "figma": {
      "env": {
        "FIGMA_API_KEY": "여기에_실제_토큰_입력"
      }
    }
  }
}
```

**Figma PAT 발급**: Figma → 우측 상단 프로필 → Settings → Account → Personal access tokens

---

## 5. 초기화 후 프로젝트 구조

```
<project-root>/
  CLAUDE.md              ← Claude Code 자동 로드 (코드 생성 전체 규칙)
  .claude.rules          ← Claude Code 자동 로드 (핵심 규칙 Quick Reference)
  .mcp.json              ← Figma MCP 서버 설정
  .storybook/
    main.ts
    preview.ts
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

### Step 1. 컴포넌트 확인

```bash
npm run rs-storybook
```

사용 가능한 컴포넌트와 props를 Storybook에서 확인합니다.
Claude에게 어떤 컴포넌트를 사용할지 명시하면 더 정확한 코드가 생성됩니다.

### Step 2. Claude Code에 Figma URL 입력

```
이 Figma 화면을 구현해줘.
https://www.figma.com/design/...?node-id=...

API: GET /api/transactions/:id
```

Claude는 Figma MCP를 통해 레이어 구조를 직접 읽고, `rs-rules/`의 규칙에 따라 코드를 생성합니다.

### Step 3. 생성되는 파일

```
src/features/{화면명}/
  types.ts        ← API 응답 타입 정의
  repository.ts   ← HTTP 호출·데이터 가공
  hook.ts         ← 데이터 패칭·상태 관리
  page.tsx        ← 라우팅 단위 페이지
src/router/routes.tsx  ← URL 경로 자동 등록
```

### Step 4. 개발자 마무리

| 항목 | 설명 |
|------|------|
| API 연동 | 실제 엔드포인트 연결 |
| 비즈니스 로직 | 화면별 핵심 기능 구현 |
| 예외 처리 | 에러 케이스 대응 |

---

## 7. 규칙 파일 구조

`rs-init` 실행 후 복사되는 규칙 파일 목록입니다.

| 파일 | 역할 |
|------|------|
| `CLAUDE.md` | 코드 생성 원칙 및 아키텍처 방향 (최상위) |
| `.claude.rules` | 핵심 규칙 Quick Reference (GOOD/BAD 예시) |
| `rs-docs/component-map.md` | Figma 컴포넌트 → React 컴포넌트 매핑표 |
| `rs-rules/01-architecture.md` | 프로젝트 구조 + feature-based 폴더 규칙 |
| `rs-rules/02-naming.md` | 파일·변수·함수·이벤트 네이밍 규칙 |
| `rs-rules/03-component.md` | 컴포넌트 사용 규칙 + Figma 레이아웃 변환 |
| `rs-rules/04-state-data.md` | 상태 관리 위치 기준 + 데이터 처리 규칙 |
| `rs-rules/05-repository.md` | Repository 패턴 작성 규칙 |
| `rs-rules/06-event.md` | 이벤트 핸들러 정의·전달 규칙 |
| `rs-rules/07-figma.md` | Figma 디자인 구조 해석 기준 |
| `rs-rules/08-generation.md` | 페이지 생성 시 처리 절차 및 라우터 등록 |
| `rs-rules/09-confirmation.md` | 개발자 확인이 필요한 상황 정의 |

---

## 8. 핵심 원칙

Claude가 코드를 생성할 때 반드시 지키는 규칙입니다.

- **Component Library 전용** — 모든 UI는 `@reactive-springware/component-lib`만 사용. `div`, `button` 등 HTML 태그 직접 사용 금지.
- **Design Token 전용** — 색상·간격·폰트는 디자인 토큰으로만 지정. `#333`, `16px` 등 하드코딩 금지.
- **역할 분리** — page(UI 렌더링) / hook(상태·로직) / repository(HTTP·데이터) 계층 반드시 분리.
- **데이터 상태 처리 필수** — 모든 데이터 화면에 `loading` / `error` / `empty` 처리 필수.
- **불확실 시 확인** — 판단할 수 없는 항목은 임의로 생성하지 않고 개발자에게 확인 후 진행.

---

## 9. 패키지 제거

```bash
npx rs-cleanup
npm uninstall @reactive-springware/component-lib
```

`rs-cleanup`이 삭제하는 항목: `CLAUDE.md`, `.claude.rules`, `rs-rules/`, `rs-docs/`

---

## 10. 트러블슈팅

### Claude가 규칙을 따르지 않고 코드를 생성하는 경우

- `CLAUDE.md`가 프로젝트 루트에 있는지 확인
- `rs-rules/` 폴더가 프로젝트 루트에 있는지 확인
- `rs-init`을 다시 실행해 파일을 재복사

### 컴포넌트 스타일이 적용되지 않는 경우

`src/main.tsx` 상단에 아래 import가 있는지 확인합니다.

```ts
import '@reactive-springware/component-lib/dist/index.css';
```

없으면 직접 추가하거나 `rs-init`을 다시 실행합니다.

### 버튼·폰트 등 컴포넌트 스타일이 깨지는 경우

`src/` 하위 CSS 파일에 `@import "tailwindcss"`가 있으면 preflight가 중복 적용되어 스타일이 덮어써집니다.
해당 줄을 주석 처리하거나 `rs-init`을 다시 실행합니다.

### Storybook이 실행되지 않는 경우

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

```bash
npm install @reactive-springware/component-lib
```
