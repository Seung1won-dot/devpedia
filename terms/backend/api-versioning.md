---
id: api-versioning
term: API 버저닝
aliases:
  - API Versioning
  - API 버전 관리
  - /v1
  - 버전드 API
category: backend
tags:
  - API설계
  - REST
  - 배포
level: 2
kind: pattern
related:
  - rest
  - semver
  - openapi
  - endpoint
  - changelog
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

API 를 **고치더라도 옛 클라이언트가 깨지지 않게** 버전을 나눠 함께 제공하는 방식.

## 비유

충전 단자 교체. 새 USB-C 를 내놓아도 한동안 구형 단자 케이블을 같이 팔아서, 옛 기기를 쓰는 사람이 어느 날 갑자기 충전을 못 하게 되지는 않게 한다.

## 예시

환자 이름을 문자열 하나에서 성·이름 구조로 바꾸는 "깨지는 변경"을 v2 로 분리:

```python
from fastapi import FastAPI, APIRouter

v1 = APIRouter(prefix="/v1")
v2 = APIRouter(prefix="/v2")

@v1.get("/patients/{pid}")
def get_patient_v1(pid: int):
    return {"id": pid, "name": "홍길동"}                       # 옛 형식 그대로 유지

@v2.get("/patients/{pid}")
def get_patient_v2(pid: int):
    return {"id": pid, "name": {"family": "홍", "given": "길동"}}

app = FastAPI()
app.include_router(v1)
app.include_router(v2)
```

URL 경로에 `/v1` 을 넣는 방식이 가장 흔하고 눈에 보여서 디버깅이 쉽다. 헤더(`Accept: application/vnd.lab.v2+json`)나 쿼리(`?version=2`)에 넣는 방식도 있다. 핵심은 **깨지는 변경에만 번호를 올리는 것** — 응답 필드 추가는 그냥 해도 되지만(클라이언트는 모르는 필드를 무시하게 짠다), 필드 삭제·이름 변경·타입 변경은 깨지는 변경이다. 옛 버전은 영원히 둘 수 없으니 `Sunset` 헤더나 공지로 폐기 날짜를 알리고 사용량이 0 에 가까워지면 내린다. 버전 두 개를 동시에 유지하는 비용이 꽤 커서, 처음부터 호환되게 바꿀 길이 있으면 그쪽이 낫다.

## 헷갈리기 쉬운 것

- **시맨틱 버저닝**은 라이브러리 버전 번호 규칙(`1.4.2`). API 버저닝은 보통 메이저 번호만(`v1`, `v2`) 밖으로 드러내고, 호환되는 변경에는 번호를 올리지 않는다.
- **배포 버전·Git 태그**는 서버 코드의 릴리스 번호다. API 버전은 "클라이언트와의 계약" 번호라서, 코드를 백 번 배포해도 계약이 안 바뀌면 v1 그대로다.
- **피처 플래그**는 같은 API 버전 안에서 기능을 켜고 끄는 운영 장치. 계약 자체를 바꾸는 건 아니다.
