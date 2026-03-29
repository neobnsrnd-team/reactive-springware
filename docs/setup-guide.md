# Reactive Springware 셋업 가이드

## 목차

1. [개요](#1-개요)
2. [사전 준비](#2-사전-준비)
3. [설치](#3-설치)
4. [rs-init이 하는 일](#4-rs-init이-하는-일)
5. [초기화 후 프로젝트 구조](#5-초기화-후-프로젝트-구조)
6. [코드 생성 흐름](#6-코드-생성-흐름)
7. [주의사항](#7-주의사항)
8. [패키지 제거](#8-패키지-제거)
9. [트러블슈팅](#9-트러블슈팅)

---

## 1. 개요

Reactive Springware는 Figma 디자인을 기반으로 React 코드를 자동 생성하는 개발 플랫폼입니다.
컴포넌트 라이브러리 + Claude 규칙 파일을 바탕으로 일관된 품질의 화면을 빠르게 구축할 수 있습니다.

컴포넌트 라이브러리 UI 시연: **https://neobnsrnd-team.github.io/reactive-springware/**

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

`npx rs-init` 실행 시 아래 6가지 작업을 자동으로 수행합니다.

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

### 4-3. rs-rules/ 복사

```
rules/ → <project-root>/rs-rules/
```

CLAUDE.md가 참조하는 상세 규칙 파일 9개를 복사합니다.

| 파일 | 내용 |
|------|------|
| `rs-rules/01-architecture.md` | 프로젝트 구조 + 레이어 역할 분리 |
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

### 4-5. CSS import 자동 주입

`src/main.tsx` (또는 `src/main.jsx`, `src/index.tsx` 등) 진입 파일 상단에 아래 한 줄을 자동으로 추가합니다.

```ts
import '@reactive-springware/component-lib/dist/index.css';
```

이 파일 하나에 Tailwind 유틸리티 클래스와 디자인 토큰이 모두 번들링되어 있습니다.
별도로 Tailwind를 설치하거나 설정할 필요가 없습니다.

진입 파일을 찾지 못한 경우 경고 메시지와 함께 수동 추가 안내가 출력됩니다.

### 4-6. Tailwind 플러그인 자동 등록

`vite.config.ts` (또는 `vite.config.js`)에 `@tailwindcss/vite` 플러그인을 자동으로 등록합니다.

```ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), ...],
});
```

이미 등록되어 있으면 건너뜁니다.

---

## 5. 초기화 후 프로젝트 구조

```
<project-root>/
  CLAUDE.md              ← Claude Code 자동 로드 (코드 생성 전체 규칙)
  CLAUDE.md.bak          ← 기존 CLAUDE.md 백업 (있던 경우)
  .claude.rules          ← Claude Code 자동 로드 (핵심 규칙 Quick Reference)
  rs-rules/              ← CLAUDE.md가 참조하는 상세 규칙 9개
  rs-docs/
    component-map.md     ← Figma → React 컴포넌트 매핑표
    setup-guide.md       ← 이 파일
  src/
    main.tsx             ← CSS import 자동 주입됨
  vite.config.ts         ← tailwindcss() 플러그인 자동 등록됨
```

---

## 6. 코드 생성 흐름

### Step 1. Figma 화면 준비

컴포넌트 기반으로 설계된 Figma 화면을 준비합니다.

### Step 2. Claude Code 실행

Claude Code에 아래 정보를 입력합니다.

```
이 화면은 사용자 목록 화면이다.
상단에 검색 필터가 있고, 하단에 사용자 테이블이 있다.
각 행에는 이름, 이메일, 상태가 표시된다.
API: GET /api/users
```

### Step 3. 코드 자동 생성

Claude는 아래 순서로 파일을 생성합니다.

1. **Types** — API 응답 타입 정의
2. **Repository** — HTTP 호출·데이터 가공
3. **Hook** — 데이터 패칭·상태 관리
4. **Component** — UI 컴포넌트
5. **Page** — 라우팅 단위 페이지
6. **라우터 등록** — URL 경로 등록

### Step 4. 개발자 마무리

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
