---
id: cloud-pricing
term: 클라우드 비용 모델
aliases:
  - Cloud Pricing
  - 종량제
  - 온디맨드/예약/스팟
  - 이그레스 요금
  - 클라우드 요금
category: infra
tags:
  - 클라우드
  - 운영
  - 흔한실수
level: 2
kind: concept
related:
  - cloud-providers
  - on-premise-vs-cloud
  - autoscaling
  - aws-core-services
  - object-storage
  - region-az
  - cac-ltv
see_also:
  - https://aws.amazon.com/pricing/
  - https://calculator.aws/
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

클라우드 요금이 **시간·용량·전송량 단위로 쓴 만큼** 매겨지는 구조와 그 할인 방식.

## 비유

**휴대폰 요금제**. 쓴 만큼 내는 종량제(온디맨드), 약정하면 싸지는 것(예약), 남는 회선을 헐값에 쓰되 언제든 끊길 수 있는 것(스팟)이 있고, 데이터 로밍(나가는 전송량)이 제일 무섭다.

## 예시

```bash
# 계정 만든 첫날 할 일: 월 50달러의 80% 를 넘으면 메일 — 예산 알림
aws budgets create-budget --account-id 123456789012 \
  --budget '{"BudgetName":"lab-monthly","BudgetLimit":{"Amount":"50","Unit":"USD"},"TimeUnit":"MONTHLY","BudgetType":"COST"}' \
  --notifications-with-subscribers '[{"Notification":{"NotificationType":"ACTUAL","ComparisonOperator":"GREATER_THAN","Threshold":80},"Subscribers":[{"SubscriptionType":"EMAIL","Address":"lab-admin@example.com"}]}]'
# 지난달 돈이 어디로 나갔나 — 서비스별 합계
aws ce get-cost-and-usage --time-period Start=2026-09-01,End=2026-10-01 \
  --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE
```

과금 축은 네 개 — **컴퓨팅**은 켜 둔 시간(안 써도 켜져 있으면 돈), **스토리지**는 GB-월과 요청 수, **네트워크**는 밖으로 나가는 전송량(이그레스, 들어오는 건 보통 무료), **관리형 서비스**(RDS 등)는 같은 VM 보다 웃돈. 할인은 온디맨드 → 예약(1~3년 약정, 최대 70% 안팎 [확인 필요]) → 스팟(최대 90% 안팎, 대신 몇 분 전 통보로 회수 [확인 필요]) 순이고, 스팟은 체크포인트를 저장하는 학습 작업에 잘 맞는다. A100 한 장짜리 인스턴스를 한 달 켜 두면 수천 달러 단위라 [확인 필요] 연구실이 GPU 를 직접 사는 이유가 여기 있다. 흔한 실수: EC2 는 껐는데 EBS·탄력 IP·NAT 게이트웨이가 계속 과금되는 것, 데이터셋 수백 GB 를 내려받아 이그레스 요금을 맞는 것.

## 헷갈리기 쉬운 것

- **프리티어**는 "무료 요금제" 가 아니라 "일정량까지 무료". 한도나 기간을 넘으면 그대로 과금된다 [확인 필요].
- **중지(stop) vs 종료(terminate)**: 인스턴스를 중지해도 붙어 있는 디스크 요금은 계속 나간다.
- **온프레미스 비용**과 비교할 때는 장비 값만이 아니라 전기·냉방·관리 인건비까지 넣어야(TCO) 공정하다.
