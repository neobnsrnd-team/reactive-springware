# 🚀 Reactive Springware Setup Guide

## 📋 목차

1. [개요](#1-개요)
2. [사전 준비](#2-사전-준비)
3. [설치 방법](#3-설치-방법)
4. [프로젝트 구조 예시](#4-프로젝트-구조-예시)
5. [사용 흐름](#5-사용-흐름)
6. [샘플 입력 템플릿](#6-샘플-입력-템플릿)
7. [주의사항](#7-주의사항)
8. [트러블슈팅](#8-트러블슈팅)
9. [요약](#9-요약)

---

## 1. 개요

Reactive Springware는 Figma 디자인을 기반으로 React 코드를 자동 생성하는 개발 플랫폼입니다.
컴포넌트 라이브러리 + Claude 규칙을 기반으로 화면을 빠르게 구축할 수 있습니다.

---

## 2. 사전 준비

| 항목 | 버전 / 조건            |
|------|--------------------|
| Node.js |                    | // TODO
| 패키지 매니저 | npm 또는 pnpm        |
| 실행 환경 | Claude Code        |
| 디자인 | Figma (컴포넌트 기반 설계 권장) |

---

## 3.🛠 설치 방법

### 3.1 private registry 설정

```bash
npm config set @reactivespringware:registry <private-registry-url>
```

### 3.2 패키지 설치

```bash
npm install @reactivespringware/component-library @reactivespringware/runtime
```

### 3.3 프로젝트 초기화

CLAUDE.md를 포함한 필수 파일을 루트에 자동으로 배치합니다.

```bash
npx @reactivespringware/init
```

---

## 4.📁 프로젝트 구조 예시

```text
my-app/
├── src/
├── CLAUDE.md          ← 반드시 루트에 위치해야 함
├── .claude.rules      ← 반드시 루트에 위치해야 함
└── package.json
```

---

## 5. 사용 흐름

### Step 1. Figma 화면 준비

- 컴포넌트 기반으로 화면 설계
- 반복 요소, 입력 영역, 리스트 구조 명확히 구성

### Step 2. Claude 실행

Claude Code에 다음 정보를 입력합니다.

- Figma 화면 구조 또는 설명
- 필요한 API 정보 (선택)

### Step 3. React 코드 생성

Claude는 다음 기준으로 코드를 생성합니다.

- `component-library` 기반 컴포넌트 사용
- `design-tokens` 스타일 적용
- 규칙 기반 코드 구조 생성

### Step 4. 후처리 (필수)

자동 생성 코드는 기초 구조를 제공합니다.
다음 작업은 반드시 개발자가 수행해야 합니다.

| 항목 | 설명 |
|------|------|
| API 연동 | 실제 엔드포인트와 연결 |
| 비즈니스 로직 | 화면별 핵심 기능 구현 |
| 상태 관리 | 전역/로컬 상태 설계 및 적용 |
| 예외 처리 | 에러 케이스 대응 |

---

## 6. 샘플 입력 템플릿

Claude에 화면 정보를 전달할 때 아래 형식을 참고하세요.

```text
이 화면은 사용자 목록 화면이다.
상단에는 검색 필터가 있고,
하단에는 사용자 리스트 테이블이 있다.
각 행에는 이름, 이메일, 상태가 표시된다.
```

---

## 7.💡 주의사항

- `CLAUDE.md`가 루트에 없으면 정상 동작하지 않습니다.
- 공통 컴포넌트를 사용하지 않고 임의 코드 생성 시 품질이 저하됩니다.
- Figma 디자인이 컴포넌트 기반이 아닐 경우 생성 품질이 낮아질 수 있습니다.

---

## 8. 트러블슈팅

### 문제 1. Claude가 이상한 코드를 생성하는 경우

**확인 사항:**

- `CLAUDE.md`가 루트에 존재하는지 확인
- `.claude.rules`가 적용되었는지 확인

### 문제 2. 컴포넌트가 적용되지 않는 경우

**확인 사항:**

- `component-library`가 정상 설치되었는지 확인
- import 경로 확인

---

## 9.▶️ 요약

```text
1. npm config set @reactivespringware:registry <private-registry-url>
2. npm install @reactivespringware/component-library @reactivespringware/runtime
3. npx @reactivespringware/init
4. Claude 실행
5. 코드 생성 후 개발자가 마무리
```

---

> Reactive Springware는 "코드 생성 도구"가 아니라
> **"컴포넌트 기반 개발 플랫폼"** 입니다.
