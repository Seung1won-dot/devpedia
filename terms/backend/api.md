---
id: api
term: API
aliases:
  - Application Programming Interface
  - 에이피아이
  - 응용 프로그램 인터페이스
category: backend
tags:
  - API설계
  - HTTP
level: 1
related:
  - rest
  - endpoint
  - json
  - http
  - graphql
see_also:
  - https://developer.mozilla.org/en-US/docs/Glossary/API
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

프로그램끼리 **정해진 규칙으로 기능을 요청하고 응답받는** 창구.

## 비유

식당의 **메뉴판과 주문 창구**. 주방(서버 내부)이 어떻게 요리하는지 몰라도 메뉴에 있는 대로 주문하면 음식이 나온다.

## 예시

Ender Chest 프론트가 Caddy 뒤의 FastAPI 백엔드에 "내 항목 목록 줘" 라고 요청하는 모습:

```http
GET /api/items?owner=me HTTP/1.1
Host: api.lab.example.com
Authorization: Bearer <token>
```

```json
[{ "id": 1, "name": "GPU 서버 백업 정책", "updated_at": "2026-09-25" }]
```

프론트는 DB 구조를 몰라도 이 약속(요청 형식·응답 형식)만 알면 된다. 웹만 뜻하는 말은 아니다 — 브라우저의 `fetch()` 나 파이썬의 `os.listdir()` 같은 라이브러리 함수도 API 다.

## 헷갈리기 쉬운 것

- **REST** 는 API 를 만드는 한 가지 스타일. 모든 API 가 REST 는 아니다(GraphQL, gRPC, 라이브러리 함수 호출도 API).
- **엔드포인트**는 API 의 문 하나하나(URL 한 개). API 는 그 문들의 묶음.
