---
id: cors
term: CORS
aliases:
  - Cross-Origin Resource Sharing
  - 교차 출처 리소스 공유
  - 코르스
category: frontend
tags:
  - 브라우저
  - HTTP
  - 보안
  - 흔한실수
level: 2
kind: concept
related:
  - http
  - api
  - port
  - reverse-proxy
  - csrf
  - fetch
see_also:
  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

브라우저가 **다른 출처의 응답을 읽지 못하게 막는 규칙**과, 서버가 허용해 주는 방법.

## 비유

아파트 **방문객 출입 규칙**. 다른 동(출처)에서 온 사람은 경비(브라우저)가 막는데, 집주인(서버)이 "그 동 사람은 들여보내도 돼" 라고 명단(응답 헤더)을 적어 두면 통과된다.

## 예시

Vite 개발 서버(`localhost:5173`)에서 FastAPI(`localhost:8000`)를 부르면 포트가 달라 "다른 출처" 라서 이렇게 막힌다.

```
Access to fetch at 'http://localhost:8000/api/items' from origin 'http://localhost:5173'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

해결은 둘 중 하나. 서버가 `Access-Control-Allow-Origin: http://localhost:5173` 헤더를 붙이거나, 개발 중엔 Vite 가 대신 요청해 같은 출처로 만들어 준다.

```ts
// vite.config.ts — /api 로 가는 요청을 Vite 가 8000 번으로 넘겨준다
export default defineConfig({
  server: { proxy: { '/api': 'http://localhost:8000' } },
})
```

Ender Chest 가 Supabase 를 부를 때 CORS 를 겪지 않는 이유는 Supabase 가 이미 허용 헤더를 붙여 주기 때문이다.

## 헷갈리기 쉬운 것

- **CSRF** 는 공격 이름, CORS 는 브라우저의 규칙. CORS 는 "다른 출처가 응답을 읽어도 되나" 를 정할 뿐이라, 몰래 요청을 보내는 CSRF 를 CORS 로 막을 수는 없다.
- CORS 는 **브라우저에서만** 걸린다. curl·Postman·서버끼리 호출엔 아무 제한이 없어서, "Postman 은 되는데 브라우저만 안 돼요" 가 전형적인 증상이다.
