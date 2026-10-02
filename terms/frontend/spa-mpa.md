---
id: spa-mpa
term: SPA/MPA
aliases:
  - Single Page Application
  - 싱글 페이지 애플리케이션
  - Multi Page Application
  - 멀티 페이지 애플리케이션
category: frontend
tags:
  - 렌더링
  - 브라우저
  - React
level: 2
kind: pattern
related:
  - csr-ssr-ssg
  - react
  - dom
  - http
  - pwa
  - client-routing
see_also:
  - https://developer.mozilla.org/ko/docs/Glossary/SPA
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

화면 전환을 **JS 가 직접** 하면 SPA, 페이지마다 서버에서 **새 HTML 을 받으면** MPA.

## 비유

MPA 는 방마다 문을 열고 **다른 방으로 옮겨 가는 집**, SPA 는 한 방에 앉아 있는데 **무대 세트만 바뀌는 연극**. 방을 옮기는 순간(흰 화면 깜빡임)이 없어서 SPA 가 앱처럼 느껴진다.

## 예시

Devpedia 와 Ender Chest 는 둘 다 SPA 다. 카테고리 탭을 눌러도 `index.html` 은 한 번만 받고, 주소의 해시(`#/c/frontend`)만 바뀌면 React 가 화면을 갈아끼운다.

```ts
// Devpedia 라우팅의 뼈대: 서버 요청 없이 해시만 보고 화면을 바꾼다
window.addEventListener('hashchange', () => {
  setRoute(parseRoute(location.hash))   // '#/c/frontend' → 카테고리 화면
})
```

반대로 학교 포털이나 Django 템플릿 사이트는 MPA 라서, 메뉴를 누를 때마다 서버가 완성된 HTML 을 새로 보내고 브라우저가 페이지 전체를 다시 그린다.

## 헷갈리기 쉬운 것

- **CSR/SSR** 은 "첫 HTML 을 누가 만드나(브라우저 vs 서버)" 의 문제. SPA 도 SSR 을 할 수 있어서(Next.js) SPA/MPA 와는 별개의 축이다.
- SPA 라고 페이지가 진짜 하나뿐인 건 아니다. URL 은 여러 개, **HTML 파일이 하나**라는 뜻. 그래서 GitHub Pages 에 올릴 때 404 를 `index.html` 로 돌려주는 설정이 필요할 때가 있다.
