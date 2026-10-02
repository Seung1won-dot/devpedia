---
id: random-variable
term: 확률 변수 · 기댓값 · 분산
aliases:
  - Random Variable
  - Expected Value
  - Variance
  - 확률 변수
  - 기댓값
  - 분산
category: math
tags:
  - 확률통계
  - 통계
  - 흔한실수
level: 2
kind: concept
related:
  - descriptive-stats
  - probability-distribution
  - probability-basics
  - law-of-large-numbers
  - pandas-numpy
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

무작위 결과에 숫자를 붙인 것과, 그 숫자의 **평균(기댓값)과 퍼진 정도(분산)**.

## 비유

주사위를 던지기 전 "몇이 나올지 모르는 칸" 이 확률 변수다. 수없이 던졌을 때 평균적으로 기대되는 값이 기댓값, 나오는 값이 그 평균에서 **얼마나 들쭉날쭉한지**가 분산이다.

## 예시

```python
import numpy as np
import pandas as pd

hr = np.array([72, 80, 65, 90, 88])   # 환자 5명 심박수

print(hr.mean())             # 79.0  표본 평균
print(np.var(hr))            # 89.6  ← NumPy 기본 ddof=0 (n 으로 나눔)
print(pd.Series(hr).var())   # 112.0 ← pandas 기본 ddof=1 (n-1 로 나눔)
print(np.std(hr, ddof=1))    # 10.58 표준편차 = √분산
```

정의는 `E[X] = Σ x·P(x)`, `Var(X) = E[(X - E[X])²]`. 같은 데이터인데 NumPy 와 pandas 의 분산이 다르게 나오는 건, 표본으로 모집단 분산을 추정할 때 `n-1` 로 나눠야 치우치지 않기 때문이다. 논문 표에 쓸 때는 어느 쪽인지 맞춰 두자.

## 헷갈리기 쉬운 것

- **기댓값 vs 표본 평균**: 기댓값은 이론상 값(분포의 성질), 표본 평균은 데이터에서 계산한 추정치. 표본이 커지면 기댓값에 가까워진다(큰 수의 법칙).
- **분산 vs 표준편차**: 분산은 단위가 제곱(bpm²)이라 해석이 어렵고, 표준편차는 원래 단위(bpm)로 돌려놓은 값이다.
- **기술 통계**는 이미 모은 데이터를 요약하는 것이고, 확률 변수는 데이터가 나오는 **과정**을 모델링하는 쪽이다.
