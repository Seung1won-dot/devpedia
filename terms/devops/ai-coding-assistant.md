---
id: ai-coding-assistant
term: AI 코딩 도구(Claude Code/Copilot)
aliases:
  - AI Coding Assistant
  - AI 코딩 어시스턴트
  - GitHub Copilot
  - Claude Code
  - Cursor
  - 바이브 코딩
category: devops
tags:
  - 개발도구
  - LLM
  - 취업
level: 1
kind: tool
related:
  - llm
  - prompt-engineering
  - hallucination
  - agent
  - mcp
  - tdd
  - pair-programming
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

코드를 **대신 써 주거나 고쳐 주는 LLM 기반 도구**로, 자동완성형과 에이전트형으로 나뉜다.

## 비유

자동완성형은 옆에서 **문장을 이어 써 주는 속기사**, 에이전트형은 "이 기능 만들어 줘" 하면 파일을 뒤지고 고치고 테스트까지 돌려 오는 **주니어 동료**. 어느 쪽이든 결과는 내가 읽고 책임진다.

## 예시

```ts
// 자동완성형(Copilot): 주석과 함수 이름까지 쓰면 아래 본문이 회색 제안으로 뜨고 Tab 으로 받는다
// 카드 배열을 category 별로 묶는다
function groupByCategory(terms: Term[]) {
  return terms.reduce<Record<string, Term[]>>((acc, t) => {
    (acc[t.category] ??= []).push(t)
    return acc
  }, {})
}
```

```bash
# 에이전트형(Claude Code): 저장소 전체를 맥락으로 작업을 통째로 맡긴다
claude "terms/ 카드 중 related 에 존재하지 않는 id 를 쓰는 곳을 찾아 고치고 npm run validate 로 확인해"
# → 파일을 grep 하고, 고치고, 검증 스크립트를 돌린 뒤 diff 를 보여 준다. 승인은 내가 한다
```

잘 쓰는 법은 셋이다. **맥락을 준다** — 관련 파일·에러 메시지·원하는 결과를 붙이고, 프로젝트 규칙은 `CLAUDE.md` 같은 파일로 상시 제공한다. **테스트로 검증한다** — 생성된 코드는 그럴듯하게 틀릴 수 있으니(환각) 테스트·타입 검사·직접 실행으로 확인한다. **그대로 믿지 않는다** — 없는 라이브러리 API 를 부르거나 보안상 위험한 코드를 내놓기도 하므로 diff 를 읽고 이해한 것만 커밋한다. 면접에서 "AI 도구를 어떻게 쓰나요?" 는 이제 흔한 질문이고, "안 쓴다" 도 "다 맡긴다" 도 아닌 **검증 습관을 구체적으로** 말하는 답이 좋다.

## 헷갈리기 쉬운 것

- **자동완성형 vs 에이전트형**: Copilot 기본 모드는 커서 위치에서 몇 줄을 제안하고, Claude Code·Cursor Agent·Copilot Agent 는 여러 파일을 읽고 고치고 명령까지 실행한다. 후자는 권한 범위와 검토가 훨씬 중요하다.
- **웹 챗봇에 붙여넣기**: 코드를 복사해 묻는 것도 AI 활용이지만 저장소 맥락이 없어 틀리기 쉽고, 사내 코드를 외부 서비스에 올리는 건 보안 규정 위반일 수 있다.
- **바이브 코딩**: 결과만 보고 코드는 안 읽는 방식. 프로토타입엔 빠르지만, 면접과 실무에서 "왜 이렇게 짰나" 에 답 못 하면 곤란하다.
