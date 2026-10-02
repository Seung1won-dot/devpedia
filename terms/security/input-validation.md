---
id: input-validation
term: 입력 검증
aliases:
  - Input Validation
  - 입력 검증
  - 입력값 검증
  - 허용 목록 검증
  - Allowlist
category: security
tags:
  - 웹취약점
  - 보안
  - 흔한실수
level: 1
kind: concept
related:
  - sql-injection
  - xss
  - validation
  - data-validation
  - owasp-top-10
  - regex
see_also:
  - https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

밖에서 들어온 값은 **믿지 않고 허용 목록으로 걸러** 받아들이는 보안 원칙.

## 비유

공항 **입국 심사**. "수상해 보이는 사람을 골라내자"(차단 목록)가 아니라 "여권과 비자가 맞는 사람만 통과"(허용 목록)시키는 쪽이 뚫리지 않는다.

## 예시

```python
import re
from fastapi import HTTPException

SAFE_NAME = re.compile(r"^[A-Za-z0-9_-]{1,64}\.csv$")   # 허용 목록: 이 모양만 통과

def open_export(filename: str):
    # "../" 나 ";" 를 찾아 지우려 하지 않는다 — 허용된 모양이 아니면 그냥 거절
    if not SAFE_NAME.fullmatch(filename):
        raise HTTPException(status_code=400, detail="invalid filename")
    return open(f"/data/exports/{filename}", "rb")
```

`../` 를 지우는 식의 차단 목록은 `....//` 처럼 한 겹 더 꼬면 뚫린다. 허용 목록은 "받아 줄 모양" 을 정의하므로 공격자가 새 수법을 들고 와도 그 모양이 아니면 끝이다. 검증 대상은 폼 입력만이 아니라 URL 파라미터, 헤더, 쿠키, 업로드 파일 이름, 외부 API 응답, LLM 이 만든 출력까지 — **내 코드가 만들지 않은 모든 값**이다.

단, 입력 검증은 첫 번째 문이지 마지막 문이 아니다. 환자 이름 `O'Brien` 은 정당한 입력이라 통과해야 하고, 그 작은따옴표가 SQL 을 깨지 않게 하는 건 파라미터 바인딩(값을 쓰는 쪽의 처리)의 몫이다. 둘을 같이 쓴다.

## 헷갈리기 쉬운 것

- **유효성 검사(backend `validation`)** 는 pydantic·zod 로 "요청 바디가 스키마에 맞나(타입·필수값·범위)" 를 보는 것으로, 관심사는 데이터가 올바른가다. 입력 검증은 같은 도구를 쓰더라도 "이 값이 공격 문자열이면 어디서 터지나" 를 묻는 보안 관점 — 스키마가 맞아도 `name: "<script>…"` 는 통과할 수 있다.
- **데이터 검증(data `data-validation`)** 은 요청 한 건이 아니라 데이터셋 전체의 품질(dtype·결측·범위·유니크)을 pandera 같은 것으로 점검하는 일. 공격 방어가 아니라 분석 결과를 지키는 게 목적이다.
- **이스케이프/인코딩**은 값을 쓰는 지점(SQL·HTML·셸)에서 특수문자를 무해하게 바꾸는 것. 입력 검증이 "들어올 때 거르기" 라면 이스케이프는 "내보낼 때 포장하기" 라, 검증을 통과한 정당한 값에도 필요하다.
