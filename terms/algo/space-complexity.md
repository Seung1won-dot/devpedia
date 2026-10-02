---
id: space-complexity
term: 공간 복잡도
aliases:
  - Space Complexity
  - 메모리 복잡도
  - 공간복잡도
  - 보조 공간
category: algo
tags:
  - 복잡도
  - 메모리
level: 1
kind: metric
related:
  - big-o
  - recursion
  - dynamic-programming
  - sorting
  - stack-heap-memory
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

입력이 커질 때 **추가로 쓰는 메모리**가 얼마나 빨리 늘어나는지를 나타내는 표기.

## 비유

**요리할 때 필요한 조리대 넓이**. 손님이 2배가 되면 그릇을 2배로 늘어놓아야 하는 요리(O(n))가 있고, 냄비 하나로 계속 볶으면 되는 요리(O(1))가 있다.

## 예시

```python
def fib_recursive(n):                     # 시간 O(2^n), 공간 O(n) — 재귀 깊이만큼 스택
    return n if n < 2 else fib_recursive(n - 1) + fib_recursive(n - 2)

def fib_table(n):                         # 시간 O(n), 공간 O(n) — DP 테이블
    dp = [0, 1] + [0] * (n - 1)
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

def fib_rolling(n):                       # 시간 O(n), 공간 O(1) — 직전 두 값만 유지
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

같은 문제라도 재귀는 호출 깊이만큼 스택을 먹고(파이썬은 기본 1000 깊이에서 `RecursionError`), DP 는 표 크기만큼, 롤링 방식은 상수만 쓴다. 정렬도 마찬가지로 병합 정렬은 O(n) 의 임시 배열이 필요하고, 힙 정렬은 제자리(in-place)라 O(1) 이다. 코딩테스트 메모리 제한(보통 128~512MB)에 `int` 1억 개짜리 2차원 DP 표를 잡으면 바로 터지고, 면접에선 "이 재귀의 공간 복잡도는?", "시간과 공간을 맞바꾼 경험은?" 으로 나온다.

## 헷갈리기 쉬운 것

- **시간 복잡도**: 같은 Big-O 표기지만 재는 대상이 다르다. 메모이제이션처럼 공간을 더 써서 시간을 줄이는 맞바꾸기(trade-off)가 흔하다.
- **입력 자체의 크기**: 보통 공간 복잡도는 입력을 뺀 **추가 공간**(auxiliary space)만 센다. 배열 하나를 받아 제자리 정렬하면 O(1) 이라고 말한다.
- **재귀의 숨은 공간**: 코드에 배열이 없어도 재귀 깊이만큼 호출 스택을 쓴다. DFS 를 재귀로 짜면 깊이 n 에 O(n) 이다.
