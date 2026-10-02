---
id: vector-norm
term: 노름(L1/L2)
aliases:
  - Norm
  - L1 Norm
  - L2 Norm
  - 노름
  - 벡터 길이
category: math
tags:
  - 선형대수
  - ML기초
level: 2
kind: concept
related:
  - vector
  - dot-product
  - overfitting
  - loss-function
  - feature-engineering
see_also:
  - https://numpy.org/doc/stable/reference/generated/numpy.linalg.norm.html
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

벡터의 **길이(크기)를 숫자 하나로** 재는 방법으로, L1·L2가 대표적이다.

## 비유

L2 는 두 지점 사이를 **헬리콥터로 곧장** 가는 거리, L1 은 바둑판 같은 도심을 **택시로 블록 따라** 가는 거리다.

## 예시

```python
import numpy as np

v = np.array([3.0, -4.0])
print(np.linalg.norm(v, ord=1))   # 7.0  L1 = |3| + |-4|
print(np.linalg.norm(v))          # 5.0  L2 = √(3² + 4²), 기본값

unit = v / np.linalg.norm(v)      # 길이 1로 정규화 → 내적 = 코사인 유사도
```

ML 에서 노름은 세 곳에 나온다. ① 거리: 두 임베딩의 차이 벡터 노름. ② 정규화: 벡터를 길이 1로 맞춰 비교하기. ③ 규제: 손실에 가중치 노름을 더해 가중치가 커지지 못하게 막아 과적합을 줄인다. L1 규제(Lasso)는 쓸모없는 가중치를 정확히 0으로 만들고, L2 규제(Ridge, weight decay)는 전체를 고르게 작게 만든다.

## 헷갈리기 쉬운 것

- **벡터 정규화(normalize) vs 피처 정규화**: 앞은 벡터 하나를 길이 1로, 뒤는 피처(열)별로 0~1 또는 평균 0·표준편차 1로 맞추는 것. 이름이 같아 자주 섞인다.
- **L1/L2 손실(MAE/MSE)**은 오차 벡터의 노름이고, **L1/L2 규제**는 가중치 벡터의 노름이다. 같은 노름을 다른 대상에 쓴 것.
- L2 노름과 "L2 노름의 제곱"은 다르다. 규제·MSE 는 계산 편의상 제곱을 쓰는 경우가 많다.
