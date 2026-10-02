---
id: callback
term: 콜백
aliases:
  - Callback
  - 콜백 함수
  - Callback Function
  - 콜백 지옥
  - Callback Hell
category: lang
tags:
  - 비동기
  - JavaScript
  - 함수형
level: 1
kind: concept
related:
  - promise-async-await
  - event-loop
  - higher-order-function
  - sync-async
  - hooks
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

**나중에 불러 달라**고 다른 함수에 인자로 넘겨주는 함수.

## 비유

택배 기사에게 **"도착하면 이 번호로 전화 주세요"** 하고 연락처를 남기는 것. 문 앞에서 기다리는 대신 내 일을 하다가, 전화(콜백)가 오면 그때 나간다.

## 예시

```js
// 1) 이벤트 리스너 — "클릭이 일어나면 이걸 불러 줘"
button.addEventListener('click', () => console.log('clicked'))

// 2) 콜백 지옥 — 순서가 있는 비동기 작업을 콜백으로 이으면 오른쪽으로 파고든다
login(id, (err, user) => {
  if (err) return fail(err)
  loadItems(user.id, (err, items) => {
    if (err) return fail(err)
    render(items, () => console.log('done'))     // 3단만 돼도 읽기 힘들다
  })
})

// 3) 같은 흐름을 Promise 위의 async/await 로 — 에러는 try/catch 한 곳에서
const user = await login(id); const items = await loadItems(user.id); await render(items)
```

콜백 자체는 나쁜 게 아니다 — `arr.map(fn)`, `setTimeout(fn, 0)`, React 의 `onClick={fn}` 이 전부 콜백이다. 문제는 **비동기 작업을 순서대로 이을 때** 중첩이 깊어지고 에러 처리가 단마다 반복되는 것이고, 그래서 "나중에 올 값" 을 객체로 만든 Promise 가 나왔고 그 위에 async/await 문법이 얹혔다. Node 의 옛 API(`fs.readFile(path, cb)`)와 브라우저 이벤트 모델을 읽으려면 지금도 콜백을 알아야 한다.

면접에선 "콜백 지옥이 뭐고 어떻게 해결하나?" 로 나온다 — Promise 체인이나 async/await 로 평탄하게 만들고, 단계마다 이름 있는 함수로 쪼갠다고 답한다.

## 헷갈리기 쉬운 것

- **Promise** 는 콜백을 없앤 게 아니라 `.then(콜백)` 으로 넘기는 위치와 순서를 정리한 것. 안쪽에서 결국 콜백이 불린다.
- **고차 함수**: 콜백을 "받는 쪽" 함수를 부르는 이름. 같은 장면을 어느 편에서 보느냐의 차이다.
- 콜백이라고 다 비동기는 아니다. `arr.map(fn)` 의 fn 은 그 자리에서 바로(동기로) 불린다.
