# Component Mapping Rules

## 목적

Figma 컴포넌트를 React Component Library와 매핑하기 위한 규칙 정의

Claude는 반드시 아래 매핑 규칙을 기반으로 코드를 생성한다.

---

# 기본 규칙

- Figma 컴포넌트는 반드시 Component Library로 변환한다.
- HTML 태그 직접 생성 금지
- div 직접 사용 금지
- 스타일 직접 작성 금지

---

# Button

| Figma              | React                            |
| ------------------ | -------------------------------- |
| Button / Primary   | `<Button variant="primary" />`   |
| Button / Secondary | `<Button variant="secondary" />` |
| Button / Danger    | `<Button variant="danger" />`    |
| Button / Ghost     | `<Button variant="ghost" />`     |

---

# Input

| Figma          | React             |
| -------------- | ----------------- |
| Input / Text   | `<TextField />`   |
| Input / Search | `<SearchInput />` |
| Input / Number | `<NumberField />` |

---

# Select

| Figma            | React             |
| ---------------- | ----------------- |
| Select / Default | `<Select />`      |
| Select / Multi   | `<MultiSelect />` |

---

# Table

| Figma           | React             |
| --------------- | ----------------- |
| Table / Default | `<Table />`       |
| Table / Simple  | `<SimpleTable />` |

---

# Layout

| Figma   | React         |
| ------- | ------------- |
| Stack   | `<Stack />`   |
| Row     | `<Row />`     |
| Column  | `<Column />`  |
| Card    | `<Card />`    |
| Section | `<Section />` |

---

# Typography

| Figma          | React         |
| -------------- | ------------- |
| Text / Title   | `<Title />`   |
| Text / Body    | `<Text />`    |
| Text / Caption | `<Caption />` |

---

# Icon

| Figma | React      |
| ----- | ---------- |
| Icon  | `<Icon />` |

---

# Spacing

Figma Spacing → Stack spacing

예:

Figma gap 8 → `<Stack spacing="sm" />`

---

# Variant 규칙

Figma Variants → React Props

예:

Figma:

```
Button
- Primary
- Secondary
```

React:

```
<Button variant="primary" />
<Button variant="secondary" />
```

---

# 금지 규칙

다음 코드 생성 금지

❌ div 직접 생성
❌ inline style
❌ tailwind 직접 사용
❌ css 작성

---

# Layout 규칙

페이지는 반드시 Layout 컴포넌트를 사용

예:

```
<PageLayout>
  <Section>
    <Stack>
    </Stack>
  </Section>
</PageLayout>
```

---

# Component Library 우선 규칙

Claude는 반드시 다음 순서로 컴포넌트를 선택한다.

1. Component Library
2. Shared Components
3. 새 컴포넌트 생성

HTML 요소 직접 생성 금지
