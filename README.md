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
| Figma MCP 연동 | `.mcp.json` 자동 생성으로 Claude가 Figma 레이어를 직접 읽음 |
| Storybook 자동 세팅 | `rs-init` 실행만으로 컴포넌트 브라우저 즉시 실행 가능 |

---

## 빠른 시작

```bash
# 1. 패키지 설치
npm install @reactive-springware/component-lib

# 2. 프로젝트 초기화 (규칙 파일·Tailwind·Storybook·Figma MCP 자동 설정)
npx rs-init
```

초기화가 완료되면 `rs-docs/setup-guide.md`에서 다음 단계를 확인하세요.

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
- Figma MCP 토큰 설정 방법
- 트러블슈팅
