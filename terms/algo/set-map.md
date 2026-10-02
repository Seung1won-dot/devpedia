---
id: set-map
term: 집합/맵(ADT)
aliases:
  - Set / Map
  - 집합
  - 맵
  - 딕셔너리
  - 추상 자료형(ADT)
  - Abstract Data Type
category: algo
tags:
  - 해시
  - 탐색
  - 코딩테스트
level: 1
kind: concept
related:
  - hash-table
  - array
  - hash-collision
  - balanced-tree
  - key-value-store
  - json
see_also:
  - "https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset"
  - "https://docs.python.org/3/library/stdtypes.html#mapping-types-dict"
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

**중복 없이 모으는 집합**과 **키로 값을 찾는 맵**을, 구현이 아니라 하는 일로 정한 자료형.

## 비유

**출석부(집합)와 전화번호부(맵)**. 출석부는 이름이 있냐 없냐만 보고 같은 사람을 두 번 적지 않으며, 전화번호부는 이름을 찾으면 번호가 따라 나온다.

## 예시

```python
visits = ["P001", "P002", "P001", "P003", "P002"]   # EMR 추출 CSV 의 환자 ID 열(중복 있음)

patients = set(visits)                  # 집합: 중복이 저절로 사라진다
print(len(patients))                    # 3
print("P002" in patients)               # True — 리스트의 in 은 O(n), set 은 평균 O(1)

count = {}                              # 맵: 환자 ID → 방문 횟수
for p in visits:
    count[p] = count.get(p, 0) + 1
print(count)                            # {'P001': 2, 'P002': 2, 'P003': 1}

print(set("abc") & set("bcd"))          # {'b', 'c'} — 교집합. | 합집합, - 차집합도 한 글자
```

Python `set`/`dict`, JS `Set`/`Map`, Java `HashSet`/`HashMap`·`TreeMap` 이 전부 이 두 자료형의 구현이다. "있냐 없냐" 만 물으면 집합, "무엇에 무엇이 붙어 있나" 면 맵 — 코딩테스트에서 리스트 `in` 으로 시간 초과가 나면 집합으로 바꾸면 대개 풀린다. ADT(추상 자료형)는 "어떤 연산을 제공하는가" 만 약속하고 속이 해시인지 트리인지는 묻지 않는다는 뜻.

## 헷갈리기 쉬운 것

- **해시 테이블**: 집합·맵을 구현하는 한 방법(속). Python `dict` 는 해시 테이블, Java `TreeMap` 은 균형 트리로 같은 맵을 구현한다 — 트리 쪽은 키가 정렬된 채로 나온다.
- **배열/리스트**: 순서가 있고 중복을 허용하며 번호(인덱스)로 찾는다. 집합은 순서를 보장하지 않고(Python `dict` 는 3.7 부터 넣은 순서를 유지), 들어 있는지만 빠르게 답한다.
- **set 과 dict**: 값 없는 dict 가 set 이다. 횟수를 셀 때는 `collections.Counter`, 기본값이 필요하면 `defaultdict` 가 dict 의 편의 버전.
