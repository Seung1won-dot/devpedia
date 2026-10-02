---
id: validation
term: 유효성 검사
aliases:
  - Validation
  - 밸리데이션
  - 스키마 검증
  - 요청 검증
  - 입력 유효성 검사
category: backend
tags:
  - API설계
  - Python
  - 타입
  - 흔한실수
level: 1
kind: concept
related:
  - input-validation
  - data-validation
  - type-hint
  - json
  - http-status-code
  - query-path-param
see_also:
  - https://docs.pydantic.dev/latest/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

들어온 요청의 **필드·타입·범위가 약속(스키마)대로인지** 처리 전에 확인하는 것.

## 비유

원서 접수 창구. 빈칸은 없는지, 생년월일 칸에 글자가 들어가진 않았는지 먼저 훑어서 틀리면 그 자리에서 돌려보내니, 안쪽 심사실에는 제대로 된 서류만 들어간다.

## 예시

```python
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()

class VitalIn(BaseModel):
    patient_id: int
    heart_rate: int = Field(ge=20, le=300)
    spo2: float = Field(ge=0, le=100)
    note: str | None = Field(default=None, max_length=200)

@app.post("/vitals")
def create_vital(v: VitalIn):
    return v
```

`{"patient_id": "abc", "heart_rate": 999}` 를 보내면 함수 몸체는 실행조차 안 되고 **422** 와 함께 "patient_id 는 정수여야 함, heart_rate 는 300 이하" 라는 필드별 에러가 돌아온다. pydantic 이 타입 힌트를 읽어 변환·범위 검사·에러 메시지 생성을 다 해 주고, 같은 모델이 OpenAPI 문서에도 그대로 실린다. 프론트(TypeScript)에서는 zod 가 같은 역할을 한다. 원칙은 **경계에서 한 번, 빨리 거절** — 깊숙한 서비스 코드에서 `if not isinstance(...)` 를 흩뿌리지 않는다.

## 헷갈리기 쉬운 것

- **입력 검증(보안)** 은 "악의적인가"를 본다 — 허용 목록, 이스케이프, 인젝션 방어. 유효성 검사는 "형식이 맞는가"를 본다. `note` 가 200자 이하라는 걸 통과해도 그 안에 `<script>` 가 들어 있을 수 있으니, 둘은 따로 필요하다.
- **데이터 검증(data-validation)** 은 요청 하나가 아니라 CSV 수만 행 같은 **데이터셋 전체**의 결측·분포·유니크를 pandera 등으로 검사하는 것. 대상의 단위가 다르다.
- **타입 힌트**는 그 자체로는 실행 시 아무것도 막지 않는다. pydantic 처럼 힌트를 읽어 실제로 검사하는 라이브러리가 붙어야 유효성 검사가 된다.
