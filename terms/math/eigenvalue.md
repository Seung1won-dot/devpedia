---
id: eigenvalue
term: 고윳값 · 고유벡터
aliases:
  - Eigenvalue
  - Eigenvector
  - 고유값
  - 고윳값
  - 고유벡터
category: math
tags:
  - 선형대수
  - 그래프
  - 데이터분석
level: 3
kind: concept
related:
  - matrix
  - linear-transformation
  - svd-pca
  - graph
  - vector
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

행렬을 곱해도 **방향이 바뀌지 않는 벡터**와, 그때 길이가 늘어나는 배율.

## 비유

고무판을 잡아 늘리면 대부분의 점은 비스듬히 끌려가지만, **잡아당기는 방향 그 자체**에 놓인 선은 방향은 그대로 길이만 늘어난다. 그 방향이 고유벡터, 늘어난 배수가 고윳값이다.

## 예시

```python
import numpy as np

A = np.array([[2.0, 1.0],
              [1.0, 2.0]])
vals, vecs = np.linalg.eigh(A)   # 대칭 행렬은 eigh (eig 보다 빠르고 안정적)
print(vals)                       # [1. 3.]
print(vecs[:, 1])                 # [0.707 0.707] (부호는 반대로 나올 수 있음) → A @ v = 3 * v
```

정의는 `A·v = λ·v`. 실제로 만나는 곳은 두 군데다. **PCA** 는 공분산 행렬의 고유벡터를 구해 "데이터가 가장 넓게 퍼진 방향" 을 찾고, 고윳값이 그 방향의 분산이다. **PageRank** 는 웹 링크 그래프의 전이 행렬에서 고윳값 1에 대한 고유벡터를 찾고, 그 성분이 페이지 중요도가 된다.

트레이드오프: 고윳값 분해 전체는 `O(n³)` 이라 수만×수만 행렬엔 비싸다. PageRank 처럼 가장 큰 것 하나만 필요하면 행렬을 계속 곱하는 거듭제곱법(power iteration)이나, 상위 k개만 구하는 `scipy.sparse.linalg.eigsh` 를 쓴다.

## 헷갈리기 쉬운 것

- **고윳값 분해 vs SVD**: 고윳값 분해는 정사각 행렬에만, SVD 는 아무 모양의 행렬에나 된다. 실무 PCA 는 대부분 SVD 로 계산한다.
- **고윳값이 음수·복소수**일 수도 있다(회전 행렬 등). 대칭 행렬(공분산)은 항상 실수라 `eigh` 를 쓰면 된다.
