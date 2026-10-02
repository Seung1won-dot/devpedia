---
id: embedding
term: 임베딩
aliases:
  - Embedding
  - 임베딩 벡터
  - 벡터 표현
category: ai
tags:
  - 임베딩
  - RAG
  - 검색
level: 2
kind: concept
related:
  - rag
  - vector-db
  - llm
  - token
  - transformer
  - vector
  - dot-product
status: review
created: 2026-09-25
updated: 2026-10-03
---

## 한 줄 정의

글이나 이미지를 **뜻이 비슷하면 가까워지는 숫자 벡터**로 바꾼 것.

## 비유

지도 위의 좌표. "강남역" 이라는 이름 대신 좌표로 적어 두면 어디가 가까운지 자로 잴 수 있듯, 글도 좌표로 바꿔 두면 "비슷한 문서" 를 거리로 찾을 수 있다.

## 예시

```bash
curl http://localhost:11434/api/embed -d '{
  "model": "bge-m3",
  "input": "GPU 서버 백업 정책"
}'
# → {"embeddings": [[0.021, -0.113, ...]]}   1024차원 [확인 필요]
```

Ollama 에 올린 임베딩 모델로 문장 하나를 숫자 1024개로 바꾼 것. 연구실 문서를 전부 이렇게 바꿔 벡터 DB 에 넣어 두는 게 RAG 의 첫 단계.

## 헷갈리기 쉬운 것

- **토큰 ID** 도 숫자지만 그냥 사전 번호라 비슷한 뜻끼리 가깝지 않다. 임베딩은 뜻의 거리가 보존된다.
- **벡터 DB** 는 임베딩을 저장하고 가까운 것을 빨리 찾아주는 저장소. 임베딩은 데이터, 벡터 DB 는 창고.
