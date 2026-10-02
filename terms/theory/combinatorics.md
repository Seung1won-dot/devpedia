---
id: combinatorics
term: 경우의 수(순열·조합)
aliases:
  - Combinatorics
  - 순열
  - 조합
  - Permutation
  - Combination
  - nCr
category: theory
tags:
  - 이산수학
  - 코딩테스트
  - 복잡도
level: 1
kind: concept
related:
  - backtracking
  - big-o
  - coding-test-topics
  - modular-arithmetic
  - pigeonhole-principle
see_also:
  - https://docs.python.org/3/library/itertools.html
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

순서를 따지는 **순열**, 순서 없이 고르는 **조합** 등으로 가능한 경우를 세는 방법.

## 비유

**반장·부반장 뽑기 vs 청소 당번 뽑기**. 반장·부반장은 누가 어느 자리냐가 중요하니 순열, 청소 당번 두 명은 누가 뽑혔는지만 중요하니 조합이다.

## 예시

```python
from itertools import permutations, combinations, product
from math import perm, comb

print(perm(5, 2), comb(5, 2))               # 20 10
print(list(combinations("ABC", 2)))         # [('A','B'), ('A','C'), ('B','C')]
print(len(list(product([0, 1], repeat=3)))) # 8 = 2^3 (부분집합 수)
```

코테에서 완전탐색이 통할지 **먼저 세어 보는** 데 쓴다. N=10 순열은 10! ≈ 362만이라 가능하지만, N=20 이면 20! 은 약 2.4×10^18 이라 불가능하다. 부분집합 2^20 ≈ 100만은 가능, 2^40 은 불가능 — 이 감각이 백트래킹을 쓸지 DP 로 갈지 정하는 기준이 된다.

## 헷갈리기 쉬운 것

- **순열 vs 조합**: (A,B) 와 (B,A) 를 다르게 세면 순열, 같게 세면 조합. nPr = nCr × r!.
- **중복 조합/중복 순열**은 같은 것을 여러 번 고를 수 있는 경우다(`product`, `combinations_with_replacement`).
