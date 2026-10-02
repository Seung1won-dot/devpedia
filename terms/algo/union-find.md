---
id: union-find
term: 유니온 파인드
aliases:
  - Union-Find
  - Disjoint Set
  - 서로소 집합
  - 분리 집합
  - 유니온파인드
category: algo
tags:
  - 그래프
  - 트리
level: 2
kind: concept
related:
  - mst
  - graph
  - tree
  - bfs-dfs
  - recursion
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

**같은 그룹인지 확인**하고 **두 그룹을 합치는** 일을 거의 O(1) 에 하는 자료구조.

## 비유

**동아리 회장 찾기**. 각자 "내 소개자" 만 기억하니 소개자를 따라 올라가면 회장이 나오고, 회장이 같으면 같은 동아리이며, 두 동아리를 합칠 땐 한쪽 회장이 다른 회장을 소개자로 삼으면 끝이다.

## 예시

```python
class UnionFind:
    def __init__(self, n):
        self.parent, self.rank = list(range(n)), [0] * n

    def find(self, x):                          # 대표(루트) 찾기
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])   # 경로 압축: 루트에 바로 붙임
        return self.parent[x]
    def union(self, a, b):                      # 랭크가 낮은 트리를 높은 쪽 밑에
        ra, rb = self.find(a), self.find(b)
        if ra == rb: return False               # 이미 같은 집합 = 이 간선은 사이클
        if self.rank[ra] < self.rank[rb]: ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]: self.rank[ra] += 1
        return True
```

경로 압축과 랭크 기준 합치기를 같이 쓰면 연산 하나가 사실상 상수 시간(역 아커만 함수 α(n))이다. 간선을 하나씩 `union` 하다가 `False` 가 나오면 그 간선이 사이클을 만든다는 뜻이라 크루스칼의 핵심 부품이 되고, "친구의 친구" 식 네트워크 묶기나 섬 개수 세기에도 그대로 쓴다. 코딩테스트에선 "집합의 표현", "여행 가자(같은 연결 요소인가)", "사이클 게임" 이 단골이고, 면접에선 "경로 압축 없이 최악 시간은?", "BFS 로 연결 요소 세기와 언제 달라지는가?" 로 나온다.

## 헷갈리기 쉬운 것

- **BFS/DFS 로 연결 요소 찾기**: 그래프가 고정돼 있으면 BFS 한 번으로 충분하다. 간선이 **하나씩 추가되면서** 매번 "지금 연결됐나?" 를 물으면 유니온 파인드가 압도적으로 빠르다.
- **경로 압축 없는 구현**: `find` 가 최악 O(n) 으로 늘어져 연결 리스트가 된다. 압축과 랭크 중 하나만 써도 O(log n), 둘 다 쓰면 α(n) 이다.
- **집합(set) 자료형**: 파이썬 `set` 은 원소 포함 여부를 보는 것이고, 유니온 파인드는 "어느 그룹에 속했나" 를 관리한다. 그룹 합치기가 잦으면 `set` 끼리 합치는 것은 O(n) 이라 느리다.
