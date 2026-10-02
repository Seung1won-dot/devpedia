---
id: agent
term: 에이전트
aliases:
  - AI Agent
  - LLM 에이전트
  - 에이전틱 AI
category: ai
tags:
  - 에이전트
  - LLM
level: 2
kind: concept
related:
  - tool-calling
  - mcp
  - llm
  - cron
  - system-prompt
  - agent-memory
  - sandbox
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

목표를 주면 LLM 이 **스스로 계획하고 도구를 써 가며** 여러 단계를 처리하는 프로그램.

## 비유

질문에 답만 하는 상담원과, "출장 좀 잡아 줘" 하면 항공편 검색·예약·캘린더 등록까지 알아서 하는 비서의 차이. 비서가 에이전트다.

## 예시

```python
while True:
    reply = llm.chat(messages, tools=[run_shell, read_file, search_docs])
    if not reply.tool_calls:
        break                                   # 더 할 일 없으면 종료
    for call in reply.tool_calls:
        messages.append(execute(call))          # 도구 실행 결과를 다시 넣음
```

에이전트의 뼈대는 이 루프 하나다 — 생각 → 도구 호출 → 결과 확인 → 다시 생각. 연구실 Hermes 에이전트가 크론으로 매일 아침 GPU 사용량을 읽어 요약을 올리는 것도 같은 루프.

## 헷갈리기 쉬운 것

- **툴 콜링**은 LLM 이 "이 함수 불러 줘" 라고 한 번 요청하는 기능. 에이전트는 그걸 루프로 돌려 끝까지 일하게 만든 프로그램.
- **챗봇**은 한 질문에 한 답. 에이전트는 답 대신 "일의 완료" 가 목표라 중간에 여러 번 도구를 쓴다.
