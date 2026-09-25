---
id: middleware
term: 미들웨어
aliases:
  - Middleware
  - 미들웨어 함수
  - 요청 파이프라인
  - 필터
category: backend
tags:
  - API설계
  - 아키텍처
  - 인증
level: 2
related:
  - api
  - endpoint
  - rate-limit
  - authentication-authorization
  - logging
see_also:
  - https://expressjs.com/en/guide/using-middleware.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

요청이 **실제 처리 함수에 닿기 전후에 끼어들어** 공통 작업을 하는 코드.

## 비유

공항의 **보안 검색대와 출국 심사**. 어느 게이트(엔드포인트)로 가든 모두가 같은 검색대를 순서대로 지나가고, 문제가 있으면 거기서 돌려보낸다.

## 예시

Express — 등록한 순서대로 요청이 통과한다:

```ts
app.use(express.json())                       // 1. body 를 JSON 으로 파싱
app.use((req, res, next) => {                 // 2. 로깅
  console.log(req.method, req.url); next()
})
app.use("/api", requireAuth)                  // 3. /api 아래만 토큰 검사
app.get("/api/items", listItems)              // 실제 핸들러
```

FastAPI 도 같은 개념:

```python
@app.middleware("http")
async def add_timing(request, call_next):
    start = time.perf_counter()
    response = await call_next(request)          # 다음 단계(또는 핸들러) 실행
    response.headers["X-Time-ms"] = str(round((time.perf_counter() - start) * 1000))
    return response
```

순서가 중요하다 — 인증 미들웨어를 로깅보다 앞에 두면 거절된 요청은 로그에 안 남는다.

## 헷갈리기 쉬운 것

- **리버스 프록시(Caddy)** 도 요청 앞단에 끼지만 앱 밖의 별도 프로세스. 미들웨어는 앱 코드 안에서 도는 함수.
- 넓은 뜻의 "미들웨어"(메시지 큐·DB 커넥터처럼 시스템 사이에 놓이는 소프트웨어)와는 다른 말. 웹 프레임워크 문맥이면 거의 항상 위의 뜻.
