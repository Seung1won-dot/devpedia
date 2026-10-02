---
id: dry-kiss-yagni
term: DRY/KISS/YAGNI
aliases:
  - Don't Repeat Yourself
  - Keep It Simple Stupid
  - You Aren't Gonna Need It
  - 중복 금지·단순하게·미리 만들지 않기
category: swe
tags:
  - 설계원칙
  - 품질
level: 1
kind: pattern
related:
  - refactoring
  - solid
  - technical-debt
  - mvp
  - design-pattern
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**중복 없이, 단순하게, 필요할 때만** 만들라는 코드 작성 격언 세 개.

## 비유

자취방 살림 규칙. 같은 국자를 세 개 사지 말고(DRY), 서랍 정리는 누가 봐도 알게(KISS), "언젠가 손님 오면" 하며 접시 20장을 미리 사두지 말 것(YAGNI).

## 예시

DRY 위반 — 60 이라는 숫자가 세 군데에 흩어져 있으면 하나만 고치고 둘을 놓친다.

```ts
if (plain.length > 60) fail()            // validate.ts
<p className="len">{n}/60</p>            // 에디터 UI
// → 한 곳에 이름 붙여 두고 가져다 쓴다
export const DEFINITION_MAX_CHARS = 60
```

KISS — 카드 저장소를 DB 대신 Markdown 파일로 둔 것. YAGNI — "나중에 다국어 지원할 수도 있으니" 하며 지금 i18n 계층을 넣지 않는 것. 셋이 충돌할 때도 있다 — 비슷한 두 줄을 없애려고 추상화 계층을 만들면 DRY 는 지키고 KISS 는 깬다.

## 헷갈리기 쉬운 것

- **DRY 를 "같은 글자가 두 번 나오면 안 된다"로 오해**하기 쉽다. 우연히 닮은 코드(서로 다른 이유로 바뀔 코드)는 합치면 안 되고, 같은 지식이 두 곳에 있는 게 문제다.
- **YAGNI 와 MVP** 는 같은 정신(지금 필요한 것만) — YAGNI 는 코드 수준, MVP 는 제품 수준.
