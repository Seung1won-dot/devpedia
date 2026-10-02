---
id: retry-backoff
term: 재시도/백오프
aliases:
  - Retry
  - Exponential Backoff
  - 지수 백오프
  - 재시도 전략
  - 지터(jitter)
category: backend
tags:
  - 비동기
  - 운영
  - 분산시스템
  - 흔한실수
level: 2
kind: pattern
related:
  - idempotency
  - circuit-breaker
  - rate-limit
  - background-job
  - http-status-code
  - webhook
see_also:
  - https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

실패한 요청을 **점점 더 긴 간격을 두고 다시 보내** 일시적 장애를 넘기는 방식.

## 비유

통화 중인 친구에게 다시 거는 전화. 곧바로 또 걸지 않고 1분, 2분, 4분 뒤에 걸되, 같은 반 친구 서른 명이 똑같은 순간에 걸지 않도록 조금씩 어긋나게(지터) 건다.

## 예시

GPU 서버의 Ollama 가 모델을 로딩하는 몇 초 동안 연결이 끊기는 경우를 `tenacity` 로 넘긴다:

```python
import httpx
from tenacity import retry, stop_after_attempt, wait_exponential_jitter, retry_if_exception_type

@retry(
    stop=stop_after_attempt(5),
    wait=wait_exponential_jitter(initial=1, max=30),
    retry=retry_if_exception_type((httpx.TimeoutException, httpx.ConnectError)),
)
def call_ollama(prompt: str) -> str:
    r = httpx.post("http://gpu-server:11434/api/generate",
                   json={"model": "qwen2.5", "prompt": prompt, "stream": False}, timeout=30)
    r.raise_for_status()
    return r.json()["response"]
```

대기 시간은 약 1·2·4·8·16초에 랜덤 지터가 더해진다. 재시도할 가치가 있는 것은 타임아웃, 연결 실패, `429`, `503` 처럼 **잠시 뒤엔 될지도 모르는** 실패뿐이다. `400`·`401`·`404` 는 백 번 보내도 똑같이 실패하니 바로 포기한다. 서버가 `Retry-After` 를 주면 그 값을 따른다. 재시도되는 요청은 두 번 실행돼도 안전해야 하므로(멱등성) 결제·전송 같은 POST 는 멱등 키 없이 재시도하면 안 된다. 최대 횟수와 총 시간 상한이 없으면 장애 때 모든 클라이언트가 한꺼번에 재시도해 서버를 더 죽인다(재시도 폭풍).

## 헷갈리기 쉬운 것

- **서킷 브레이커**는 재시도를 "멈추는" 쪽이다. 재시도는 조금 기다렸다 다시 두드리고, 서킷 브레이커는 한동안 아예 두드리지 않는다. 재시도 → 그래도 실패 → 차단 순서로 같이 쓴다.
- **레이트 리밋**은 서버가 거는 제한(`429`)이고, 백오프는 그에 맞춰 클라이언트가 물러서는 예의다. 레이트 리밋에 걸렸는데 즉시 재시도하면 더 오래 막힌다.
- **고정 간격 재시도**(매번 1초)는 장애가 길어질수록 서버에 일정한 부하를 계속 준다. 지수 백오프는 간격을 늘려 서버가 회복할 틈을 준다.
