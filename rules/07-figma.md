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
