---
id: circuit-breaker
term: 서킷 브레이커
aliases:
  - Circuit Breaker
  - 회로 차단기 패턴
  - 차단기 패턴
category: backend
tags:
  - 분산시스템
  - 아키텍처패턴
  - 운영
  - SRE
level: 3
kind: pattern
related:
  - retry-backoff
  - microservices
  - healthcheck
  - service-mesh
  - rate-limit
  - monitoring
see_also:
  - https://martinfowler.com/bliki/CircuitBreaker.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

상대 서비스가 계속 실패하면 **한동안 호출 자체를 끊어** 장애가 번지지 않게 하는 패턴.

## 비유

집의 누전 차단기. 과부하가 감지되면 전기를 아예 끊어 집 전체가 타는 걸 막고, 조금 있다 올려 봐서 괜찮으면 다시 쓴다.

## 예시

요약 기능이 GPU 서버의 LLM 에 기대는데, 그 서버가 죽으면 요청마다 10초 타임아웃을 기다리다 웹 서버 전체가 느려진다. `pybreaker` 로 끊는다:

```python
import httpx, pybreaker

breaker = pybreaker.CircuitBreaker(fail_max=5, reset_timeout=30)

@breaker
def call_llm(prompt: str) -> str:
    r = httpx.post("http://gpu-server:11434/api/generate",
                   json={"model": "qwen2.5", "prompt": prompt, "stream": False}, timeout=10)
    r.raise_for_status()
    return r.json()["response"]

def summarize(text: str) -> str:
    try:
        return call_llm(f"다음을 세 줄로 요약해 줘:\n{text}")
    except pybreaker.CircuitBreakerError:
        return "(요약 서버 점검 중 — 원문을 표시합니다)"   # 폴백
```

상태는 세 개다. **닫힘**(정상 호출) → 연속 5번 실패 → **열림**(30초 동안 호출 없이 즉시 실패) → **반열림**(요청 하나만 시험) → 성공하면 닫힘, 실패하면 다시 열림. 열려 있는 동안 상대는 숨 돌릴 틈을 얻고 우리 서버는 스레드를 낭비하지 않는다.

**쓰지 말아야 할 때**: 폴백이 없는 유일한 의존성(모놀리스와 그 DB 하나)은 끊어 봐야 그냥 에러라 얻는 게 없다. 호출량이 적은 내부 도구에는 임계값 조정이라는 복잡도만 더한다. 임계값이 너무 민감하면 잠깐의 지연에도 열려 멀쩡한 서비스를 스스로 차단하는 사고가 난다. 서비스 메시나 API 게이트웨이가 이미 해 주고 있으면 코드에 또 넣지 않는다.

## 헷갈리기 쉬운 것

- **재시도/백오프**는 "다시 시도", 서킷 브레이커는 "시도 자체를 멈춤". 재시도만 있으면 아픈 서버를 모두가 계속 때리게 되므로 둘을 함께 쓴다.
- **레이트 리밋**은 서버가 과한 클라이언트를 막는 것, 서킷 브레이커는 클라이언트가 아픈 서버(와 자기 자신)를 보호하는 것. 방향이 반대다.
- **헬스체크**는 주기적으로 "살아 있니?" 라고 묻는 능동 감시. 서킷 브레이커는 실제 호출 결과를 세어 판단하므로, 헬스체크는 통과하는데 특정 요청만 실패하는 경우도 잡는다.
