---
id: bfs-dfs
term: BFS/DFS
aliases:
  - Breadth-First Search
  - Depth-First Search
  - 너비 우선 탐색
  - 깊이 우선 탐색
category: algo
tags:
  - 그래프
  - 탐색
level: 2
related:
  - graph
  - stack-queue
  - recursion
  - dijkstra
  - tree
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

그래프를 빠짐없이 도는 두 방법으로, **BFS 는 가까운 곳부터**, **DFS 는 한 길로 끝까지** 간다.

## 비유

낯선 동네에서 친구 집 찾기. BFS 는 **우리 집 근처부터 한 블록씩 넓혀** 가며 보고, DFS 는 **한 골목을 끝까지** 들어갔다가 막히면 되돌아 나와 다음 골목으로 간다.

## 예시

```python
from collections import deque

def bfs(graph, start):
    seen, queue = {start}, deque([start])
    while queue:
        node = queue.popleft()       # 큐에서 꺼냄 → 가까운 순서. 스택(pop)으로 바꾸면 DFS
        print(node)
        for nxt in graph[node]:
            if nxt not in seen: seen.add(nxt); queue.append(nxt)

related = {"rag": ["embedding", "llm"], "embedding": ["vector-db"], "llm": [], "vector-db": []}
bfs(related, "rag")                  # rag, embedding, llm, vector-db — 가까운 카드부터
```

Devpedia 에서 "두 카드가 related 로 몇 단계 만에 이어지는가" (최단 경로) 는 BFS 로, "이 카드에서 닿을 수 있는 카드 전부" 나 순환 찾기는 DFS 로 하면 된다.

## 헷갈리기 쉬운 것

- **BFS vs DFS 선택**: 간선 비용이 전부 같을 때 최단 경로는 BFS. 경로 존재 여부, 순환 검사, 미로 전부 훑기는 DFS(재귀로 쓰면 코드가 짧다). 그래프가 아주 깊으면 DFS 재귀는 스택 오버플로 위험이 있다.
- **다익스트라**: 간선마다 비용이 다를 때의 최단 경로. BFS 의 큐를 우선순위 큐(힙)로 바꾼 것으로 이해하면 된다.
