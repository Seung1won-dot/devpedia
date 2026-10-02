---
id: http-methods
term: HTTP 메서드
aliases:
  - HTTP Methods
  - HTTP 동사
  - GET/POST/PUT/PATCH/DELETE
  - 요청 메서드
category: network
tags:
  - HTTP
  - REST
  - API설계
level: 1
kind: protocol
related:
  - http
  - rest
  - idempotency
  - http-status-code
  - endpoint
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

HTTP 요청 맨 앞에 붙여 **자원에 무엇을 하려는지** 알리는 동사(GET·POST 등).

## 비유

도서관 창구에서 하는 말의 종류. "이 책 보여 주세요"(GET), "새 책 기증합니다"(POST), "이 책 폐기해 주세요"(DELETE) 처럼 같은 창구(URL)라도 동사에 따라 하는 일이 다르다.

## 예시

```bash
B=https://<ref>.supabase.co/rest/v1; H="apikey: $ANON"
curl "$B/notes?id=eq.7" -H "$H"                                          # GET    조회
curl "$B/notes" -H "$H" -d '{"title":"GPU 백업"}'                         # POST   새로 만들기
curl -X PATCH "$B/notes?id=eq.7" -H "$H" -d '{"title":"수정"}'            # PATCH  일부만 수정
curl -X PUT   "$B/notes?id=eq.7" -H "$H" -d '{"id":7,"title":"수정","body":""}'   # PUT 통째로 교체
curl -X DELETE "$B/notes?id=eq.7" -H "$H"                                 # DELETE 삭제
```

| 메서드 | 하는 일 | 안전(상태 안 바꿈) | 멱등(여러 번 = 한 번) | 본문 |
|---|---|---|---|---|
| GET | 조회 | O | O | 없음 |
| POST | 생성·처리 | X | X | 있음 |
| PUT | 통째로 교체 | X | O | 자원 전체 |
| PATCH | 일부 수정 | X | 보통 X | 바뀐 부분 |
| DELETE | 삭제 | X | O | 보통 없음 |

Supabase 의 PostgREST 가 위 규칙 그대로다. 브라우저 주소창과 `<a>` 링크는 항상 GET 이라, GET 으로 삭제를 만들면 크롤러가 링크를 따라가며 데이터를 지우는 사고가 난다. 그 밖에 HEAD(본문 없이 헤더만), OPTIONS(CORS 사전 요청)도 자주 본다.

면접 단골 "PUT 과 PATCH 의 차이는?": PUT 은 자원 **전체**를 보낸 내용으로 갈아 끼우고(빠진 필드는 비워짐), PATCH 는 보낸 필드만 고친다. 그래서 PUT 은 멱등이지만, PATCH 는 `count += 1` 같은 상대적 수정이면 멱등이 아니다.

## 헷갈리기 쉬운 것

- **PUT vs POST**: PUT 은 "이 URL 에 이 내용을 두어라" 라서 대상 URL 을 클라이언트가 안다(`PUT /notes/7`). POST 는 "여기에 새로 만들어라" 라서 서버가 id 를 정해 준다(`POST /notes` → 201 + 새 id).
- **GET 에 본문**: 규격상 금지는 아니지만 대부분의 서버·프록시가 무시한다. 검색 조건은 쿼리 스트링(`?q=`)으로 보낸다.
- **REST** 는 이 메서드들을 자원 URL 과 짝지어 쓰는 설계 관례이고, 메서드 자체는 HTTP 규격이다.
