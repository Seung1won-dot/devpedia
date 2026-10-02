---
id: dynamic-programming
term: 동적 프로그래밍
aliases:
  - Dynamic Programming
  - DP
  - 동적 계획법
category: algo
tags:
  - DP
  - 복잡도
level: 3
kind: concept
related:
  - recursion
  - greedy
  - big-o
  - hash-table
  - cache
  - memoization
  - recurrence-relation
see_also:
  - "https://docs.python.org/3/library/functools.html#functools.lru_cache"
status: review
created: 2026-09-25
updated: 2026-10-03
---

## 한 줄 정의

큰 문제를 **겹치는 작은 문제들로 쪼개고, 한 번 푼 답은 저장해** 다시 쓰는 방법.

## 비유

**계산 결과를 적어 둔 메모장**. 같은 곱셈이 또 나오면 다시 계산하지 않고 메모를 보고, 그 메모들을 쌓아 올려 마지막 답을 만든다.

## 예시

```python
from functools import lru_cache

@lru_cache(maxsize=None)                      # 한 번 푼 (a, b) 는 저장 → 같은 계산을 반복하지 않음
def edit_distance(a, b):
    if not a or not b: return len(a) + len(b)             # 종료 조건
    if a[0] == b[0]:   return edit_distance(a[1:], b[1:])
    return 1 + min(edit_distance(a[1:], b),               # 삭제
                   edit_distance(a, b[1:]),               # 삽입
                   edit_distance(a[1:], b[1:]))           # 교체

print(edit_distance("dijkstra", "dikstra"))   # 1 — 검색어 오타 허용(fuzzy) 에 쓰는 편집 거리
```

저장 없이 재귀만 하면 같은 부분 문제를 수천 번 다시 풀어 지수 시간이 걸리지만, 메모 덕에 O(n·m) 이 된다. Devpedia 검색의 오타 허용(MiniSearch `fuzzy`) 이 이런 편집 거리 기준이다.

## 헷갈리기 쉬운 것

- **톱다운 vs 보텀업**: 같은 DP. 위처럼 재귀에 `lru_cache` 를 붙이면 톱다운, 작은 경우부터 표를 채워 올라가면 보텀업(재귀 깊이 문제가 없다).
- **분할 정복**: 병합 정렬처럼 쪼개기는 같지만 작은 문제가 서로 겹치지 않아 저장할 게 없다. 겹쳐야 DP.
- **그리디**: 매 단계 최선만 고르고 되돌아보지 않는다. DP 는 모든 선택지를 (저장해 가며) 다 본다.
