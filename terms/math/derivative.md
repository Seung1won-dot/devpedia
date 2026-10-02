---
id: derivative
term: 미분 · 편미분
aliases:
  - Derivative
  - Partial Derivative
  - Gradient
  - 미분
  - 편미분
  - 기울기
category: math
tags:
  - 미적분
  - ML기초
  - 학습
level: 1
kind: concept
related:
  - gradient-descent
  - backpropagation
  - loss-function
  - pytorch
  - log-exp
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

입력을 아주 조금 바꿀 때 **출력이 얼마나 변하는지**를 나타내는 값.

## 비유

산길에 서서 **발밑 경사**를 재는 것. 편미분은 동쪽으로만 한 걸음, 북쪽으로만 한 걸음 갔을 때의 경사를 따로따로 재는 것이고, 그걸 모은 화살표가 기울기(gradient)다.

## 예시

```python
import torch

x = torch.tensor(3.0, requires_grad=True)
y = x**2 + 2*x          # y = x² + 2x
y.backward()            # dy/dx 자동 계산
print(x.grad)           # tensor(8.)  ← 2x + 2 에 x=3

# 손으로 확인: 아주 조금 움직여 보기
f = lambda x: x**2 + 2*x
h = 1e-5
print((f(3 + h) - f(3)) / h)   # ≈ 8.00001
```

딥러닝에서 미분은 "이 가중치를 살짝 올리면 손실이 늘까 줄까" 를 알려 주는 신호다. 가중치가 수십억 개라 각각에 대해 편미분을 구하고, 그 묶음(gradient)을 써서 내려가는 방법이 경사하강법, 층을 거꾸로 따라가며 효율적으로 계산하는 방법이 역전파다. PyTorch 의 `autograd` 가 이 계산을 대신 해 준다.

## 헷갈리기 쉬운 것

- **미분 vs 편미분**: 입력이 하나면 미분, 여러 개 중 하나만 움직이고 나머지는 고정하면 편미분(`∂L/∂w`).
- **기울기(gradient) vs 경사하강법**: gradient 는 "어느 쪽이 오르막인가" 라는 값, 경사하강법은 그 반대 방향으로 걷는 알고리즘이다.
- **연쇄 법칙(chain rule)**: `f(g(x))` 의 미분 = `f'(g(x))·g'(x)`. 역전파는 이 규칙을 층마다 반복 적용한 것일 뿐이다.
