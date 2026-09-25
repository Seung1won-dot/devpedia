---
id: prompt-engineering
term: 프롬프트 엔지니어링
aliases:
  - Prompt Engineering
  - 프롬프트 설계
  - 프롬프팅
category: ai
tags:
  - 프롬프트
  - LLM
level: 1
related:
  - system-prompt
  - temperature
  - hallucination
  - llm
  - context-window
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

LLM 에 주는 **지시문을 다듬어** 원하는 답이 나오게 만드는 기술.

## 비유

신입에게 일을 시키는 요령. "보고서 써 와" 보다 "누구에게 보여줄 건지, 분량, 예시 하나" 를 붙여 주면 원하는 결과가 나온다.

## 예시

```bash
# 나쁜 예
ollama run qwen2.5:7b "서버 로그 요약해줘"

# 좋은 예: 역할·형식·제약을 명시
ollama run qwen2.5:7b "너는 리눅스 관리자다. 아래 로그에서 ERROR 만 골라 \
  '시각 | 원인 | 조치' 표로 정리해라. 로그에 없는 내용은 추측하지 말고 '불명' 이라고 써라.
  $(cat /var/log/app.log)"
```

역할, 출력 형식, 모르면 모른다고 하기 — 이 세 가지만 넣어도 답 품질이 크게 달라진다.

## 헷갈리기 쉬운 것

- **시스템 프롬프트**는 프롬프트 중 "항상 맨 앞에 붙는 고정 규칙" 부분. 프롬프트 엔지니어링은 그걸 포함해 지시문 전체를 다듬는 일.
- **파인튜닝**은 모델을 바꾸는 것, 프롬프트는 모델은 그대로 두고 말만 바꾸는 것. 먼저 프롬프트로 해 보고 안 되면 파인튜닝.
