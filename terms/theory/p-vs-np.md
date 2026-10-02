---
id: p-vs-np
term: P vs NP
aliases:
  - P versus NP
  - P-NP 문제
  - 다항 시간
  - Polynomial Time
category: theory
tags:
  - 계산이론
  - 복잡도
  - 면접
level: 3
kind: concept
related:
  - big-o
  - np-complete
  - halting-problem
  - turing-machine
  - encryption
see_also:
  - https://www.claymath.org/millennium/p-vs-np/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

**답 검증이 빠른 문제**는 모두 **답 찾기도 빠른가**를 묻는 계산 이론 최대 미해결 문제.

## 비유

**스도쿠**. 다 채운 판이 맞는지 확인은 1분이면 되지만, 빈 판을 푸는 건 몇 시간이 걸릴 수 있는데, "확인이 쉬우면 풀기도 사실 쉬운 거 아냐?" 가 P vs NP 질문이다.

## 예시

```python
from itertools import combinations
nums, target = [3, 34, 4, 12, 5, 2], 9

# 검증: 후보 답이 주어지면 O(n) — NP 의 조건
def verify(subset): return sum(subset) == target
print(verify([4, 5]))                     # True

# 찾기: 알려진 일반 해법은 부분집합 2^n 개를 뒤져야 함
found = next(c for r in range(len(nums) + 1)
             for c in combinations(nums, r) if sum(c) == target)
```

**P** 는 다항 시간(O(n²), O(n³) 등)에 풀리는 문제, **NP** 는 답이 주어지면 다항 시간에 검증되는 문제다. P ⊆ NP 는 확실하지만 P = NP 인지는 아무도 증명하지 못했다. 실무 의미: 현대 암호는 "소인수분해 같은 문제는 빠르게 못 푼다"는 가정에 기대고 있어, 만약 P = NP 가 실용적 알고리즘과 함께 증명되면 흔들린다. 대부분 연구자는 P ≠ NP 라고 믿고, 그래서 어려운 문제엔 정확해 대신 근사·휴리스틱을 택하는 트레이드오프가 표준이다.

## 헷갈리기 쉬운 것

- **NP 는 "Non-Polynomial" 이 아니다**. Nondeterministic Polynomial(비결정적 다항 시간)의 약자이고, P 문제도 전부 NP 에 속한다.
- **Big-O** 는 특정 알고리즘의 비용, P/NP 는 **문제 자체**의 난이도 분류다.
