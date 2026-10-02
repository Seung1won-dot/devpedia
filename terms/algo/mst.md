---
id: mst
term: 최소 신장 트리(크루스칼/프림)
aliases:
  - Minimum Spanning Tree
  - MST
  - 최소 스패닝 트리
  - 크루스칼 알고리즘
  - 프림 알고리즘
category: algo
tags:
  - 그래프
  - 탐색
level: 3
kind: concept
related:
  - graph
  - union-find
  - heap
  - greedy
  - dijkstra
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

그래프의 **모든 정점을 가장 싼 비용으로 빠짐없이 잇는** 간선 묶음.

## 비유

**마을 여러 곳에 수도관 깔기**. 모든 집에 물은 가야 하지만 관은 최대한 짧게, 그리고 빙 돌아 제자리로 오는 관(사이클)은 낭비니 안 깐다.

## 예시

```python
def kruskal(V, edges):                      # edges: [(w, u, v), ...]
    parent = list(range(V))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]   # 경로 압축
            x = parent[x]
        return x
    total = 0
    for w, u, v in sorted(edges):           # 1) 간선을 싼 순서로
        ru, rv = find(u), find(v)
        if ru != rv:                        # 2) 사이클이 안 생기면 채택
            parent[ru] = rv
            total += w
    return total
kruskal(4, [(1, 0, 1), (4, 0, 2), (2, 1, 2), (3, 2, 3), (5, 1, 3)])   # 6
```

크루스칼은 간선을 정렬해 싼 것부터 넣되 유니온 파인드로 사이클을 막고(O(E log E)), 프림은 아무 정점에서 시작해 "지금 트리에 닿아 있는 간선 중 제일 싼 것" 을 힙에서 꺼내 정점을 하나씩 늘린다(O(E log V)). 프림은 코드 모양이 다익스트라와 거의 같은데, 힙에 넣는 값이 "출발점부터의 누적 거리" 냐 "그 간선 하나의 비용" 이냐가 다르다. 코딩테스트에선 "최소 비용으로 모든 도시 연결", "도시 분할 계획(MST 에서 가장 비싼 간선 하나 빼기)" 이 단골이고, 면접에선 "크루스칼과 프림은 언제 각각 유리한가?" 가 나온다.

## 헷갈리기 쉬운 것

- **크루스칼 vs 프림**: 크루스칼은 간선 중심이라 간선이 적은 희소 그래프에, 프림은 정점 중심이라 밀집 그래프에 유리하다. 둘 다 그리디이고 답의 총 비용은 같다.
- **다익스트라**: 다익스트라는 "한 점에서 각 점까지의 거리" 를, MST 는 "전체를 잇는 총 비용" 을 최소화한다. MST 위의 두 점 사이 경로가 최단 경로라는 보장은 없다.
- **신장 트리**: 사이클 없이 모든 정점을 잇기만 하면 신장 트리이고, 그중 비용 합이 최소인 게 MST 다. 간선은 항상 V-1 개다.
