---
id: linked-list
term: 연결 리스트
aliases:
  - Linked List
  - 링크드 리스트
  - 연결리스트
  - 이중 연결 리스트
category: algo
tags:
  - 선형구조
  - 메모리
level: 1
kind: concept
related:
  - array
  - stack-queue
  - big-o
  - stack-heap-memory
  - tree
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

각 칸이 값과 **다음 칸의 주소**를 들고 있어 흩어진 채로 이어지는 자료구조.

## 비유

**보물찾기 쪽지**. 쪽지마다 "다음 쪽지는 화분 밑" 처럼 다음 위치가 적혀 있어 순서대로만 따라갈 수 있고, 새 쪽지를 끼우려면 앞 쪽지의 안내만 고치면 된다.

## 예시

```python
class Node:
    def __init__(self, value, next=None):
        self.value, self.next = value, next

head = Node("array", Node("graph", Node("heap")))   # array → graph → heap
head.next = Node("big-o", head.next)                 # 두 번째 자리에 끼워 넣기: 주소 하나만 고침

node = head
while node:
    print(node.value)        # array, big-o, graph, heap
    node = node.next
```

브라우저의 뒤로/앞으로 가기 기록, LRU 캐시(가장 오래 안 쓴 것 버리기)처럼 앞뒤에서 자주 끼우고 빼는 곳에 쓴다.

## 헷갈리기 쉬운 것

- **배열**: 값이 나란히 붙어 있어 번호로 바로 찾는다. 연결 리스트는 n번째를 찾으려면 앞에서부터 세어야 하지만(O(n)), 중간 삽입·삭제는 주소만 바꾸면 된다(O(1)).
- **파이썬 list**: 이름에 리스트가 들어가지만 연결 리스트가 아니라 배열이다. 양 끝 삽입·삭제가 잦으면 `collections.deque` 가 이쪽에 가깝다.
