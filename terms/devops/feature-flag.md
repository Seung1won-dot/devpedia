---
id: feature-flag
term: 피처 플래그
aliases:
  - Feature Flag
  - Feature Toggle
  - 피처 토글
  - 기능 플래그
category: devops
tags:
  - 배포
  - 운영
  - 아키텍처패턴
level: 2
kind: pattern
related:
  - blue-green-canary
  - environments
  - rollback
  - ci-cd
  - environment-variable
  - git-flow
see_also:
  - https://martinfowler.com/articles/feature-toggles.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

코드는 배포해 두고 **기능을 켜고 끄는 스위치**를 설정값으로 따로 두는 패턴.

## 비유

집에 새 조명을 미리 다 달아 놓고 **스위치만 내려 둔 것**. 손님 올 때 스위치를 올리면 되고 이상하면 다시 내리면 되지, 전기 공사를 다시 하진 않는다.

## 예시

```python
import os
from fastapi import FastAPI

app = FastAPI()
# 가장 단순한 플래그: 환경변수 하나. .env 에 FF_NEW_SUMMARY=on 넣고 재시작하면 켜진다
USE_NEW_SUMMARY = os.getenv("FF_NEW_SUMMARY", "off") == "on"

@app.post("/summarize")
def summarize(text: str):
    if USE_NEW_SUMMARY:
        return summarize_v2(text)   # 새 Qwen 프롬프트 버전
    return summarize_v1(text)
```

새 요약 모델을 main 에 머지는 하되 PI 에게 시연하는 날만 켜고, 결과가 이상하면 끄기만 하면 된다. 더 나가면 플래그 값을 DB 나 Unleash 같은 플래그 서비스에서 읽어 재시작 없이 바꾸거나, "사용자 10%에게만" 처럼 비율로 켠다. 대신 역할이 끝난 플래그는 바로 지워야 한다 — 쌓이면 `if` 가 얽혀서 어떤 조합이 실제로 돌아가는지 아무도 모르게 된다.

## 헷갈리기 쉬운 것

- **블루-그린/카나리**는 "어느 서버·버전으로 트래픽을 보낼지" 배포 단위로 바꾸는 것. 피처 플래그는 같은 배포 안에서 기능 단위로 켠다. 보통 둘을 같이 쓴다.
- **환경 분리(dev/stage/prod)** 의 설정값(DB 주소 등)은 환경마다 다르지만 한 환경 안에선 고정이다. 플래그는 같은 prod 안에서 운영 중에 바꾸는 것이 목적.
- **롤백**이 코드 전체를 되돌리는 것이라면 플래그 끄기는 "기능만 롤백"이다. 단, DB 마이그레이션처럼 데이터가 바뀐 건 플래그로 못 되돌린다.
