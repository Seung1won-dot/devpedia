---
id: bellman-ford
term: 벨만-포드
aliases:
  - Bellman-Ford Algorithm
  - 벨만 포드 알고리즘
  - 벨만포드
  - 음수 가중치 최단 경로
category: algo
tags:
  - 그래프
  - DP
level: 3
kind: concept
related:
  - dijkstra
  - graph
  - floyd-warshall
  - dynamic-programming
  - adjacency-matrix-list
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

**음수 비용이 있어도** 한 점에서 모든 점까지 최단 경로를 구하고, 음수 순환도 잡아내는 방법.

## 비유

**택배 요금표 고쳐 쓰기**. 모든 구간을 "이 경유지를 거치면 더 싸지나" 로 정점 수만큼 반복해서 고쳐 적으면, 할인 쿠폰(음수 비용) 구간이 섞여 있어도 마지막 표는 맞는다.

## 예시

```python
def bellman_ford(V, edges, src):            # edges: [(u, v, w), ...]
    INF = float("inf")
    dist = [INF] * V
    dist[src] = 0
    for _ in range(V - 1):                  # 최단 경로의 간선 수는 최대 V-1
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w       # 완화(relax)
    for u, v, w in edges:                   # 한 바퀴 더 돌아도 줄어들면 음수 사이클
        if dist[u] != INF and dist[u] + w < dist[v]:
            return None
    return dist

bellman_ford(3, [(0, 1, 4), (0, 2, 5), (2, 1, -3)], 0)   # [0, 2, 5]
```

간선 E 개를 V-1 번 훑으니 O(VE) 로, 힙 다익스트라의 O(E log V) 보다 느리지만 음수 간선이 있어도 맞는 답을 낸다. 위 예시에서 정점을 하나씩 확정하는 다익스트라는 0→1 을 4 로 확정해 버리지만, 실제 최단은 0→2→1 = 2 다. 코딩테스트에선 "타임머신(음수 간선)", "웜홀(음수 사이클이 있으면 YES)" 류가 대표 문제이고, 면접에선 "다익스트라는 음수 가중치에서 왜 실패하고 벨만-포드는 왜 되는가?" 로 나온다.

## 헷갈리기 쉬운 것

- **다익스트라**: 한 번 확정한 정점은 다시 안 본다는 그리디 가정 때문에 음수 간선이 있으면 깨진다. 벨만-포드는 확정 없이 V-1 번 전부 완화하니 안전하지만 느리다.
- **음수 간선 vs 음수 사이클**: 음수 간선은 벨만-포드로 풀리지만, 음수 사이클이 있으면 돌수록 비용이 줄어 "최단" 이 정의되지 않는다. V 번째 바퀴에도 갱신되면 사이클 존재로 판정한다.
- **플로이드-워셜**: 벨만-포드는 출발점 하나, 플로이드-워셜은 모든 쌍이다. 둘 다 음수 간선은 허용하고 음수 사이클은 검출만 한다.
