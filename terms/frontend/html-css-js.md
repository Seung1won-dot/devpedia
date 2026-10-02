---
id: html-css-js
term: HTML/CSS/JS
aliases:
  - HTML/CSS/JavaScript
  - 웹 기본 3종
  - 마크업·스타일·스크립트
  - 에이치티엠엘
category: frontend
tags:
  - HTML
  - CSS
  - JavaScript
level: 1
kind: concept
related:
  - dom
  - react
  - typescript
  - responsive-design
  - http
  - event-bubbling
  - tailwind
see_also:
  - https://developer.mozilla.org/ko/docs/Learn_web_development
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

웹 페이지의 **뼈대(HTML)·모양(CSS)·동작(JS)** 을 맡는 세 가지 기본 언어.

## 비유

집 한 채라면 HTML 은 **골조와 방 배치**, CSS 는 **벽지·페인트·가구 배치**, JS 는 **스위치를 누르면 켜지는 전등과 자동문**이다. 셋 중 하나만 있어도 집은 서지만, 살 만한 집이 되려면 다 있어야 한다.

## 예시

```html
<!-- index.html : 파일 하나에 셋이 다 들어간 가장 작은 예 -->
<button id="btn">눌러봐</button>

<style>
  #btn { background: #2563eb; color: white; border-radius: 8px; }
</style>

<script>
  document.getElementById('btn').onclick = () => alert('안녕, Devpedia!')
</script>
```

Ender Chest 나 Devpedia 처럼 React 로 만든 앱도 결국 빌드하면 이 셋(HTML 한 장 + CSS + JS 묶음)으로 바뀌어 브라우저에 전달된다.

## 헷갈리기 쉬운 것

- **Java 와 JavaScript** 는 이름만 비슷하고 전혀 다른 언어. 햄과 햄스터 정도의 관계.
- **TypeScript** 는 JS 에 타입 표시를 얹은 것. 브라우저는 TS 를 모르기 때문에 실행 전에 JS 로 변환된다.
