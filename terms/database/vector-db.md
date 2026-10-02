---
id: vector-db
term: 벡터 DB
aliases:
  - Vector Database
  - 벡터 데이터베이스
  - Chroma
category: database
tags:
  - 임베딩
  - RAG
  - 검색
level: 2
kind: concept
related:
  - embedding
  - rag
  - index
  - nosql
  - llm
  - pgvector
see_also:
  - https://github.com/pgvector/pgvector
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

임베딩 벡터(숫자 배열)를 저장하고 **가장 비슷한 것**을 빠르게 찾아 주는 DB.

## 비유

책을 가나다순이 아니라 **내용이 비슷한 책끼리 가까이** 꽂아 둔 서가. 한 권 들고 가면 "이거랑 비슷한 책" 을 옆 칸에서 바로 뽑아 준다.

## 예시

연구실 RAG 를 Supabase(Postgres) 위에 올릴 때 pgvector 확장을 쓴다.

```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE docs (id serial PRIMARY KEY, body text, embedding vector(1024));
CREATE INDEX ON docs USING hnsw (embedding vector_cosine_ops);

-- 질문 임베딩과 가장 가까운 문서 3개 (<=> 는 코사인 거리)
SELECT body FROM docs ORDER BY embedding <=> '[0.12, -0.03, ...]' LIMIT 3;
```

Postgres 에 확장만 얹으면 되니 표 하나 더 만드는 느낌으로 시작할 수 있다. 별도 서버로 띄우는 쪽은 Chroma·Qdrant·Milvus.

## 헷갈리기 쉬운 것

- **임베딩**은 글을 숫자 배열로 바꾸는 과정(모델이 함). 벡터 DB 는 그 결과를 담고 검색하는 창고.
- **일반 인덱스**는 "정확히 같은 값" 을 찾고, 벡터 인덱스(HNSW/IVFFlat)는 "가장 가까운 값" 을 근사로 찾는다. 그래서 결과가 100% 정확하진 않고 속도와 맞바꾼다.
