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

# 컴포넌트 계층 구조

```
packages/component-library/
├── core/          ← 범용 원자 컴포넌트 (Button, Input, Select, Badge, Typography)
├── layout/        ← 레이아웃 컴포넌트 (PageLayout, Stack, Grid, Inline 등)
├── modules/
│   ├── common/    ← 도메인 무관 모듈 컴포넌트 (Card, Modal, TabNav 등)
│   └── banking/   ← 뱅킹 전용 모듈 (AmountInput, TransactionList 등)
└── biz/
    ├── banking/   ← 뱅킹 도메인 비즈니스 컴포넌트
    ├── card/      ← 카드 도메인 비즈니스 컴포넌트
    ├── common/    ← 도메인 공통 비즈니스 컴포넌트
    └── insurance/ ← 보험 도메인 비즈니스 컴포넌트
```

---

# 1. Core 컴포넌트

## Button

| Figma              | React                              | 주요 props |
| ------------------ | ---------------------------------- | ---------- |
| Button / Primary   | `<Button variant="primary" />`     | variant: 'primary'\|'outline'\|'ghost'\|'danger' |
| Button / Outline   | `<Button variant="outline" />`     | size: 'sm'\|'md'\|'lg' |
| Button / Ghost     | `<Button variant="ghost" />`       | loading, fullWidth, iconOnly |
| Button / Danger    | `<Button variant="danger" />`      | leftIcon, rightIcon, justify |

## Input

| Figma               | React                                | 주요 props |
| ------------------- | ------------------------------------ | ---------- |
| Input / Text        | `<Input />`                          | label, helperText, validationState: 'default'\|'error'\|'success' |
| Input / Phone       | `<Input phoneFormat />`              | size: 'md'\|'lg', fullWidth |
| Input / Account No. | `<Input formatPattern="..." />`      | formatPattern: '#' 기반 포맷 패턴 |
| Input / With Action | `<Input rightElement={<Button />} />` | rightElement, leftIcon |

> ⚠️ 기존 `<TextField />`, `<SearchInput />`, `<NumberField />`는 존재하지 않음. 모두 `<Input />`으로 통일.

## Select

| Figma            | React        | 주요 props |
| ---------------- | ------------ | ---------- |
| Select / Default | `<Select />` | options: SelectOption[], value, onChange |

> ⚠️ `<MultiSelect />`는 존재하지 않음.

## Badge

| Figma           | React                            | 주요 props |
| --------------- | -------------------------------- | ---------- |
| Badge / Default | `<Badge variant="neutral" />`    | variant: 'primary'\|'brand'\|'success'\|'danger'\|'warning'\|'neutral' |
| Badge / Dot     | `<Badge dot />`                  | dot: boolean |

## Typography

| Figma            | React                                   | 주요 props |
| ---------------- | --------------------------------------- | ---------- |
| Text / Heading   | `<Typography variant="heading" />`      | variant: 'heading'\|'subheading'\|'body-lg'\|'body'\|'body-sm'\|'caption' |
| Text / Subheading| `<Typography variant="subheading" />`   | weight: 'normal'\|'medium'\|'bold' |
| Text / Body      | `<Typography variant="body" />`         | color: 'heading'\|'base'\|'label'\|'secondary'\|'muted'\|'brand'\|'danger'\|'success' |
| Text / Caption   | `<Typography variant="caption" />`      | numeric: true — 금액·숫자 표시 시 사용 |

> ⚠️ 기존 `<Title />`, `<Text />`, `<Caption />`은 존재하지 않음. 모두 `<Typography />`로 통일.

---

# 2. Layout 컴포넌트

## 페이지 레이아웃

| Figma                | React                   | 사용 상황 |
| -------------------- | ----------------------- | --------- |
| Page / Default       | `<PageLayout />`        | 뒤로가기 헤더 + 스크롤 콘텐츠 영역이 있는 일반 페이지 |
| Page / Home          | `<HomePageLayout />`    | 홈/메인 대시보드 — 뒤로가기 없음, 로고·인사말 구조 |
| Page / Blank         | `<BlankPageLayout />`   | 로그인·온보딩 전용 — 헤더 없이 자유 레이아웃 |

**PageLayout 주요 props:** `title`, `onBack`, `rightAction`, `bottomBar`

**HomePageLayout 주요 props:** `title`, `logo`, `rightAction`, `hasNotification`, `withBottomNav`

**BlankPageLayout 주요 props:** `align: 'top'|'center'`

## 탐색 컴포넌트

| Figma            | React               | 사용 상황 |
| ---------------- | ------------------- | --------- |
| BottomNav        | `<BottomNav />`     | 홈 화면 하단 고정 탭바 |
| AppBrandHeader   | `<AppBrandHeader />` | 로그인·온보딩 화면 상단 브랜드 헤더 |

**BottomNav 주요 props:** `items: BottomNavItem[]`, `activeId`

## 스택·그리드·인라인

| Figma   | React        | 방향 | 주요 props |
| ------- | ------------ | ---- | ---------- |
| Stack   | `<Stack />`  | 세로 | gap: 'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl', align |
| Inline  | `<Inline />` | 가로 | gap, align, justify: 'start'\|'center'\|'end'\|'between', wrap |
| Grid    | `<Grid />`   | 격자 | cols: 1\|2\|3\|4, tabletCols, gap |

> ⚠️ 기존 `<Row />`, `<Column />`은 존재하지 않음. 가로 배치는 `<Inline />`, 격자는 `<Grid />`를 사용.

## 섹션

| Figma   | React         | 주요 props |
| ------- | ------------- | ---------- |
| Section | `<Section />` | title, badge, actionLabel, onAction, gap |

---

# 3. modules/common — 범용 모듈 컴포넌트

## 카드

| Figma  | React    | 주요 props |
| ------ | -------- | ---------- |
| Card   | `<Card />` | interactive, onClick, noPadding |
| Card.Header | `<Card.Header />` | title, subtitle, action, icon |
| Card.Row    | `<Card.Row />`    | label, value, valueClassName |
| Card.ActionRow | `<Card.ActionRow />` | label, children |
| Card.Highlight | `<Card.Highlight />` | label, value |

## 오버레이

| Figma       | React            | 주요 props |
| ----------- | ---------------- | ---------- |
| Modal       | `<Modal />`      | open, onClose, title, footer, size: 'sm'\|'md'\|'lg'\|'fullscreen' |
| BottomSheet | `<BottomSheet />` | open, onClose, title, footer, snap: 'auto'\|'half'\|'full', hideCloseButton |

## 탭·네비게이션

| Figma        | React           | 주요 props |
| ------------ | --------------- | ---------- |
| TabNav / Underline | `<TabNav variant="underline" />` | items: TabNavItem[], activeId, onTabChange, fullWidth |
| TabNav / Pill      | `<TabNav variant="pill" />`      | |
| SidebarNav   | `<SidebarNav />` | items: SidebarNavItem[], activeId, onItemChange (세로 탭) |

## 상태 표시

| Figma       | React           | 주요 props |
| ----------- | --------------- | ---------- |
| EmptyState  | `<EmptyState />` | illustration, title, description, action |
| ErrorState  | `<ErrorState />` | title, description, onRetry, retryLabel |
| AlertBanner | `<AlertBanner />` | intent: 'warning'\|'danger'\|'success'\|'info', icon |
| StepIndicator | `<StepIndicator />` | total, current |
| SuccessHero | `<SuccessHero />` | recipientName, amount, subtitle |

## 목록 행 컴포넌트

| Figma              | React                  | 주요 props |
| ------------------ | ---------------------- | ---------- |
| InfoRow            | `<InfoRow />`          | label, value, valueClassName, showBorder |
| LabelValueRow      | `<LabelValueRow />`    | label, value (ReactNode 허용) |
| SectionHeader      | `<SectionHeader />`    | title, badge, actionLabel, onAction |
| ActionLinkItem     | `<ActionLinkItem />`   | icon, label, size: 'sm'\|'md', showBorder |
| NoticeItem         | `<NoticeItem />`       | icon, title, description, onClick |
| SelectableItem     | `<SelectableItem />`   | icon, label, selected (아이콘+레이블 카드 타일) |
| SelectableListItem | `<SelectableListItem />` | label, isSelected, onClick (텍스트 단순 선택 행) |
| RecentRecipientItem | `<RecentRecipientItem />` | name, bankName, maskedAccount, onClick |
| Checkbox           | `<Checkbox />`         | checked, onChange, label, disabled |

## 입력 관련

| Figma       | React           | 주요 props |
| ----------- | --------------- | ---------- |
| DatePicker  | `<DatePicker />` | mode: 'single'\|'range', value, rangeValue, minDate, maxDate |
| BalanceToggle | `<BalanceToggle />` | hidden, onToggle (잔액 보기/숨기기 토글) |
| BankSelectGrid | `<BankSelectGrid />` | banks: BankItem[], selectedCode, onSelect, columns: 3\|4 |

## 구분선·레이아웃 보조

| Figma              | React                   | 주요 props |
| ------------------ | ----------------------- | ---------- |
| Divider            | `<Divider />`           | (props 없음, 단순 수평선) |
| DividerWithLabel   | `<DividerWithLabel />`  | label ("다른 로그인 방식" 등) |
| CollapsibleSection | `<CollapsibleSection />` | header, children, defaultExpanded, headerAlign |

---

# 4. modules/banking — 뱅킹 전용 모듈

| Figma                    | React                        | 주요 props |
| ------------------------ | ---------------------------- | ---------- |
| AmountInput              | `<AmountInput />`            | value, onChange, quickAmounts, maxAmount, transferLimitText |
| TransactionList          | `<TransactionList />`        | groups: TransactionGroup[], dateHeaderFormat: 'month-day'\|'year-month-day' |
| TransactionSearchFilter  | `<TransactionSearchFilter />` | 기간·정렬·거래유형 필터 UI |
| TransferForm             | `<TransferForm />`           | availableBalance, onSubmit, submitting |
| AccountSelectItem        | `<AccountSelectItem />`      | accountName, accountNumber, balance, selected (BottomSheet 계좌 목록 행) |
| NumberKeypad             | `<NumberKeypad />`           | digits: number[10], onDigitPress, onDelete, onShuffle (보안 키패드) |
| OtpInput                 | `<OtpInput />`               | length: 4\|6, onComplete, error, masked |
| PinDotIndicator          | `<PinDotIndicator />`        | length, filledCount (PIN 입력 진행 도트) |
| TransferLimitInfo        | `<TransferLimitInfo />`      | perTransferLimit, dailyLimit, usedAmount |

---

# 5. biz/banking — 뱅킹 도메인 비즈니스 컴포넌트

| Figma                | React                    | 주요 props |
| -------------------- | ------------------------ | ---------- |
| AccountSummaryCard   | `<AccountSummaryCard />` | type: 'deposit'\|'savings'\|'loan'\|'foreignDeposit'\|'retirement'\|'securities', accountName, accountNumber, balance |
| AccountSelectorCard  | `<AccountSelectorCard />` | accountName, accountNumber, onAccountChange, onIconClick, icon (계좌 선택·변경 가능 카드) |

---

# 6. biz/card — 카드 도메인 비즈니스 컴포넌트

| Figma                    | React                       | 주요 props |
| ------------------------ | --------------------------- | ---------- |
| CardSummaryCard          | `<CardSummaryCard />`       | type: 'credit'\|'check'\|'prepaid', cardName, cardNumber, amount |
| CardVisual               | `<CardVisual />`            | cardImage, brand: 'VISA'\|'Mastercard'\|'AMEX'\|'JCB'\|'UnionPay', cardName, compact |
| CardInfoPanel            | `<CardInfoPanel />`         | sections: CardInfoSection[] (결제정보·이용기간 등 레이블-값 섹션) |
| StatementHeroCard        | `<StatementHeroCard />`     | amount, dueDate, label, onDetail |
| StatementTotalCard       | `<StatementTotalCard />`    | amount, badge, onDetailClick, onInstallment, onImmediatePayment, onRevolving |
| CardPaymentSummary       | `<CardPaymentSummary />`    | totalAmount, dateFull, dateYM, revolving, cardLoan, cashAdvance |
| CardPaymentItem          | `<CardPaymentItem />`       | icon, cardName, amount, onDetailClick (이용내역 행) |
| UsageTransactionItem     | `<UsageTransactionItem />`  | Transaction 데이터, 상세 BottomSheet 내장 |
| CardBenefitSummary       | `<CardBenefitSummary />`    | points, benefits: BenefitItem[], onPointDetail, onBenefitDetail |
| CardPerformanceBar       | `<CardPerformanceBar />`    | cardName, currentAmount, targetAmount, benefitDescription |
| CardLinkedBalance        | `<CardLinkedBalance />`     | balance, hidden, onToggle (연결계좌 잔액 보기/숨기기) |
| CardManagementPanel      | `<CardManagementPanel />`   | rows: CardManagementNavRow[] (카드 관리 네비게이션 목록) |
| CardPaymentActions       | `<CardPaymentActions />`    | onInstallment, onImmediatePayment, onRevolving |
| LoanMenuBar              | `<LoanMenuBar />`           | items: LoanMenuBarItem[] (단기·장기·리볼빙 메뉴) |
| QuickShortcutCard        | `<QuickShortcutCard />`     | title, subtitle, icon, onClick |
| BillingPeriodLabel       | `<BillingPeriodLabel />`    | startDate, endDate |
| CardChipItem             | `<CardChipItem />`          | name, maskedNumber |
| CardPillTab              | `<CardPillTab />`           | label, isSelected, onClick |
| AccountSelectCard        | `<AccountSelectCard />`     | bankName, maskedAccount, isSelected, onClick |
| PaymentAccountCard       | `<PaymentAccountCard />`    | title, hours, icon |
| UsageHistoryFilterSheet  | `<UsageHistoryFilterSheet />` | open, onClose, 이용내역 필터 BottomSheet |
| SummaryCard              | `<SummaryCard />`           | variant: 'asset'\|'spending', title, amount (카드 대시보드 요약 카드) |

---

# 7. biz/common — 도메인 공통 비즈니스 컴포넌트

| Figma          | React              | 주요 props |
| -------------- | ------------------ | ---------- |
| BannerCarousel | `<BannerCarousel />` | items: BannerCarouselItem[], autoPlayInterval (복수 슬라이더) |
| BrandBanner    | `<BrandBanner />`  | title, subtitle, icon, onClick (단일 고정 배너) |
| UserProfile    | `<UserProfile />`  | name, lastLogin, onSettingsClick |
| QuickMenuGrid  | `<QuickMenuGrid />` | items: QuickMenuItem[], cols: 2\|3\|4 (홈 퀵메뉴 그리드) |

---

# 8. biz/insurance — 보험 도메인 비즈니스 컴포넌트

| Figma                | React                    | 주요 props |
| -------------------- | ------------------------ | ---------- |
| InsuranceSummaryCard | `<InsuranceSummaryCard />` | type: 'life'\|'health'\|'car', insuranceName, contractNumber, status: 'active'\|'pending'\|'expired' |

---

# Variant 규칙

Figma Variants → React Props 변환 예시

```tsx
// Figma: Button / Primary / Large
<Button variant="primary" size="lg">확인</Button>

// Figma: Badge / Brand / Dot
<Badge variant="brand" dot />

// Figma: TabNav / Pill / FullWidth
<TabNav variant="pill" fullWidth items={tabs} activeId={activeTab} onTabChange={setActiveTab} />
```

---

# Layout 규칙

페이지는 반드시 Layout 컴포넌트를 사용

```tsx
// 일반 페이지
<PageLayout title="계좌 상세" onBack={handleBack} bottomBar={<Button fullWidth>이체</Button>}>
  <Section title="계좌 정보">
    <Stack gap="sm">
      <InfoRow label="계좌번호" value="123-456-789012" />
      <InfoRow label="잔액" value="3,000,000원" showBorder={false} />
    </Stack>
  </Section>
</PageLayout>

// 홈 대시보드
<HomePageLayout title="하나은행" hasNotification>
  <Section title="내 계좌">
    <AccountSummaryCard type="deposit" ... />
  </Section>
</HomePageLayout>
```

---

# 컴포넌트 선택 우선 순위

Claude는 반드시 다음 순서로 컴포넌트를 선택한다.

1. `biz/` — 도메인 특화 비즈니스 컴포넌트 (가장 구체적)
2. `modules/` — 도메인 무관 모듈 컴포넌트
3. `layout/` — 레이아웃 컴포넌트
4. `core/` — 원자 컴포넌트
5. 새 컴포넌트 생성 (위 4단계 모두 해당 없을 때만)

HTML 요소 직접 생성 금지

---

# 금지 규칙

다음 코드 생성 금지

❌ div 직접 생성
❌ inline style
❌ tailwind 직접 사용
❌ css 작성
❌ 존재하지 않는 컴포넌트 사용 (`<TextField />`, `<Row />`, `<Column />`, `<MultiSelect />`, `<Table />`, `<Icon />` 등)
