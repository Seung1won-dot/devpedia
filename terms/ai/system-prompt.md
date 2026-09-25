---
id: system-prompt
term: 시스템 프롬프트
aliases:
  - System Prompt
  - 시스템 메시지
  - 시스템 지시문
category: ai
tags:
  - 프롬프트
  - LLM
level: 1
related:
  - prompt-engineering
  - context-window
  - agent
  - llm
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

대화 맨 앞에 숨겨 두는 **역할·규칙 지시문**으로, 모든 답에 계속 적용된다.

## 비유

아르바이트 첫날 받는 근무 수칙. 손님이 뭘 묻든 "존댓말로, 모르면 매니저 호출" 같은 규칙은 항상 깔려 있다.

## 예시

```bash
cat > Modelfile <<'MF'
FROM qwen2.5:7b
SYSTEM "너는 EC LAB 연구실 도우미다. 한국어로 답하고, 서버 명령은 실행 전에 확인 질문을 먼저 해라."
MF
ollama create lab-qwen -f Modelfile && ollama run lab-qwen
```

이렇게 만든 lab-qwen 은 매번 규칙을 다시 말하지 않아도 항상 그 역할로 답한다. API 로 쓸 때는 messages 의 `role: "system"` 메시지가 같은 자리.

## 헷갈리기 쉬운 것

- **유저 프롬프트**는 매 턴 사용자가 치는 질문. 시스템 프롬프트는 그 위에 늘 깔려 있는 배경 규칙.
- **파인튜닝**으로 말투를 굳히는 것과 달리 시스템 프롬프트는 매번 토큰을 소모한다. 대신 바꾸는 데 1초면 된다.
