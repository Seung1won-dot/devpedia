---
id: client-routing
term: 라우팅(react-router)
aliases:
  - Client-side Routing
  - 클라이언트 사이드 라우팅
  - React Router
  - 리액트 라우터
  - 해시 라우팅
category: frontend
tags:
  - React
  - 브라우저
  - JavaScript
level: 1
kind: concept
related:
  - spa-mpa
  - react
  - nextjs
  - url-to-render
  - query-path-param
  - lazy-loading
see_also:
  - https://reactrouter.com/start/declarative/routing
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

SPA 에서 서버에 새로 묻지 않고 **URL 에 따라 보여 줄 화면을 JS 가 바꾸는** 것.

## 비유

백화점 **층별 안내판**. 다른 층(화면)으로 가도 건물(페이지)을 나갔다 다시 들어오는 게 아니라 안에서 엘리베이터만 타는 것이고, 안내판(URL)은 지금 몇 층인지 계속 알려 준다.

## 예시

```tsx
// main.tsx — /c/:category/:id 가 카드 한 장인 구조
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'

function TermPage() {
  const { category, id } = useParams()   // /c/frontend/fetch → { category: 'frontend', id: 'fetch' }
  return <h1>{category} / {id}</h1>
}

export default function App() {
  return (
    <BrowserRouter>
      <nav><Link to="/c/frontend/fetch">fetch 카드</Link></nav>   {/* <a href> 대신 Link: 새로고침 없이 이동 */}
      <Routes>
        <Route path="/" element={<p>홈</p>} />
        <Route path="/c/:category/:id" element={<TermPage />} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </BrowserRouter>
  )
}
```

`Link` 를 누르면 react-router 가 `history.pushState` 로 주소창만 바꾸고 맞는 `Route` 를 그린다. 서버는 이 일을 전혀 모르기 때문에 그 주소에서 **새로고침**하면 서버가 `/c/frontend/fetch` 라는 파일을 찾다 404 를 낸다 — Caddy/Nginx 라면 모든 경로를 `index.html` 로 넘기는 설정(`try_files`)으로 해결하고, 서버 설정을 못 만지는 GitHub Pages 에서는 Devpedia 처럼 **해시 라우팅**(`#fetch`, `#c/frontend`)을 쓴다. `#` 뒤는 서버로 전송되지 않아 어떤 주소든 `index.html` 하나로 받는다.

## 헷갈리기 쉬운 것

- **서버 라우팅**(FastAPI 의 `@app.get("/patients/{id}")`)은 요청 URL 을 보고 어떤 함수를 실행할지 고르는 것. 이름은 같지만 서버에서 일어나고, 클라이언트 라우팅은 브라우저 안에서 화면만 바꾼다.
- **`<a href>` vs `<Link>`**: `<a>` 는 페이지를 통째로 다시 받는다(MPA 식 이동). `Link` 는 JS 가 가로채 화면만 바꾼다. SPA 안에서 `<a>` 를 쓰면 state 가 전부 날아간다.
- **Next.js 의 파일 기반 라우팅**: `app/terms/[id]/page.tsx` 처럼 폴더 구조가 곧 URL. react-router 는 코드로 `Route` 를 적는다. 하는 일은 같다.
