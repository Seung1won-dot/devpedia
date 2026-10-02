---
id: streaming-response
term: 스트리밍 응답
aliases:
  - Streaming Response
  - 스트리밍
  - 청크 전송
  - chunked transfer
  - StreamingResponse
category: backend
tags:
  - HTTP
  - LLM
  - 서빙
  - API설계
level: 2
kind: pattern
related:
  - sse
  - websocket
  - local-llm
  - http-versions
  - polling
  - generator-iterator
see_also:
  - https://fastapi.tiangolo.com/advanced/custom-response/#streamingresponse
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

응답을 **다 만들고 나서가 아니라 생기는 대로 조각조각 흘려보내는** 방식.

## 비유

코스 요리. 모든 접시가 완성될 때까지 기다렸다 한 상에 내오는 대신, 다 된 접시부터 바로바로 내와서 손님이 먼저 먹기 시작한다.

## 예시

로컬 Qwen 의 답을 토큰 단위로 그대로 브라우저에 흘려보내는 FastAPI 엔드포인트:

```python
import json, httpx
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()

async def token_stream(prompt: str):
    async with httpx.AsyncClient(timeout=None) as client:
        async with client.stream("POST", "http://gpu-server:11434/api/generate",
                                 json={"model": "qwen2.5", "prompt": prompt}) as r:
            async for line in r.aiter_lines():
                if line:
                    yield json.loads(line)["response"]   # yield 할 때마다 클라이언트로 나간다

@app.post("/chat")
async def chat(prompt: str):
    return StreamingResponse(token_stream(prompt), media_type="text/plain")
```

```bash
curl -N -X POST "http://localhost:8000/chat?prompt=안녕"
```

전체 답에 20초가 걸려도 첫 토큰이 0.5초 만에 보이면 체감은 전혀 다르다. 응답 헤더에 `Content-Length` 가 없고 HTTP/1.1 의 chunked 전송으로 나가며, 프론트에서는 `fetch` 뒤 `response.body.getReader()` 로 조각을 읽는다. 상태 코드와 헤더는 첫 조각과 함께 이미 나갔기 때문에 중간에 에러가 나도 `500` 으로 바꿀 수 없다 — 에러를 본문 안에 실어 보내야 한다. 리버스 프록시가 버퍼링을 켜 두면 끝날 때까지 아무것도 안 보이니 Nginx 는 `proxy_buffering off`, Caddy 는 `flush_interval -1` 을 준다.

## 헷갈리기 쉬운 것

- **SSE** 는 스트리밍 응답을 `text/event-stream` 형식(`data: …` 줄)으로 규격화한 프로토콜이고, 브라우저 `EventSource` 가 자동 재연결까지 해 준다. 스트리밍 응답은 "응답을 끊어 보낸다"는 서버 쪽 구현 패턴 전체를 가리킨다.
- **WebSocket** 은 양방향 전용 연결이다. 서버가 한 방향으로 흘려보내기만 하면 되는 LLM 토큰에는 과하고, 프록시·인증 설정도 더 번거롭다.
- **폴링**은 클라이언트가 "다 됐어?" 를 반복해서 묻는 것. 스트리밍은 연결 하나를 열어 둔 채 서버가 밀어 준다.
