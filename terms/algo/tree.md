---
id: tree
term: 트리
aliases:
  - Tree
  - 트리 구조
  - 계층 구조
  - 노드/리프
category: algo
tags:
  - 트리
level: 1
kind: concept
related:
  - binary-search-tree
  - graph
  - recursion
  - file-system
  - dom
  - trie
  - segment-tree
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

하나의 **뿌리에서 가지가 갈라져** 내려가는, 위아래 관계가 있는 자료구조.

## 비유

**가족 족보**. 맨 위 조상(루트)에서 자식으로, 그 자식으로 갈라지며 내려가고, 누구든 위로 거슬러 올라가면 한 명의 뿌리에 닿는다.

## 예시

```python
tree = {"devpedia": {"terms": {"algo": {}, "infra": {}}, "docs": {}, "package.json": None}}

def show(node, depth=0):
    for name, child in node.items():
        print("  " * depth + name)            # 들여쓰기 = 깊이
        if child: show(child, depth + 1)      # 자식도 트리이니 같은 함수로 (재귀)

show(tree)
```

폴더 구조, HTML 의 DOM, JSON, 회사 조직도, Devpedia 의 "카테고리 → 카드" 관계가 전부 트리다.

## 헷갈리기 쉬운 것

- **그래프**: 트리는 그래프의 특수한 경우(순환 없음, 뿌리 하나, 노드 n개면 간선 n-1개). 그래프는 순환도 있고 뿌리도 없어도 된다.
- **이진 탐색 트리**: 트리 중에서 자식이 최대 2개이고 "왼쪽 < 부모 < 오른쪽" 규칙까지 지키는 것. 그냥 트리에는 순서 규칙이 없다.
