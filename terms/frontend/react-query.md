---
id: react-query
term: React Query(서버 상태)
aliases:
  - TanStack Query
  - 리액트 쿼리
  - 탠스택 쿼리
  - 서버 상태 관리
  - useQuery
category: frontend
tags:
  - React
  - 캐시
  - 비동기
level: 2
kind: tool
related:
  - state-management
  - hooks
  - cache
  - rest
  - promise-async-await
  - api
  - server-components
see_also:
  - https://tanstack.com/query/latest/docs/framework/react/overview
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

서버에서 받은 데이터의 **캐싱·재요청·로딩/에러 상태를 자동으로** 맡아 주는 React 라이브러리.

## 비유

매번 시장에 가는 대신 **장 봐 놓은 냉장고**. 있으면 바로 꺼내 주고(캐시), 오래됐으면 뒤에서 새로 사 오고(재요청), 없으면 "사 오는 중" 이라고 알려 준다.

## 예시

```tsx
import { useQuery } from '@tanstack/react-query'

function TermCard({ id }: { id: string }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['term', id],                                     // 캐시 키
    queryFn: () => fetch(`/api/terms/${id}`).then((r) => r.json()),
    staleTime: 5 * 60_000,                                      // 5분 동안은 다시 안 부른다
  })
  if (isPending) return <p>불러오는 중</p>
  if (error) return <p>실패: {error.message}</p>
  return <h2>{data.term}</h2>
}
```

같은 `['term', id]` 키를 쓰는 컴포넌트가 열 개라도 요청은 한 번이고, 탭을 떠났다 돌아오면 알아서 최신화한다. 직접 짜면 `useState` 세 개 + `useEffect` + 중복 요청 방지 + 언마운트 처리를 화면마다 반복하는 일을 훅 하나로 끝낸다. 수정은 `useMutation` 으로 보내고 성공하면 `invalidateQueries` 로 관련 캐시를 무효화해 다시 받게 한다. 면접에서는 "서버 상태와 클라이언트 상태를 어떻게 나눴나요?" 로 나온다.

## 헷갈리기 쉬운 것

- **Zustand/Redux(클라이언트 상태)**: "어느 탭이 열렸나, 다크 모드인가" 처럼 브라우저 안에서 태어난 상태용. 서버 데이터를 Redux 에 복사해 두면 언제 낡았는지 관리하는 코드가 눈덩이처럼 커진다.
- **SWR**: Vercel 이 만든 같은 역할의 라이브러리. 더 가볍고, React Query 는 무한 스크롤·뮤테이션·개발자 도구 같은 기능이 더 많다.
- **staleTime vs gcTime**: staleTime 은 "이 시간 안엔 새로 묻지 않는다", gcTime 은 "아무도 안 쓰는 캐시를 이 시간 뒤에 버린다"(옛 이름 cacheTime).
