---
id: big-o
term: 시간 복잡도/Big-O
aliases:
  - Big-O Notation
  - 빅오 표기법
  - 시간 복잡도
  - 점근 표기법
category: algo
tags:
  - 복잡도
  - 면접
level: 1
kind: metric
related:
  - sorting
  - binary-search
  - hash-table
  - n-plus-one
  - index
  - space-complexity
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

입력이 커질 때 **걸리는 시간이 얼마나 빨리 늘어나는지**를 나타내는 표기.

## 비유

**손님 수에 따른 일거리**. 손님이 10배 와도 명단 맨 위만 보면 되면 O(1), 전원에게 인사하면 O(n), 모든 손님끼리 악수시키면 O(n²)이다.

## 예시

```python
ids = ["array", "graph", "heap", "tree"]            # n = 4
id_set = set(ids)

"heap" in ids                          # O(n)       — 앞에서부터 하나씩 비교
"heap" in id_set                       # O(1)       — 해시 테이블, n 이 커져도 거의 그대로
sorted(ids)                            # O(n log n)
[(a, b) for a in ids for b in ids]     # O(n²)      — 모든 쌍
```

카드 1천 장에 0.1초 걸리던 작업이 1만 장이 되면 O(n) 은 1초, O(n²) 은 10초가 된다. "n 이 10배면 시간은 몇 배?" 가 Big-O 가 답하는 질문이다.

## 헷갈리기 쉬운 것

- **실제 실행 시간**: Big-O 는 상수를 무시한다. n 이 작으면 O(n²) 알고리즘이 O(n log n) 보다 빠를 수 있고, 그래서 파이썬 정렬도 짧은 구간은 삽입 정렬을 쓴다.
- **공간 복잡도**: 같은 표기로 "메모리를 얼마나 쓰는지" 도 잰다. 시간을 줄이려고 메모리를 더 쓰는 맞바꾸기(DP 의 메모이제이션 등)가 흔하다.
- **N+1 문제**: DB 에서 목록 1번 + 항목마다 1번씩 쿼리하는 O(n) 쿼리 패턴. Big-O 감각이 있으면 바로 냄새를 맡는다.
