# 07-figma.md — Figma 해석 기준

## 목적

Figma UI를 Claude가 정확하게 해석하여 React 코드로 생성할 수 있도록
Auto Layout 변환 기준, 컴포넌트 매핑, 화면 패턴별 구조를 정의한다.

---

# 1. Figma Auto Layout → React 컴포넌트 변환표

| Figma                     | React                                     |
| ------------------------- | ----------------------------------------- |
| Auto Layout (Vertical)    | `<Stack gap="..." />`                     |
| Auto Layout (Horizontal)  | `<Inline gap="..." />`                    |
| Grid Layout (N열)         | `<Grid cols={N} />`                       |
| 테두리 있는 컨테이너      | `<Card />`                                |
| 섹션 제목 + 하위 콘텐츠   | `<Section title="..." />`                 |
| 섹션 제목 행만 (제목+액션)| `<SectionHeader title="..." />`           |
| 전체 페이지 (헤더+뒤로가기)| `<PageLayout title="..." />`             |
| 홈 화면 (로고+인사말)     | `<HomePageLayout title="..." />`          |

> ❌ `<Stack direction="vertical" />` — Stack에 direction prop 없음. 기본값이 수직
> ❌ `<Stack direction="horizontal" />` — 수평은 `Inline` 사용
> ❌ `<Grid columns={N} />` — prop명은 `cols`
> ❌ `<Row />` `<Column />` — 존재하지 않음. 각각 Inline, Stack 사용

---

# 2. Spacing 토큰 변환표

Figma gap 값을 `gap` prop 토큰으로 변환한다. (`spacing` prop은 존재하지 않음)

| Figma gap | gap token  |
| --------- | ---------- |
| 4px       | `gap="xs"` |
| 8px       | `gap="sm"` |
| 16px      | `gap="md"` |
| 24px      | `gap="lg"` |
| 32px 이상 | `gap="xl"` |

GOOD

```tsx
{/* Figma: Vertical Auto Layout, gap 16px */}
<Stack gap="md">
  <Input leftIcon={<Search size={16} />} />
  <TransactionList items={data} />
</Stack>
```

BAD

```tsx
{/* direction / spacing prop은 존재하지 않음 */}
<Stack direction="vertical" spacing="md">...</Stack>

{/* div + 인라인 스타일 금지 */}
<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>...</div>
```

---

# 3. Layout 컴포넌트 목록

Figma 레이아웃을 React로 변환할 때 사용하는 컴포넌트 전체 목록.

```
HomePageLayout   ← 홈 화면 전용 (헤더 + 인사말 + 스크롤 본문 + BottomNav withBottomNav prop)
PageLayout       ← 일반 페이지 (헤더 + 뒤로가기)
Section          ← SectionHeader + 콘텐츠 묶음 (title 있을 때 SectionHeader 자동 포함)
Stack            ← Vertical Auto Layout
Inline           ← Horizontal Auto Layout
Grid             ← Grid Layout (cols prop)
Card             ← 테두리 있는 컨테이너
```

**사용하지 않는 컴포넌트:**

```
❌ BlankLayout   — 존재하지 않음
❌ HomeLayout    — 존재하지 않음 (HomePageLayout 사용)
❌ Row           — 존재하지 않음 (Inline 사용)
❌ Column        — 존재하지 않음 (Stack 사용)
❌ ButtonGroup   — 존재하지 않음 (Inline justify="end" 사용)
❌ FilterBar     — 존재하지 않음 (Section 또는 Stack 사용)
```

---

# 4. Frame 구조 규칙

페이지는 반드시 Frame 구조로 설계한다.

## 일반 페이지 구조

```
Page (Figma Frame)
 ├─ Header
 ├─ Content
 └─ Footer (선택)
```

→ Claude 해석:

```tsx
<PageLayout title="페이지 제목" onBack={() => {}}>
  <Stack gap="md">
    {/* 콘텐츠 */}
  </Stack>
</PageLayout>
```

## 섹션 분리 구조

```
Page
 ├─ FilterSection
 ├─ ContentSection
 └─ ActionSection
```

→ Claude 해석:

```tsx
<PageLayout title="...">
  <Stack gap="lg">
    <Section gap="sm">
      {/* 필터 UI */}
    </Section>
    <Section title="목록">
      {/* 콘텐츠 목록 */}
    </Section>
    <Inline justify="end" gap="sm">
      <Button variant="outline">취소</Button>
      <Button variant="primary">확인</Button>
    </Inline>
  </Stack>
</PageLayout>
```

---

# 5. Naming 규칙 (매우 중요)

Claude는 레이어·프레임 이름을 기반으로 UI를 해석한다.
이름이 없으면 의도를 파악할 수 없다.

## Page

```
UserListPage
TransactionHistoryPage
TransferPage
```

## Section

```
HeaderSection
FilterSection
ContentSection
ActionSection
```

## Layout

```
PageLayout
Stack
Inline      ← Row/Column 대신 사용
Grid
```

## UI Component

```
AccountSummaryCard
TransactionList
Input (leftIcon으로 검색 입력 구현)
SectionHeader
```

---

# 6. 화면 패턴별 구조

## 목록 화면

```
Page
 ├─ FilterSection   ← Input(검색) + Select
 └─ ContentSection  ← 항목 목록
```

→ Claude 해석:

```tsx
<PageLayout title="...">
  <Stack gap="md">
    <Section gap="sm">
      <Input leftIcon={<Search size={16} />} onChange={(e) => handleFilterChange('keyword', e.target.value)} />
    </Section>
    <Section title="목록">
      {data.map((item) => (
        <Card key={item.id}>...</Card>
      ))}
    </Section>
  </Stack>
</PageLayout>
```

## 폼 화면

```
Page
 ├─ FormSection
 └─ ActionSection
```

→ Claude 해석:

```tsx
<PageLayout title="...">
  <Stack gap="lg">
    <Stack gap="sm">
      <Input label="이름" />
      <Input label="금액" />
      <Select options={...} value={...} onChange={...} />
    </Stack>
    <Inline justify="end" gap="sm">
      <Button variant="outline">취소</Button>
      <Button variant="primary">저장</Button>
    </Inline>
  </Stack>
</PageLayout>
```

## 카드형 화면

```
Page
 └─ CardList
```

→ Claude 해석:

```tsx
<PageLayout title="...">
  <Stack gap="sm">
    {items.map((item) => (
      <Card key={item.id} interactive onClick={() => {}}>
        ...
      </Card>
    ))}
  </Stack>
</PageLayout>
```

## 홈 화면

```
Page
 ├─ AccountSection
 ├─ QuickMenuSection
 ├─ BannerSection
 └─ BottomNav
```

→ Claude 해석:

```tsx
<>
  <HomePageLayout title="..." logo={<Logo />} greeting="..." withBottomNav>
    <Stack gap="md">
      <AccountSummaryCard ... />
      <QuickMenuGrid items={...} />
      <BannerCarousel items={...} />
    </Stack>
  </HomePageLayout>
  {/* BottomNav는 반드시 HomePageLayout 바깥에 배치 */}
  <BottomNav items={...} activeId={...} />
</>
```

---

# 7. Component Library 연동 규칙

Figma 컴포넌트와 실제 컴포넌트 라이브러리 매핑.

| Figma 컴포넌트 | React 컴포넌트                         |
| -------------- | --------------------------------------- |
| Button         | `<Button variant="primary/outline/..." />` |
| Input          | `<Input />` / 검색창은 `<Input leftIcon={<Search size={16} />} />` |
| Select         | `<Select options={...} />`              |
| Card           | `<Card />`                              |
| 계좌 카드      | `<AccountSummaryCard />`                |
| 퀵메뉴         | `<QuickMenuGrid />`                     |
| 슬라이드 배너  | `<BannerCarousel />`                    |
| 브랜드 배너    | `<BrandBanner />`                       |
| 하단 탭바      | `<BottomNav />`                         |
| 상단 탭        | `<TabNav />`                            |
| 거래 목록      | `<TransactionList />`                   |
| 경고/안내 배너 | `<AlertBanner intent="..." />`          |
| 성공 화면      | `<SuccessHero />`                       |

> ❌ `Table → <DataTable />` — DataTable은 존재하지 않음
> ❌ `List → <ListView />` — ListView는 존재하지 않음
> ❌ `Pagination` — 존재하지 않음. TransactionList 내 무한 스크롤 사용

---

# 8. 반복 구조 규칙

반복 UI는 반드시 Auto Layout을 사용하고, React에서 `map()`으로 변환한다.

```
CardList
 ├─ Card
 ├─ Card
 └─ Card
```

→ Claude 해석:

```tsx
<Stack gap="sm">
  {items.map((item) => (
    <Card key={item.id}>
      <Text>{item.name}</Text>
    </Card>
  ))}
</Stack>
```

---

# 9. 금지 규칙

다음 디자인 방식은 Claude가 해석하기 어렵거나 잘못된 코드로 변환된다.

❌ Rectangle 기반 UI
❌ Group 남용
❌ 이름 없는 Frame
❌ Auto Layout 미사용

BAD

```
Frame 1
 ├─ Rectangle
 ├─ Rectangle
 └─ Text
```

→ Claude 해석 불가

GOOD

```
Page
 ├─ FilterSection
 ├─ ContentSection
 └─ ActionSection
```

→ Claude 해석 가능

---

# ⚠️ 레이아웃 패딩 규칙 (CRITICAL)

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

```tsx
// ✅ GOOD
<>
  <HomePageLayout title="..." withBottomNav>
    <Stack gap="lg">...</Stack>
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
2. 최상위 섹션 목록을 나열한다 (예: Header, AccountSection, QuickMenu, BannerSection, ...)
3. 각 섹션을 체크리스트로 관리하며 **모두 구현**한다
4. 스크롤 가능한 영역은 반드시 스크롤 컨테이너로 감싼다

## 금지 사항

❌ 일부 섹션만 구현하고 나머지 빈 공간으로 방치
❌ "TODO: 추가 구현 필요" 주석만 남기고 미완성 제출
❌ 스크롤 영역 안의 콘텐츠를 생략

GOOD

```
Figma 프레임에 6개 섹션이 있으면 → 6개 모두 구현 후 제출
```

BAD

```
Figma 프레임에 6개 섹션이 있는데 → 3개만 구현하고 나머지 공백
```

구현하기 어려운 섹션이 있는 경우 임의로 생략하지 말고 **개발자에게 확인 후 진행**한다. (rules/09-confirmation.md 참조)

---

# 10. 중첩 Auto Layout 변환 규칙

단일 방향 변환만으로 처리할 수 없는 중첩 레이아웃 케이스를 명시한다.

## 중첩 방향 조합

| Figma 구조 | React 변환 | 비고 |
|-----------|-----------|------|
| Vertical > Horizontal | `<Stack gap="md"><Inline gap="sm">` | 수직 안에 수평 |
| Horizontal > Vertical | `<Inline align="start"><Stack gap="xs">` | 수평 안에 수직 |
| Vertical > Horizontal (Space between) | `<Stack gap="md"><Inline justify="between">` | 양끝 정렬 |
| Frame (no layout) + absolute child | `<div className="relative"><div className="absolute ...">`  | 절대 위치 예외 |
| Fill width child in Horizontal | `<Inline><div className="flex-1">...</div>` | Hug/Fill 혼재 |
| Fixed width frame | `className="w-[{px}px]"` | 고정 너비는 임의값 허용 예외 |

```tsx
// ✅ GOOD — 수직 레이아웃 안에 수평 정렬
<Stack gap="md">
  <Inline justify="between" align="center">
    <Text variant="body-md">계좌명</Text>
    <Badge>주거래</Badge>
  </Inline>
  <Text variant="heading-sm">2,500,000원</Text>
</Stack>

// ✅ GOOD — Fill child (계좌명은 남은 공간, 배지는 Hug)
<Inline gap="sm" align="center">
  <div className="flex-1">
    <Text variant="body-md">하나 주거래 통장</Text>
  </div>
  <Badge>주거래</Badge>
</Inline>

// ❌ BAD — div 직접 사용
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>계좌명</span>
  <span>배지</span>
</div>
```

## 절대 위치 예외 처리

Figma에서 Frame 내부에 Absolute 위치 레이어가 있는 경우에만 `relative`/`absolute` className을 허용한다.
이 케이스는 반드시 인라인 주석으로 이유를 명시한다.

```tsx
// ✅ GOOD — Figma 절대 위치 레이어 (배지 오버레이)
<div className="relative">
  <AccountSummaryCard ... />
  {/* Figma: 우상단 절대 위치 뱃지 오버레이 */}
  <div className="absolute top-2 right-2">
    <Badge intent="danger">연체</Badge>
  </div>
</div>
```

---

# 핵심 체크리스트

✔ Auto Layout(Vertical) → `Stack`, Auto Layout(Horizontal) → `Inline`
✔ gap 수치 → gap 토큰 (4px=xs / 8px=sm / 16px=md / 24px=lg / 32px+=xl)
✔ `direction` `spacing` `columns` prop 사용 금지
✔ `Row` `Column` `ButtonGroup` `FilterBar` `DataTable` 사용 금지
✔ 레이어·프레임에 의미 있는 이름 사용
✔ HomePageLayout 내부 패딩 중복 추가 금지
✔ BottomNav는 HomePageLayout 바깥에 배치
✔ Figma 섹션 수만큼 전체 구현
