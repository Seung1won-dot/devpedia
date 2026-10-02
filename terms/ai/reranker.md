---
id: reranker
term: 리랭커/하이브리드 검색
aliases:
  - Reranker
  - Cross-Encoder
  - Hybrid Search
  - 리랭킹
  - 재순위화
  - 하이브리드 검색
  - BM25
category: ai
tags:
  - RAG
  - 검색
  - 임베딩
  - LLM
level: 2
kind: concept
related:
  - rag
  - embedding
  - vector-db
  - chunking
  - full-text-search
  - pgvector
see_also:
  - https://www.sbert.net/examples/applications/retrieve_rerank/README.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

키워드와 벡터 검색을 **섞어 후보를 넓게 뽑고, 다시 읽어 순위를 매기는** 2단계 검색.

## 비유

서류 심사와 면접. 1차(서류)는 수천 명을 빠르고 거칠게 50명으로 추리고, 2차(면접)는 그 50명을 한 명씩 꼼꼼히 봐서 최종 순위를 정한다.

## 예시

```python
from sentence_transformers import CrossEncoder
reranker = CrossEncoder("BAAI/bge-reranker-v2-m3")           # 다국어 리랭커, 한국어 가능

query = "와파린 복용 중 INR 목표 범위"
candidates = list(dict.fromkeys(bm25_top30 + vector_top30))  # 1차: 키워드 30 + 벡터 30, 중복 제거
scores = reranker.predict([(query, c) for c in candidates])  # (질문, 조각) 을 함께 읽고 점수
top5 = [c for _, c in sorted(zip(scores, candidates), reverse=True)[:5]]
```

벡터 검색은 질문과 문서를 **따로** 임베딩해 거리만 재므로 빠르지만 "INR"·약 이름·수치처럼 정확히 일치해야 하는 말에 약하고, BM25 키워드 검색은 그 반대다. 그래서 둘을 합쳐 후보를 넓게 모으고(하이브리드 — 순위를 합칠 땐 RRF 를 많이 쓴다), 크로스 인코더 리랭커가 (질문, 조각) 쌍을 **한 입력으로 같이 읽어** 정밀하게 점수를 매긴다. 리랭커는 후보 수만큼 모델을 돌려야 해서 전체 문서에는 못 쓰고 상위 수십 개에만 쓴다. 의료 문서는 약어·코드(ICD, 약품명)가 많아 벡터만으로는 놓치는 게 많으므로 하이브리드가 사실상 기본이고, pgvector 와 PostgreSQL 전문 검색(tsvector)으로 한 DB 안에서 둘 다 된다. 리랭킹 한 단계가 응답을 수백 ms 늦추므로 속도가 중요하면 후보 수를 줄인다.

## 헷갈리기 쉬운 것

- **바이 인코더(임베딩) vs 크로스 인코더(리랭커)**: 바이 인코더는 문서를 미리 벡터로 만들어 두고 거리만 재서 빠르고, 크로스 인코더는 질문과 문서를 붙여 매번 읽어 정확하지만 느리다. 그래서 1차/2차로 역할을 나눈다.
- **하이브리드 검색 vs 리랭킹**: 하이브리드는 후보를 **어떻게 모을지**(키워드+벡터), 리랭킹은 모은 후보를 **어떻게 줄 세울지**. 따로도, 같이도 쓴다.
- **BM25 vs 전문 검색**: BM25 는 점수 공식이고, 전문 검색은 그런 공식을 쓰는 DB 기능(PostgreSQL tsvector, Elasticsearch)이다.
