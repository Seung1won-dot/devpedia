---
id: array
term: 배열
aliases:
  - Array
  - 어레이
  - 동적 배열
  - 파이썬 리스트
category: algo
tags:
  - 선형구조
  - 메모리
level: 1
kind: concept
related:
  - linked-list
  - big-o
  - binary-search
  - ram
  - cache-memory
  - set-map
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

값들을 **메모리에 나란히 붙여** 놓고 번호(인덱스)로 바로 꺼내는 자료구조.

## 비유

**사물함 한 줄**. 번호만 알면 바로 열 수 있지만, 중간에 칸을 하나 끼워 넣으려면 뒤의 물건을 전부 한 칸씩 옮겨야 한다.

## 예시

```python
terms = ["array", "graph", "heap", "tree"]

print(terms[2])            # "heap" — 번호로 바로 꺼내기, O(1)
terms.insert(0, "big-o")   # 맨 앞에 끼워 넣기 — 뒤 원소를 전부 밀어야 해서 O(n)
print(terms)               # ['big-o', 'array', 'graph', 'heap', 'tree']
```

Devpedia 의 카테고리별 카드 목록도 결국 배열이라 "n번째 카드" 를 바로 보여줄 수 있다. 값이 메모리에 붙어 있어서 CPU 캐시에도 잘 올라가, 같은 O(n) 순회라도 연결 리스트보다 실제로는 훨씬 빠르다.

## 헷갈리기 쉬운 것

- **연결 리스트**: 원소가 흩어져 있고 "다음 주소" 로 이어진다. 번호로 바로 찾기는 배열이, 중간 삽입·삭제는 연결 리스트가 빠르다.
- **파이썬 list / JS Array**: 이름은 리스트지만 실제로는 크기가 자동으로 늘어나는 **동적 배열**이다. 연결 리스트가 아니다.
