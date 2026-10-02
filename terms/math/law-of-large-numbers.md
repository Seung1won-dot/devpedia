---
id: law-of-large-numbers
term: 큰 수의 법칙 · 중심 극한 정리
aliases:
  - Law of Large Numbers
  - Central Limit Theorem
  - LLN
  - CLT
  - 대수의 법칙
  - 중심 극한 정리
category: math
tags:
  - 확률통계
  - 실험
  - 통계
level: 2
kind: concept
related:
  - hypothesis-test
  - ab-test
  - probability-distribution
  - random-variable
  - descriptive-stats
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

표본이 많을수록 **평균이 참값에 가까워지고**, 그 평균은 정규분포 모양으로 흩어진다는 성질.

## 비유

동전을 10번 던지면 앞면이 7번 나올 수도 있지만 1만 번 던지면 거의 절반이 된다(큰 수의 법칙). 그리고 "1만 번 던지기" 를 여러 팀이 각자 하면, 팀별 결과는 절반 근처에 **종 모양**으로 모인다(중심 극한 정리).

## 예시

```python
import numpy as np

rng = np.random.default_rng(0)
# 오른쪽으로 치우친 분포(입원 일수 비슷한 지수분포)에서
means = rng.exponential(scale=5, size=(10_000, 50)).mean(axis=1)

print(means.mean())   # ≈ 5.0  평균의 평균 → 참값
print(means.std())    # ≈ 5/√50 ≈ 0.71  표준오차
# 히스토그램을 그리면 원래 분포와 달리 종 모양
```

원래 데이터가 정규가 아니어도 **평균**은 정규분포로 근사할 수 있다는 게 중심 극한 정리다. A/B 테스트에서 두 그룹 전환율 차이에 t-검정·z-검정을 쓰고 신뢰구간을 `평균 ± 1.96 × 표준오차` 로 계산할 수 있는 근거가 이것이다. 표준오차가 `σ/√n` 이라, 오차를 절반으로 줄이려면 표본이 4배 필요하다.

## 헷갈리기 쉬운 것

- **큰 수의 법칙 vs 중심 극한 정리**: 앞은 "평균이 어디로 가는가(참값)", 뒤는 "평균이 어떤 모양으로 흩어지는가(정규)" 에 대한 이야기다.
- **도박사의 오류**: "앞면이 5번 나왔으니 이제 뒷면 차례" 는 틀렸다. 큰 수의 법칙은 과거를 보상해 주는 게 아니라 많은 시행 속에 희석시키는 것이다.
- "n ≥ 30 이면 충분" 은 경험칙일 뿐이다. 꼬리가 매우 긴 분포나 아주 드문 사건 비율은 훨씬 큰 표본이 필요하다.
