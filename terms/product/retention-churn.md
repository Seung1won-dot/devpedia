---
id: retention-churn
term: 리텐션 · 이탈률
aliases:
  - Retention
  - Churn Rate
  - 유지율
  - 코호트 분석
  - Cohort
category: product
tags:
  - 지표
  - 데이터분석
  - 그로스
level: 2
kind: metric
related:
  - dau-mau
  - cac-ltv
  - funnel
  - saas-model
  - north-star-metric
  - pandas-numpy
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

처음 온 사용자 중 **일정 기간 뒤에도 남아 있는 비율**과 떠난 비율.

## 비유

학원 **3월 등록생 중 6월까지 다니는 학생** 비율이 리텐션이다. 새 학생을 아무리 모아도 매달 절반이 그만두면 교실은 차지 않는다.

## 예시

가입한 달(**코호트**)별로 묶어 N개월 뒤 잔존율을 본다.

| 가입 월 | 인원 | 1개월 | 2개월 | 3개월 |
| :-- | --: | --: | --: | --: |
| 7월 | 1,000 | 40% | 28% | 25% |
| 8월 | 1,200 | 45% | 33% | - |

곡선이 25% 근처에서 **평평해지면** 꾸준히 쓰는 핵심 사용자가 생겼다는 신호다. 월 이탈률이 5% 이면 평균 사용 기간은 대략 1 / 0.05 = 20개월로 어림한다.

```python
# cohort_month, active_month 는 Period("M") 형, m=0 이 가입한 달
df["m"] = (df.active_month - df.cohort_month).apply(lambda d: d.n)
t = df.pivot_table(index="cohort_month", columns="m", values="user_id", aggfunc="nunique")
print(t.div(t[0], axis=0).round(2))
```

## 헷갈리기 쉬운 것

- **DAU/MAU** 는 지금 활동 중인 사람 전체를 보고, 리텐션은 같은 시기에 들어온 무리를 따라간다. 신규 유입이 많으면 DAU 는 오르는데 리텐션은 나빠질 수 있다.
- **로고 이탈**(고객 수)과 **매출 이탈**(금액)은 다르다. 큰 고객 하나가 떠나면 로고 이탈은 작아도 매출 이탈은 크다.
