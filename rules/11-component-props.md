# 11-component-props.md — 컴포넌트 Props 타입 레퍼런스

## 목적

코드 생성 전에 이 파일을 참조하여 **존재하지 않는 prop 값**을 사용하지 않도록 한다.

가장 흔한 실수: `variant="secondary"`, `size="large"`, `color="gray"` 등
컴포넌트가 정의하지 않은 값을 사용하면 TypeScript 오류가 발생하고 런타임에서 스타일이 무너진다.

---

## ⚠️ 코드 생성 전 체크리스트

1. prop 값을 쓰기 전에 아래 레퍼런스에서 허용된 값인지 확인한다.
2. 아래에 없는 컴포넌트는 해당 컴포넌트의 `types.ts`를 직접 읽고 확인한다.
3. 확신이 없으면 임의로 추측하지 말고 `types.ts`를 읽는다.

---

## Core 컴포넌트

### Button

```ts
variant?: 'primary' | 'outline' | 'ghost' | 'danger'   // 기본: 'primary'
size?:    'sm' | 'md' | 'lg'                            // 기본: 'md'
justify?: 'center' | 'between'                          // 기본: 'center'
```

> ❌ `variant="secondary"` `variant="text"` `variant="link"` `size="large"` `size="small"` — 존재하지 않음

---

### Badge

```ts
variant?: 'primary' | 'brand' | 'success' | 'danger' | 'warning' | 'neutral'  // 기본: 'neutral'
dot?:     boolean
```

> ❌ `variant="secondary"` `variant="info"` `variant="default"` — 존재하지 않음

---

### Typography (Text)

```ts
variant?: 'heading' | 'subheading' | 'body-lg' | 'body' | 'body-sm' | 'caption'  // 기본: 'body'
weight?:  'normal' | 'medium' | 'bold'
color?:   'heading' | 'base' | 'label' | 'secondary' | 'muted' | 'brand' | 'danger' | 'success'
numeric?: boolean   // 금액·숫자 표시 시 Manrope 폰트 적용
as?:      React.ElementType  // 렌더링 태그 override (예: 'span', 'h1')
```

> ❌ `variant="h1"` `variant="title"` `variant="small"` `color="gray"` `color="black"` `color="primary"` — 존재하지 않음

---

## Layout 컴포넌트

### Stack

```ts
gap?:   'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'  // 기본: 'md'
align?: 'start' | 'center' | 'end' | 'stretch'     // 기본: 'stretch'
as?:    React.ElementType
```

> ❌ `gap="none"` `gap="0"` `gap="base"` `direction="horizontal"` — 존재하지 않음
> 수평 레이아웃이 필요하면 `Stack`이 아닌 `Inline`을 사용한다.

---

### Inline

```ts
gap?:     'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'                     // 기본: 'sm'
align?:   'start' | 'center' | 'end' | 'baseline' | 'stretch'           // 기본: 'center'
justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'  // 기본: 'start'
wrap?:    boolean
as?:      React.ElementType
```

> ❌ `direction="vertical"` — 수직 레이아웃은 `Stack` 사용

---

## Modules 컴포넌트

### TabNav

```ts
variant?:   'underline' | 'pill'  // 기본: 'underline'
fullWidth?: boolean
items:      { id: string; label: string }[]
activeId:   string
onTabChange: (id: string) => void
```

> ❌ `variant="tab"` `variant="segment"` — 존재하지 않음
> 세그먼트 컨트롤 스타일은 `variant="pill"`을 사용한다.

---

### CollapsibleSection

```ts
header:           React.ReactNode
children:         React.ReactNode
defaultExpanded?: boolean         // 기본: true
headerAlign?:     'left' | 'center'
```

---

### SectionHeader

```ts
title:        string
badge?:       number              // 숫자만 허용 (텍스트 배지 불가)
actionLabel?: string
onAction?:    () => void
```

---

### InfoRow

```ts
label:           string           // ⚠️ ReactNode 불가, string만 허용
value:           string           // ⚠️ ReactNode 불가, string만 허용
valueClassName?: string
showBorder?:     boolean          // 기본: true
```

> ⚠️ label/value에 JSX(아이콘, 버튼 등)를 넣으면 TypeScript 오류 발생.
> ReactNode가 필요한 경우 `Inline`으로 직접 구성한다.

---

### Card

```ts
interactive?: boolean
onClick?:     () => void
noPadding?:   boolean
```

---

### EmptyState

```ts
illustration?: React.ReactNode
title:         string
description?:  string
action?:       React.ReactNode
```

---

## Biz 컴포넌트

### AccountSummaryCard

```ts
type: 'deposit' | 'savings' | 'loan' | 'foreignDeposit' | 'retirement' | 'securities'
// type별 기본 금액 레이블:
//   deposit → '잔액', savings → '납입금액', loan → '대출잔액'
//   foreignDeposit → '잔액', retirement → '적립금', securities → '평가금액'

balance:        number           // 원화 정수 (자동 포맷)
balanceDisplay?: string          // 외화 등 커스텀 표시 시 override
balanceLabel?:  string           // 기본 레이블 override
badgeText?:     string           // '주거래' 등 선택적 배지
moreButton?:    'chevron' | 'ellipsis'
actions?:       React.ReactNode  // 하단 버튼 슬롯
```

> ❌ `type="current"` `type="foreign"` — 존재하지 않음
> 외화예금은 `type="foreignDeposit"`

---

## 사용 예시 (올바른 코드)

```tsx
// ✅ Button
<Button variant="primary" size="sm">확인</Button>
<Button variant="outline" size="md" fullWidth>취소</Button>

// ✅ Badge
<Badge variant="brand">예금</Badge>
<Badge variant="neutral">미보유</Badge>

// ✅ Typography
<Typography variant="heading" weight="bold" color="heading" numeric>
  3,000,000원
</Typography>
<Typography variant="body-sm" color="secondary">출금가능액</Typography>

// ✅ Stack / Inline
<Stack gap="sm">...</Stack>
<Inline justify="between" align="center">...</Inline>

// ✅ AccountSummaryCard
<AccountSummaryCard type="deposit" balance={1000000} ... />
<AccountSummaryCard type="foreignDeposit" balanceDisplay="$1,234.56" ... />
```
