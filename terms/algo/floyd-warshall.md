---
id: floyd-warshall
term: 플로이드-워셜
aliases:
  - Floyd-Warshall Algorithm
  - 플로이드 워셜
  - 플로이드
  - 모든 쌍 최단 경로
category: algo
tags:
  - 그래프
  - DP
level: 3
kind: concept
related:
  - dijkstra
  - bellman-ford
  - dynamic-programming
  - adjacency-matrix-list
  - graph
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

**모든 정점 쌍** 사이의 최단 거리를 3중 반복문 하나로 한꺼번에 구하는 방법.

## 비유

**도시 간 거리표**를 채우는데, "경유지 k 를 거치면 더 가까워지나?" 를 경유지 후보를 하나씩 늘려 가며 표 전체에 대해 갱신하는 것이다.

## 예시

```python
INF = float("inf")
dist = [[0, 4, INF, 1],           # dist[i][j] = i→j 직행 비용, 없으면 INF
        [INF, 0, 2, INF],
        [INF, INF, 0, INF],
        [INF, 1, INF, 0]]
V = len(dist)

for k in range(V):                # 경유지 k — 반드시 가장 바깥 루프
    for i in range(V):
        for j in range(V):
            if dist[i][k] + dist[k][j] < dist[i][j]:
                dist[i][j] = dist[i][k] + dist[k][j]

dist[0][2]      # 4: 0→3→1→2 (1 + 1 + 2), 직행 쪽 0→1→2 는 6
```

점화식은 "k 까지의 정점만 경유해 i→j 로 가는 최단 = min(k 를 안 거침, i→k + k→j)" 이라 DP 다. O(V³) 이니 정점이 수백 개 이하일 때만 쓰고, 그 대신 코드가 다섯 줄이고 음수 간선도 되며 끝나고 `dist[i][i] < 0` 이면 음수 사이클이다. 코딩테스트에선 "모든 도시 쌍의 최소 비용", "케빈 베이컨의 6단계 법칙", "경로 복원(next 배열)" 이 단골이고, 면접에선 "왜 k 루프가 가장 바깥이어야 하는가?" 를 묻는다.

## 헷갈리기 쉬운 것

- **다익스트라 V 번 돌리기**: 음수 간선이 없다면 O(V·E log V) 로 희소 그래프에선 이게 더 빠르다. 플로이드-워셜은 밀집 그래프거나 V 가 작고 코드를 빨리 짜야 할 때 유리하다.
- **벨만-포드**: 출발점 하나에 O(VE). 플로이드-워셜은 모든 쌍에 O(V³) 이고, 둘 다 음수 간선 허용에 음수 사이클은 검출만 된다.
- **루프 순서**: i, j 를 바깥에 두면 아직 안 만든 경유 경로를 참조해 틀린 답이 나온다. k 가 바깥이어야 "k 까지 써서 만든 표" 가 단계별로 완성된다.
