---
id: matrix
term: 행렬과 행렬 곱
aliases:
  - Matrix
  - Matrix Multiplication
  - 행렬
  - matmul
category: math
tags:
  - 선형대수
  - 딥러닝
  - GPU
level: 1
kind: concept
related:
  - vector
  - linear-transformation
  - neural-network
  - gpu-cuda
  - pandas-numpy
  - dot-product
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

숫자를 **행과 열의 표**로 늘어놓은 것과, 그 표끼리 곱해 한 번에 계산하는 연산.

## 비유

엑셀 표 하나가 행렬이다. 행렬 곱은 "각 사람(행)의 장바구니 수량 × 상품별 가격표(열)" 를 모든 사람에 대해 **한꺼번에** 계산하는 것과 같다.

## 예시

```python
import numpy as np

x = np.random.randn(32, 784)   # 배치 32장, 각 784픽셀
W = np.random.randn(784, 128)  # 가중치
b = np.zeros(128)

h = x @ W + b                  # 신경망 한 층 = 행렬 곱 + 덧셈
print(h.shape)                 # (32, 128)
```

신경망의 한 층(`nn.Linear`)은 결국 이 한 줄이다. 행렬 곱은 서로 독립적인 곱셈·덧셈 수백만 개라 GPU 가 수천 개 코어로 나눠 동시에 처리할 수 있고, 딥러닝이 GPU 에서 빠른 이유가 여기 있다. 곱하려면 앞 행렬의 열 수와 뒤 행렬의 행 수가 같아야 한다(`(32,784) @ (784,128)`).

## 헷갈리기 쉬운 것

- **`@` 와 `*`**: NumPy/PyTorch 에서 `@` 는 행렬 곱, `*` 는 같은 자리끼리 곱(원소별 곱)이다. 모양이 맞으면 둘 다 에러 없이 돌아가서 버그를 찾기 어렵다.
- **곱하는 순서**: `A @ B` 와 `B @ A` 는 대개 다르다(교환법칙이 성립하지 않음).
- PyTorch `nn.Linear` 는 가중치를 `(출력, 입력)` 모양으로 저장하고 `x @ W.T + b` 로 계산한다. 직접 짠 코드와 모양이 뒤집혀 보이는 이유.
