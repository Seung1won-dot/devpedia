---
id: fetch
term: fetch/axios
aliases:
  - Fetch API
  - 페치
  - axios
  - 액시오스
  - HTTP 클라이언트
category: frontend
tags:
  - JavaScript
  - HTTP
  - 비동기
  - 브라우저
level: 1
kind: tool
related:
  - promise-async-await
  - react-query
  - http-methods
  - http-status-code
  - cors
  - json
see_also:
  - https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
  - https://axios-http.com/kr/docs/intro
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

JS 코드에서 **서버에 HTTP 요청을 보내고 응답을 받는** 내장 함수와 그 대안 라이브러리.

## 비유

가게에 **전화로 주문**하는 것. fetch 는 기본 전화기라 "전화가 연결됐나" 와 "주문이 제대로 됐나" 를 내가 따로 확인해야 하고, axios 는 비서가 붙은 전화라 잘못되면 알아서 알려 준다.

## 예시

```ts
// FastAPI 서버의 /api/patients?limit=20 호출 (Vite + TypeScript)
type Patient = { id: string; age: number }

async function getPatients(): Promise<Patient[]> {
  const res = await fetch('/api/patients?limit=20')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)   // fetch 는 404·500 에도 throw 하지 않는다
  return res.json()                                     // 본문을 JSON 으로 — 이것도 Promise
}

// axios 는 JSON 변환과 4xx/5xx throw 를 대신 해 준다
const { data } = await axios.get<Patient[]>('/api/patients', { params: { limit: 20 } })
```

fetch 는 `Promise` 를 돌려주므로 `await` 로 받는다. **네트워크가 아예 끊겼을 때만 throw** 하고 404·500 은 "응답은 왔다" 로 치기 때문에 `res.ok` 검사를 빼먹는 것이 초보의 단골 실수다. 포트가 다른 서버(React 5173 → FastAPI 8000)를 부르면 CORS 에 걸리므로 개발 중엔 `vite.config.ts` 의 `server.proxy` 로 `/api` 를 넘겨 준다. React 컴포넌트 안에서 로딩·에러·캐시까지 다루려면 fetch 를 `useEffect` 에 직접 넣기보다 React Query 로 감싼다.

## 헷갈리기 쉬운 것

- **fetch vs axios**: fetch 는 브라우저(와 Node 18+)에 내장돼 설치가 없고, axios 는 `npm install` 하는 라이브러리. axios 는 JSON 자동 변환·에러 상태 throw·타임아웃·인터셉터(모든 요청에 토큰 붙이기)가 기본이라 큰 프로젝트에서 편하다. 작은 프로젝트는 fetch 로 충분.
- **React Query** 는 HTTP 클라이언트가 아니다. 안에서 fetch/axios 를 부르고, 그 결과의 캐시·재요청·로딩 상태를 관리하는 한 층 위의 도구.
- **XMLHttpRequest(AJAX)** 는 fetch 이전의 옛 API. 같은 일을 콜백 방식으로 했고, axios 는 원래 이것을 감싼 라이브러리였다.
