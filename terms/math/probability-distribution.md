---
id: probability-distribution
term: 확률 분포(정규·이항·포아송)
aliases:
  - Probability Distribution
  - Normal Distribution
  - Binomial Distribution
  - Poisson Distribution
  - 정규분포
  - 확률 분포
category: math
tags:
  - 확률통계
  - 통계
level: 2
kind: concept
related:
  - random-variable
  - descriptive-stats
  - law-of-large-numbers
  - hypothesis-test
  - outlier
  - mle
see_also:
  - https://docs.scipy.org/doc/scipy/reference/stats.html
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

각 값이 **얼마나 자주 나오는지**를 정해 둔 규칙으로, 정규·이항·포아송이 대표적이다.

## 비유

반 학생 키를 줄 세우면 가운데가 불룩한 **종 모양**(정규), 동전 10번 던져 앞면 수를 세면 0~10 사이의 막대(이항), 1시간에 응급실 문이 열리는 횟수를 세면 포아송이 된다. 데이터가 "어떻게 생겨나는지" 에 따라 모양이 정해진다.

## 예시

```python
from scipy import stats

stats.norm.cdf(1.96)                 # 0.975  평균±1.96σ 안에 약 95%
stats.binom.pmf(3, n=10, p=0.2)      # 0.201  양성률 20% 검사 10건 중 정확히 3건 양성
stats.poisson.pmf(5, mu=3)           # 0.101  시간당 평균 3명 오는 응급실에 5명 올 확률
```

- **정규분포**: 작은 요인이 많이 더해진 값(키, 측정 오차). 평균과 표준편차 두 숫자로 정해진다.
- **이항분포**: 성공/실패를 n번 했을 때 성공 횟수. 파라미터 n, p.
- **포아송분포**: 일정 시간 동안 드문 사건이 일어난 횟수. 평균 = 분산 = λ.

모델링을 할 때 "이 데이터가 어떤 분포에서 나왔다" 고 가정하면, 그 가정에서 손실 함수와 검정 방법이 정해진다.

## 헷갈리기 쉬운 것

- **PMF vs PDF**: 이산(이항·포아송)은 `P(X=3)` 같은 값이 있지만, 연속(정규)은 한 점의 확률이 0이고 구간 넓이로만 확률을 구한다. `norm.pdf(0) = 0.399` 는 확률이 아니라 밀도다.
- **"데이터가 정규분포를 따른다"는 가정**: 입원 일수·검사 수치처럼 오른쪽으로 긴 꼬리가 있는 의료 데이터는 정규가 아닌 경우가 많다. 로그 변환하거나 비모수 검정을 고려한다.
- **분포 vs 히스토그램**: 히스토그램은 데이터로 그린 그림, 분포는 그 데이터를 만든 것으로 가정한 이론 모델이다.
