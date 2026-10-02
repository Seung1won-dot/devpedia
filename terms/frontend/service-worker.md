---
id: service-worker
term: 서비스 워커
aliases:
  - Service Worker
  - 서비스워커
  - SW
category: frontend
tags:
  - PWA
  - 브라우저
  - 캐시
level: 2
kind: concept
related:
  - pwa
  - cache
  - https
  - thread
  - http
see_also:
  - https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

브라우저가 페이지와 따로 돌리는 **백그라운드 스크립트**로, 네트워크 요청을 가로채 캐시로 답할 수 있다.

## 비유

가게 앞에 세워 둔 **대리 점원**. 손님(페이지)이 뭘 달라고 하면 창고(캐시)에 있으면 바로 주고 없으면 본점(서버)에 다녀오니, 본점이 문을 닫아도(오프라인) 창고 물건은 받을 수 있다.

## 예시

```js
// sw.js — 요청을 가로채서 캐시에 있으면 캐시로, 없으면 네트워크로
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((hit) => hit ?? fetch(event.request))
  )
})
```

Vite 프로젝트에서는 vite-plugin-pwa 가 이런 파일을 빌드 때 자동으로 만들어 준다(내부는 Workbox). 직접 쓸 일은 드물고, 대신 "분명 고쳤는데 옛날 화면이 보인다" 를 겪게 된다. 서비스 워커가 이전 버전을 캐시에서 주고 있어서 그런 것이고, 개발자 도구 Application 탭에서 Unregister 하거나 새로고침을 두 번 하면 풀린다.

## 헷갈리기 쉬운 것

- **웹 워커(Web Worker)** 는 무거운 계산을 별도 스레드에서 돌리는 것. 서비스 워커는 네트워크 앞에 서는 프록시 역할이고, 페이지를 닫아도 브라우저가 살려 둘 수 있다.
- **브라우저 캐시(HTTP 캐시)** 는 서버가 헤더로 시키는 대로 브라우저가 알아서 하는 것. 서비스 워커 캐시는 내 코드로 무엇을 언제 저장할지 직접 정한다.
