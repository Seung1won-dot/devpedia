---
id: http
term: HTTP
aliases:
  - HyperText Transfer Protocol
  - 하이퍼텍스트 전송 프로토콜
  - 에이치티티피
category: network
tags:
  - HTTP
  - 프로토콜
level: 1
kind: protocol
related:
  - https
  - http-status-code
  - rest
  - tcp-udp
  - api
  - http-methods
see_also:
  - https://developer.mozilla.org/ko/docs/Web/HTTP
status: review
created: 2026-09-25
updated: 2026-09-29
---

## 한 줄 정의

브라우저와 서버가 **요청을 보내고 응답을 받는** 웹의 기본 대화 규칙.

## 비유

식당의 **주문서와 음식**. 손님이 "메뉴 3번 주세요"(요청)라고 정해진 양식으로 적어 내면, 주방이 음식이나 "품절입니다"(응답)를 돌려준다.

## 예시

```http
GET /api/notes?limit=10 HTTP/1.1
Host: api.lab.example.com
Authorization: Bearer eyJ...
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

[{"id": 1, "title": "GPU 서버 백업 정책"}]
```

Ender Chest 가 Supabase 에서 노트를 읽어 오는 것도, `curl` 로 Ollama 에 질문을 던지는 것도 전부 이 형식의 요청/응답이다. 메서드(GET·POST·PUT·DELETE)와 상태 코드가 핵심.

## 헷갈리기 쉬운 것

- **HTTPS** 는 같은 HTTP 를 TLS 로 감싸 암호화한 것. 대화 내용은 같고 봉투만 잠긴다.
- **REST** 는 HTTP 를 "어떻게 깔끔하게 쓸지"에 대한 설계 관례. HTTP 는 규칙, REST 는 스타일.
