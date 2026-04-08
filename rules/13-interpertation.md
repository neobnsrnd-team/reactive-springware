# Interpretation Rules

## 목적

Figma UI 구조를 보고 어떤 React 화면인지 판단하는 기준을 정의한다.
이 규칙이 없으면 Claude가 div로 구성하거나 잘못된 컴포넌트를 선택한다.

---

# 기본 원칙

Figma를 분석할 때 아래 순서로 판단한다.

1. 전체 레이아웃 구조 파악 (Page 타입 결정)
2. 반복 패턴 감지 (List / Grid / Table 여부)
3. 입력 요소 감지 (Form 여부)
4. 개별 컴포넌트 매핑 (component-map.md 참조)

---

# 페이지 타입 판단 기준

## List Page

다음 패턴이 감지되면 List Page로 판단한다.

| Figma 패턴 | 판단 |
|------------|------|
| 같은 Row가 반복됨 | → `<Table />` 또는 `<DataGrid />` |
| 카드가 격자로 반복됨 | → `<CardList />` |
| 검색 + 필터 + 목록 구조 | → List Page |
| 상단 검색바 + 하단 결과 | → 검색 결과 List Page |

생성 파일:
```
{Entity}ListPage.tsx
use{Entity}List.ts
{entity}Repository.ts
{entity}Types.ts
{Entity}Table.tsx 또는 {Entity}Card.tsx
```

---

## Detail Page

다음 패턴이 감지되면 Detail Page로 판단한다.

| Figma 패턴 | 판단 |
|------------|------|
| 라벨 + 값이 세로로 나열됨 | → `<DescriptionList />` |
| 제목 + 본문 구조 | → Detail Page |
| 탭으로 구분된 상세 정보 | → Tabbed Detail Page |

생성 파일:
```
{Entity}DetailPage.tsx
use{Entity}Detail.ts
{entity}Repository.ts
{entity}Types.ts
{Entity}Info.tsx
```

---

## Form Page

다음 패턴이 감지되면 Form Page로 판단한다.

| Figma 패턴 | 판단 |
|------------|------|
| 입력 필드가 여러 개 나열됨 | → Form Page |
| 라벨 + Input 조합 반복 | → `<FormField />` 반복 |
| 저장/취소 버튼이 하단에 위치 | → Form Page |
| 드롭다운 + 날짜 + 텍스트 혼합 | → Form Page |

생성 파일:
```
{Entity}FormPage.tsx
use{Entity}Form.ts
{entity}Repository.ts
{entity}Types.ts
{Entity}Form.tsx
```

---

## Dashboard Page

다음 패턴이 감지되면 Dashboard Page로 판단한다.

| Figma 패턴 | 판단 |
|------------|------|
| 숫자/통계 카드가 상단에 나열됨 | → `<StatCard />` |
| 차트가 포함됨 | → `<Chart />` |
| 여러 위젯이 격자로 배치됨 | → Dashboard Page |

---

# UI 요소 판단 기준

## 반복 구조

| Figma 패턴 | React 컴포넌트 |
|------------|----------------|
| 같은 Row가 N번 반복 | `<Table />` |
| 카드가 N번 반복 | `<CardList />` |
| 아코디언 항목 반복 | `<Accordion />` |

## 입력 요소

| Figma 패턴 | React 컴포넌트 |
|------------|----------------|
| 텍스트 입력 박스 | `<TextField />` |
| 드롭다운 선택 | `<Select />` |
| 날짜 선택 | `<DatePicker />` |
| 체크박스 그룹 | `<CheckboxGroup />` |
| 라디오 버튼 그룹 | `<RadioGroup />` |
| 파일 업로드 영역 | `<FileUpload />` |

## 정보 표시 요소

| Figma 패턴 | React 컴포넌트 |
|------------|----------------|
| 라벨 + 값 쌍 나열 | `<DescriptionList />` |
| 배지/상태 표시 | `<Badge />` |
| 알림/경고 박스 | `<Alert />` |
| 진행률 표시 | `<ProgressBar />` |

## 액션 요소

| Figma 패턴 | React 컴포넌트 |
|------------|----------------|
| 주요 액션 버튼 | `<Button variant="primary" />` |
| 보조 액션 버튼 | `<Button variant="secondary" />` |
| 아이콘만 있는 버튼 | `<IconButton />` |
| 버튼 그룹 | `<ButtonGroup />` |

---

# 금지 판단

다음 상황에서는 div 생성 금지.
반드시 위 기준으로 컴포넌트를 선택한다.

❌ "마땅한 컴포넌트가 없어서 div 사용"
❌ "레이아웃이 복잡해서 div로 감쌈"
❌ component-map.md에 없다고 임의 컴포넌트 생성

→ component-map.md에 없는 패턴은 가장 유사한 컴포넌트를 선택하고, 필요 시 props로 커스터마이징한다.
