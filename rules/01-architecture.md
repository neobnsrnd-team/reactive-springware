# 01-architecture.md — 아키텍처 및 레이어 분리

## 목적

Claude가 Figma 기반 React 코드를 생성할 때
일관된 프로젝트 구조와 레이어 분리 원칙을 유지하기 위한 규칙 정의

본 프로젝트는 **Figma UI → Claude → React 코드 생성** 구조를 기반으로 한다.
공통 UI는 **Component Library (`@component-library`)** 를 사용한다.

---

# 1. 폴더 구조

Claude는 반드시 아래 구조를 기준으로 코드를 생성한다.

```
src/
  pages/
  hooks/
  repositories/
  types/
  components/
```

각 폴더는 하나의 역할만 가진다. 역할을 벗어난 코드는 해당 폴더에 두지 않는다.

---

## pages/

페이지 컴포넌트를 생성한다. 라우팅 단위이며, 비즈니스 로직을 포함하지 않는다.

```
pages/
  UserListPage.tsx
  UserDetailPage.tsx
  DashboardPage.tsx
```

**규칙:**
- 페이지 컴포넌트만 생성
- 페이지별 하위 폴더를 생성하지 않음 (폴더가 늘어날수록 공통 컴포넌트의 위치가 모호해짐)
- `Page` 접미사 사용

---

## hooks/

페이지 상태 관리 및 데이터 패칭 Hook을 생성한다. 데이터 패칭·상태 로직을 전담한다.

```
hooks/
  useUserList.ts
  useUserDetail.ts
  usePagination.ts
```

**규칙:**
- API 호출 Hook 생성 (Repository를 통해)
- 상태 관리 Hook 생성
- 재사용 가능 Hook 생성

---

## repositories/

HTTP 호출·데이터 가공·모델 변환·에러 처리를 전담한다.

```
repositories/
  userRepository.ts
  dashboardRepository.ts
```

**규칙:**
- `fetch` / `axios` 직접 호출은 이 폴더에서만 허용
- API 응답을 클라이언트 모델로 변환하는 로직 포함
- Hook에서 호출
- UI 로직 포함 금지

---

## types/

TypeScript 타입 정의 전담

```
types/
  userTypes.ts
  dashboardTypes.ts
```

**규칙:**
- API Response 타입 정의
- DTO 타입 정의
- 공통 타입 정의

---

## components/

페이지 전용 UI 컴포넌트 생성. 데이터 패칭 로직을 포함하지 않는다.

```
components/
  UserTable.tsx
  UserFilter.tsx
  DashboardCard.tsx
```

**규칙:**
- 페이지 전용 컴포넌트 생성
- 공통 컴포넌트 생성 금지
- 공통 컴포넌트는 component-library 사용

---

# 2. Page / Hook / Repository 레이어 역할 분리

## 구조 흐름

```
Page (UI Layer)
  ↓
Hook (Logic Layer)
  ↓
Repository (Data Layer)
  ↓
서버 API
```

---

## Page (UI Layer)

Page는 UI만 담당한다.

**허용:**
- Layout 구성
- Component 배치
- Hook 호출

**금지:**
- API 호출
- 상태 관리 로직 직접 작성 (`useState` 직접 사용 금지)
- 데이터 가공

GOOD
```tsx
// Page는 Hook 호출만
const { users, isLoading, handleDelete } = useUserList()
```

BAD
```tsx
// Page에서 직접 API 호출 또는 상태 생성 금지
useEffect(() => {
  axios.get('/users')
})
const [users, setUsers] = useState([])
```

---

## Hook (Logic Layer)

Hook은 로직을 담당한다.

**허용:**
- 상태 관리
- API 호출 (Repository 호출)
- 데이터 가공
- 이벤트 핸들러 정의

**금지:**
- UI 구성
- 컴포넌트 생성

GOOD
```ts
export const useUserList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userRepository.getUsers,
  })
  return { data, isLoading }
}
```

---

## Repository (Data Layer)

Repository는 데이터 호출을 담당한다.

**허용:**
- API 호출
- Response 처리
- 데이터 변환 (서버 필드명 → 클라이언트 모델)
- 에러 처리 (HTTP 에러를 클라이언트 에러로 변환)

**금지:**
- UI 로직
- 상태 관리 (`useState`, `useEffect` 사용 금지)

---

# 3. Component Library 사용 원칙

공통 UI는 반드시 component-library 사용

```ts
import { Button } from "@component-library/button"
import { Stack } from "@component-library/layout"
import { TextField } from "@component-library/input"
```

component-library가 유일한 UI 소스다.
직접 HTML 태그(`div`, `button` 등)를 사용하거나 외부 UI 라이브러리를 추가하지 않는다.
이 원칙을 지켜야 디자인 시스템과 코드가 항상 동기화된다.

---

# 4. 컴포넌트 계층 순서

컴포넌트 계층은 반드시 아래 순서를 따른다.

```
Page → Layout → Section → Component
```

이 계층을 건너뛰거나 역방향으로 중첩하면 레이아웃 일관성이 무너진다.

GOOD
```tsx
<Page>
  <Layout>
    <Section>
      <UserTable />
    </Section>
  </Layout>
</Page>
```

BAD
```tsx
// Component 안에 Page 중첩
<UserTable>
  <UserListPage />
</UserTable>

// Layout 건너뜀
<Page>
  <UserTable />
</Page>
```

---

# 5. 컴포넌트 200줄 제한

컴포넌트는 200줄을 넘지 않도록 한다.
200줄을 초과한다면 역할이 두 개 이상이라는 신호다. 분리를 검토한다.

GOOD
```
UserListPage.tsx   → 상태·이벤트 관리 (50줄)
UserTable.tsx      → 테이블 UI (80줄)
UserTableRow.tsx   → 행 UI (40줄)
```

BAD
```
UserListPage.tsx   → 상태 + 테이블 + 행 + 모달 + 폼 (350줄)
```

---

# 6. 금지 규칙

Claude는 다음을 생성하지 않는다.

❌ `shared` 폴더 생성 금지
❌ 공통 컴포넌트 직접 생성 금지 (component-library 사용)
❌ `layout` 폴더 생성 금지
❌ 디자인 토큰 직접 정의 금지
❌ 페이지별 하위 폴더 생성 금지
❌ `index.ts` 남발 금지 (파일 역할이 불명확해짐)
