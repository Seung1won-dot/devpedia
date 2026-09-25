---
id: sorting
term: 정렬
aliases:
  - Sort
  - 소팅
  - 정렬 알고리즘
  - 퀵 정렬/병합 정렬
category: algo
tags:
  - 정렬
  - 복잡도
level: 1
related:
  - big-o
  - binary-search
  - array
  - recursion
  - index
see_also:
  - "https://docs.python.org/3/howto/sorting.html"
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

값들을 **크기 순서대로 줄 세우는** 것으로, 이진 탐색 등 다른 알고리즘의 준비 단계.

## 비유

**시험지 번호순으로 추리기**. 한 장씩 제자리에 끼워 넣는 방법(삽입 정렬)은 몇 장이면 편하지만 300장이면 힘들고, 반으로 나눠 각자 정리한 뒤 합치면(병합 정렬) 훨씬 빠르다.

## 예시

```python
cards = [("heap", 2), ("array", 1), ("dijkstra", 3), ("graph", 1)]

by_id = sorted(cards)                                    # 이름순 (튜플 첫 원소 기준)
by_level = sorted(cards, key=lambda c: (c[1], c[0]))     # level 오름차순, 같으면 이름순
print([c[0] for c in by_level])                          # ['array', 'graph', 'heap', 'dijkstra']

# 파이썬 sorted 는 Timsort: O(n log n), 같은 값의 원래 순서를 지킴(안정 정렬)
```

직접 구현할 일은 거의 없고 언어 내장 정렬을 쓰지만, 어떤 기준(key)으로 정렬할지와 "비교 정렬은 O(n log n) 이 한계" 라는 사실은 알아야 한다. Devpedia 의 카드 목록이 이름순·level 순으로 나오는 것도 이것.

## 헷갈리기 쉬운 것

- **이진 탐색**: 정렬은 순서를 만드는 것, 이진 탐색은 그 순서를 이용해 찾는 것. 한 번 정렬(O(n log n))해 두면 이후 검색은 O(log n).
- **안정 정렬**: 같은 값끼리의 원래 순서를 지키면 안정. 파이썬 `sorted` 와 JS `Array.sort` 는 안정, 기본 퀵 정렬은 불안정.
- **SQL ORDER BY**: DB 도 결국 정렬을 하는데, 그 열에 인덱스가 있으면 이미 정렬된 채라 정렬 단계를 건너뛴다.
