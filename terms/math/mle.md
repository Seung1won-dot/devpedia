---
id: mle
term: 최대우도추정(MLE)
aliases:
  - Maximum Likelihood Estimation
  - MLE
  - 최대우도추정
  - 최우추정
  - 우도
category: math
tags:
  - 확률통계
  - ML기초
  - 학습
level: 3
kind: concept
related:
  - loss-function
  - entropy
  - probability-distribution
  - log-exp
  - overfitting
  - bayes-theorem
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

관측한 데이터가 **나올 확률을 가장 크게 만드는** 파라미터를 고르는 추정 방법.

## 비유

범죄 현장 증거를 보고 "누가 범인이라면 이 증거가 **가장 그럴듯하게** 남았을까" 를 따져 용의자를 고르는 것. 데이터는 고정이고, 바꿔 보는 건 가설(파라미터) 쪽이다.

## 예시

```python
import numpy as np

# 동전 10번 중 앞면 7번. 앞면 확률 p 는 얼마일까?
p = np.linspace(0.01, 0.99, 99)
log_lik = 7 * np.log(p) + 3 * np.log(1 - p)   # 로그 우도
print(p[log_lik.argmax()])                     # ≈ 0.7
```

우도는 `L(θ) = P(데이터 | θ)`. 곱셈이 너무 작아지니 로그를 씌워 더하고, 최대화 대신 부호를 바꿔 **음의 로그 우도(NLL)를 최소화**한다 — 이게 바로 손실 함수다. 출력이 정규분포 노이즈를 가진다고 가정하면 NLL 이 MSE 가 되고, 베르누이(0/1)라고 가정하면 이진 크로스 엔트로피가 된다. "왜 회귀는 MSE, 분류는 크로스 엔트로피인가" 의 답이 여기 있다.

트레이드오프: MLE 는 데이터가 많으면 가장 효율적인 추정이지만, 적으면 그대로 과적합한다. 동전 3번이 모두 앞면이면 `p = 1` 이라고 답하는 식이다. 그래서 사전 지식을 더한 **MAP**(= MLE + 규제)를 쓰거나 L2 규제·데이터 증강으로 보완한다.

## 헷갈리기 쉬운 것

- **확률 vs 우도**: 확률은 파라미터를 고정하고 데이터를 바꿔 보는 것, 우도는 데이터를 고정하고 파라미터를 바꿔 보는 것. 같은 식을 반대 방향으로 읽는다. 우도는 합이 1이 아니다.
- **MLE vs MAP**: MAP 는 `P(θ | 데이터)` 를 최대화하며 사전 분포를 곱한다. 가중치에 정규분포 사전을 두면 L2 규제(weight decay)와 같아진다.
