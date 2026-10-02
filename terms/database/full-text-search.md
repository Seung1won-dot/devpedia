---
id: full-text-search
term: 전문 검색
aliases:
  - Full-Text Search
  - FTS
  - 풀텍스트 검색
  - tsvector
  - 텍스트 검색
category: database
tags:
  - 검색
  - SQL
  - 인덱스
level: 2
kind: concept
related:
  - index
  - pgvector
  - vector-db
  - elk-stack
  - reranker
  - regex
see_also:
  - https://www.postgresql.org/docs/current/textsearch.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

긴 글에서 **단어 단위로 색인을 만들어** 포함된 문서를 빠르게 찾는 검색.

## 비유

책 뒤 **찾아보기를 모든 단어에 대해** 만든 것. "폐렴" 이 나오는 쪽을 책을 처음부터 넘기며 찾지 않고 색인에서 쪽수를 바로 본다.

## 예시

```sql
-- LIKE 는 앞에 % 가 붙으면 인덱스를 못 타서 표 전체를 훑는다
SELECT id FROM notes WHERE body LIKE '%pneumonia%';

-- 단어 색인(tsvector) 열을 자동 생성하고 GIN 인덱스를 건다
ALTER TABLE notes ADD COLUMN body_tsv tsvector
  GENERATED ALWAYS AS (to_tsvector('english', body)) STORED;
CREATE INDEX notes_tsv_idx ON notes USING gin (body_tsv);

-- "pneumonia 는 있고 viral 은 없는" 문서를 관련도 순으로
SELECT id, ts_rank(body_tsv, q) AS rank
FROM notes, to_tsquery('english', 'pneumonia & !viral') q
WHERE body_tsv @@ q
ORDER BY rank DESC LIMIT 10;
```

`to_tsvector` 가 글을 단어로 쪼개 어근으로 줄이고(pneumonias → pneumonia) 불용어(the, of)를 버린 뒤 위치를 기록한다. 한국어는 PostgreSQL 에 기본 사전이 없어 형태소 분석기 확장을 붙이거나, 3글자 조각으로 색인하는 `pg_trgm` 으로 대신하는 경우가 많다 [확인 필요]. 문서가 수천만 건이거나 자동완성·오타 보정·복잡한 랭킹이 필요하면 Elasticsearch/OpenSearch/Meilisearch 같은 전용 검색 엔진으로 넘어간다.

## 헷갈리기 쉬운 것

- **LIKE/정규표현식**은 글자 패턴 일치라 어근 처리가 없고 인덱스도 거의 못 탄다. 짧은 표에서는 충분하지만 커지면 전문 검색으로.
- **벡터 검색(pgvector)** 은 단어가 달라도 뜻이 비슷하면 찾는다. 전문 검색은 약물명·ICD 코드처럼 정확한 단어에 강해서, RAG 에서는 둘을 합친 하이브리드 검색을 자주 쓴다.
- **pg_trgm** 은 단어가 아니라 글자 3개 조각으로 색인해 부분 문자열·오타에 강하다. 한국어 짧은 검색어에는 전문 검색보다 실용적일 때가 많다.
