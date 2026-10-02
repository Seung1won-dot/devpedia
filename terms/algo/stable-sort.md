---
id: stable-sort
term: 안정 정렬
aliases:
  - Stable Sort
  - 안정 정렬/불안정 정렬
  - 정렬 안정성
  - Timsort
category: algo
tags:
  - 정렬
  - 면접
level: 2
kind: concept
related:
  - sorting
  - divide-and-conquer
  - heap
  - big-o
  - sql
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

정렬 기준이 **같은 값들은 원래 있던 순서를 그대로** 유지하는 정렬.

## 비유

**접수 순서대로 앉은 대기자를 나이순으로 다시 세울 때**, 나이가 같은 두 사람은 먼저 접수한 사람이 여전히 앞에 오는 것이다. 불안정 정렬은 이 둘의 순서가 뒤바뀔 수 있다.

## 예시

```python
cards = [("heap", 2), ("array", 1), ("trie", 2), ("graph", 1)]   # (id, level), 입력 순서

sorted(cards, key=lambda c: c[1])
# [('array', 1), ('graph', 1), ('heap', 2), ('trie', 2)]  — 같은 level 안에선 입력 순서 유지

# 안정 정렬이면 "여러 키로 정렬" 을 뒤 키부터 차례로 두 번 돌려서 만들 수 있다
by_id = sorted(cards, key=lambda c: c[0])              # 1) 보조 키(id) 먼저
by_level_then_id = sorted(by_id, key=lambda c: c[1])   # 2) 주 키(level)
# [('array', 1), ('graph', 1), ('heap', 2), ('trie', 2)]
```

파이썬 `sorted`/`list.sort` 는 Timsort(병합+삽입)라 안정이고, Java 도 객체 배열은 Timsort 로 안정이지만 `Arrays.sort(int[])` 는 듀얼 피벗 퀵 정렬이라 불안정이다. Devpedia 목록을 "레벨순" 으로 다시 정렬할 때 안정 정렬이면 같은 레벨 안의 가나다순이 깨지지 않는다. 면접 단골은 "안정 정렬과 불안정 정렬을 각각 예로 들고, 퀵 정렬은 왜 불안정인가?" 다.

## 헷갈리기 쉬운 것

- **안정 vs 불안정 목록**: 병합·삽입·버블·계수 정렬은 안정, 퀵·힙·선택 정렬은 불안정이다. 퀵 정렬은 피벗과 멀리 떨어진 원소를 맞바꾸다가, 힙 정렬은 루트를 맨 뒤로 보내다가 같은 값의 순서가 뒤집힌다.
- **정렬 결과가 틀린 것**: 불안정해도 정렬 자체는 맞다. 키가 같은 원소들의 상대 순서만 보장이 없을 뿐이다.
- **불안정 정렬을 안정으로 만들기**: 키에 원래 인덱스를 붙여 `(key, index)` 로 정렬하면 어떤 알고리즘이든 안정처럼 동작한다. 대신 O(n) 메모리가 더 든다.
