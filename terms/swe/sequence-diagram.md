---
id: sequence-diagram
term: UML/시퀀스 다이어그램
aliases:
  - Sequence Diagram
  - UML
  - 시퀀스 다이어그램
  - 순차 다이어그램
category: swe
tags:
  - 문서화
  - 아키텍처
level: 2
kind: pattern
related:
  - api
  - rest
  - user-story
  - erd
  - reverse-proxy
  - c4-model
  - user-flow
see_also:
  - https://mermaid.js.org/syntax/sequenceDiagram.html
status: review
created: 2026-09-25
updated: 2026-10-03
---

## 한 줄 정의

요청이 **누구에게서 누구로 어떤 순서**로 오가는지 세로 시간축 위에 그린 그림.

## 비유

연극 **대본의 대사 순서표**. 등장인물(브라우저·서버·DB)을 위에 세워두고 누가 누구에게 먼저 말을 거는지 위에서 아래로 화살표를 따라 읽는다.

## 예시

Mermaid 문법으로 쓰면 GitHub README 나 Notion 에서 그림으로 렌더링된다.

```text
sequenceDiagram
    브라우저->>Caddy: GET /api/terms?q=ssh
    Caddy->>API 서버: (리버스 프록시) 그대로 전달
    API 서버->>DB: SELECT ... WHERE term LIKE '%ssh%'
    DB-->>API 서버: 3건
    API 서버-->>브라우저: 200 JSON
```

실선 화살표가 요청, 점선이 응답이다. 세미나에서 "이 API 가 왜 느린가"를 설명할 때 이 그림 하나면 DB 왕복이 몇 번인지 한눈에 보인다. UML 에는 클래스·상태·활동 다이어그램 등 열 종류 넘게 있지만, 실무에서 자주 그리는 건 시퀀스와 클래스 둘이다.

## 헷갈리기 쉬운 것

- **플로우차트(순서도)**는 한 주체 안의 "판단·반복" 흐름. 시퀀스는 여러 주체 사이의 "메시지 주고받기". 로그인 실패 시 재시도 로직은 순서도, 브라우저–서버–DB 왕복은 시퀀스.
- **ERD**는 데이터가 어떻게 생겼는지(정적 구조), 시퀀스는 시간에 따라 무엇이 일어나는지(동적 흐름).
