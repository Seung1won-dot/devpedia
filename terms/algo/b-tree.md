---
id: b-tree
term: B-Tree/B+Tree
aliases:
  - B-Tree
  - B+Tree
  - 비트리
  - B트리
  - 다진 균형 트리
category: algo
tags:
  - 트리
  - 인덱스
level: 3
kind: concept
related:
  - index
  - balanced-tree
  - binary-search-tree
  - rdbms
  - file-system
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

한 노드에 키를 **수백 개씩 담아 높이를 낮춘** 균형 트리로, 디스크 읽기 횟수를 줄이려고 쓴다.

## 비유

**두꺼운 사전**. 한 장에 단어를 딱 하나만 적으면 수만 장을 넘겨야 하지만, 한 장에 수백 개를 적고 맨 앞에 "이 장은 ㄱ~ㄴ" 안내를 두면 서너 장만 펼쳐도 찾는다.

## 예시

```sql
CREATE INDEX idx_terms_id ON terms (id);   -- Postgres 기본 인덱스 = B+Tree 계열

EXPLAIN SELECT * FROM terms WHERE id = 'heap';
-- Index Scan using idx_terms_id on terms ...              -- 루트→리프 몇 번만 읽음

EXPLAIN SELECT * FROM terms WHERE id BETWEEN 'b' AND 'c';
-- Index Scan ... Index Cond: ((id >= 'b') AND (id <= 'c'))  -- 범위도 인덱스로
```

디스크는 4KB~16KB 블록 단위로 읽으니 노드 하나를 블록 하나에 맞추면, 키 수백 개짜리 노드 3~4층(디스크 읽기 3~4번)으로 수천만 건 안에서 찾는다. B+Tree 는 **데이터를 리프에만** 두고 리프끼리 연결 리스트로 이어서, `BETWEEN` 이나 `ORDER BY` 같은 범위 검색을 리프를 따라 쭉 훑기만 하면 된다. Supabase(Postgres)와 MySQL InnoDB 의 기본 인덱스, NTFS·Btrfs 같은 파일 시스템이 모두 B-Tree 계열이다. 면접 단골은 "DB 인덱스가 왜 해시가 아니라 B+Tree 인가?", "B-Tree 와 B+Tree 의 차이는?" 이다.

## 헷갈리기 쉬운 것

- **B-Tree vs B+Tree**: B-Tree 는 내부 노드에도 데이터가 있고, B+Tree 는 내부 노드엔 키(길잡이)만 두고 데이터는 리프에 몰아 넣어 범위 검색과 순차 접근에 강하다. DB 는 거의 B+Tree 다.
- **이진 탐색 트리/레드-블랙 트리**: 메모리용이라 자식이 2개고 높이가 log₂n 이다. B-Tree 는 자식이 수백 개라 같은 데이터에 높이가 훨씬 낮다.
- **해시 인덱스**: `=` 조회는 O(1) 로 더 빠르지만 범위·정렬·접두사 검색이 안 된다. 그래서 기본값이 못 된다.
