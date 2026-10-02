---
id: slo-sla
term: SLO/SLA/SLI
aliases:
  - Service Level Objective
  - Service Level Agreement
  - Service Level Indicator
  - 서비스 수준 목표
  - 에러 버짓
  - 가용성 목표
category: devops
tags:
  - SRE
  - 운영
  - 모니터링
  - 성능
level: 3
kind: metric
related:
  - alerting
  - monitoring
  - on-call
  - postmortem
  - healthcheck
  - latency-bandwidth
see_also:
  - https://sre.google/sre-book/service-level-objectives/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

서비스 품질을 **재는 값(SLI)·내부 목표(SLO)·고객과의 약속(SLA)** 세 층의 지표.

## 비유

택배 회사의 **"99% 는 다음 날 도착"**. 실제 도착률을 재는 게 SLI, 사내 목표로 잡은 99.5% 가 SLO, 고객에게 "못 지키면 환불"이라고 약속한 99% 가 SLA 다.

## 예시

```promql
# SLI: 최근 30일 동안 5xx 가 아닌 응답의 비율
sum(rate(http_requests_total{job="api", code!~"5.."}[30d]))
  /
sum(rate(http_requests_total{job="api"}[30d]))
```

SLO 를 99.5% 로 잡으면 30일 중 허용되는 실패는 0.5%, 약 3.6시간 — 이것이 **에러 버짓**이다. 버짓이 남아 있으면 배포를 과감히 하고, 다 쓰면 기능 개발을 멈추고 안정화에 쓴다는 규칙이 붙는다. 연구실 내부 RAG 서비스엔 계약 상대가 없으니 SLA 는 없지만, "평일 9~18시 성공률 99%" 같은 SLO 하나만 적어 둬도 "서버 또 죽었어요"가 "이번 달 버짓 70% 썼다"는 숫자 대화로 바뀐다. 트레이드오프: 목표를 100% 에 가깝게 잡을수록 이중화·온콜 비용이 기하급수적으로 늘어나므로, 연구용 서비스는 99% 수준이면 충분한 경우가 대부분이다.

## 헷갈리기 쉬운 것

- **SLI 와 SLO**: SLI 는 측정값(성공률 99.7%), SLO 는 그 값의 목표(99.5% 이상). 지표 없이 목표만 적으면 선언문일 뿐이다.
- **SLO 와 SLA**: SLA 는 계약이라 어기면 보상(크레딧)이 따른다. 그래서 SLA 는 SLO 보다 느슨하게 잡는다 — 내부 목표를 먼저 어겨서 미리 알아차리려고.
- **가용성 99.9%** 는 한 달에 약 43분의 다운만 허용한다. 9 가 하나 늘 때마다 허용 시간은 1/10 로 줄고 비용은 그만큼 뛴다.
