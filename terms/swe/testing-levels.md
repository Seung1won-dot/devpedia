---
id: testing-levels
term: 단위/통합/E2E 테스트
aliases:
  - Unit Test
  - Integration Test
  - End-to-End Test
  - 테스트 피라미드
category: swe
tags:
  - 테스트
  - 품질
level: 1
related:
  - tdd
  - code-coverage
  - ci-cd
  - refactoring
  - github-actions
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

코드를 **함수 하나·부품 조합·사용자 흐름 전체** 세 크기로 나눠 검사하는 단계.

## 비유

자동차 검사. 부품 하나(브레이크 패드)를 따로 눌러보는 게 단위, 브레이크와 바퀴를 붙여 돌려보는 게 통합, 실제 도로에서 시승하는 게 E2E 다.

## 예시

Devpedia 의 vitest 테스트로 보면 이렇다.

```ts
// 단위 — 함수 하나만
it('마침표 뒤 공백 기준으로 문장을 센다', () => {
  expect(sentenceCount('하나. 둘.')).toBe(2)
})

// 통합 — 파서 + 검증기 + 실제 taxonomy 파일을 붙여서
it('terms/ 전체가 검증을 통과한다', () => {
  expect(runValidation(root, false).result.ok).toBe(true)
})

// E2E — 진짜 브라우저(Playwright)로 검색창에 "ssh" 를 치고 카드가 뜨는지
```

비율은 피라미드 — 단위는 많이(빠르고 싸다), 통합은 적당히, E2E 는 핵심 흐름 몇 개만(느리고 잘 깨진다). CI 에서는 단위·통합은 매 PR 마다, E2E 는 배포 직전에 돌리는 식으로 나눈다.

## 헷갈리기 쉬운 것

- **단위와 통합**의 경계: DB·네트워크·파일 같은 바깥 것을 가짜(mock)로 바꿨으면 단위, 진짜를 붙였으면 통합. "함수 몇 개냐"가 기준이 아니다.
- **E2E 와 수동 QA**: E2E 는 사람이 클릭하던 걸 스크립트가 대신 하는 것. 자동화됐다는 점만 다르다.
