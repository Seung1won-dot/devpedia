---
id: cac-ltv
term: CAC · LTV
aliases:
  - Customer Acquisition Cost
  - Lifetime Value
  - 고객 획득 비용
  - 고객 생애 가치
  - CLV
category: product
tags:
  - 지표
  - 비즈니스모델
  - 그로스
level: 2
kind: metric
related:
  - retention-churn
  - saas-model
  - funnel
  - freemium
  - growth-hacking
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

고객 한 명을 데려오는 비용(**CAC**)과 그 고객이 평생 남기는 이익(**LTV**).

## 비유

낚시에 쓴 **미끼값**과 잡은 **물고기 값**이다. 미끼값이 물고기 값보다 비싸면 많이 잡을수록 손해다.

## 예시

```text
CAC = 이번 달 마케팅·영업비 3,000만 원 / 신규 유료 고객 300명 = 10만 원

ARPU(고객당 월 매출) 2만 원, 매출총이익률 80%, 월 이탈률 5%
LTV = 2만 × 0.8 / 0.05 = 32만 원

LTV / CAC = 32 / 10 = 3.2
회수 기간 = CAC / (월 이익) = 10만 / 1.6만 ≈ 6.3개월
```

흔히 **LTV/CAC 3 이상**, 회수 기간 12개월 이내를 건강하다고 본다 [확인 필요]. 이탈률이 5% 에서 10% 로 오르면 LTV 가 16만 원으로 반토막 나서, 같은 광고비로도 사업이 적자가 된다.

## 헷갈리기 쉬운 것

- **LTV 를 매출로 계산**하면 부풀려진다. 서버비·결제 수수료를 뺀 이익(마진)으로 계산해야 CAC 와 비교할 수 있다.
- **블렌디드 CAC**(자연 유입 포함 전체 평균)는 광고 채널 하나의 진짜 비용을 가린다. 채널별 CAC 를 따로 봐야 어디에 돈을 더 쓸지 정할 수 있다.
