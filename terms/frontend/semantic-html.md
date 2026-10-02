---
id: semantic-html
term: 시맨틱 태그
aliases:
  - Semantic HTML
  - 시맨틱 HTML
  - 의미론적 태그
  - header/nav/main/article/section/footer
category: frontend
tags:
  - HTML
  - 접근성
level: 1
kind: concept
related:
  - html-css-js
  - a11y
  - dom
  - browser-rendering
  - flexbox-grid
  - form-handling
see_also:
  - https://developer.mozilla.org/ko/docs/Glossary/Semantics
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

div 대신 페이지 각 부분의 역할을 **태그 이름으로 드러내는** HTML 작성법.

## 비유

이삿짐 상자에 전부 "물건" 이라고만 쓰는 것과 **"주방", "책", "깨지기 쉬움"** 이라고 쓰는 것의 차이. 내용물은 같아도 나르는 사람(브라우저·검색 엔진·화면 낭독기)이 다르게 다룬다.

## 예시

```html
<!-- Before: 전부 div. 사람은 class 로 짐작하지만 기계는 모른다 -->
<div class="header"><div class="nav">...</div></div>
<div class="content"><div class="card">데드락</div></div>
<div class="footer">ECLAB</div>

<!-- After: Devpedia 레이아웃을 시맨틱 태그로 -->
<header><nav aria-label="카테고리">...</nav></header>
<main>
  <article><h2>데드락</h2><p>둘 이상이 서로 기다리며 아무도 못 움직이는 상태.</p></article>
</main>
<footer>ECLAB</footer>
```

이득은 셋이다. **접근성** — 화면 낭독기가 `nav`·`main` 을 랜드마크로 인식해 키보드 사용자가 "본문으로 바로 이동" 할 수 있다. **SEO** — 검색 엔진이 `main` 과 `article` 안을 핵심 내용으로 본다. **가독성** — 닫는 `</div>` 가 열두 개 쌓인 코드보다 어디가 머리말이고 본문인지 바로 보인다. 면접에서는 "`section` 과 `article` 의 차이는?", "div 만 쓰면 뭐가 문제인가?" 로 나온다.

## 헷갈리기 쉬운 것

- **`section` vs `article`**: `article` 은 떼어 내도 혼자 말이 되는 덩어리(카드 한 장, 글 한 편), `section` 은 제목이 있는 문서의 한 장(챕터). 둘 다 아니면 `div`.
- **`div` 가 나쁜 게 아니다**: 의미 없이 순수하게 묶거나 스타일용 상자가 필요할 땐 여전히 `div` 가 맞다. 문제는 의미가 있는 자리에도 `div` 만 쓰는 것.
- **`b`/`i` vs `strong`/`em`**: 앞은 굵게·기울임이라는 모양, 뒤는 중요·강조라는 의미. 모양은 CSS 에 맡기고 HTML 에는 의미를 쓴다는 원칙이다.
