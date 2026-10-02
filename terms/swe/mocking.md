---
id: mocking
term: 모킹/스텁
aliases:
  - Mock
  - Stub
  - Mocking
  - 목 객체
  - 모의 객체
  - 테스트 더블
  - Fake
category: swe
tags:
  - 테스트
  - 품질
  - Python
level: 2
kind: concept
related:
  - testing-levels
  - tdd
  - dependency-injection
  - coupling-cohesion
  - code-coverage
  - api
see_also:
  - https://docs.python.org/3/library/unittest.mock.html
  - https://docs.pytest.org/en/stable/how-to/monkeypatch.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

테스트에서 DB·API 같은 **진짜 의존 대상을 가짜로 바꿔 끼우는** 기법.

## 비유

자동차 충돌 시험의 **더미 인형**. 진짜 사람을 태울 수 없으니 모양만 같은 인형을 앉히고, 인형에 센서를 달아 "어디에 얼마나 힘이 갔는지" 만 잰다.

## 예시

```python
# fhir_client.py
import httpx

def fetch_patient(pid: str) -> dict:
    return httpx.get(f"https://fhir.hospital.local/Patient/{pid}").json()

def patient_age(pid: str) -> int:
    born = fetch_patient(pid)["birthDate"]   # 진짜 FHIR 서버는 폐쇄망 안 — CI 에서 못 부른다
    return 2026 - int(born[:4])
```

```python
# test_fhir_client.py
from unittest.mock import patch
import fhir_client

def test_patient_age(monkeypatch):
    # 스텁: 정해진 값만 돌려준다 — 결과(상태)를 검증
    monkeypatch.setattr(fhir_client, "fetch_patient", lambda pid: {"birthDate": "1980-05-01"})
    assert fhir_client.patient_age("P001") == 46

def test_fetch_calls_right_url():
    # 목: 어떻게 불렸는지 기록한다 — 호출(상호작용)을 검증
    with patch("fhir_client.httpx.get") as get:
        get.return_value.json.return_value = {"id": "P001"}
        fhir_client.fetch_patient("P001")
        get.assert_called_once_with("https://fhir.hospital.local/Patient/P001")
```

가짜 식구들을 묶어 **테스트 더블**이라 부른다 — 스텁(정해진 답만), 목(호출 여부와 인자 검증), 페이크(진짜처럼 동작하는 가벼운 대체물, 예: 인메모리 SQLite), 스파이(진짜를 부르되 기록). 쓰는 자리는 느리거나(네트워크), 불안정하거나(외부 서비스), 비싸거나(결제·GPU), 아예 못 닿는(폐쇄망 EMR) 것이다. 트레이드오프도 분명하다: 많이 모킹할수록 테스트는 빨라지지만 "가짜와 진짜가 다르게 동작" 하는 버그를 못 잡으니 통합 테스트 한 겹은 남겨야 하고, 내부 함수까지 모킹하면 리팩토링할 때마다 테스트가 깨지므로 I/O 경계에서만 바꿔 끼운다. 모킹하기 쉬운 코드는 결합도가 낮다는 신호이기도 하다.

## 헷갈리기 쉬운 것

- **스텁 vs 목**: 스텁은 "값을 준다", 목은 "불렸는지 확인한다". 둘 다 가짜지만 테스트가 보는 게 **결과(상태)**인지 **호출(상호작용)**인지가 다르다.
- **페이크**는 진짜처럼 동작하는 간단한 구현(인메모리 DB). 스텁보다 똑똑하고 진짜보다 가볍다.
- **단위 vs 통합 테스트**: 바깥 것을 모킹했으면 단위, 모킹을 걷어내고 진짜를 붙이면 통합이다.
