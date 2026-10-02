---
id: log-level
term: 로그 레벨
aliases:
  - Log Level
  - 로그 수준
  - 로깅 레벨
  - DEBUG/INFO/WARN/ERROR
category: devops
tags:
  - 로깅
  - 운영
  - 흔한실수
level: 1
kind: concept
related:
  - logging
  - log-rotation
  - exception
  - elk-stack
  - monitoring
  - alerting
see_also:
  - https://docs.python.org/3/library/logging.html#logging-levels
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

로그 한 줄마다 **얼마나 중요한지** 등급을 매겨, 어디까지 보여 줄지 거르는 기준.

## 비유

병원 병동의 **알림음 등급**. 일반 호출 벨(INFO)은 담당 간호사만 보고 코드 블루(ERROR)는 온 병동이 뛰어가듯, 레벨을 올릴수록 자잘한 소리는 꺼지고 큰 것만 남는다.

## 예시

```python
import logging, os

logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),          # 평소 INFO, 디버깅할 때만 DEBUG
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
log = logging.getLogger("etl")

log.debug("row=%s", row)                 # 개발 중에만 보고 싶은 세부 값
log.info("EMR CSV 1,240행 적재 완료")
log.warning("MRN 결측 3건 건너뜀")        # 진행은 됐지만 살펴볼 것
log.error("DB 연결 실패: %s", err)       # 이 작업은 실패함
```

위 설정에서 `log.debug(...)` 는 아예 출력되지 않는다. 서버에서 문제가 생기면 코드를 고치지 않고 `LOG_LEVEL=DEBUG` 로 재시작해 세부 로그를 켠다. 순서는 DEBUG < INFO < WARNING < ERROR < CRITICAL 이고, Python 의 기본 레벨은 WARNING 이라 `basicConfig` 없이 `log.info` 를 찍으면 아무것도 안 나온다. 학습 스크립트에서 배치마다 `print` 를 남기면 로그 파일이 수 GB 가 되는데, 그런 줄은 DEBUG 로 내려 두면 평소엔 조용하다.

## 헷갈리기 쉬운 것

- **print** 는 끄는 방법이 코드에서 지우는 것뿐이다. 로그 레벨은 코드를 그대로 두고 설정으로 켜고 끈다.
- **WARNING 과 ERROR**: WARNING 은 "이상하지만 계속 진행했다"(기본값으로 대체 등), ERROR 는 "그 작업이 실패했다". 실패를 WARNING 으로 찍어 두면 아무도 안 본다.
- **로그 로테이션**은 남긴 로그를 얼마나 보관할지의 문제, 로그 레벨은 애초에 무엇을 남길지의 문제.
