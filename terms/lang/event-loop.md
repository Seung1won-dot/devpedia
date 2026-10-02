---
id: event-loop
term: 이벤트 루프
aliases:
  - Event Loop
  - 이벤트루프
  - 태스크 큐
  - 콜백 큐
category: lang
tags:
  - 비동기
  - JavaScript
  - 면접
level: 2
kind: concept
related:
  - sync-async
  - promise-async-await
  - thread
  - stack-heap-memory
  - websocket
see_also:
  - https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

스레드 하나가 **할 일 큐를 계속 돌며** 끝난 비동기 작업의 콜백을 순서대로 실행하는 구조.

## 비유

**혼자 일하는 카페 사장**. 원두 배달·오븐처럼 남에게 맡길 일은 맡겨 두고, 계속 카운터를 돌며 "완료된 것부터" 하나씩 처리하니 혼자서도 손님 여럿을 받는다.

## 예시

```ts
console.log('1')
setTimeout(() => console.log('4 — 타이머 콜백(매크로태스크)'), 0)
Promise.resolve().then(() => console.log('3 — Promise 콜백(마이크로태스크)'))
console.log('2')
// 출력 순서: 1, 2, 3, 4 — 지금 돌던 동기 코드가 다 끝나야 큐를 본다
```

## 헷갈리기 쉬운 것

- **멀티스레드**가 아니다. JS 코드는 한 스레드에서 돌고, 파일·네트워크 대기만 런타임(libuv/브라우저)이 뒤에서 맡는다. 그래서 무거운 계산은 이벤트 루프를 막는다.
- **마이크로태스크**(Promise)가 **매크로태스크**(setTimeout, I/O)보다 항상 먼저 처리된다.
