---
id: query-path-param
term: 쿼리/경로 파라미터
aliases:
  - Query Parameter
  - Path Parameter
  - 쿼리 스트링
  - 경로 변수
  - URL 파라미터
category: backend
tags:
  - REST
  - API설계
  - HTTP
level: 1
kind: concept
related:
  - endpoint
  - rest
  - http-methods
  - pagination
  - validation
see_also:
  - https://fastapi.tiangolo.com/tutorial/query-params/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

URL 의 **경로에 박는 값**과 **물음표 뒤에 붙이는 값**으로 요청을 구체화하는 방법.

## 비유

도서관에서 "3층 의학 서가"(경로)로 간 다음 "2024년 이후 것만, 최신순으로"(쿼리) 라고 조건을 덧붙이는 것. 어디로 갈지는 경로가, 어떻게 골라 볼지는 쿼리가 정한다.

## 예시

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/patients/{patient_id}/visits")
def list_visits(patient_id: int, year: int | None = None, limit: int = 20):
    return {"patient_id": patient_id, "year": year, "limit": limit}
```

```bash
curl "http://localhost:8000/patients/42/visits?year=2025&limit=10"
# → {"patient_id":42,"year":2025,"limit":10}
```

`42` 는 경로 파라미터, `year`·`limit` 는 쿼리 파라미터다. FastAPI 는 데코레이터 경로의 `{이름}` 에 있는 인자는 경로로, 없는 인자는 쿼리로 자동 해석하고 `int` 변환까지 해 준다. 관례는 **"어느 자원인지" 식별은 경로, 필터·정렬·페이지 같은 선택 조건은 쿼리**. 둘 다 URL 에 그대로 찍히므로 서버 로그와 브라우저 기록에 남는다 — 환자 이름이나 토큰처럼 민감한 값은 여기 넣지 않는다.

## 헷갈리기 쉬운 것

- **요청 바디**는 POST/PUT 으로 보내는 JSON 덩어리. 길고 구조 있는 데이터는 바디, 짧은 식별자와 옵션은 파라미터. GET 요청에는 바디를 쓰지 않는 게 관례다.
- **헤더**는 `Authorization` 처럼 "요청 자체에 대한" 정보. 어떤 데이터를 달라는 조건은 파라미터, 누가·어떤 형식으로 부르는지는 헤더.
- **쿼리 파라미터**의 "쿼리"와 **SQL 쿼리**는 다른 말이다. 전자는 URL 의 `?key=value` 부분이고, 후자는 DB 에 보내는 문장.
