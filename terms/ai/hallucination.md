---
id: hallucination
term: 할루시네이션
aliases:
  - Hallucination
  - 환각
  - 거짓 생성
category: ai
tags:
  - LLM
  - 프롬프트
level: 1
related:
  - rag
  - prompt-engineering
  - temperature
  - llm
  - context-window
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

LLM 이 **없는 사실을 그럴듯하게 지어내** 자신 있게 말하는 현상.

## 비유

모르는 걸 물어봐도 절대 "모른다" 고 하지 않는 친구. 말은 유창한데 확인해 보면 논문 제목도 저자도 실제로는 없는 것이다.

## 예시

```bash
ollama run qwen2.5:7b "EC LAB 의 2024년 GPU 서버 구매 내역을 알려줘"
# → "2024년 3월 A100 4장을 구매했습니다..."   ← 본 적 없는 내용을 지어냄
```

모델은 연구실 내부 자료를 본 적이 없으니 지어낼 수밖에 없다. 실제 문서를 같이 넣어 주는 RAG, "자료에 없으면 모른다고 해라" 는 시스템 프롬프트, temperature 낮추기가 기본 대응.

## 헷갈리기 쉬운 것

- **오래된 지식(knowledge cutoff)** 은 학습 시점 이후를 몰라서 틀리는 것. 할루시네이션은 모르는데도 아는 척 지어내는 것이라 원인이 다르다.
- **버그**가 아니라 "다음 단어 예측" 방식의 본질적 성질이라 완전히 없앨 수는 없고 줄이는 것이 목표.
