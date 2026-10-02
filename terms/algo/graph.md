---
id: graph
term: 그래프
aliases:
  - Graph
  - 그래프 구조
  - 노드와 간선
  - 정점/엣지
category: algo
tags:
  - 그래프
level: 1
kind: concept
related:
  - tree
  - bfs-dfs
  - dijkstra
  - hash-table
  - commit-branch-merge
  - adjacency-matrix-list
  - topological-sort
status: review
created: 2026-09-25
updated: 2026-09-29
---

## 한 줄 정의

점(노드)들과 그 사이를 잇는 **선(간선)으로 관계를 표현**하는 자료구조.

## 비유

**지하철 노선도**. 역이 점, 역 사이 선로가 선이고, 어디서든 출발해 갈아타며 돌 수 있으니 "뿌리" 도 "위아래" 도 없다.

## 예시

```python
related = {                            # 인접 리스트: 카드 id → related 에 적힌 id 들
    "rag": ["embedding", "vector-db", "llm"],
    "vector-db": ["embedding", "rag", "index"],
    "embedding": ["rag", "vector-db"],
}
for a, neighbors in related.items():
    for b in neighbors:
        print(f"{a} -> {b}")           # Devpedia 의 related 는 방향 있는 간선
```

카드마다 `related` 를 적으면 사전 전체가 그래프가 되고, 검증 스크립트가 세는 "고아 카드" 는 간선이 하나도 없는 점이다. Git 커밋 기록, SNS 팔로우, 도로망, 패키지 의존성도 그래프.

## 헷갈리기 쉬운 것

- **트리**: 트리는 순환이 없고 뿌리 하나에서 내려가는 특별한 그래프. 그래프는 순환·양방향·여러 덩어리 다 가능.
- **차트(그래프)**: 엑셀의 막대 그래프는 데이터를 그림으로 그린 것이고, 여기 그래프는 "관계" 를 저장하는 구조. 영어가 같아서 헷갈린다.
- **방향/가중치**: 팔로우처럼 한쪽만 이어지면 방향 그래프, 도로 길이처럼 선에 숫자가 붙으면 가중 그래프. 다익스트라는 가중 그래프용.
