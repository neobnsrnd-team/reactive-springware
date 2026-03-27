# 03-component.md — 컴포넌트 사용 및 레이아웃 변환

## 목적

Claude가 UI 생성 시 반드시 Component Library만 사용하도록 강제하고,
Figma 레이아웃 구조를 React 레이아웃 컴포넌트로 올바르게 변환하는 규칙을 정의한다.

이 규칙이 없으면 HTML 태그가 남발되거나 레이아웃이 깨진다.

---

# 1. HTML 태그 직접 사용 금지

다음 태그는 절대 사용하지 않는다.

❌ `div`, `span`, `p`
❌ `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
❌ `input`, `button`, `select`, `textarea`
❌ `table`, `thead`, `tbody`, `tr`, `th`, `td`
❌ `a`, `img`, `svg`, `ul`, `li`

---

# 2. 허용 UI 컴포넌트 목록

Component Library에서 제공하는 컴포넌트만 사용한다.

```
Button
Input / TextField / SearchInput / NumberField
Select / MultiSelect
Checkbox
Radio
Form / FormItem
DataTable / Table / SimpleTable
Card
Title / Text / Caption
Icon
Loading / Skeleton / Spinner
EmptyState / NoData
ErrorState / Alert
Pagination
```

---

# 3. 컴포넌트 선택 우선순위

```
1순위: component-library 컴포넌트
2순위: component-library 컴포넌트 + props 조합
3순위: component-map.md에서 가장 유사한 컴포넌트 선택
```

`component-map.md`에 없다고 임의 컴포넌트를 새로 만들지 않는다.

---

# 4. 레이아웃 컴포넌트 사용 규칙

레이아웃은 반드시 component-library의 레이아웃 컴포넌트를 사용한다.
`div`로 레이아웃을 구성하지 않는다.
Page → Layout → Section → Component 계층을 유지한다.

**허용:**
```
PageLayout
Section
Stack
Row
Column
Card
Grid
```

**금지:**
```
div
flex 직접 작성
grid 직접 작성
```

GOOD
```tsx
<Stack direction="vertical" spacing="md">
  <Row spacing="sm">
    <Button variant="primary" />
    <Button variant="secondary" />
  </Row>
</Stack>
```

BAD
```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div style={{ display: 'flex', gap: 8 }}>
    <button>저장</button>
    <button>취소</button>
  </div>
</div>
```

---

# 5. 페이지 레이아웃 구조

모든 Page는 반드시 아래 구조를 사용한다.

```tsx
<PageLayout>
  <Section>
    {/* 컴포넌트 */}
  </Section>
</PageLayout>
```

---

# 6. Figma Auto Layout → React 컴포넌트 변환표

| Figma | React |
|-------|-------|
| Auto Layout (Vertical) | `<Stack direction="vertical" />` |
| Auto Layout (Horizontal) | `<Stack direction="horizontal" />` 또는 `<Row />` |
| Grid Layout (N열) | `<Grid columns={N} />` |
| 테두리 있는 컨테이너 | `<Card />` |
| 제목 + 하위 컨텐츠 묶음 | `<Section title="..." />` |

---

# 7. Spacing 토큰 변환표

Figma gap 값을 다음 토큰으로 변환한다.

| Figma gap | spacing token |
|-----------|---------------|
| 4px | `spacing="xs"` |
| 8px | `spacing="sm"` |
| 16px | `spacing="md"` |
| 24px | `spacing="lg"` |
| 32px 이상 | `spacing="xl"` |

GOOD
```tsx
{/* Figma: Vertical Auto Layout, gap 16px */}
<Stack direction="vertical" spacing="md">
  <SearchInput />
  <UserTable />
</Stack>
```

BAD
```tsx
{/* div + 인라인 스타일로 레이아웃 직접 구성 */}
<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <SearchInput />
  <UserTable />
</div>
```

---

# 8. 자주 쓰는 레이아웃 패턴

## 검색 + 테이블 패턴

```tsx
<PageLayout>
  <Section>
    <Stack direction="vertical" spacing="md">
      <SearchInput />
      <Table />
    </Stack>
  </Section>
</PageLayout>
```

## 카드 그리드 패턴

```tsx
<PageLayout>
  <Section>
    <Row spacing="md">
      <Card />
      <Card />
      <Card />
    </Row>
  </Section>
</PageLayout>
```

## 폼 패턴

```tsx
{/* Section title은 Figma에서 읽은 값을 사용한다 */}
<PageLayout>
  <Section title="{pageTitle}">
    <Stack direction="vertical" spacing="lg">
      <Stack direction="vertical" spacing="sm">
        <TextField />
        <TextField />
        <Select />
      </Stack>
      <Row justify="end">
        <Button variant="secondary">취소</Button>
        <Button variant="primary">저장</Button>
      </Row>
    </Stack>
  </Section>
</PageLayout>
```

## Header + Sidebar 패턴

```tsx
<PageLayout>
  <Header />
  <Row>
    <Sidebar />
    <Section>
      {/* 메인 컨텐츠 */}
    </Section>
  </Row>
</PageLayout>
```

---

# 9. Form 구성 규칙

Form은 반드시 Form Component 사용

GOOD
```tsx
<Form>
  <FormItem label="이름">
    <TextField />
  </FormItem>
  <FormItem label="날짜">
    <DatePicker />
  </FormItem>
  <FormItem label="유형">
    <Select />
  </FormItem>
</Form>
```

BAD
```tsx
<div>
  <label>이름</label>
  <input type="text" />
  <label>날짜</label>
  <input type="date" />
</div>
```

---

# 10. Table 구성 규칙

Table은 반드시 `DataTable` / `Table` / `SimpleTable` 사용

GOOD
```tsx
<DataTable data={users} columns={columns} />
<SimpleTable data={users} />
```

BAD
```tsx
<table>
  <thead><tr><th>이름</th></tr></thead>
  <tbody><tr><td>{user.name}</td></tr></tbody>
</table>
```

---

# 11. Button 구성 규칙

버튼은 반드시 Button 컴포넌트 사용

GOOD
```tsx
<Button variant="primary" size="md">저장</Button>
<Button variant="secondary">취소</Button>
<Button variant="danger">삭제</Button>
<Button variant="ghost">닫기</Button>
```

BAD
```tsx
<button>저장</button>
<button className="btn-primary">저장</button>
<button style={{ background: 'blue' }}>저장</button>
```

---

# 12. 텍스트 구성 규칙

텍스트는 반드시 Typography Component 사용

GOOD
```tsx
<Title>페이지 제목</Title>
<Text>본문 내용</Text>
<Caption>보조 설명</Caption>
```

BAD
```tsx
<h1>페이지 제목</h1>
<p>본문 내용</p>
<span>보조 설명</span>
```

---

# 13. 아이콘 구성 규칙

아이콘은 반드시 `lucide-react` 라이브러리에서 import해서 사용한다.
SVG를 직접 작성하거나 이미지 파일로 아이콘을 표시하지 않는다.

GOOD
```tsx
import { Search, X, ChevronDown } from "lucide-react";

<Search size={20} />
<X size={16} />
<ChevronDown className="icon-chevron" />
```

BAD
```tsx
<svg>...</svg>
<img src="search-icon.svg" />
<Icon name="search" />
```

---

# 14. 반복 UI 규칙

반복 UI는 Component 기반으로 작성하고 반드시 `key`를 포함한다.

GOOD
```tsx
{items.map(item => (
  <Card key={item.id}>
    <Text>{item.name}</Text>
  </Card>
))}
```

BAD
```tsx
{items.map(item => (
  <div key={item.id} className="card">
    <p>{item.name}</p>
  </div>
))}
```

---

# 15. 스타일 규칙

스타일 직접 작성 금지

**금지:**
```
style={{ }}
className 직접 작성
inline style
임의 색상값 (#fff, rgba 등)
임의 수치 (px, rem 직접 입력)
```

**허용:**
```
Component props (variant, size, spacing 등)
design tokens (color="primary", spacing="md")
```

---

# 16. Import 규칙

모든 UI 컴포넌트는 Component Library에서 import

```ts
import { Button, TextField, Select } from "@component-library/ui"
import { Stack, Row, Card, Section } from "@component-library/layout"
import { Title, Text, Caption } from "@component-library/typography"
import { Search, X, ChevronDown } from "lucide-react" // 아이콘은 lucide-react에서 직접 import
```

파일 내 import 순서:
```
1. component-library
2. lucide-react (아이콘)
3. hooks
4. repositories
5. types
```

---

# 17. Props 설계 규칙

Props는 최소화한다. 불필요하게 많은 props는 컴포넌트의 역할이 불분명하다는 신호다.
`variant`, `size` 같은 열거형 props를 사용하고, boolean을 나열하는 방식은 피한다.

GOOD
```tsx
<Button variant="primary" size="lg" disabled={isLoading} />
```

BAD
```tsx
{/* boolean 나열 */}
<Button primary large rounded outlined />

{/* 의미 불명확한 props 과다 */}
<Button type1 type2 big small active />
```

---

# 핵심 체크리스트

✔ HTML 직접 사용 금지
✔ Component Library 사용
✔ 레이아웃 컴포넌트 사용 (Stack, Row, Grid 등)
✔ 스타일 직접 작성 금지
✔ 텍스트 Typography 컴포넌트 사용
✔ 아이콘 lucide-react에서 import
✔ 반복 UI에 key 포함
✔ Figma gap → spacing token 변환
✔ Page → Layout → Section → Component 계층 유지
