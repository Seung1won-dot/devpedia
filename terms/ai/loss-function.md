---
id: loss-function
term: 손실 함수
aliases:
  - Loss Function
  - 비용 함수
  - Cost Function
  - 목적 함수
  - MSE
  - 크로스엔트로피
  - Cross-Entropy
category: ai
tags:
  - 딥러닝
  - 학습
  - ML기초
  - 면접
level: 1
kind: concept
related:
  - gradient-descent
  - classification-regression
  - backpropagation
  - precision-recall-f1
  - pytorch
  - overfitting
  - mle
see_also:
  - https://pytorch.org/docs/stable/nn.html#loss-functions
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

모델의 예측이 **정답에서 얼마나 틀렸는지를 숫자 하나로** 매기는 함수.

## 비유

다트판의 점수표. 중심에서 얼마나 벗어났는지를 점수로 바꿔 줘야 "다음엔 왼쪽으로 조금" 같은 피드백이 가능해진다.

## 예시

```python
import torch, torch.nn as nn

# 회귀(골연령 개월 수): 차이의 제곱 평균
pred, y = torch.tensor([120., 135.]), torch.tensor([126., 130.])
print(nn.MSELoss()(pred, y))                              # 30.5 = ((-6)² + 5²) / 2

# 분류(정상/폐렴): 정답 칸에 준 확률이 낮을수록 벌점
logits = torch.tensor([[2.0, 0.5]])                       # 모델 출력(정규화 전), 정답은 0번(정상)
print(nn.CrossEntropyLoss()(logits, torch.tensor([0])))   # 약 0.20 — 정답에 확률 0.82
logits = torch.tensor([[0.5, 2.0]])                       # 폐렴 쪽으로 틀리게 확신
print(nn.CrossEntropyLoss()(logits, torch.tensor([0])))   # 약 1.70 — 정답에 확률 0.18
```

손실이 있어야 "어느 방향으로 얼마나 고칠지" 를 계산할 수 있다 — 경사하강법은 이 숫자를 줄이는 쪽으로 가중치를 옮기는 절차다. 그래서 손실 함수는 **미분 가능**해야 하고, 정확도처럼 계단식으로 뛰는 지표는 손실로 못 쓴다. 분류는 크로스엔트로피(이진이면 `BCEWithLogitsLoss`), 회귀는 MSE 또는 이상치에 덜 휘둘리는 L1·Huber, 세그멘테이션은 Dice 손실을 섞는 게 보통이다. 양성이 5% 뿐인 의료 데이터에서는 `weight=` 로 클래스 가중치를 주거나 focal loss 로 소수 클래스의 벌점을 키운다.

면접에서는 "분류에 왜 MSE 대신 크로스엔트로피를 쓰나?" 로 나온다. 확률 출력에 MSE 를 쓰면 크게 틀렸을 때 기울기가 작아져 학습이 느리고, 크로스엔트로피는 틀린 확신일수록 벌점이 가파르게 커진다는 게 답이다.

## 헷갈리기 쉬운 것

- **손실 vs 지표(metric)**: 손실은 학습용(미분 가능, 매 배치 계산), 정확도·F1·AUC 는 사람이 보는 채점표. 손실은 줄었는데 F1 이 안 오르면 손실 설계가 목표와 안 맞는 것이다.
- **CrossEntropyLoss 앞에 softmax 를 또 붙이기**: PyTorch 의 `CrossEntropyLoss` 는 안에 softmax 가 들어 있어 로짓을 그대로 넣는다. 두 번 넣으면 학습이 느려지는 흔한 실수이고, `BCEWithLogitsLoss` 도 sigmoid 를 포함한다.
- **손실 함수 / 역전파 / 경사하강법**: 손실 함수는 줄일 대상, 역전파는 손실의 기울기를 구하는 계산, 경사하강법은 그 기울기로 가중치를 옮기는 규칙.
