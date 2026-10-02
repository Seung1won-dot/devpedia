---
id: openapi
term: OpenAPI/Swagger
aliases:
  - OpenAPI Specification
  - Swagger
  - 오픈API
  - 스웨거
  - API 명세서
category: backend
tags:
  - API설계
  - 문서화
  - REST
  - 표준
level: 2
kind: protocol
related:
  - rest
  - api
  - endpoint
  - validation
  - curl-postman
  - readme
see_also:
  - https://spec.openapis.org/oas/latest.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

REST API 의 **엔드포인트·입출력 형식을 기계가 읽을 수 있게** 적는 표준 명세.

## 비유

식당 메뉴판. 어떤 메뉴(엔드포인트)가 있고 고를 수 있는 옵션(파라미터)과 나오는 음식(응답)이 뭔지 적혀 있어서, 주방에 들어가 보지 않아도 주문할 수 있다.

## 예시

FastAPI 는 라우터와 pydantic 모델만 쓰면 명세를 자동으로 만든다.

```bash
uvicorn main:app --reload
# http://localhost:8000/docs         ← Swagger UI (브라우저에서 바로 호출해 볼 수 있음)
# http://localhost:8000/openapi.json ← 명세 원본
```

`openapi.json` 의 일부:

```json
{
  "openapi": "3.1.0",
  "paths": {
    "/vitals": {
      "post": {
        "requestBody": {
          "content": { "application/json": { "schema": { "$ref": "#/components/schemas/VitalIn" } } }
        },
        "responses": { "200": { "description": "Successful Response" }, "422": { "description": "Validation Error" } }
      }
    }
  }
}
```

이 파일 하나로 Postman 에 컬렉션을 통째로 가져오고, 프론트에서는 `openapi-typescript` 로 요청·응답 타입을 자동 생성해 백엔드와 타입이 어긋나는 일을 막는다. 연구실에서 FastAPI 서버를 넘겨받으면 README 보다 `/docs` 부터 열어 보는 게 빠르다. 반대로 명세를 먼저 쓰고 서버 코드를 생성하는 방식(design-first)도 있다.

## 헷갈리기 쉬운 것

- **Swagger 와 OpenAPI**: 명세의 공식 이름은 OpenAPI(3.x)이고, Swagger 는 2.0 시절의 옛 이름이자 지금은 그 명세를 보여 주고 편집하는 도구 브랜드(Swagger UI, Swagger Editor)다. 실무에선 섞어 부른다.
- **README/문서화**는 사람이 읽는 설명이고, OpenAPI 는 기계가 읽어 UI·클라이언트 코드·테스트를 만들어 내는 데이터다. 둘 다 필요하다.
- **GraphQL 스키마**와 **gRPC 의 .proto** 는 각자 자기 명세 언어가 따로 있어서 OpenAPI 를 쓰지 않는다. OpenAPI 는 HTTP/REST 전용.
