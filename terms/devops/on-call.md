---
id: on-call
term: 온콜
aliases:
  - On-call
  - 온콜 당번
  - 장애 대응 당직
  - 비상 대기
  - 페이저 듀티
category: devops
tags:
  - SRE
  - 운영
  - 협업
level: 3
kind: concept
related:
  - alerting
  - postmortem
  - slo-sla
  - monitoring
  - healthcheck
  - rollback
see_also:
  - https://sre.google/sre-book/being-on-call/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

장애 알림이 오면 **정해진 사람이 먼저 받아 대응**하도록 당번을 돌리는 운영 방식.

## 비유

병원의 **당직 의사**. 밤에 환자가 나빠지면 병동 전체가 아니라 그날 당직 한 명에게 먼저 전화가 가고, 혼자 못 막으면 윗선을 깨운다(에스컬레이션).

## 예시

```yaml
# alertmanager.yml 일부 — severity 에 따라 보내는 곳을 나눈다
route:
  receiver: slack-ops                 # 기본: 채널에만 남긴다
  routes:
    - matchers:
        - severity="page"
      receiver: oncall-phone          # 당번에게 전화/푸시
receivers:
  - name: slack-ops
    slack_configs:
      - channel: "#eclab-alerts"
  - name: oncall-phone
    webhook_configs:
      - url: https://oncall.example.internal/alert   # 당번 로테이션은 온콜 도구가 관리
```

당번 표는 보통 주 단위로 돌리고, 전화로 깨우는 건 `severity=page` 뿐이며 나머지는 Slack 에 쌓아 아침에 본다. 당번이 받으면 원인 해결보다 **일단 멈추기**(롤백·재시작)가 먼저고, 끝나면 포스트모템으로 넘긴다. 트레이드오프: 3명짜리 연구실에서 24시간 온콜은 번아웃의 지름길이다 — 사용자가 내부뿐이면 "평일 9~18시만 당번, 밤에는 알림 끄기"처럼 SLO 에 맞춰 범위를 줄이는 게 맞고, 반대로 병원 시스템에 연결된 서비스라면 PagerDuty 같은 정식 온콜 도구와 당직 보상이 필요하다.

## 헷갈리기 쉬운 것

- **알림(alerting)** 은 신호를 보내는 쪽, 온콜은 그 신호를 받을 사람과 순서를 정하는 쪽. 알림만 있고 온콜이 없으면 "다들 봤겠지" 하고 아무도 안 움직인다.
- **담당자(owner)** 는 그 시스템을 가장 잘 아는 사람, 온콜은 그 주의 당번. 당번은 담당자가 아니어도 런북(대응 절차서)을 보고 1차 대응을 할 수 있어야 한다.
- **에스컬레이션**은 당번이 정해진 시간 안에 응답하지 않으면 다음 사람에게 넘어가는 규칙으로, 온콜 제도의 일부다.
