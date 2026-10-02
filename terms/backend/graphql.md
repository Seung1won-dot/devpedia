---
id: graphql
term: GraphQL
aliases:
  - 그래프큐엘
  - 그래프QL
  - GQL
category: backend
tags:
  - GraphQL
  - API설계
level: 2
kind: protocol
related:
  - rest
  - api
  - endpoint
  - json
  - n-plus-one
see_also:
  - https://graphql.org/learn/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

클라이언트가 **필요한 필드만 질의문으로 골라** 받는 API 질의 언어.

## 비유

정해진 세트 메뉴 대신 **원하는 반찬만 골라 담는 뷔페**. 한 번 줄 서서(요청 하나) 접시에 필요한 것만 담아 오니 남기는 음식(불필요한 데이터)이 없다.

## 예시

엔드포인트는 `POST /graphql` 하나뿐이고, 본문에 "무엇을 어떤 모양으로" 를 적는다:

```graphql
query {
  user(id: "42") {
    name
    posts(last: 3) { title }
  }
}
```

```json
{ "data": { "user": { "name": "승원", "posts": [{ "title": "백업 정책" }] } } }
```

요청에 적은 필드만 정확히 그 모양으로 돌아온다. Supabase 도 pg_graphql 확장으로 `/graphql/v1` 엔드포인트를 제공해서, 같은 테이블을 REST(`/rest/v1`)와 GraphQL 두 방식으로 읽을 수 있다.

## 헷갈리기 쉬운 것

- **REST** 는 URL 마다 정해진 모양의 응답을 준다. 화면 하나에 여러 자원이 필요하면 REST 는 요청 여러 번, GraphQL 은 한 번.
- **SQL** 과 이름이 비슷하지만 DB 언어가 아니다. GraphQL 서버가 뒤에서 SQL 을 실행할 뿐이고, 리졸버를 잘못 짜면 N+1 문제가 그대로 생긴다.
