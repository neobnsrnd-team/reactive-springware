# Reactive-Springware

Figma 디자인과 API 정보를 Claude에 입력하면 React 코드를 자동 생성하는 AI 개발 워크플로우

컴포넌트 UI는 라이브러리 저장소에서 `npm run rs-stories`로 확인하세요.

---

## 전체 프로세스

```
1. 에셋 구축       공통 컴포넌트 Figma 에셋 생성 (디자인/개발 싱크)
       ↓
2. 화면 디자인     구축된 에셋만 사용하여 화면 설계 (디자이너)
       ↓
3. AI 개발         Figma URL + API 정보 → Claude → React 코드 생성
       ↓
4. 최종 연동       REST API 연결 및 비즈니스 로직 완성
```

---

## 빠른 시작

### 1. 컴포넌트 라이브러리 설치

```bash
npm install @reactive-springware/component-lib
```

### 2. 프로젝트 초기화

```bash
npx rs-init
```

`rs-init`이 아래 작업을 자동으로 처리합니다.

| 작업 | 내용 |
|------|------|
| `CLAUDE.md` 복사 | 코드 생성 원칙·아키텍처 규칙 → 프로젝트 루트 |
| `.claude.rules` 복사 | Claude Code 핵심 규칙 Quick Reference → 프로젝트 루트 |
| `rs-rules/` 복사 | 상세 규칙 파일 9개 → 프로젝트 루트 |
| `rs-docs/` 복사 | 컴포넌트 맵, 셋업 가이드 → 프로젝트 루트 |
| Tailwind 플러그인 등록 | `vite.config.*`에 `@tailwindcss/vite` 플러그인 자동 등록 |
| Tailwind 중복 제거 | `src/**/*.css`에서 `@import "tailwindcss"` 자동 주석 처리 |
| CSS import 주입 | `src/main.*` 진입 파일에 라이브러리 CSS 자동 추가 |
| Storybook 설정 | `package.json` 스크립트 추가 + `.storybook/` 설정 파일 생성 |

초기화 완료 후 `rs-docs/setup-guide.md`를 읽어 다음 단계를 확인하세요.

### 3. Storybook으로 컴포넌트 확인

```bash
npm run storybook
```

사용 가능한 컴포넌트와 props를 Storybook에서 확인한 뒤 Claude에 전달하세요.

### 4. Claude Code 실행

Figma 화면 정보나 요구사항을 Claude Code에 입력하면 규칙 기반으로 React 코드를 생성합니다.

---

## 생성되는 코드 구조

Figma 화면 1개 = `src/features/` 하위 폴더 1개

```
src/features/
  transactionDetail/
    page.tsx        페이지 컴포넌트 (라우팅 단위)
    hook.ts         데이터 패칭·상태 관리
    repository.ts   HTTP 호출·데이터 가공·모델 변환
    types.ts        TypeScript 타입 정의
  accountList/
    page.tsx
    hook.ts
    ...
```

### 생성 순서

Claude는 의존성 순서에 따라 아래 순서로 생성합니다.

1. **types.ts** — 모든 파일이 참조하는 타입 정의
2. **repository.ts** — HTTP 호출·모델 변환 담당
3. **hook.ts** — 데이터 패칭·상태 로직
4. **page.tsx** — 라우팅 단위 페이지
5. **라우터 등록** — `src/router/routes.tsx`에 URL 경로 등록

---

## 규칙 파일 구조

`rs-init` 실행 후 프로젝트에 복사되는 규칙 파일 목록입니다.

| 파일 | 역할 |
|------|------|
| `CLAUDE.md` | 코드 생성 원칙 및 아키텍처 방향 |
| `.claude.rules` | 핵심 규칙 Quick Reference (GOOD/BAD 예시) |
| `rs-docs/component-map.md` | Figma 컴포넌트 → React 컴포넌트 매핑표 |
| `rs-docs/setup-guide.md` | 셋업 가이드 및 트러블슈팅 |
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

## 핵심 원칙

- **Component Library 전용** — 모든 UI는 `@reactive-springware/component-lib`만 사용. HTML 태그 직접 사용 금지.
- **Design Token 전용** — 색상·간격·폰트는 토큰으로만 지정. 하드코딩 금지.
- **역할 분리** — page(UI) / hook(로직) / repository(데이터) 계층을 반드시 분리.
- **데이터 상태 처리 필수** — 모든 데이터 화면에 loading / error / empty 처리 필수.
- **불확실 시 확인** — 판단할 수 없는 항목은 임의로 생성하지 않고 개발자에게 확인 후 진행.

---

## 패키지 제거

```bash
npx rs-cleanup        # rs-init이 복사한 파일 삭제
npm uninstall @reactive-springware/component-lib
```
