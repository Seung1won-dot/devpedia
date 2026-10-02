---
id: tracing
term: 분산 트레이싱
aliases:
  - Distributed Tracing
  - 트레이싱
  - OpenTelemetry
  - OTel
  - 트레이스/스팬
category: devops
tags:
  - 모니터링
  - 로깅
  - SRE
  - 분산시스템
level: 3
kind: concept
related:
  - observability
  - monitoring
  - logging
  - microservices
  - elk-stack
  - profiling
  - clock-skew
see_also:
  - https://opentelemetry.io/docs/concepts/signals/traces/
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

요청 하나가 **여러 서비스를 거치는 경로와 각 구간의 시간**을 하나의 ID 로 이어 보는 것.

## 비유

택배 **운송장 번호 하나로 조회하는 이동 경로**. 집하 → 허브 → 배송까지 어디서 몇 시간 머물렀는지 한 줄로 보이니, "느리다"가 "허브에서 6시간 멈췄다"로 바뀐다.

## 예시

```python
# pip install opentelemetry-distro opentelemetry-exporter-otlp opentelemetry-instrumentation-fastapi
from fastapi import FastAPI
from opentelemetry import trace
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

app = FastAPI()
FastAPIInstrumentor.instrument_app(app)      # 요청마다 루트 스팬 자동 생성
tracer = trace.get_tracer("rag")

@app.post("/ask")
def ask(q: str):
    with tracer.start_as_current_span("embed"):
        vec = embed(q)
    with tracer.start_as_current_span("pgvector.search"):
        docs = search(vec)
    with tracer.start_as_current_span("llm.generate"):
        return generate(q, docs)
```

`opentelemetry-instrument python main.py` 로 띄우고 Jaeger 나 Grafana Tempo 로 보내면, 질문 하나가 임베딩 40ms·검색 20ms·LLM 3.8초로 쪼개진 폭포수 그래프가 뜬다. 핵심은 trace ID 가 HTTP 헤더(`traceparent`)에 실려 다음 서비스까지 전파되는 것 — 그래서 API 가 임베딩 서버와 vLLM 을 거쳐도 한 줄로 이어진다. 트레이드오프: 서비스가 FastAPI 하나뿐이면 로그에 요청 ID 를 찍는 것으로 충분한 경우가 많고, 수집기 운영과 샘플링 설정이 비용으로 붙는다. 서비스가 서너 개를 넘고 "어디가 느린지 모르겠다"가 반복될 때 도입하는 게 맞다.

## 헷갈리기 쉬운 것

- **로깅**은 서비스마다 따로 남기는 문장, 트레이싱은 그것을 요청 단위로 꿰는 ID 와 시간 구조. 로그에 trace ID 를 함께 찍으면 둘이 만난다.
- **모니터링(메트릭)** 은 "평균 응답 3초" 같은 집계값, 트레이싱은 "이 요청이 3초 걸린 이유"라는 개별값. 메트릭으로 이상을 보고 트레이스로 원인을 찾는다.
- **프로파일링**은 프로세스 하나 안에서 함수 단위 시간을 재고, 트레이싱은 프로세스와 서버를 넘어가는 구간 단위로 잰다.
