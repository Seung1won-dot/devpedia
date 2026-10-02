---
id: log-exp
term: 로그 · 지수
aliases:
  - Logarithm
  - Exponential
  - log
  - exp
  - 로그
  - 지수 함수
category: math
tags:
  - 미적분
  - 복잡도
  - 흔한실수
level: 1
kind: concept
related:
  - big-o
  - binary-search
  - entropy
  - mle
  - temperature
  - floating-point
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

**곱셈을 덧셈으로, 덧셈을 곱셈으로** 바꿔 주는, 서로 거꾸로인 두 함수.

## 비유

지수는 "한 번 접을 때마다 두께가 2배" 인 종이 접기, 로그는 반대로 "이 두께가 되려면 **몇 번 접어야 하나**" 를 세는 것이다.

## 예시

```python
import numpy as np

print(np.log2(1_000_000))          # 19.93 → 100만 개 이진 탐색은 최대 약 20번
print(np.log(np.e))                # 1.0   np.log 는 자연로그(ln)
print(1_000_000 * 1.05 ** 10)      # 1628894.6  연 5% 복리 10년

probs = np.full(1000, 0.01)
print(np.prod(probs))              # 0.0   작은 확률 1000개 곱 → 언더플로
print(np.log(probs).sum())         # -4605.17  로그로 더하면 안전
```

CS 에서 로그는 세 군데서 자주 만난다. ① 반씩 줄이는 알고리즘(이진 탐색, 균형 트리)의 `O(log n)`. ② 확률 계산: 작은 확률을 곱하면 0이 되어 버리니 로그를 씌워 더한다(로그 우도, 크로스 엔트로피). ③ softmax: `exp(z_i) / Σ exp(z_j)` 로 점수를 양수 확률로 바꾸며, 큰 값에서 넘치지 않게 최댓값을 빼고 계산한다.

## 헷갈리기 쉬운 것

- **`log` 의 밑**: 수학책·NumPy·PyTorch 의 `log` 는 자연로그(밑 e), 정보 이론은 밑 2(비트), 공학 계산기는 밑 10인 경우가 많다. Big-O 에서는 밑이 상수배 차이라 신경 쓰지 않는다.
- **지수 증가 vs 다항 증가**: `2ⁿ` 은 `n¹⁰⁰` 보다도 결국 훨씬 빨리 커진다. 완전탐색이 금방 안 끝나는 이유.
- **로그 변환**: 치우친 데이터(검사 수치, 소득)에 `np.log1p` 를 씌우면 분포가 펴진다. 0이 있으면 `log` 대신 `log1p` 를 쓴다.
