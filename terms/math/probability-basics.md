---
id: probability-basics
term: 확률 · 조건부 확률
aliases:
  - Probability
  - Conditional Probability
  - 확률
  - 조건부 확률
  - P(A|B)
category: math
tags:
  - 확률통계
  - ML기초
level: 1
kind: concept
related:
  - bayes-theorem
  - random-variable
  - probability-distribution
  - combinatorics
  - set-relation
  - correlation-causation
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

어떤 일이 일어날 **가능성을 0~1 사이 숫자**로 나타낸 것과, 조건이 붙었을 때의 그 값.

## 비유

전교생 중 안경 쓴 비율이 확률이라면, **"3학년 중에서"** 안경 쓴 비율이 조건부 확률이다. 보는 무리를 좁히면 비율이 달라진다.

## 예시

```python
import numpy as np

rng = np.random.default_rng(0)
dice = rng.integers(1, 7, size=100_000)

print((dice == 6).mean())          # P(6) ≈ 0.167
even = dice % 2 == 0
print((dice[even] == 6).mean())    # P(6 | 짝수) ≈ 0.333
```

조건부 확률 공식은 `P(A|B) = P(A∩B) / P(B)` — "B 인 경우들만 모아 놓고 그중 A 의 비율" 이다. pandas 로 `df[df.sex == "F"].diabetes.mean()` 을 구하면 그게 곧 `P(당뇨 | 여성)` 의 추정치다. 분류 모델이 내놓는 점수도 `P(질환 | 이 입력)` 을 흉내 낸 값이다.

## 헷갈리기 쉬운 것

- **`P(A|B)` vs `P(B|A)`**: "폐암 환자 중 흡연자 비율" 과 "흡연자 중 폐암 비율" 은 전혀 다르다. 둘을 바꿔 읽는 실수를 바로잡는 도구가 베이즈 정리다.
- **독립 vs 배반**: 독립은 `P(A∩B) = P(A)·P(B)` (서로 영향 없음), 배반은 `P(A∩B) = 0` (동시에 못 일어남). 배반인 두 사건은 오히려 강하게 의존한다.
- 시뮬레이션 비율(빈도)은 확률의 **추정치**일 뿐이다. 표본이 적으면 크게 흔들린다.
