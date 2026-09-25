---
id: monitoring
term: 모니터링(Prometheus/Grafana)
aliases:
  - Monitoring
  - 시스템 모니터링
  - 메트릭 수집
  - 프로메테우스/그라파나
category: devops
tags:
  - 모니터링
  - 서버운영
level: 2
related:
  - logging
  - healthcheck
  - gpu-cuda
  - vram
  - webhook
see_also:
  - https://prometheus.io/docs/introduction/overview/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

서버의 CPU·메모리·GPU 같은 **숫자를 계속 모아 그래프로** 보는 것.

## 비유

병실의 **환자 감시 모니터**. 심박·혈압을 계속 재서 그래프로 띄우고, 정상 범위를 벗어나면 알람이 울린다.

## 예시

```yaml
# prometheus.yml — GPU 서버의 숫자를 15초마다 긁어온다
scrape_configs:
  - job_name: gpu-server
    static_configs:
      - targets: ['gpu01.lab:9100', 'gpu01.lab:9400']   # node_exporter, dcgm-exporter
```

node_exporter 가 CPU·메모리·디스크, dcgm-exporter 가 GPU 사용률·VRAM 을 내보내면 Grafana 가 이걸 대시보드로 그린다. "VRAM 90% 넘으면 Slack 알림" 은 Grafana 알림 규칙 + 웹훅으로 건다.

## 헷갈리기 쉬운 것

- **로깅**은 "무슨 일이 있었는지" 글로 남기는 것, 모니터링은 "지금 상태가 어떤지" 숫자로 보는 것. 로그는 원인 찾기, 모니터링은 이상 감지에 쓴다.
- **헬스체크**는 "살아 있나?" 하나만 묻는 예/아니오. 모니터링은 그 위에 얼마나·어떻게까지 본다.
