---
id: observability
term: 관측성(메트릭·로그·트레이스)
aliases:
  - Observability
  - 옵저버빌리티
  - 관측 가능성
  - 메트릭·로그·트레이스
  - 관측성의 세 기둥
category: infra
tags:
  - 모니터링
  - 로깅
  - SRE
  - 서버운영
level: 2
kind: concept
related:
  - monitoring
  - logging
  - tracing
  - alerting
  - elk-stack
  - slo-sla
see_also:
  - https://opentelemetry.io/docs/concepts/observability-primer/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

메트릭·로그·트레이스를 모아 **밖에서 본 신호만으로 시스템 안 상태를 설명**할 수 있는 성질.

## 비유

병원의 **진단 세트**. 메트릭은 체온계 숫자, 로그는 간호 기록지, 트레이스는 한 환자가 접수→검사→진료 중 어디서 오래 기다렸는지 따라간 동선 기록이다.

## 예시

```bash
# 세 신호를 한 화면에서 보는 올인원(Grafana + Prometheus + Loki + Tempo) — 연구실 실습용
docker run -d --name lgtm -p 3000:3000 -p 4317:4317 -p 4318:4318 grafana/otel-lgtm
# 앱 쪽은 OpenTelemetry 자동 계측으로 보낸다 — FastAPI 코드 수정 없음
pip install opentelemetry-distro opentelemetry-exporter-otlp && opentelemetry-bootstrap -a install
OTEL_SERVICE_NAME=rag-api OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317 \
  opentelemetry-instrument uvicorn app:app --port 8000
```

"RAG API 가 가끔 10초씩 걸린다" 를 세 신호로 좁혀 가는 흐름: **메트릭**의 p95 지연 그래프가 밤 3시마다 튄다(언제·얼마나) → 그 시각 **로그**에 `pgvector search 8.7s trace_id=4f3a...` 가 남아 있다(무슨 일) → 그 trace_id 로 **트레이스**를 열면 임베딩 0.2초 → 벡터 검색 8.7초 → LLM 1.1초, 범인은 검색이고 그 시간에 백업이 디스크를 점유하고 있었다(어디서·왜). 셋이 시각과 trace_id 로 이어져야 이 추적이 된다. 서버 세 대짜리 연구실이면 메트릭 + 로그로 대부분 해결되고, 트레이스는 서비스가 여러 개로 쪼개져 "어느 서비스가 느린지" 모르게 될 때 붙인다.

## 헷갈리기 쉬운 것

- **모니터링**은 미리 정한 숫자가 범위를 벗어나는지 지켜보는 것(아는 문제 감지), 관측성은 처음 보는 문제도 신호를 조합해 설명할 수 있는 것. 모니터링은 관측성의 일부다.
- **로깅·메트릭·트레이스**는 각각 데이터 종류, 관측성은 그 셋이 연결됐을 때 생기는 성질. 따로 쌓아 두기만 하면 대시보드 세 개일 뿐이다.
- **헬스체크**는 살았나 죽었나 한 비트. 관측성은 "왜 느린가" 까지 답한다.
