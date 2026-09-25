---
id: static-hosting
term: 정적 호스팅(Vercel/Pages)
aliases:
  - Static Hosting
  - 정적 사이트 호스팅
  - GitHub Pages
  - Vercel
category: infra
tags:
  - 클라우드
  - 배포
  - HTTP
level: 1
related:
  - csr-ssr-ssg
  - cdn
  - github-actions
  - dns
  - serverless
see_also:
  - https://docs.github.com/en/pages
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

서버 코드 없이 **HTML·CSS·JS 파일만 올려** 웹사이트를 공개하는 서비스.

## 비유

인쇄해 둔 **전단지를 게시판에 붙이는 것**. 누가 봐도 같은 내용이니 사람이 상주할 필요가 없고, 게시판(CDN)이 곳곳에 있어 어디서든 빨리 본다.

## 예시

```bash
npm run build          # Vite → dist/ (HTML·CSS·JS 만 남는다)
npx serve dist         # 로컬에서 "정적 서버" 로 미리 확인
npx vercel --prod      # Vercel 에 올리면 https://<프로젝트>.vercel.app 이 생긴다
```

GitHub Pages 는 저장소 Settings > Pages 에서 Source 를 "GitHub Actions" 로 두고 `actions/deploy-pages` 워크플로를 쓰면 같은 효과다 — 이 Devpedia 도 빌드 결과가 정적 파일이라 그대로 올릴 수 있다.

## 헷갈리기 쉬운 것

- **SSR/서버리스**는 요청마다 서버 코드가 돈다. 정적 호스팅은 파일만 내려 주니 로그인·DB 가 필요하면 별도 API(BaaS 등)를 붙여야 한다.
- **CDN** 은 정적 호스팅이 파일을 뿌리는 데 쓰는 전 세계 캐시망. Vercel/Pages 는 CDN 을 포함한 "서비스" 다.
