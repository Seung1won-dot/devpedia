---
id: csr-ssr-ssg
term: CSR/SSR/SSG
aliases:
  - Client Side Rendering
  - Server Side Rendering
  - Static Site Generation
  - 클라이언트/서버/정적 렌더링
category: frontend
tags:
  - 렌더링
  - 브라우저
  - 배포
level: 2
related:
  - spa-mpa
  - react
  - static-hosting
  - cdn
  - serverless
see_also:
  - https://web.dev/articles/rendering-on-the-web
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

HTML 을 **브라우저가 만들면 CSR, 요청 때 서버가 만들면 SSR, 빌드 때 미리 만들면 SSG**.

## 비유

같은 도시락이라도 **손님이 재료를 받아 직접 싸면 CSR, 주문마다 주방에서 싸 주면 SSR, 아침에 미리 싸 둔 걸 내주면 SSG**. 미리 싸 둔 것이 제일 빨리 나오지만 내용이 실시간은 아니다.

## 예시

```bash
# Devpedia 는 CSR. 빌드된 index.html 은 거의 빈 껍데기고, 용어 목록은 JS 가 그린다
npm run build
cat dist/index.html    # <div id="root"></div> 와 <script> 한 줄뿐
```

- **CSR** — Devpedia, Ender Chest. Vite 가 만든 JS 묶음을 GitHub Pages/Vercel 에 올리면 끝, 서버가 필요 없다. 대신 JS 가 다 내려오기 전엔 빈 화면.
- **SSG** — 연구실 블로그를 Astro/Next.js 로 만든다면 이쪽. 글이 바뀔 때만 다시 빌드하고, 검색 엔진이 완성된 HTML 을 바로 읽는다.
- **SSR** — 로그인 뒤 개인화 화면이 많으면서 검색 노출도 필요할 때. 요청마다 서버(또는 Edge Function)가 HTML 을 만든다.

## 헷갈리기 쉬운 것

- **SPA/MPA** 는 페이지 전환 방식, CSR/SSR/SSG 는 첫 HTML 을 누가 언제 만드느냐. SPA 이면서 SSR 인 조합(Next.js)이 흔하다.
- **정적 호스팅**(GitHub Pages, Vercel 정적 배포)에 올릴 수 있는 건 CSR 과 SSG. SSR 은 요청마다 코드가 도는 서버나 서버리스 함수가 필요하다.
