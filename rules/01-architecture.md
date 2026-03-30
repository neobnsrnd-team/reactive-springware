# 01-architecture.md — 아키텍처 및 레이어 분리

## 목적

Claude가 Figma 기반 React 코드를 생성할 때
일관된 프로젝트 구조와 레이어 분리 원칙을 유지하기 위한 규칙 정의

본 프로젝트는 **Figma UI → Claude → React 코드 생성** 구조를 기반으로 한다.
공통 UI는 **`@reactive-springware/component-lib`** 패키지를 사용한다.
패키지에 없는 공통 컴포넌트를 별도로 만들지 않는다.

---

# 1. 폴더 구조

Claude는 반드시 아래 구조를 기준으로 코드를 생성한다.

```
src/
  features/
    transactionDetail/     ← Figma 화면 1개 = 폴더 1개
      page.tsx
      hook.ts
      repository.ts
      types.ts
    accountList/
      page.tsx
      hook.ts
      repository.ts
      types.ts
  router/
    routes.tsx
```

**핵심 원칙: Figma 화면 1개 = `features/` 하위 폴더 1개**

각 feature 폴더 안에서 파일은 역할에 따라 고정된 이름을 사용한다.
feature 폴더 이름은 화면 이름을 camelCase로 변환한다. (예: "거래 상세" → `transactionDetail`)

| 파일명 | 역할 |
|---|---|
| `page.tsx` | 라우팅 단위 페이지 컴포넌트 (UI만 담당) |
| `hook.ts` | 데이터 패칭·상태 관리 |
| `repository.ts` | HTTP 호출·데이터 가공·에러 처리 |
| `types.ts` | TypeScript 타입 정의 |

필요한 파일만 생성한다. API 호출이 없으면 `repository.ts`와 `types.ts`는 생성하지 않는다.

---

# 2. Page / Hook / Repository 레이어 역할 분리

## 구조 흐름

```
page.tsx  (UI Layer)
  ↓
hook.ts   (Logic Layer)
  ↓
repository.ts  (Data Layer)
  ↓
서버 API
```

---

## page.tsx (UI Layer)

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
// page.tsx — Hook 호출만
const { users, isLoading, handleDelete } = useUserList();
```

BAD
```tsx
// page.tsx에서 직접 API 호출 또는 상태 생성 금지
useEffect(() => { axios.get('/users') });
const [users, setUsers] = useState([]);
```

---

## hook.ts (Logic Layer)

Hook은 로직을 담당한다.

**허용:**
- 상태 관리
- API 호출 (repository 호출)
- 데이터 가공
- 이벤트 핸들러 정의

**금지:**
- UI 구성
- 컴포넌트 생성

GOOD
```ts
export const useTransactionDetail = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['transactionDetail'],
    queryFn: transactionDetailRepository.get,
  });
  return { data, isLoading };
};
```

---

## repository.ts (Data Layer)

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

공통 UI는 반드시 `@reactive-springware/component-lib`를 사용한다.

```ts
import { Button, Stack, TextField } from '@reactive-springware/component-lib';
```

component-lib가 유일한 UI 소스다.
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
200줄을 초과한다면 역할이 두 개 이상이라는 신호다.
같은 feature 폴더 안에 별도 파일로 분리한다.

GOOD
```
features/userList/
  page.tsx          (50줄 — 레이아웃·Hook 호출)
  UserTable.tsx     (80줄 — 테이블 UI 분리)
  UserTableRow.tsx  (40줄 — 행 UI 분리)
  hook.ts
  repository.ts
  types.ts
```

BAD
```
features/userList/
  page.tsx   (350줄 — 상태 + 테이블 + 행 + 모달 + 폼 전부)
```

---

# 6. 금지 규칙

Claude는 다음을 생성하지 않는다.

❌ `features/` 밖에 페이지·Hook·Repository 파일 생성 금지
❌ `components/` 폴더 생성 금지 (component-lib 사용)
❌ `shared/` 폴더 생성 금지
❌ `layout/` 폴더 생성 금지
❌ 디자인 토큰 직접 정의 금지
❌ feature 폴더 안에 `index.ts` 생성 금지 (파일 역할이 불명확해짐)
