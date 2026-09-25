---
id: mcp
term: MCP
aliases:
  - Model Context Protocol
  - 모델 컨텍스트 프로토콜
  - 엠씨피
  - MCP 서버
category: ai
tags:
  - MCP
  - 에이전트
level: 2
related:
  - tool-calling
  - agent
  - api
  - json
  - llm
see_also:
  - https://modelcontextprotocol.io/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

LLM 앱이 외부 도구·데이터에 **같은 방식으로 꽂을 수 있게** 정한 공용 연결 규격.

## 비유

USB 규격. 마우스든 프린터든 USB 로 만들면 어느 컴퓨터에나 꽂히듯, 도구를 MCP 서버로 만들어 두면 Claude 든 로컬 Qwen 이든 같은 도구를 쓸 수 있다.

## 예시

```json
{
  "mcpServers": {
    "lab-gpu": {
      "command": "python",
      "args": ["/opt/lab-tools/gpu_mcp_server.py"]
    }
  }
}
```

연구실 GPU 서버의 nvidia-smi 결과를 돌려주는 MCP 서버를 등록한 설정. 한 번 만들어 두면 Claude Code, Claude Desktop, 로컬 에이전트가 모두 "gpu 상태 알려줘" 로 같은 도구를 부른다.

## 헷갈리기 쉬운 것

- **API** 는 도구 하나하나의 문. MCP 는 그 문들을 LLM 이 똑같은 손잡이로 열게 하는 규격이라, MCP 서버 안에서 결국 API 를 부른다.
- **툴 콜링**은 모델이 "함수 불러 줘" 하는 기능. MCP 는 그 함수 목록을 어디서 어떻게 가져오고 실행할지 정한 약속.
