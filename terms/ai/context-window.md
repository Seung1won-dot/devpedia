---
id: context-window
term: 컨텍스트 윈도우
aliases:
  - Context Window
  - Context Length
  - 문맥 창
  - 컨텍스트 길이
category: ai
tags:
  - LLM
  - RAG
level: 1
related:
  - token
  - llm
  - rag
  - vram
  - system-prompt
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

LLM 이 **한 번에 기억하며 볼 수 있는** 최대 토큰 수.

## 비유

책상 크기. 책상 위에 올려둔 자료만 보면서 답을 쓸 수 있고, 책상이 꽉 차면 맨 처음 올린 종이부터 바닥으로 떨어져 잊힌다.

## 예시

```bash
ollama run qwen2.5:7b
>>> /set parameter num_ctx 32768
```

Ollama 는 기본 컨텍스트가 작게 잡혀 있어(2048 [확인 필요]) 긴 문서를 넣으면 앞부분이 잘리므로 이렇게 늘린다. 늘린 만큼 VRAM 도 더 드는데, 7B 에서 32K 면 약 몇 GB 추가 [확인 필요].

## 헷갈리기 쉬운 것

- **RAG** 는 컨텍스트에 올릴 자료를 골라 오는 기법. 책상은 그대로인데 뭘 올릴지 잘 고르는 것.
- **학습 데이터**는 모델이 만들어질 때 읽은 것이라 컨텍스트와 무관. 컨텍스트는 "지금 이 대화" 에서만 유지된다.
