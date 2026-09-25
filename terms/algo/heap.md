---
id: heap
term: 힙
aliases:
  - Heap
  - 우선순위 큐
  - Priority Queue
  - 최소 힙/최대 힙
category: algo
tags:
  - 트리
  - 정렬
level: 2
related:
  - tree
  - stack-queue
  - dijkstra
  - scheduler
  - stack-heap-memory
see_also:
  - "https://docs.python.org/3/library/heapq.html"
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

부모가 항상 자식보다 작게(또는 크게) 유지해 **가장 작은 값을 바로 꺼내는** 트리.

## 비유

**응급실 대기**. 온 순서가 아니라 위급한 사람부터 부르는데, 전체를 줄 세우지 않고 "지금 제일 급한 한 명" 만 항상 맨 앞에 두면 된다.

## 예시

```python
import heapq

jobs = []                                    # (우선순위, 작업) — 숫자가 작을수록 급함
heapq.heappush(jobs, (3, "배치 임베딩"))
heapq.heappush(jobs, (1, "논문 마감 실험"))
heapq.heappush(jobs, (2, "모델 평가"))
print(heapq.heappop(jobs))                   # (1, '논문 마감 실험') — 넣고 빼는 데 O(log n)
```

다익스트라의 "다음에 볼 가장 가까운 노드", OS 스케줄러의 우선순위, GPU 서버 작업 큐가 전부 이것. 트리지만 배열 하나로 구현된다(i 의 자식은 2i+1, 2i+2).

## 헷갈리기 쉬운 것

- **스택/힙 메모리**의 힙: 이름만 같고 전혀 다르다. 그쪽은 동적으로 할당하는 메모리 영역이고, 이쪽은 자료구조.
- **이진 탐색 트리**: BST 는 아무 값이나 찾을 수 있고, 힙은 최솟값(최댓값)만 빠르게 꺼낼 수 있는 대신 더 가볍다.
- **정렬된 배열**: 매번 전체를 다시 정렬하면 O(n log n)이지만, 힙은 하나 넣고 빼는 데 O(log n)이면 된다.
