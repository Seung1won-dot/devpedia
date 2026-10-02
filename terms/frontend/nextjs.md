---
id: nextjs
term: Next.js
aliases:
  - 넥스트
  - 넥스트JS
  - Next
  - App Router
  - 넥스트제이에스
category: frontend
tags:
  - React
  - 렌더링
level: 2
kind: tool
related:
  - react
  - csr-ssr-ssg
  - spa-mpa
  - bundler
  - static-hosting
  - vue
  - server-components
see_also:
  - https://nextjs.org/docs
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

React 에 **라우팅·서버 렌더링·배포 설정을 미리 얹은** 풀스택 프레임워크.

## 비유

React 가 **엔진**이라면 Next.js 는 차체·핸들·계기판까지 붙은 **완성차**. 엔진만 사면 나머지를 직접 골라 조립해야 하지만, 완성차는 바로 몰 수 있다.

## 예시

```tsx
// app/terms/[id]/page.tsx — 파일 위치가 곧 URL: /terms/deadlock
export default async function TermPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const term = await getTerm(id)   // 서버 컴포넌트: 서버에서 실행되고 이 코드는 브라우저로 안 간다
  return <article><h1>{term.term}</h1><p>{term.definition}</p></article>
}

// 빌드 때 모든 카드 페이지를 미리 HTML 로 만든다(SSG)
export async function generateStaticParams() {
  return (await getAllIds()).map((id) => ({ id }))
}
```

Devpedia 를 Next.js 로 옮기면 카드 한 장 한 장이 완성된 HTML 로 나와 검색 엔진에 잡히고 첫 화면이 빨라진다. 렌더링 방식은 페이지마다 고른다 — 빌드 때 만들면 **SSG**, 요청마다 만들면 **SSR**, 만들어 둔 것을 일정 주기로 갱신하면 **ISR**. App Router(`app/` 폴더)에서는 컴포넌트가 기본으로 **서버 컴포넌트**이고, 클릭·상태가 필요한 것만 `'use client'` 를 붙여 브라우저로 보낸다. 면접에서는 "Vite + React 대신 Next.js 를 고른다면 이유는?" 으로 나오며, SEO·초기 로딩·API 라우트 필요 여부로 답한다.

## 헷갈리기 쉬운 것

- **Vite + React(SPA)**: 빈 HTML 에 JS 가 그린다(CSR). 정적 호스팅에 올리면 끝이라 단순하지만 SEO 와 첫 화면이 약하다. Next.js 도 정적 export 는 되지만 SSR·ISR 을 쓰려면 Node 서버나 Vercel 같은 플랫폼이 필요하다.
- **Pages Router vs App Router**: 옛 `pages/` 방식과 새 `app/` 방식. 튜토리얼이 섞여 있으니 어느 쪽인지 먼저 확인하고, 새 프로젝트는 App Router 로 간다.
- **Remix / Astro**: 같은 자리의 경쟁자. Astro 는 블로그·문서 같은 콘텐츠 사이트에, Next.js 는 앱 성격이 강한 서비스에 더 흔하다.
