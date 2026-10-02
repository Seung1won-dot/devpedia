---
id: entropy
term: 엔트로피 · 크로스 엔트로피
aliases:
  - Entropy
  - Cross Entropy
  - KL Divergence
  - 엔트로피
  - 크로스 엔트로피
  - 교차 엔트로피
category: math
tags:
  - 정보이론
  - 확률통계
  - ML기초
level: 3
kind: concept
related:
  - loss-function
  - mle
  - log-exp
  - classification-regression
  - probability-distribution
  - temperature
see_also:
  - https://pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

결과가 **얼마나 예측하기 어려운지**를 잰 값으로, 크로스 엔트로피는 예측이 정답과 어긋난 정도다.

## 비유

매일 맑은 사막의 일기예보는 들어도 새로울 게 없고(엔트로피 낮음), 변덕스러운 산 날씨는 매번 놀랍다(엔트로피 높음). 크로스 엔트로피는 **엉뚱한 예보관의 확률표로 실제 날씨를 맞히려 할 때** 겪는 놀람의 평균이다.

## 예시

```python
import numpy as np

p = np.array([0.5, 0.5])
print(-(p * np.log2(p)).sum())     # 1.0 비트: 공정한 동전

y = np.array([0, 1, 0])            # 정답: 2번 클래스
q = np.array([0.1, 0.7, 0.2])      # 모델 예측 확률
print(-(y * np.log(q)).sum())      # 0.357 = -ln(0.7)
```

엔트로피는 `H(p) = -Σ p·log p`, 크로스 엔트로피는 `H(p, q) = -Σ p·log q`. 정답이 원-핫이면 결국 "정답 클래스에 준 확률의 -log" 만 남고, 이것이 분류 모델의 손실이다(음의 로그 우도와 같은 식). 압축에서는 엔트로피가 "평균적으로 기호 하나에 최소 몇 비트가 필요한가" 의 하한이고, 결정 트리는 분할 후 엔트로피가 가장 많이 줄어드는(정보 이득) 질문을 고른다.

트레이드오프: 크로스 엔트로피는 확신하고 틀린 예측(정답 확률 0.001)을 매우 크게 벌하므로 학습 신호가 강하지만, 레이블이 틀린 데이터가 섞이면 그 샘플에 끌려간다. 레이블 노이즈가 많은 의료 데이터에는 레이블 스무딩 같은 완화책을 함께 검토한다.

## 헷갈리기 쉬운 것

- **PyTorch `nn.CrossEntropyLoss` 에는 softmax 전 값(logit)을 넣는다.** 내부에서 log-softmax 를 하므로, 직접 softmax 를 씌워 넣으면 학습이 이상하게 느려진다.
- **크로스 엔트로피 vs KL 발산**: `KL(p‖q) = H(p, q) - H(p)`. 정답 분포 p 가 고정이면 H(p) 는 상수라 둘을 최소화하는 결과가 같다.
- **열역학 엔트로피**와 이름·식 모양은 닮았지만, 여기서는 확률 분포의 불확실성을 재는 정보 이론 개념이다.
