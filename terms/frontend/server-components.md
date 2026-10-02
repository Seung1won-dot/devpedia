---
id: server-components
term: 서버 컴포넌트(RSC)
aliases:
  - React Server Components
  - RSC
  - 리액트 서버 컴포넌트
  - use client
  - Server Actions
category: frontend
tags:
  - React
  - 렌더링
  - 성능최적화
level: 3
kind: concept
related:
  - hydration
  - nextjs
  - csr-ssr-ssg
  - react
  - react-query
  - api
see_also:
  - https://ko.react.dev/reference/rsc/server-components
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

**서버에서만 실행되고 JS 가 브라우저로 안 가는** React 컴포넌트.

## 비유

식당의 **주방 조리**와 **테이블 불판**. 서버 컴포넌트는 주방에서 다 만들어 완성 접시만 내보내고(레시피·재료는 손님에게 안 감), 클라이언트 컴포넌트는 손님이 직접 뒤집어야 하는 불판 부분만 맡는다.

## 예시

```tsx
// app/terms/page.tsx — Next.js App Router 는 기본이 서버 컴포넌트.
// DB 클라이언트와 이 코드는 브라우저 번들에 들어가지 않는다
import { db } from '@/lib/db'          // pg·Prisma 등 서버 전용 모듈
import { StarButton } from './StarButton'

export default async function TermsPage() {
  const terms = await db.query('SELECT id, term FROM terms ORDER BY term')   // 컴포넌트에서 바로 await
  return (
    <ul>
      {terms.map((t) => (
        <li key={t.id}>{t.term} <StarButton id={t.id} /></li>
      ))}
    </ul>
  )
}
```

```tsx
// app/terms/StarButton.tsx — 클릭·state 가 필요한 부분만 클라이언트로
'use client'
import { useState } from 'react'
export function StarButton({ id }: { id: string }) {
  const [on, setOn] = useState(false)
  return <button onClick={() => setOn(!on)}>{on ? '★' : '☆'}</button>
}
```

서버 컴포넌트는 `useState`·`onClick` 을 못 쓰는 대신 **async/await 로 DB·파일·비밀 키에 직접 접근**하고, 그 결과만 브라우저로 보낸다. 그래서 "`/api/terms` 엔드포인트 + `useEffect` + 로딩 state" 3단 구조가 사라지고, 마크다운 파서 같은 무거운 라이브러리를 번들에서 뺄 수 있다. 트레이드오프: Node 서버(또는 Vercel 류 플랫폼)가 반드시 필요해 GitHub Pages 같은 정적 호스팅에는 못 올리고, `'use client'` 경계를 잘못 그으면 "서버 전용 모듈을 클라이언트에서 import" 류의 에러와 씨름한다. 상호작용이 적은 콘텐츠 사이트에서 이득이 크고, 거의 모든 것이 인터랙티브한 대시보드에서는 이득이 작다. 지금은 Next.js App Router 가 가장 성숙한 구현이고 React Router·Waku 등이 뒤따르고 있다 [확인 필요].

## 헷갈리기 쉬운 것

- **SSR vs RSC**: SSR 은 클라이언트 컴포넌트를 서버에서 **한 번 HTML 로 미리 그려 주는 것**이고, 그 JS 는 결국 브라우저로 가서 하이드레이션된다. RSC 는 JS 가 **아예 안 가는** 컴포넌트. 둘은 같이 쓰인다 — RSC 가 트리를 만들고, 그 안의 클라이언트 컴포넌트는 SSR 로 HTML 화된다.
- **'use client' vs 'use server'**: `'use client'` 는 "이 파일부터는 브라우저 번들에 포함" 표시, `'use server'` 는 서버 함수(Server Action)를 클라이언트에서 호출할 수 있게 노출하는 표시. 반대말이 아니다.
- **React Query(서버 상태)** 는 클라이언트가 API 를 불러 캐시하는 방식. RSC 는 그 API 호출 자체를 서버 컴포넌트 안으로 흡수한다. 실시간 갱신·낙관적 업데이트가 많으면 여전히 React Query 가 편하다.
