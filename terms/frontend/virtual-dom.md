---
id: virtual-dom
term: 가상 DOM
aliases:
  - Virtual DOM
  - VDOM
  - 버추얼 돔
  - 가상 돔
category: frontend
tags:
  - React
  - 렌더링
  - 브라우저
level: 2
related:
  - dom
  - react
  - component-props-state
  - tree
see_also:
  - https://ko.react.dev/learn/render-and-commit
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

React 가 메모리에 둔 **화면의 가벼운 복사본**으로, 이전과 비교해 바뀐 곳만 진짜 DOM 에 반영한다.

## 비유

인테리어를 바꿀 때 벽을 바로 부수지 않고 **도면 두 장(전·후)을 겹쳐 보고** 달라진 벽만 공사하는 것. 진짜 벽(DOM) 공사가 제일 비싸기 때문에 도면 비교로 공사를 최소화한다.

## 예시

```tsx
// Devpedia 검색 결과. 한 글자 칠 때마다 전체가 다시 "계산" 되지만,
// 진짜 DOM 에는 실제로 바뀐 <li> 만 추가·삭제된다
const [query, setQuery] = useState('')
const hits = index.search(query)

return (
  <ul>
    {hits.map((t) => <li key={t.id}>{t.term}</li>)}
  </ul>
)
```

`key` 를 제대로 주면 React 가 "이 `<li>` 가 아까 그 `<li>` 인지" 를 알아서 비교가 정확하고 빨라진다. 배열 인덱스를 key 로 쓰면 항목 순서가 바뀔 때 엉뚱한 것이 재사용되는 이유가 이것이다.

## 헷갈리기 쉬운 것

- **DOM** 은 브라우저가 가진 진짜 화면 트리, 가상 DOM 은 React 가 만든 JS 객체. 가상 DOM 을 아무리 바꿔도 비교·반영(commit) 전까지는 화면에 아무 일도 없다.
- **Shadow DOM** 은 이름만 비슷한 브라우저 표준으로, 웹 컴포넌트의 스타일을 바깥과 격리하는 기능. React 와는 무관하다.
