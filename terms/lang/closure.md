---
id: closure
term: 클로저
aliases:
  - Closure
  - 클로져
  - 렉시컬 스코프
  - 함수가 변수를 기억하는 것
category: lang
tags:
  - 함수형
  - JavaScript
level: 2
related:
  - functional-programming
  - hooks
  - stack-heap-memory
  - garbage-collection
  - event-loop
see_also:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

함수가 **자기가 만들어진 곳의 변수를 기억**한 채로 들고 다니는 것.

## 비유

**도시락을 싸 온 사람**. 집(함수가 만들어진 곳)을 떠나 밖에서 일하지만, 집에서 싼 도시락(그때의 변수)을 계속 꺼내 먹을 수 있다.

## 예시

```ts
function makeCounter() {
  let count = 0                 // makeCounter 가 끝나도 이 변수는 살아남는다
  return () => ++count
}
const next = makeCounter()
next(); next()
console.log(next())             // 3 — count 를 계속 기억
const other = makeCounter()
console.log(other())            // 1 — 별도의 count
```

## 헷갈리기 쉬운 것

- **스코프**는 "어디서 보이나" 의 규칙이고, 클로저는 그 규칙 덕에 함수가 바깥 변수를 "가지고 나가는" 현상.
- React 의 **stale closure**: `useEffect` 안의 함수가 예전 렌더의 `state` 를 기억해 최신 값을 못 보는 것. 의존성 배열이 그래서 필요하다.
