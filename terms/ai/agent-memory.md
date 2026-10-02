---
id: agent-memory
term: 에이전트 메모리
aliases:
  - Agent Memory
  - 장기 메모리
  - 대화 메모리
  - 메모리(에이전트)
category: ai
tags:
  - 에이전트
  - LLM
  - RAG
level: 2
kind: concept
related:
  - agent
  - context-window
  - rag
  - embedding
  - vector-db
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

컨텍스트 밖에 **대화와 지식을 저장해 두었다 꺼내 쓰게** 하는 에이전트의 기억 장치.

## 비유

머릿속(컨텍스트)과 수첩(메모리). 머릿속은 금방 꽉 차고 자고 나면 비워지니까, 중요한 것은 수첩에 적어 두고 다음에 만났을 때 펼쳐 본다.

## 예시

```python
MEMORY = "memory.md"                  # 가장 단순한 장기 메모리: 마크다운 파일 하나

def remember(fact: str):              # 턴이 끝날 때 LLM 이 "기억할 것" 을 뽑아 저장
    with open(MEMORY, "a", encoding="utf-8") as f:
        f.write(f"- {fact}\n")

def recall() -> str:                  # 다음 대화 시작 때 시스템 프롬프트에 붙인다
    return open(MEMORY, encoding="utf-8").read()

system = "사용자와 프로젝트에 대해 아는 것:\n" + recall()
```

Claude Code 가 세션마다 `MEMORY.md` 를 읽고 고치는 것이 딱 이 구조다. 보통 세 층으로 나눈다 — 지금 대화(단기, 길어지면 요약), 사용자·프로젝트 사실(장기, 파일이나 DB), 지난 작업 기록(에피소드). 메모리가 커지면 전부 넣을 수 없으니 임베딩으로 관련 항목만 검색해 올리는데, 그 순간 기술적으로는 RAG 와 같아진다. 함정은 잘못 저장된 사실이 계속 재사용되는 것이라, 지우고 고치는 경로가 반드시 있어야 한다.

## 헷갈리기 쉬운 것

- **컨텍스트 윈도우**는 지금 보고 있는 책상, 메모리는 서랍. 서랍에서 꺼낸 것도 결국 책상(컨텍스트)에 올려야 모델이 본다.
- **RAG** 는 문서 지식을 검색해 넣는 것, 메모리는 "이 사용자·이 작업" 에 대한 기억을 넣는 것. 저장소와 검색 기술은 같고 내용과 쓰는 시점이 다르다.
- **파인튜닝**은 가중치에 새기는 것이라 지우거나 고치기 어렵다. 메모리는 파일이라 한 줄 지우면 끝.
