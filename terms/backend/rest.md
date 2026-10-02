---
id: rest
term: REST
aliases:
  - Representational State Transfer
  - 레스트
  - REST API
  - RESTful API
category: backend
tags:
  - REST
  - HTTP
  - API설계
level: 1
kind: pattern
related:
  - api
  - endpoint
  - http
  - http-status-code
  - graphql
  - grpc
  - query-path-param
see_also:
  - https://developer.mozilla.org/en-US/docs/Glossary/REST
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

**URL 로 자원을, HTTP 메서드로 동작을** 나타내는 API 설계 방식.

## 비유

아파트 **동·호수와 택배 종류**. "101동 302호(자원)에 배달/수거/반품(동작)" 처럼 어디에 무엇을 하는지가 누가 봐도 같은 말로 통한다.

## 예시

```http
GET    /users/42        # 42번 사용자 조회
POST   /users           # 새 사용자 만들기
PATCH  /users/42        # 일부 수정
DELETE /users/42        # 삭제
```

결과는 HTTP 상태 코드로 알린다 — 성공 200, 새로 만듦 201, 없음 404, 권한 없음 403.

Supabase 의 PostgREST 가 이 방식 그대로다. 테이블을 만들면 자동으로 REST 엔드포인트가 생긴다:

```http
GET /rest/v1/items?select=id,title&owner_id=eq.42
apikey: <anon-key>
```

## 헷갈리기 쉬운 것

- **HTTP** 는 통신 규약, REST 는 그 위에서 API 를 "어떻게 설계할지"의 관례. HTTP 를 쓴다고 다 REST 는 아니다(모든 요청을 `POST /doAction` 으로 보내면 REST 가 아니다).
- **GraphQL** 은 엔드포인트 하나에 "원하는 필드"를 질의문으로 적어 보낸다. REST 는 URL 여러 개, GraphQL 은 URL 하나.
