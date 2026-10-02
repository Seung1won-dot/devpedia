---
id: healthcheck
term: 헬스체크
aliases:
  - Health Check
  - 상태 확인
  - 생존 확인
  - liveness/readiness
category: devops
tags:
  - 모니터링
  - 배포
  - 컨테이너
level: 2
kind: pattern
related:
  - monitoring
  - load-balancer
  - docker-compose
  - http-status-code
  - endpoint
  - circuit-breaker
  - alerting
see_also:
  - "https://docs.docker.com/reference/dockerfile/#healthcheck"
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

서버가 **살아 있고 응답할 수 있는지** 주기적으로 물어보는 것.

## 비유

야간 경비원이 정해진 시간마다 각 방을 **노크해 보는 것**. 대답이 없으면 문제가 생긴 것으로 보고 조치(재시작·다른 방으로 안내)한다.

## 예시

```yaml
# docker-compose.yml — 3번 연속 실패하면 unhealthy 로 표시된다
services:
  api:
    image: ghcr.io/eclab/lab-api:1.4.2
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      retries: 3
```

`/health` 는 DB 연결까지 확인하고 200 을 돌려주는 가벼운 엔드포인트(이미지 안에 curl 이 있어야 한다). 로드 밸런서·쿠버네티스는 이 응답을 보고 죽은 서버로는 트래픽을 보내지 않는다.

## 헷갈리기 쉬운 것

- **모니터링**은 CPU 몇 %, 요청 몇 건처럼 정도를 보고, 헬스체크는 "정상/비정상" 둘 중 하나만 답한다.
- **liveness vs readiness**(쿠버네티스): liveness 는 "살아 있나(아니면 재시작)", readiness 는 "요청 받을 준비 됐나(아니면 트래픽만 빼기)". 시작이 느린 앱은 둘을 나눠야 한다.
