---
id: binary-search
term: 이진 탐색
aliases:
  - Binary Search
  - 이분 탐색
  - 이진탐색
  - 바이너리 서치
category: algo
tags:
  - 탐색
  - 복잡도
level: 1
kind: concept
related:
  - sorting
  - big-o
  - array
  - binary-search-tree
  - commit-branch-merge
see_also:
  - "https://docs.python.org/3/library/bisect.html"
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**정렬된** 목록의 한가운데를 보고 절반을 버리는 일을 반복해 찾는 방법.

## 비유

**업다운 게임**. 1~100 사이 숫자를 맞힐 때 50, 25, 12… 하고 절반씩 좁히면 아무리 운이 나빠도 7번 안에 맞힌다.

## 예시

```python
def binary_search(sorted_list, target):
    lo, hi = 0, len(sorted_list) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if sorted_list[mid] == target: return mid
        if sorted_list[mid] < target:  lo = mid + 1      # 오른쪽 절반만 남김
        else:                          hi = mid - 1      # 왼쪽 절반만 남김
    return -1

ids = ["array", "bfs-dfs", "big-o", "graph", "heap"]     # 반드시 정렬돼 있어야 함
print(binary_search(ids, "graph"))                       # 3 — 카드 100만 장이어도 20번이면 끝
```

파이썬은 `bisect` 모듈이 이걸 해 주고, `git bisect` 는 "어느 커밋에서 버그가 생겼나" 를 커밋 기록에 이진 탐색으로 찾는다.

## 헷갈리기 쉬운 것

- **선형 탐색**: 앞에서부터 하나씩 보는 것(O(n)). 정렬이 안 돼 있거나 한 번만 찾을 거면 그냥 이게 낫다(정렬 비용이 더 크다).
- **이진 탐색 트리**: 같은 "절반 버리기" 를, 값을 자주 넣고 빼는 상황에서도 쓸 수 있게 트리로 만든 자료구조.
- **해시 테이블**: 정확히 같은 키를 찾는 건 해시가 더 빠르지만(O(1)), "이 값 이상인 첫 번째" 같은 범위 질문은 이진 탐색만 된다.
