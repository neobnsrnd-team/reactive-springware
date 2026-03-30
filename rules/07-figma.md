# 07-figma.md — Figma 해석 기준

## 목적

Figma UI를 Claude AI가 정확하게 해석하여
React 코드로 생성할 수 있도록 디자인 규칙 정의

본 문서는 **Figma → Claude → React 자동 생성**을 위한 설계 기준이다.

---

# 핵심 원칙

Claude는 다음 정보를 기반으로 UI를 해석한다.

- Frame 구조
- Auto Layout
- Component 이름
- Layer 이름

따라서 반드시 구조적으로 디자인해야 한다.

---

# 1. Frame 구조 규칙

페이지는 반드시 Frame 구조로 설계한다.

## 권장 구조

```
Page
 ├─ Header
 ├─ Content
 └─ Footer (선택)
```

Claude 해석:
```
PageLayout
```

## Section 구조

```
Page
 ├─ FilterSection
 ├─ ContentSection
 └─ ActionSection
```

Claude 해석:
```
PageLayout
  Section
  Section
  Section
```

---

# 2. Auto Layout 규칙 (필수)

Claude는 Auto Layout을 Layout 컴포넌트로 해석한다.

## Vertical Auto Layout

Figma:
```
Auto Layout (Vertical)
```

Claude:
```
<Stack direction="vertical" />
```

## Horizontal Auto Layout

Figma:
```
Auto Layout (Horizontal)
```

Claude:
```
<Row />
```

---

# 3. Layout Component 규칙

Figma에서는 Layout 컴포넌트를 사용한다.

## 권장 Layout 컴포넌트

```
PageLayout
Section
Stack
Row
Column
Card
```

---

# 4. Naming 규칙 (매우 중요)

Claude는 이름을 기반으로 UI를 해석한다.
레이어·프레임 이름이 없으면 Claude가 의도를 파악할 수 없다.

## Page

```
Page
UserListPage
DashboardPage
```

## Section

```
HeaderSection
FilterSection
TableSection
FormSection
```

## Layout

```
PageLayout
Stack
Row
Column
```

## UI Component

```
DataTable
Form
FilterBar
CardList
Pagination
```

---

# 5. 리스트 화면 설계

## 권장 구조

```
Page
 ├─ FilterSection
 ├─ TableSection
 └─ Pagination
```

Claude 해석:
```
DataTable
Pagination
```

---

# 6. Form 화면 설계

## 권장 구조

```
Page
 ├─ FormSection
 └─ ActionSection
```

Claude 해석:
```
Form
ButtonGroup
```

---

# 7. 카드형 화면 설계

## 권장 구조

```
Page
 └─ CardList
```

Claude 해석:
```
Card (반복 렌더링)
```

---

# 8. 반복 구조 규칙

반복 UI는 반드시 Auto Layout 사용

```
CardList
 ├─ Card
 ├─ Card
 └─ Card
```

Claude 해석:
```
map()
```

---

# 9. 버튼 영역 규칙

```
ActionSection
 ├─ CancelButton
 └─ SubmitButton
```

Claude 해석:
```
ButtonGroup
```

---

# 10. 검색 영역 규칙

```
FilterSection
 ├─ SearchInput
 ├─ Select
 └─ Button
```

Claude 해석:
```
FilterBar
```

---

# Component Library 연동 규칙

Figma 컴포넌트는 Component Library와 매핑

예:
```
Button      → <Button />
Input       → <TextField />
Select      → <Select />
Card        → <Card />
Table       → <DataTable />
```

---

# 금지 규칙

다음 디자인 방식 금지

❌ Rectangle 기반 UI
❌ Group 남용
❌ 이름 없는 Frame
❌ Auto Layout 미사용

## 잘못된 예

```
Frame 1
 ├─ Rectangle
 ├─ Rectangle
 └─ Text
```

Claude 해석 불가

## 올바른 예

```
Page
 ├─ FilterSection
 ├─ TableSection
 └─ Pagination
```

Claude 해석 가능

---

# 핵심 체크리스트

Figma 설계 시 확인

✔ Frame 구조 사용
✔ Auto Layout 사용
✔ Naming 규칙 적용
✔ Component 사용
✔ 반복 구조 명확

---

# ⚠️ 레이아웃 패딩 규칙 (CRITICAL)

## HomePageLayout / PageLayout 내부 패딩

`HomePageLayout`과 `PageLayout`의 `main` 영역에 `px-standard py-md` 패딩이 내장되어 있다.
내부 `Stack`에 별도 패딩을 추가하지 않는다.

```tsx
// ✅ GOOD — 패딩은 HomePageLayout이 처리
<HomePageLayout title="...">
  <Stack gap="lg">
    <AccountSummaryCard ... />
    <QuickMenuGrid ... />
  </Stack>
</HomePageLayout>

// ❌ BAD — 패딩 중복
<HomePageLayout title="...">
  <Stack gap="lg" className="px-standard py-md">
    <AccountSummaryCard ... />
  </Stack>
</HomePageLayout>
```

## BottomNav 위치

`BottomNav`는 반드시 `HomePageLayout` **바깥**에 배치한다.
`HomePageLayout` 안에 넣으면 `main`(스크롤 영역)에 포함되어 DOM 구조가 잘못된다.

```tsx
// ✅ GOOD
<>
  <HomePageLayout title="..." withBottomNav>
    <Stack gap="lg" className="px-standard py-md">...</Stack>
  </HomePageLayout>
  <BottomNav items={...} activeId={...} />
</>

// ❌ BAD — HomePageLayout children 안에 BottomNav
<HomePageLayout title="..." withBottomNav>
  <Stack>...</Stack>
  <BottomNav ... />  {/* 잘못된 위치 */}
</HomePageLayout>
```

---

# ⚠️ 구현 완성도 규칙 (CRITICAL)

Claude는 Figma 프레임을 **전체 구현**해야 한다.
일부만 생성하고 나머지를 빈 공간으로 두는 것은 절대 금지한다.

## 코드 생성 전 필수 절차

1. Figma 프레임의 **전체 레이어 트리**를 먼저 파악한다
2. 최상위 섹션 목록을 나열한다 (예: Header, LoanSection, QuickMenu, BannerSection, ...)
3. 각 섹션을 체크리스트로 관리하며 **모두 구현**한다
4. 스크롤 가능한 영역은 반드시 스크롤 컨테이너로 감싼다

## 금지 사항

❌ 일부 섹션만 구현하고 나머지 빈 공간으로 방치
❌ "TODO: 추가 구현 필요" 주석만 남기고 미완성 제출
❌ 스크롤 영역 안의 콘텐츠를 생략

## GOOD

```
Figma 프레임에 6개 섹션이 있으면 → 6개 모두 구현 후 제출
```

## BAD

```
Figma 프레임에 6개 섹션이 있는데 → 3개만 구현하고 나머지 공백
```

## 구현하기 어려운 섹션이 있는 경우

component-map.md에 없는 컴포넌트가 필요하거나 데이터 구조가 불명확한 경우,
임의로 생략하지 말고 **개발자에게 확인 후 진행**한다. (rules/09-confirmation.md 참조)
