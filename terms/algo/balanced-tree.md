---
id: balanced-tree
term: 균형 트리(AVL/레드-블랙)
aliases:
  - Balanced Tree
  - 자가 균형 이진 탐색 트리
  - AVL 트리
  - 레드-블랙 트리
  - Red-Black Tree
category: algo
tags:
  - 트리
  - 탐색
level: 3
kind: concept
related:
  - binary-search-tree
  - tree
  - b-tree
  - big-o
  - scheduler
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

넣고 뺄 때마다 **한쪽으로 기울지 않게 스스로 고쳐** 높이를 log n 으로 지키는 이진 탐색 트리.

## 비유

**책장에 책을 꽂을 때** 한 칸에만 몰아 넣으면 그 칸을 다 뒤져야 하니, 몇 권 꽂을 때마다 칸 사이를 옮겨 고르게 나눠 두는 것이다.

## 예시

```python
class Node:
    def __init__(self, key):
        self.key, self.left, self.right, self.h = key, None, None, 1

def height(n):
    return n.h if n else 0

def rotate_right(y):                    # AVL 의 기본 동작: 왼쪽이 무거우면 오른쪽으로 돌린다
    x = y.left
    y.left, x.right = x.right, y
    y.h = 1 + max(height(y.left), height(y.right))
    x.h = 1 + max(height(x.left), height(x.right))
    return x                            # x 가 새 부모
```

평범한 BST 에 1, 2, 3, …, n 을 순서대로 넣으면 오른쪽으로만 늘어진 연결 리스트가 되어 탐색이 O(n) 이다. AVL 은 양쪽 높이 차가 2 가 되는 순간 위처럼 회전해 차이를 1 이하로 되돌리고, 레드-블랙 트리는 색 규칙으로 "가장 긴 경로가 가장 짧은 경로의 2배 이하" 만 보장해 회전을 덜 한다. 그래서 Java `TreeMap`, C++ `std::map`, 리눅스 CFS 스케줄러의 실행 큐가 레드-블랙 트리다. 면접에선 "BST 의 최악 시간복잡도와 해결법은?", "AVL 과 레드-블랙의 차이는?" 으로 나온다.

## 헷갈리기 쉬운 것

- **AVL vs 레드-블랙**: AVL 이 더 엄격하게 균형을 잡아 탐색이 조금 빠르고, 레드-블랙은 삽입·삭제 때 회전이 적어 쓰기가 잦은 곳에 쓴다. 표준 라이브러리 대부분은 레드-블랙이다.
- **힙**: 힙도 완전 이진 트리라 항상 균형이지만, 최솟값만 꺼낼 수 있고 임의의 키를 O(log n) 에 찾지는 못한다.
- **B-Tree**: 같은 "균형" 이라도 B-Tree 는 한 노드에 키를 수백 개 담아 디스크 읽기 횟수를 줄이는 게 목적이고, 균형 이진 트리는 메모리 안 자료구조다.
