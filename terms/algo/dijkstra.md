---
id: dijkstra
term: 다익스트라
aliases:
  - Dijkstra's Algorithm
  - 다익스트라 알고리즘
  - 데이크스트라
  - 최단 경로 알고리즘
category: algo
tags:
  - 그래프
  - 탐색
level: 3
kind: concept
related:
  - graph
  - bfs-dfs
  - heap
  - greedy
  - latency-bandwidth
  - bellman-ford
status: review
created: 2026-09-25
updated: 2026-09-29
---

## 한 줄 정의

선마다 비용이 다른 그래프에서 **한 점에서 모든 점까지 가장 싼 길**을 찾는 방법.

## 비유

**내비게이션의 최단 경로**. "지금까지 알려진 가장 가까운 동네" 를 하나씩 확정해 나가면서 그 동네 옆길들의 거리를 고쳐 적다 보면, 모든 곳의 최단 거리가 정해진다.

## 예시

```python
import heapq

def dijkstra(graph, start):
    dist, pq = {start: 0}, [(0, start)]              # (지금까지 거리, 노드)
    while pq:
        d, node = heapq.heappop(pq)                   # 가장 가까운 미확정 노드부터
        if d > dist.get(node, float("inf")): continue
        for nxt, w in graph[node]:
            if d + w < dist.get(nxt, float("inf")):
                dist[nxt] = d + w; heapq.heappush(pq, (d + w, nxt))
    return dist

net = {"lab": [("proxmox", 1), ("cloud", 10)], "proxmox": [("cloud", 2)], "cloud": []}
print(dijkstra(net, "lab"))   # {'lab': 0, 'proxmox': 1, 'cloud': 3} — 직행(10)보다 경유(1+2)가 쌈
```

라우터가 경로를 정하는 OSPF 프로토콜, 지도 앱 길찾기(의 변형), 네트워크 지연시간 기준 최적 경로 계산에 쓴다.

## 헷갈리기 쉬운 것

- **BFS**: 모든 선의 비용이 같을 때만 최단 경로가 된다. 비용이 다르면 BFS 의 큐를 힙으로 바꾼 것이 다익스트라.
- **음수 비용**: "한 번 확정한 거리는 더 안 줄어든다" 는 가정이라 음수 간선이 있으면 틀린다. 그럴 땐 벨만-포드 알고리즘.
- **그리디**: 다익스트라는 "지금 가장 가까운 것을 확정" 하는 그리디 알고리즘이면서, 그리디가 최적을 보장하는 드문 예다.
