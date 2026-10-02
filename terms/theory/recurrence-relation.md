---
id: recurrence-relation
term: 점화식
aliases:
  - Recurrence Relation
  - 재귀 관계식
  - 마스터 정리
  - Master Theorem
category: theory
tags:
  - 이산수학
  - DP
  - 복잡도
level: 2
kind: concept
related:
  - dynamic-programming
  - divide-and-conquer
  - big-o
  - recursion
  - proof-by-induction
  - memoization
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

수열의 n 번째 값을 **앞 항들로 표현한 식**으로, DP 와 재귀 비용 분석의 뼈대.

## 비유

**계단 오르기 규칙**. "n 번째 칸에 가는 방법 = n-1 칸에서 한 칸 + n-2 칸에서 두 칸" 처럼, 이번 칸을 바로 앞 칸들로 설명하는 레시피다.

## 예시

```python
# 1) 답을 구하는 점화식 (DP): f(n) = f(n-1) + f(n-2)
def stairs(n):
    a, b = 1, 1
    for _ in range(n):
        a, b = b, a + b
    return a
print(stairs(10))  # 89
```

2) **비용을 구하는 점화식**: 병합 정렬은 반으로 나눠 두 번 풀고 합치는 데 n 이 드니 T(n) = 2T(n/2) + n → O(n log n). 이진 탐색은 T(n) = T(n/2) + 1 → O(log n). 이런 꼴 `T(n) = aT(n/b) + f(n)` 은 **마스터 정리**로 바로 답을 읽는다. DP 문제를 풀 때 "점화식부터 세운다"는 말은 상태와 이 관계식을 먼저 정한다는 뜻이다.

## 헷갈리기 쉬운 것

- **점화식 vs 일반항**: 점화식은 "앞 항으로부터", 일반항은 n 만 넣으면 바로 나오는 닫힌 식.
- 같은 점화식이라도 재귀로 그대로 짜면 지수 시간, **메모이제이션/반복문**으로 짜면 선형 시간이다.
