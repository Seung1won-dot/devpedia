---
id: pgvector
term: pgvector
aliases:
  - 피지벡터
  - PostgreSQL 벡터 확장
  - vector 타입
  - HNSW
category: database
tags:
  - 임베딩
  - RAG
  - 검색
  - 관계형
level: 2
kind: tool
related:
  - vector-db
  - embedding
  - rag
  - postgresql
  - index
  - chunking
see_also:
  - https://github.com/pgvector/pgvector
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

PostgreSQL 에 **벡터 타입과 유사도 검색 인덱스**를 덧붙이는 확장.

## 비유

이미 쓰는 **공구함(Postgres)에 끼우는 트레이 한 칸**. 새 공구함(별도 벡터 DB)을 사지 않아도 "비슷한 것 찾기" 공구가 기존 공구 옆자리에 생긴다.

## 예시

```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE chunks (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  doc_id    int,
  body      text,
  embedding vector(1024)          -- 임베딩 모델의 차원과 같아야 함 (bge-m3 = 1024)
);
CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);
```

```python
import numpy as np, psycopg, ollama
from pgvector.psycopg import register_vector      # pip install pgvector "psycopg[binary]"

q = np.array(ollama.embed(model="bge-m3", input="폐렴 항생제 가이드").embeddings[0])
with psycopg.connect("postgresql://localhost/rag") as con:
    register_vector(con)                           # numpy 배열을 vector 로 바로 넘김
    rows = con.execute(
        "SELECT body, 1 - (embedding <=> %s) AS cosine_sim "
        "FROM chunks WHERE doc_id = ANY(%s) "     # 일반 WHERE 와 섞어 쓸 수 있다
        "ORDER BY embedding <=> %s LIMIT 5",
        (q, [1, 2, 3], q),
    ).fetchall()
```

거리 연산자는 `<->`(L2) · `<=>`(코사인) · `<#>`(음의 내적) 셋이고, 인덱스는 빠르지만 메모리를 많이 쓰는 HNSW 와 가볍지만 데이터가 먼저 있어야 하는 IVFFlat 중에 고른다. 장점은 메타데이터 필터·JOIN·트랜잭션·백업을 Postgres 하나로 끝낸다는 것. 수천만 벡터나 초당 수천 질의 규모가 되면 전용 벡터 DB 가 유리하고, 인덱스를 걸 수 있는 차원 수에도 상한이 있다 [확인 필요].

## 헷갈리기 쉬운 것

- **벡터 DB(개념) vs pgvector(제품)**: pgvector 는 벡터 DB 역할을 Postgres 안에서 하는 확장이고, Chroma·Qdrant·Milvus 는 그 역할만 하는 별도 서버다.
- **차원 수는 임베딩 모델이 정한다.** `vector(1024)` 는 모델 출력 길이이고, 모델을 바꾸면 기존 벡터와 비교할 수 없어 전부 다시 임베딩한다.
- **연산자와 인덱스 ops 는 짝이 맞아야 한다.** `<=>` 로 정렬하려면 `vector_cosine_ops` 인덱스여야 타고, 짝이 틀리면 인덱스를 무시하고 전부 훑는다.
