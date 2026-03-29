# Reactive-Springware

Figma 디자인과 API 정보를 Claude에 입력하면 React 코드를 자동 생성하는 AI 개발 워크플로우

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
npm install @reactive-springware/component-library
```

### 2. npm 패키지 init

`docs/CLAUDE.md`, `rules/` 파일이 프로젝트 루트에 복사된다.

```bash
npx rs-init
```

Claude Code는 프로젝트 루트의 `CLAUDE.md`, `rules/` 를 자동으로 읽어 코드 생성 규칙을 적용한다.

### 3. API 키 설정

`.env` 파일에 Anthropic API 키를 입력한다.

```env
ANTHROPIC_API_KEY=your_api_key_here
```

### 4. 코드 생성

Claude Code를 실행한 후 Figma 화면을 붙여넣어 코드를 생성한다.

```
Claude Code 실행 → Figma 화면 URL 또는 디자인 정보 붙여넣기 → React 코드 생성
```

---

## 생성되는 코드 구조

```
pages/          페이지 컴포넌트
hooks/          데이터 패칭·상태 관리 Hook
repositories/   HTTP 호출·데이터 가공·모델 변환
types/          TypeScript 타입 정의
components/     페이지 전용 UI 컴포넌트
```

### 생성 순서

Claude는 의존성 순서에 따라 아래 순서로 생성한다.

1. **Types** — 모든 파일이 참조하는 타입 정의
2. **Repository** — HTTP 호출·모델 변환 담당
3. **Hook** — React Query 기반 데이터 패칭
4. **Component** — UI 컴포넌트
5. **Page** — 라우팅 단위 페이지
6. **라우터 등록** — URL 경로 등록

---

## 규칙 파일 구조

코드 생성 품질을 일정하게 유지하기 위한 규칙 파일 목록

| 파일 | 역할 |
|------|------|
| `docs/CLAUDE.md` | 코드 생성 원칙 및 아키텍처 방향 (프로젝트 루트에 복사) |
| `docs/.claude.rules` | 23개 핵심 규칙 Quick Reference (GOOD/BAD 예시) |
| `docs/component-map.md` | Figma 컴포넌트 → React 컴포넌트 매핑표 |
| `docs/interpretation-rules.md` | Figma 디자인 해석 기준 |
| `rules/01-architecture.md` | 프로젝트 구조 + Page/Hook/Repository 레이어 역할 분리 |
| `rules/02-naming.md` | 파일·변수·함수·이벤트 네이밍 규칙 |
| `rules/03-component.md` | 컴포넌트 사용 규칙 + Figma 레이아웃 변환 |
| `rules/04-state-data.md` | 상태 관리 위치 기준 + 데이터 처리 규칙 |
| `rules/05-repository.md` | Repository 패턴 작성 규칙 |
| `rules/06-event.md` | 이벤트 핸들러 정의·전달 규칙 |
| `rules/07-figma.md` | Figma 디자인 구조 해석 기준 |
| `rules/08-generation.md` | 페이지 생성 시 처리 절차 및 라우터 등록 |
| `rules/09-confirmation.md` | 개발자 확인이 필요한 상황 정의 |

---

## 핵심 원칙

- **Component Library 전용** — 모든 UI는 `@reactive-springware/component-library`만 사용. HTML 태그 직접 사용 금지.
- **Design Token 전용** — 색상·간격·폰트는 토큰으로만 지정. 하드코딩 금지.
- **역할 분리** — Page(UI) / Hook(로직) / Repository(데이터) 계층을 반드시 분리.
- **데이터 상태 처리 필수** — 모든 데이터 화면에 loading / error / empty 처리 필수.
- **불확실 시 확인** — 판단할 수 없는 항목은 임의로 생성하지 않고 개발자에게 확인 후 진행.
