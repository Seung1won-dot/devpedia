---
id: tool-calling
term: 툴 콜링/함수 호출
aliases:
  - Tool Calling
  - Function Calling
  - 툴 콜링
  - 함수 호출
category: ai
tags:
  - 에이전트
  - LLM
level: 2
kind: concept
related:
  - agent
  - mcp
  - json
  - api
  - llm
  - prompt-injection
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

LLM 이 답 대신 **어떤 함수를 어떤 인자로 실행할지** 정해서 내놓는 기능.

## 비유

손님이 직접 요리하지 않고 주방에 주문서를 써 넣는 것. "볶음밥 1, 덜 맵게" 처럼 정해진 양식으로 써야 주방(프로그램)이 알아듣는다.

## 예시

```json
{
  "model": "qwen2.5:7b",
  "messages": [{"role": "user", "content": "GPU 서버 온도 확인해줘"}],
  "tools": [{"type": "function", "function": {
    "name": "run_shell", "description": "서버에서 명령 실행",
    "parameters": {"type": "object", "properties": {"cmd": {"type": "string"}}}}}]
}
```

이렇게 보내면 모델은 글 대신 `{"name": "run_shell", "arguments": {"cmd": "nvidia-smi"}}` 를 돌려주고, 실제 실행은 내 코드가 한다. 모델은 요청만 하고 손은 대지 않는다는 점이 핵심.

## 헷갈리기 쉬운 것

- **에이전트**는 툴 콜링을 반복해서 일을 끝까지 하는 프로그램. 툴 콜링은 그 안의 한 번의 요청.
- **MCP** 는 도구를 어떤 형식으로 등록·호출할지 정한 공용 규격. 툴 콜링은 모델의 기능, MCP 는 도구 쪽 연결 규격.
