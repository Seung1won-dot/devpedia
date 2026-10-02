---
id: sync-async
term: 동기/비동기
aliases:
  - Synchronous / Asynchronous
  - 동기와 비동기
  - 블로킹/논블로킹
  - 비동기 처리
category: lang
tags:
  - 비동기
level: 1
kind: concept
related:
  - promise-async-await
  - event-loop
  - thread
  - http
  - websocket
  - blocking-nonblocking
  - concurrency-parallelism
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

**동기**는 끝날 때까지 기다렸다 다음 일을 하고, **비동기**는 시켜 놓고 다른 일을 먼저 한다.

## 비유

동기는 **카운터 앞에서 커피 나올 때까지 서서 기다리기**, 비동기는 **진동벨 받고 자리에 앉아 있기**. 비동기라고 커피가 빨리 나오는 건 아니고, 기다리는 동안 딴 일을 할 수 있을 뿐이다.

## 예시

```ts
import { readFileSync } from 'node:fs'

// 동기: 파일을 다 읽을 때까지 아래 줄로 못 넘어감
const csv = readFileSync('data.csv', 'utf8')
console.log('1. 읽기 끝')

// 비동기: 요청만 보내고 바로 다음 줄로. 결과는 나중에 콜백으로
fetch('http://localhost:8000/api/items').then(() => console.log('3. 응답 도착'))
console.log('2. 요청 보냄 (응답은 아직)')
```

## 헷갈리기 쉬운 것

- **블로킹/논블로킹**은 "호출한 쪽이 멈추느냐", 동기/비동기는 "완료를 누가 확인하느냐" 의 문제. 실무에선 거의 같이 쓰이지만 엄밀히는 다른 축이다.
- **멀티스레드**와 다르다. JS 는 스레드 하나로도 비동기가 된다(이벤트 루프).
