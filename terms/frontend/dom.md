---
id: dom
term: DOM
aliases:
  - Document Object Model
  - 문서 객체 모델
  - 돔
category: frontend
tags:
  - 브라우저
  - HTML
  - JavaScript
level: 1
kind: concept
related:
  - html-css-js
  - virtual-dom
  - react
  - tree
  - xss
  - event-bubbling
  - web-components
see_also:
  - https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

브라우저가 HTML 을 읽어 만든 **트리 모양의 객체**로, JS 가 화면을 바꿀 때 만지는 대상.

## 비유

종이 도면(HTML)을 보고 실제로 조립해 놓은 **레고 모형**. 블록 하나를 빼거나 색을 바꾸면 도면은 그대로인데 모형(화면)만 즉시 바뀐다.

## 예시

```js
// Devpedia 검색창: 글자를 칠 때마다 옆의 안내 문구를 바꾼다
const input = document.querySelector('#search')
const hint = document.querySelector('#hint')

input.addEventListener('input', () => {
  hint.textContent = `${input.value.length}자 입력 중`
})
```

`document.querySelector` 로 트리에서 노드를 찾고, `textContent` 나 `classList` 로 바꾸면 화면이 바로 갱신된다. React 는 이 작업을 대신 해 주는 것뿐이라, 개발자 도구의 Elements 탭에서 보이는 것이 곧 DOM 이다.

## 헷갈리기 쉬운 것

- **HTML** 은 파일에 적힌 글자, **DOM** 은 그걸 브라우저가 메모리에 올린 살아 있는 객체. 그래서 HTML 파일을 고쳐도 이미 떠 있는 페이지의 DOM 은 바뀌지 않는다.
- **가상 DOM** 은 React 가 진짜 DOM 을 덜 만지려고 메모리에 따로 두는 가벼운 복사본.
