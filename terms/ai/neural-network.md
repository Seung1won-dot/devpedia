---
id: neural-network
term: 신경망/딥러닝
aliases:
  - Neural Network
  - Deep Learning
  - 인공신경망
  - 딥러닝
category: ai
tags:
  - 딥러닝
  - ML기초
level: 1
related:
  - machine-learning
  - transformer
  - llm
  - gpu-cuda
  - training-inference
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

간단한 계산 층을 **여러 겹 쌓아** 복잡한 패턴을 배우는 모델.

## 비유

공장의 조립 라인. 첫 번째 사람은 선만 보고, 다음 사람은 선을 모아 모양을, 그다음은 모양을 모아 "고양이 귀"를 알아보는 식으로 단계마다 조금씩 더 복잡한 걸 알아본다.

## 예시

```python
import torch.nn as nn
model = nn.Sequential(
    nn.Linear(784, 128), nn.ReLU(),   # 1층: 픽셀 784개 → 특징 128개
    nn.Linear(128, 10),               # 2층: → 숫자 0~9 점수
)
```

손글씨 숫자 분류용 2층 신경망. 층을 수십 개 이상 깊게 쌓으면 "딥러닝" 이라 부르고, Qwen 같은 LLM 도 결국 이런 층을 수십 개 쌓은 것이다.

## 헷갈리기 쉬운 것

- **머신러닝**이 더 넓은 말. 결정 트리, 선형 회귀도 머신러닝이지만 신경망은 아니다.
- **Transformer** 는 신경망의 한 설계도(구조). 요즘 LLM 은 거의 다 이 구조로 만든다.
