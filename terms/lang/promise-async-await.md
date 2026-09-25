---
id: promise-async-await
term: Promise/async-await
aliases:
  - Promise / async-await
  - 프로미스
  - 어싱크 어웨이트
  - 비동기 문법
category: lang
tags:
  - 비동기
  - JavaScript
level: 2
related:
  - sync-async
  - event-loop
  - exception
  - api
  - hooks
see_also:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**Promise** 는 나중에 올 값을 담는 상자, **async/await** 는 그걸 동기처럼 쓰는 문법이다.

## 비유

**음식점 진동벨**. 주문하면 벨(Promise)을 먼저 받고, `await` 는 "벨 울릴 때까지 이 자리에서 기다렸다가 받아오기" 를 한 줄로 쓰는 것이다.

## 예시

```ts
async function loadItems(): Promise<Item[]> {
  try {
    const res = await fetch('http://localhost:8000/api/items')  // 끝날 때까지 이 함수만 대기
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (e) {
    console.error('불러오기 실패', e)   // reject 된 Promise 는 여기로
    return []
  }
}
// .then 으로 쓰면: fetch(url).then(r => r.json()).then(items => ...)
```

## 헷갈리기 쉬운 것

- `await` 는 **그 함수만** 멈춘다. 프로그램 전체(이벤트 루프)는 계속 돈다.
- `Promise.all([...])` 은 **동시에** 시작해 다 끝나길 기다리고, `for` 안의 `await` 는 **하나씩** 순서대로 기다린다. 요청 10개면 속도 차이가 크다.
