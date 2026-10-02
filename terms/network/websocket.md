---
id: websocket
term: WebSocket
aliases:
  - 웹소켓
  - WS
  - 양방향 통신
category: network
tags:
  - HTTP
  - 프로토콜
  - 비동기
level: 2
kind: protocol
related:
  - http
  - tcp-udp
  - event-loop
  - reverse-proxy
  - baas
  - streaming-response
see_also:
  - https://developer.mozilla.org/ko/docs/Web/API/WebSockets_API
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

한 번 연결하면 **서버와 브라우저가 서로 아무 때나** 메시지를 주고받는 통신 방식.

## 비유

HTTP 가 매번 걸었다 끊는 **전화**라면, WebSocket 은 계속 켜 두는 **무전기**. 상대가 먼저 말을 걸 수도 있고, 말할 때마다 번호를 누를 필요가 없다.

## 예시

```ts
// Ender Chest: 다른 기기에서 바뀐 노트를 즉시 받기 (Supabase Realtime, 내부는 WebSocket)
supabase
  .channel('notes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'notes' }, (payload) => {
    console.log('변경됨', payload.new)
  })
  .subscribe()
```

Caddy 는 `reverse_proxy` 한 줄로 WebSocket 을 그대로 통과시키지만, Nginx 는 `Upgrade`/`Connection` 헤더를 직접 넘겨 줘야 한다. 로컬 LLM 채팅 UI 가 글자를 한 자씩 흘려 주는 것도 WebSocket 이거나 비슷한 방식(SSE).

## 헷갈리기 쉬운 것

- **HTTP 폴링**은 "새 거 있어?" 를 브라우저가 몇 초마다 물어보는 것. WebSocket 은 서버에 생기면 바로 밀어 준다.
- **SSE(Server-Sent Events)** 는 서버→브라우저 한 방향만 흘려 주는 더 단순한 방식. 채팅 답변 스트리밍처럼 받기만 하면 SSE 로 충분하다.
