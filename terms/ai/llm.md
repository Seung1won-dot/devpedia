---
id: llm
term: LLM
aliases:
  - Large Language Model
  - 대형 언어 모델
  - 거대 언어 모델
  - 엘엘엠
category: ai
tags:
  - LLM
  - 딥러닝
level: 1
kind: concept
related:
  - transformer
  - token
  - context-window
  - model-parameters
  - local-llm
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

엄청난 양의 글을 학습해 **다음 단어를 예측**하는 방식으로 말하는 큰 언어 모델.

## 비유

세상 책을 다 읽고 나서 "다음에 올 말"을 기막히게 잘 잇는 끝말잇기 달인. 이해해서 답하는 게 아니라 가장 그럴듯한 다음 말을 계속 붙이는 것인데, 그게 쌓이면 대화처럼 보인다.

## 예시

```bash
ollama run qwen2.5:7b "연구실 GPU 서버 점검 체크리스트 5개 써줘"
```

연구실 서버에서 Qwen2.5 7B 를 돌려 답을 받는 명령. ChatGPT, Claude 도 같은 종류의 모델을 훨씬 크게 키워 API 로 제공하는 것이다.

## 헷갈리기 쉬운 것

- **ChatGPT** 는 서비스(제품) 이름, **GPT** 는 그 안의 모델. LLM 은 이런 모델들을 통칭하는 말.
- **임베딩 모델**도 언어 모델이지만 글을 생성하지 않고 숫자 벡터로만 바꾼다.
