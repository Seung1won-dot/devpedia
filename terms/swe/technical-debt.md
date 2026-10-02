---
id: technical-debt
term: 기술 부채
aliases:
  - Technical Debt
  - 기술적 부채
  - 테크 데트
category: swe
tags:
  - 품질
  - 방법론
level: 1
kind: concept
related:
  - refactoring
  - mvp
  - testing-levels
  - adr
  - code-coverage
  - code-smell
  - legacy-code
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

지금 빨리 가려고 대충 만든 부분이 **나중에 이자처럼 불어나는 수고**.

## 비유

급할 때 **신용카드로 긁는 것**. 당장은 편하지만 갚지 않으면 이자(느려진 개발 속도)가 붙고, 언젠가는 한도 초과로 아무것도 못 산다(작은 수정도 무서워진다).

## 예시

```markdown
## 알려진 부채 (docs/tech-debt.md)
- [ ] 검색이 term·aliases 만 봄. 본문 검색은 인덱스 크기 때문에 미룸 (2026-09)
- [ ] sentenceCount 가 "e.g. " 같은 약어를 문장 끝으로 셈 — 카드 늘면 오탐 증가
- [x] 60자 상수가 세 곳에 흩어져 있던 것 → DEFINITION_MAX_CHARS 로 통합
```

부채 자체가 나쁜 게 아니다 — 논문 마감 전 실험 코드는 일부러 빚을 내는 게 맞다. 문제는 **기록하지 않은 부채**. 어디에 얼마나 있는지 적어두고, 스프린트마다 일정 비율(예: 20%)을 갚는 데 쓴다.

## 헷갈리기 쉬운 것

- **버그**는 지금 틀리게 동작하는 것. 기술 부채는 지금은 잘 돌아가지만 다음 변경을 비싸게 만드는 것.
- **레거시 코드**는 오래돼서 손대기 어려운 코드 전반. 부채는 그중 "알면서 미룬" 부분이라 갚을 계획을 세울 수 있다.
