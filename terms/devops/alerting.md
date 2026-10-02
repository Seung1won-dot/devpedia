---
id: alerting
term: 알림(alerting)
aliases:
  - Alerting
  - 알러팅
  - 경보
  - 알림 규칙
  - Alertmanager
category: devops
tags:
  - 모니터링
  - SRE
  - 운영
  - 서버운영
level: 2
kind: concept
related:
  - monitoring
  - healthcheck
  - on-call
  - slo-sla
  - webhook
  - log-level
  - mobile-crash-reporting
see_also:
  - https://prometheus.io/docs/alerting/latest/overview/
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

지표가 **정해 둔 조건을 넘으면** 사람에게 메시지를 보내 깨우는 모니터링 기능.

## 비유

환자 모니터의 **알람 설정**. 심박이 50 아래로 떨어지면 삐삐 울리는데, 기준을 너무 빡빡하게 잡으면 하루 종일 울려서 아무도 안 쳐다보게 된다(알람 피로).

## 예시

```yaml
# alerts.yml — Prometheus 알림 규칙
groups:
  - name: lab
    rules:
      - alert: GpuServerDown
        expr: up{job="node", instance="gpu01:9100"} == 0
        for: 5m                     # 5분 연속이어야 발화 — 순간 튐은 무시
        labels:
          severity: page            # 지금 사람을 깨울 것
        annotations:
          summary: "GPU 서버 응답 없음 ({{ $labels.instance }})"
      - alert: DiskAlmostFull
        expr: node_filesystem_avail_bytes{mountpoint="/data"} / node_filesystem_size_bytes{mountpoint="/data"} < 0.10
        for: 30m
        labels:
          severity: warn            # 내일 봐도 되는 것 → Slack 채널
```

Prometheus 가 조건을 평가하고, Alertmanager 가 `severity` 에 따라 Slack·메일·전화로 나눠 보낸다. 좋은 알림은 "받은 사람이 지금 뭔가 해야 하는 것"만이다 — CPU 80% 같은 건 알림이 아니라 대시보드 몫이다. 연구실에서 가장 흔한 사고는 디스크가 가득 차 학습이 멈추는 것이니, 디스크·GPU 서버 다운·백업 실패 세 개부터 걸어 두면 된다.

## 헷갈리기 쉬운 것

- **모니터링**은 숫자를 모아 그래프로 보여 주는 것, 알림은 그중 조건을 걸어 사람을 부르는 것. 모니터링만 있으면 누가 화면을 볼 때만 안다.
- **헬스체크**는 "살아 있니?" 하고 묻는 신호 자체. 그 응답이 몇 분째 실패했을 때 사람에게 보내는 단계가 알림이다.
- **로그에 ERROR 가 찍힌다**고 알림이 가진 않는다. 로그를 세어서 "5분에 10건 이상" 같은 조건으로 바꿔 주는 장치가 따로 필요하다.
