---
id: index
term: 인덱스
aliases:
  - Index
  - 색인
  - DB 인덱스
  - B-tree 인덱스
category: database
tags:
  - 인덱스
  - 성능
  - 면접
level: 2
kind: concept
related:
  - sql
  - primary-foreign-key
  - binary-search-tree
  - big-o
  - vector-db
  - pagination
  - query-plan
see_also:
  - https://www.postgresql.org/docs/current/indexes.html
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

특정 열 값으로 **행을 빨리 찾도록 미리 정렬해 둔** 별도의 찾아보기 표.

## 비유

두꺼운 책 맨 뒤의 **찾아보기(색인)**. 단어가 몇 쪽에 있는지 적혀 있어 첫 장부터 넘길 필요가 없지만, 책 내용을 고칠 때마다 색인도 같이 고쳐야 한다.

## 예시

```sql
-- owner_id 로 아이템을 자주 찾는데 느리다면
CREATE INDEX items_owner_id_idx ON items (owner_id);

-- 실제로 인덱스를 타는지 확인
EXPLAIN ANALYZE SELECT * FROM items WHERE owner_id = 'a1b2c3d4-...';
```

결과의 `Seq Scan`(전체 훑기)이 `Index Scan` 으로 바뀌면 성공. 연구실 RAG 의 pgvector 도 `hnsw`/`ivfflat` 이라는 전용 인덱스를 만들어야 벡터 검색이 빨라진다.

## 헷갈리기 쉬운 것

- **기본키**는 "이 행이 유일하다" 는 규칙이고 인덱스는 "빨리 찾는 장치". 기본키를 만들면 인덱스가 따라오지만 그 반대는 아니다.
- 인덱스는 공짜가 아니다. INSERT/UPDATE 마다 인덱스도 갱신해야 해서, 아무 열에나 다 붙이면 쓰기가 느려진다.
