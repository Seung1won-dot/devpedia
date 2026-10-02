---
id: gradient-descent
term: 경사하강법
aliases:
  - Gradient Descent
  - SGD
  - 확률적 경사하강법
  - Adam
  - 학습률
  - Learning Rate
  - 옵티마이저
category: ai
tags:
  - 딥러닝
  - 학습
  - ML기초
level: 2
kind: concept
related:
  - backpropagation
  - neural-network
  - pytorch
  - overfitting
  - training-inference
  - loss-function
  - hyperparameter
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

손실이 **줄어드는 방향으로 가중치를 조금씩** 옮기기를 반복해 모델을 맞춰 가는 방법.

## 비유

샤워기 온도 맞추기. 뜨거우면 손잡이를 찬물 쪽으로 조금, 아직 뜨거우면 또 조금 돌리는데, 한 번에 확 돌리면(학습률 큼) 얼음물과 끓는 물을 오가고 너무 조금씩 돌리면(학습률 작음) 맞추는 데 한참 걸린다.

## 예시

```python
import torch
w = torch.tensor(0.0, requires_grad=True)
lr = 0.05                                 # 학습률: 한 걸음 크기
for step in range(20):
    loss = (3 * w - 6) ** 2               # 정답은 w = 2
    loss.backward()                       # 기울기 계산 (역전파)
    with torch.no_grad():
        w -= lr * w.grad                  # 기울기 반대 방향으로 한 걸음
        w.grad.zero_()
print(w.item())                           # 2.0
```

기울기(`w.grad`)는 "w 를 키우면 손실이 얼마나 느는가" 이므로 그 반대 방향으로 가면 손실이 준다. 이 예에서 학습률을 0.2 로 올리면 w 가 정답을 지나쳐 점점 크게 튀며 발산하고, 0.001 이면 20번으로는 턱없이 부족하다. 실전에서는 데이터 전체가 아니라 미니배치(수십~수백 개)마다 기울기를 구해 갱신하는 SGD 를 쓰고, 여기에 관성(momentum)과 파라미터별 학습률 자동 조절을 더한 Adam(`torch.optim.Adam`)이 사실상 기본값이다.

면접에서는 "학습률이 너무 크면/작으면 어떻게 되나?", "SGD 와 Adam 의 차이는?" 으로 나온다.

## 헷갈리기 쉬운 것

- **역전파**는 기울기를 구하는 계산법, **경사하강법**은 그 기울기로 어디로 얼마나 갈지 정하는 규칙. 위 코드의 `backward()` 와 `w -= lr * w.grad` 가 각각이다.
- **배치 / 미니배치 / SGD**: 전체 데이터로 한 번 갱신(배치), 일부로 갱신(미니배치), 한 개씩 갱신(원래 뜻의 SGD). 요즘 "SGD" 라고 하면 보통 미니배치를 뜻한다.
- **지역 최솟값(local minimum)**: 내려가다 멈춘 곳이 전체 최저점이 아닐 수 있다. 딥러닝에서는 미니배치의 흔들림 덕에 생각보다 덜 문제가 된다.
