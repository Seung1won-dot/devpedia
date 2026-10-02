---
id: topological-sort
term: 위상 정렬
aliases:
  - Topological Sort
  - 위상정렬
  - "Kahn's Algorithm"
  - 칸 알고리즘
category: algo
tags:
  - 그래프
  - 정렬
level: 2
kind: concept
related:
  - graph
  - bfs-dfs
  - deque
  - docker-compose
  - ci-cd
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

"A 를 먼저 해야 B 를 할 수 있다" 는 **선후 관계를 모두 지키는 순서**로 작업을 줄 세우는 것.

## 비유

**졸업까지 수강 순서 짜기**. 선수과목이 없는 과목부터 듣고, 들을 때마다 그 과목을 선수로 요구하던 과목들의 "남은 선수과목 수" 를 하나씩 줄여 0 이 된 과목을 다음 학기에 넣는다.

## 예시

```python
from collections import deque
def topo_sort(V, edges):                     # edges: (a, b) = a 다음에 b
    adj, indeg = [[] for _ in range(V)], [0] * V
    for a, b in edges:
        adj[a].append(b); indeg[b] += 1
    q = deque(i for i in range(V) if indeg[i] == 0)   # 선행 작업 없는 것부터
    order = []
    while q:
        cur = q.popleft(); order.append(cur)
        for nxt in adj[cur]:
            indeg[nxt] -= 1                  # 선행 하나 끝남
            if indeg[nxt] == 0: q.append(nxt)
    return order if len(order) == V else None   # 못 다 꺼냈으면 사이클

topo_sort(4, [(0, 1), (0, 2), (1, 3), (2, 3)])   # [0, 1, 2, 3]
```

`docker compose up` 이 `depends_on` 을 보고 Postgres → 백엔드 → Caddy 순으로 띄우는 것, GitHub Actions 의 `needs:` 가 job 순서를 잡는 것, 패키지 매니저가 의존성 설치 순서를 정하는 것이 모두 위상 정렬이다. 사이클(A→B→A)이 있으면 진입 차수가 0 이 되는 정점이 더 안 나와 전부 못 꺼내니, 그 자체로 순환 의존성 검출이 된다. 코딩테스트에선 "줄 세우기", "선수과목(최소 학기 수)", "게임 개발(건물 완성 최소 시간)" 이 단골이고, 면접에선 "위상 정렬이 가능한 그래프의 조건은?", "결과가 여러 개일 수 있는 이유는?" 이 나온다.

## 헷갈리기 쉬운 것

- **일반 정렬**: 값의 크기 순이 아니라 "먼저/나중" 관계만 지킨다. 관계없는 두 작업은 어느 순서든 되니 답이 여러 개일 수 있다.
- **DAG 조건**: 방향이 있고 사이클이 없는 그래프(DAG)에서만 된다. 무방향이거나 순환이 있으면 정의되지 않는다.
- **Kahn vs DFS 방식**: Kahn 은 진입 차수 + 큐로 위처럼 짜고, DFS 방식은 후위 순회 순서를 뒤집는다. 둘 다 O(V+E) 이고, 사이클 검출은 Kahn 이 "길이 확인" 으로 더 직관적이다.
