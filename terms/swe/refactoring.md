---
id: refactoring
term: 리팩토링
aliases:
  - Refactoring
  - 리팩터링
  - 코드 정리
category: swe
tags:
  - 품질
  - 설계원칙
level: 1
kind: concept
related:
  - technical-debt
  - testing-levels
  - tdd
  - dry-kiss-yagni
  - design-pattern
  - clean-code
  - code-smell
see_also:
  - https://refactoring.com/
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

겉으로 하는 일은 그대로 두고 **속 구조만 고쳐** 읽고 고치기 쉽게 만드는 것.

## 비유

방 **대청소와 정리**. 가구를 새로 사는 게 아니라 있는 물건을 제자리에 두고 안 쓰는 걸 버리는 것이라, 끝나도 방에서 할 수 있는 일은 똑같지만 뭐든 찾기 쉬워진다.

## 예시

```ts
// before — 무엇을 검사하는지 정규식을 읽어야 안다
if (s.replace(/\*\*|`/g, '').trim().length > 60) fail()

// after — 이름이 설명한다. 동작은 같다
const plain = stripInline(s)
if (plain.length > DEFINITION_MAX_CHARS) fail()
```

규칙은 하나 — **테스트가 통과하는 상태에서 아주 작게, 자주**. Devpedia 에는 `validate.test.ts` 가 있으니 `stripInline` 을 뽑아내도 결과가 같은지 바로 확인된다. 기능 추가와 리팩토링을 한 커밋에 섞지 말 것 (`refactor(validate): extract stripInline`).

## 헷갈리기 쉬운 것

- **재작성(rewrite)**은 처음부터 다시 만드는 것. 리팩토링은 돌아가는 코드를 조금씩 바꾼다.
- **버그 수정·기능 추가**는 동작이 바뀌므로 리팩토링이 아니다. 시맨틱 커밋에서 `fix`/`feat` 와 `refactor` 를 나누는 이유.
