---
id: clean-code
term: 클린 코드
aliases:
  - Clean Code
  - 클린코드
  - 읽기 쉬운 코드
  - 코드 가독성
category: swe
tags:
  - 품질
  - 설계원칙
level: 1
kind: concept
related:
  - refactoring
  - dry-kiss-yagni
  - pull-request
  - semantic-commit
  - solid
  - technical-debt
  - linter-formatter
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

남이 읽어도 **의도가 바로 보이는** 코드, 그리고 그렇게 쓰기 위한 습관들.

## 비유

**정리된 실험실 벤치**. 시약병마다 이름표가 붙어 있고 서랍 하나에 한 종류만 들어 있으면, 처음 온 학부생도 설명 없이 찾아 쓴다.

## 예시

```ts
// before — 이름이 뜻을 안 알려 주고, 한 함수가 세 가지 일을 한다
function proc(d: any[]) {
  const r = []
  for (const x of d) if (x.s === 'review' && x.l >= 2) r.push(x)   // 뭘 거르는 건지?
  r.sort((a, b) => a.t.localeCompare(b.t))
  for (const x of r) console.log(x.t)                              // 출력까지 섞였다
  return r
}
// after — 이름이 설명하고, 함수 하나가 한 가지 일만 한다
const isAdvancedInReview = (c: Card) => c.status === 'review' && c.level >= 2
const byTerm = (a: Card, b: Card) => a.term.localeCompare(b.term)
export const reviewQueue = (cards: Card[]) => cards.filter(isAdvancedInReview).sort(byTerm)
// 출력은 부르는 쪽이: reviewQueue(cards).forEach((c) => console.log(c.term))
```

규칙은 몇 개 안 된다. **이름이 뜻을 말하게**(`d` 가 아니라 `cards`), **함수는 한 가지 일만** 짧게, 매직 넘버는 상수로(`DEFINITION_MAX_CHARS`), 주석은 "왜" 만 적고 "무엇" 은 코드가 말하게, 같은 코드를 두 번 쓰지 않기. 처음부터 깨끗하게 쓰는 게 아니라 **돌아가게 만든 뒤 리팩토링으로** 도달하는 것이고, 코드 리뷰에서 "이 변수 무슨 뜻이에요?" 라는 질문이 나오면 그 자리가 고칠 곳이다. 들여쓰기·따옴표 같은 표기는 포매터(Prettier·Black)와 린터(ESLint·Ruff)에 맡기고, 사람은 이름과 책임 나누기에 집중한다.

면접에선 "좋은 코드란 뭐라고 생각하나? 코드 리뷰에서 무엇을 보나?" 로 나온다 — 자기 프로젝트에서 이름을 바꾸거나 함수를 쪼갠 사례 하나를 붙여 답하면 좋다.

## 헷갈리기 쉬운 것

- **리팩토링**: 클린 코드에 "도달하는 과정". 클린 코드는 그 목표 상태와 원칙이다.
- **코딩 컨벤션**: 들여쓰기·중괄호 위치 같은 표기 규칙으로, 도구가 자동으로 맞춘다. 클린 코드는 이름·책임 분리처럼 도구가 못 하는 판단이다.
- **짧은 코드**: 한 줄에 다 욱여넣은 정규식보다 이름 붙인 세 줄이 더 깨끗하다. 줄 수가 아니라 읽는 데 걸리는 시간이 기준이다.
