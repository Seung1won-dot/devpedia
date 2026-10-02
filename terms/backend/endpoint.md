---
id: endpoint
term: 엔드포인트
aliases:
  - Endpoint
  - API 엔드포인트
  - 앤드포인트
  - 라우트
category: backend
tags:
  - API설계
  - REST
  - HTTP
level: 1
kind: concept
related:
  - api
  - rest
  - http
  - port
  - serverless
  - query-path-param
  - api-versioning
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

API 에서 **요청을 받는 주소(URL) 하나**로, 보통 메서드와 경로의 쌍.

## 비유

큰 건물의 **출입문 하나**. 건물(API)에는 문(엔드포인트)이 여러 개고, 문마다 "택배는 이쪽, 방문객은 저쪽" 처럼 하는 일이 다르다.

## 예시

FastAPI 에서 엔드포인트 하나 만들기 — `GET /health` 가 엔드포인트다:

```python
@app.get("/health")
def health():
    return {"ok": True}
```

Supabase Edge Function 은 배포하면 함수 하나가 엔드포인트 하나가 된다:

```bash
supabase functions deploy notify-slack
# → https://<project-ref>.supabase.co/functions/v1/notify-slack
```

같은 경로라도 `GET /items` 와 `POST /items` 는 다른 엔드포인트다.

## 헷갈리기 쉬운 것

- **API** 는 엔드포인트들의 묶음(전체 약속), 엔드포인트는 그중 문 하나.
- **포트**는 서버 컴퓨터의 문 번호(8000 같은 숫자). 엔드포인트는 그 포트 안에서 경로(`/health`)까지 정해진 주소.
