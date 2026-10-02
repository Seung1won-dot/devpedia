---
id: media-query
term: 미디어 쿼리
aliases:
  - Media Query
  - "@media"
  - 미디어쿼리
  - 브레이크포인트
  - prefers-color-scheme
category: frontend
tags:
  - CSS
  - 브라우저
level: 1
kind: concept
related:
  - responsive-design
  - flexbox-grid
  - html-css-js
  - tailwind
  - a11y
see_also:
  - https://developer.mozilla.org/ko/docs/Web/CSS/CSS_media_queries/Using_media_queries
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

화면 너비·다크 모드 같은 **기기 조건이 맞을 때만 적용되는** CSS 규칙 묶음.

## 비유

옷장에 붙인 **"기온 20도 이하면 이 칸"** 메모. 조건이 맞는 날에만 그 칸의 옷(스타일)을 꺼내 입고, 평소엔 기본 옷차림 그대로다.

## 예시

```css
/* 모바일 기본값을 먼저 쓰고(mobile-first), 넓어질 때 덮어쓴다 */
.sidebar { display: none; }

@media (min-width: 768px) {              /* 태블릿 이상: 사이드바 보이기 */
  .sidebar { display: block; width: 240px; }
}

@media (prefers-color-scheme: dark) {    /* OS 가 다크 모드일 때 */
  body { background: #111; color: #eee; }
}

@media (prefers-reduced-motion: reduce) { /* "움직임 줄이기" 를 켠 사용자 */
  * { animation: none !important; transition: none !important; }
}
```

```ts
// JS 에서도 같은 조건을 물을 수 있다
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
```

조건이 바뀌는 지점(768px 같은 값)을 **브레이크포인트**라 부른다. 기기 이름(아이폰 몇) 기준이 아니라 **내 레이아웃이 깨지는 너비**에서 끊는 것이 원칙. Tailwind 의 `md:` `dark:` 접두사는 이 미디어 쿼리를 대신 써 주는 것이다. `index.html` 에 viewport 메타 태그가 없으면 폰이 PC 폭으로 그린 뒤 축소해 버려 `min-width` 조건이 엉뚱하게 평가된다.

## 헷갈리기 쉬운 것

- **반응형 디자인** 은 목표(어느 화면에서나 잘 보이게), 미디어 쿼리는 그 목표를 이루는 도구 중 하나. Grid 의 `minmax` 와 `flex-wrap` 만으로 미디어 쿼리 없이 반응하게 만드는 경우도 많다.
- **컨테이너 쿼리(@container)** 는 화면 전체가 아니라 **부모 요소의 크기**를 조건으로 삼는다. 같은 카드를 좁은 사이드바와 넓은 본문에 둘 때 유용하고, 요즘 브라우저는 모두 지원한다.
- **min-width vs max-width**: 모바일 우선이면 `min-width` 로 "넓어질 때", 데스크톱 우선이면 `max-width` 로 "좁아질 때" 를 쓴다. 한 프로젝트에서 섞으면 어느 규칙이 이기는지 헷갈린다.
