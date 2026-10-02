---
id: tdd
term: TDD
aliases:
  - Test-Driven Development
  - 테스트 주도 개발
  - 레드-그린-리팩터
category: swe
tags:
  - 테스트
  - 방법론
level: 2
kind: pattern
related:
  - testing-levels
  - refactoring
  - code-coverage
  - user-story
  - ci-cd
  - mocking
  - pair-programming
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

**실패하는 테스트를 먼저 쓰고** 그걸 통과시키는 최소 코드를 짜는 순서로 개발하는 방식.

## 비유

요리하기 전에 **시식 담당이 먼저 채점표를 쓰는 것**. "짠맛 3, 온도 60도 이상"이라고 정해둔 뒤 그 표를 통과할 만큼만 요리하니, 뭘 만들어야 하는지 헤매지 않는다.

## 예시

Devpedia 의 `stripInline` 을 TDD 로 만든다면 한 바퀴는 이렇다.

```ts
// 1. RED — 아직 stripInline 이 없어서 실패
it('굵게·코드 기호를 걷어낸다', () => {
  expect(stripInline('**REST** 로 `JSON` 을')).toBe('REST 로 JSON 을')
})

// 2. GREEN — 통과하는 가장 단순한 구현
export const stripInline = (md: string) => md.replace(/\*\*|`/g, '').trim()

// 3. REFACTOR — 링크 [텍스트](url) 케이스 테스트를 추가하고 정규식을 넓힌다
```

한 바퀴가 몇 분 안에 끝나야 한다. 카드 규칙(60자, 문장 하나)도 전부 이 순서로 넣기 좋다 — 규칙을 테스트로 먼저 적어두면 "어떤 카드가 실패해야 하는지"가 곧 명세가 된다.

## 헷갈리기 쉬운 것

- **테스트를 나중에 쓰는 것**과 결과물은 비슷해 보여도, TDD 는 테스트가 설계를 끌고 간다(함수 이름·입출력을 먼저 정하게 됨). 커버리지 숫자가 목표가 아니다.
- **BDD** 는 테스트를 "Given–When–Then" 사용자 언어로 쓰는 변형. 순서는 같다.
