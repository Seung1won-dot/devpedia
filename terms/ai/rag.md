---
id: rag
term: RAG
aliases: [Retrieval-Augmented Generation, 검색 증강 생성, 래그]
category: ai
tags: [LLM, 검색, 임베딩]
level: 2
related: [embedding, vector-db, llm, context-window, hallucination]
status: published
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

LLM 이 답하기 전에 **관련 문서를 먼저 검색해서 같이 읽게** 하는 기법.

## 비유

**오픈북 시험**. 외운 것(학습된 지식)만으로 답하지 않고, 질문에 맞는 페이지를 찾아 펴놓고 답을 쓰니 모르는 것도 덜 지어낸다.

## 예시

연구실 문서 200개를 임베딩해 벡터 DB 에 넣어두고, "GPU 서버 백업 정책이 뭐야?" 라고 물으면

1. 질문을 임베딩
2. 가장 비슷한 문서 3개 검색
3. 그 문서와 질문을 함께 Qwen 에 넣어 답 생성

## 헷갈리기 쉬운 것

- **파인튜닝**은 모델 자체를 다시 학습시키는 것. RAG 는 모델은 그대로 두고 참고자료만 붙인다. 자료가 자주 바뀌면 RAG, 말투·형식을 바꾸려면 파인튜닝.
