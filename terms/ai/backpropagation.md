---
id: backpropagation
term: 역전파
aliases:
  - Backpropagation
  - Backprop
  - 오차 역전파
  - 백프로파게이션
  - 체인 룰
category: ai
tags:
  - 딥러닝
  - 학습
level: 2
kind: concept
related:
  - gradient-descent
  - neural-network
  - pytorch
  - training-inference
  - rnn
  - derivative
status: review
created: 2026-09-29
updated: 2026-10-03
---

## 한 줄 정의

출력의 오차를 **입력 쪽으로 거슬러** 보내며 가중치마다 책임을 얼마나 지는지 계산하는 방법.

## 비유

요리가 짜게 나왔을 때 "간 본 사람 → 소금 넣은 사람 → 재료 손질한 사람" 순으로 거꾸로 따져 각자 책임이 얼마인지 나누는 것. 책임이 큰 단계일수록 다음엔 많이 고친다.

## 예시

```python
import torch
w1 = torch.tensor(2.0, requires_grad=True)
w2 = torch.tensor(3.0, requires_grad=True)
x, target = 1.0, 10.0
h = w1 * x                    # 1층
y = w2 * h                    # 2층 → y = 6
loss = (y - target) ** 2      # 오차 16

loss.backward()               # 역전파: 뒤에서 앞으로 미분을 곱해 나간다
print(w2.grad, w1.grad)       # tensor(-16.) tensor(-24.)
```

손실을 y 로 미분한 값(2 × (6 − 10) = −8)에 y 를 w2 로 미분한 값(h = 2)을 곱하면 w2 의 기울기 −16 이 나오고, 거기에 한 층 더 앞의 미분(w2 = 3, x = 1)을 곱하면 w1 의 기울기 −24 가 나온다. 이렇게 "뒤 층의 미분 × 앞 층의 미분" 을 이어 곱하는 규칙이 체인 룰이고, 출력에서 입력 방향으로 곱해 나가므로 "역" 전파다. 순전파 때 저장해 둔 중간값을 그대로 재사용하기 때문에 층이 100개여도 비용은 순전파의 몇 배에 그친다. PyTorch 에서 매일 쓰는 `loss.backward()` 한 줄이 이 계산 전부다.

면접에서는 "역전파를 체인 룰과 연결해 설명하라" 로 나오고, 이어서 "기울기 소실은 왜 생기나?"(1 보다 작은 미분을 층 수만큼 곱하면 0 에 가까워진다)까지 따라온다.

## 헷갈리기 쉬운 것

- **경사하강법**과 한 쌍이지만 역할이 다르다. 역전파는 기울기를 "계산" 하고(`loss.backward()`), 경사하강법은 그 기울기로 가중치를 "갱신" 한다(`optimizer.step()`).
- **순전파(forward)** 는 입력 → 출력으로 값을 계산하는 것. 역전파는 그 반대 방향으로 미분을 흘려보내는 것.
- **autograd** 는 PyTorch 가 역전파를 자동으로 해 주는 기능 이름. 역전파는 알고리즘, autograd 는 그 구현.
