---
id: binary-search-tree
term: 이진 탐색 트리
aliases:
  - Binary Search Tree
  - BST
  - 이진탐색트리
category: algo
tags:
  - 트리
  - 탐색
level: 2
kind: concept
related:
  - tree
  - binary-search
  - heap
  - index
  - big-o
  - balanced-tree
status: review
created: 2026-09-25
updated: 2026-09-29
---

## 한 줄 정의

왼쪽 자식은 **부모보다 작고** 오른쪽은 **크게** 두어 찾기·넣기를 빠르게 한 트리.

## 비유

"작으면 왼쪽, 크면 오른쪽" 팻말이 붙은 **갈림길**. 팻말만 따라가면 몇 번 안 꺾고 목적지에 닿고, 새 목적지는 빈 갈래 끝에 붙이기만 하면 된다.

## 예시

```python
class Node:
    def __init__(self, key): self.key, self.left, self.right = key, None, None

def insert(node, key):
    if node is None: return Node(key)
    if key < node.key: node.left = insert(node.left, key)
    else:              node.right = insert(node.right, key)
    return node

root = None
for k in [50, 30, 70, 20, 40]: root = insert(root, k)   # 균형이 잡혀 있으면 찾기·넣기 O(log n)
```

값이 계속 들어오고 빠지는데 "정렬된 상태로 범위 검색" 도 해야 할 때 쓴다. DB 인덱스(B-Tree), Java `TreeMap`, C++ `std::map` 이 같은 아이디어다.

## 헷갈리기 쉬운 것

- **이진 탐색**: 정렬된 배열에서 절반씩 줄여 찾는 "알고리즘". BST 는 그 아이디어를 값을 자유롭게 넣고 뺄 수 있게 "자료구조" 로 만든 것.
- **힙**: 둘 다 이진 트리지만 힙은 "부모가 자식보다 작다" 만 지켜서 최솟값만 빠르고, BST 는 좌우 순서를 지켜 아무 값이나 찾을 수 있다.
- **균형**: 정렬된 순서로 넣으면 한쪽으로만 길어져 사실상 연결 리스트가 된다(O(n)). 그래서 실제로는 AVL·레드블랙 트리처럼 스스로 균형을 잡는 변형을 쓴다.
