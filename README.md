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

### 사전 준비 — GitHub 인증 설정

이 패키지는 GitHub Packages에 배포되어 있습니다. 설치 전 아래 설정이 필요합니다.

**1. GitHub Personal Access Token 발급**

[github.com → Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens/new)
에서 `read:packages` 권한으로 토큰을 발급합니다.

**2. `.npmrc` 설정**

프로젝트 루트 또는 홈 디렉터리(`~/.npmrc`)에 아래 내용을 추가합니다.

```
@neobnsrnd-team:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### 설치 및 초기화

```bash
# 1. 패키지 설치
npm install @neobnsrnd-team/reactive-springware

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
npm uninstall @neobnsrnd-team/reactive-springware
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

### 계층 구조와 역할

**Figma Variables가 단일 진실 공급원입니다. `globals.css`는 직접 수정하지 않습니다.**

```
Figma Variables (단일 진실 공급원)
        ↓  Token Studio export → temp.json → Claude 변환
design-tokens/figma-tokens/*.json   ← 카테고리별 구조화 토큰
        ↓  Claude 변환
design-tokens/globals.css           ← 자동 생성 (직접 수정 금지)
        ↓  Tailwind import
React 컴포넌트

figma-plugin/src/tokens.ts          ← 플러그인 전용 (공통 시맨틱 토큰만)
        ↓  플러그인 "컴포넌트 생성"
Figma 캔버스 컴포넌트
```

| 계층 | 역할 | 직접 수정 |
|------|------|------|
| Figma Variables | 색상·간격·폰트의 단일 진실 공급원 | 디자이너가 수정 |
| `figma-tokens/*.json` | Token Studio export 구조화 파일. Claude가 globals.css 생성 시 참조 | Claude가 자동 생성 |
| `globals.css` | CSS 변수 정의. Tailwind @theme 포함 | 직접 수정 금지 |
| `tokens.ts` | 플러그인용 JS 상수. Figma 컴포넌트 생성·변수 바인딩에 사용 | 공통 시맨틱 토큰 추가 시만 수정 |

### 토큰 업데이트 방법

```
1. Figma에서 Tokens Studio 플러그인 실행
2. Export → Export to file (single JSON) → temp.json으로 저장
3. temp.json을 Claude에게 전달:
   "figma-tokens/*.json 업데이트하고 globals.css 재생성해줘"
4. Claude가 처리:
   ├─ temp.json → primitives / semantic / brand.* / domain.* 분배
   └─ figma-tokens/*.json → globals.css 변환
5. temp.json 삭제
```

자세한 내용은 `design-tokens/README.md`를 참고하세요.

