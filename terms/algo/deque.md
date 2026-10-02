---
id: deque
term: 덱(Deque)
aliases:
  - Deque
  - Double-Ended Queue
  - 양방향 큐
  - 데크
category: algo
tags:
  - 선형구조
  - 코딩테스트
level: 1
kind: concept
related:
  - stack-queue
  - linked-list
  - array
  - two-pointers
  - bfs-dfs
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

**앞뒤 양쪽 끝에서** 넣고 뺄 수 있는 큐.

## 비유

양쪽 문이 다 열리는 **지하철 칸**. 앞문으로도 뒷문으로도 타고 내릴 수 있지만, 칸 한가운데로 바로 끼어들 수는 없다.

## 예시

```python
from collections import deque

def max_sliding_window(nums, k):
    dq, out = deque(), []                # dq 에는 인덱스, 값은 내림차순 유지
    for i, x in enumerate(nums):
        while dq and nums[dq[-1]] <= x:  # 새 값보다 작은 건 뒤에서 버림
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:               # 창 밖으로 나간 인덱스는 앞에서 버림
            dq.popleft()
        if i >= k - 1:
            out.append(nums[dq[0]])      # 창의 최댓값은 항상 맨 앞
    return out

max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3)   # [3, 3, 5, 5, 6, 7]
```

`list.pop(0)` 은 앞 원소를 빼면 나머지를 전부 한 칸씩 당겨서 O(n) 이지만, `deque.popleft()` 는 O(1) 이다. 그래서 BFS 의 큐는 항상 `deque` 로 만든다. 위 슬라이딩 윈도우 최댓값도 창마다 `max` 를 다시 구하면 O(nk) 인데, 덱으로 O(n) 에 끝난다. 코딩테스트에선 "BFS 큐를 list 로 짜서 시간 초과" 가 흔한 실수이고, 면접에선 "리스트 대신 deque 를 쓰는 이유는?" 으로 나온다.

## 헷갈리기 쉬운 것

- **큐/스택**: 큐는 뒤로 넣고 앞으로만 빼고, 스택은 한쪽에서만 넣고 뺀다. 덱은 둘 다 되니 하나로 스택도 큐도 흉내 낸다.
- **연결 리스트**: 덱은 양 끝만 O(1) 이고 가운데 삽입은 안 된다고 보면 된다. 파이썬 `deque` 는 인덱스 접근도 되지만 가운데는 O(n) 이다.
- **배열(list)**: 뒤쪽 `append`/`pop` 은 둘 다 O(1) 이라 뒤만 쓰면 차이가 없고, 앞쪽을 건드릴 때만 덱이 이긴다.
