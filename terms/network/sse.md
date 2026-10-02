---
id: sse
term: SSE
aliases:
  - Server-Sent Events
  - 서버 전송 이벤트
  - 서버 센트 이벤트
  - EventSource
  - text/event-stream
category: network
tags:
  - HTTP
  - 프로토콜
  - 비동기
  - LLM
level: 2
kind: protocol
related:
  - streaming-response
  - websocket
  - polling
  - http
  - local-llm
  - reverse-proxy
see_also:
  - https://developer.mozilla.org/ko/docs/Web/API/Server-sent_events
  - https://html.spec.whatwg.org/multipage/server-sent-events.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

HTTP 연결 하나를 열어 두고 **서버가 브라우저로 한 방향으로 계속 밀어 주는** 방식.

## 비유

**라디오 방송**. 주파수를 한 번 맞춰 두면 방송국이 계속 보내 주고 청취자는 듣기만 하는데, ChatGPT 가 답을 한 글자씩 타이핑하듯 보여 주는 것이 바로 이 방식이다.

## 예시

```bash
curl -N http://gpu-server:11434/v1/chat/completions -H "Content-Type: application/json" \
  -d '{"model":"qwen2.5:7b","stream":true,"messages":[{"role":"user","content":"안녕"}]}'
# data: {"choices":[{"delta":{"content":"안녕"}}], ...}
# data: {"choices":[{"delta":{"content":"하세요"}}], ...}
# data: [DONE]
```

```js
const es = new EventSource("/api/jobs/42/progress");   // 브라우저: 학습 진행률 받기
es.onmessage = (e) => console.log(JSON.parse(e.data));
```

응답 헤더가 `Content-Type: text/event-stream` 이고, 본문은 `data: ...` 한 줄 + 빈 줄이 이벤트 하나다. Ollama·vLLM 의 OpenAI 호환 API 가 토큰을 흘려 주는 형식이 이것이라 로컬 LLM 채팅 UI 는 거의 다 SSE 를 읽는다. 브라우저 `EventSource` 는 끊기면 알아서 재접속(`Last-Event-ID`)까지 해 준다. 리버스 프록시 뒤에서 "스트리밍인데 답이 끝나고 한꺼번에 나오는" 버그는 Nginx 가 응답을 버퍼링해서 생긴다(`proxy_buffering off`). Caddy 는 `text/event-stream` 을 보면 알아서 바로 흘려 준다.

## 헷갈리기 쉬운 것

- **WebSocket** 은 양방향, SSE 는 서버→클라이언트 한 방향. 대신 SSE 는 그냥 HTTP 라 프록시·방화벽·HTTP/2 와 잘 지내고 구현이 단순하다. 받기만 하면 SSE, 양쪽이 수시로 보내는 채팅이면 WebSocket.
- **스트리밍 응답**은 서버가 응답을 조금씩 내보내는 구현 패턴이고, SSE 는 그렇게 흘려보내는 내용의 **형식(프로토콜)**. Ollama 기본 `/api/chat` 은 SSE 가 아니라 줄마다 JSON 하나(NDJSON)인데 겉보기는 비슷하다.
- **폴링**은 클라이언트가 계속 묻는 것, SSE 는 한 번 열고 서버가 미는 것.
