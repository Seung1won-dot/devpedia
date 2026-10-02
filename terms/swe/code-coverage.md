---
id: code-coverage
term: 코드 커버리지
aliases:
  - Code Coverage
  - 테스트 커버리지
  - 커버리지
category: swe
tags:
  - 테스트
  - 품질
level: 2
kind: metric
related:
  - testing-levels
  - tdd
  - ci-cd
  - github-actions
  - technical-debt
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

테스트를 돌렸을 때 전체 코드 중 **실제로 실행된 줄의 비율**.

## 비유

시험 범위 중 **한 번이라도 펴본 페이지 비율**. 90% 를 펼쳤다고 그 내용을 이해했다는 뜻은 아니듯, 실행됐다고 검증됐다는 뜻은 아니다.

## 예시

```bash
npx vitest run --coverage
```

```text
 File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
 lib/validate.ts  |   91.3  |   78.5   |   100   |   91.3  | 142-148
 lib/parse.ts     |   100   |   100    |   100   |   100   |
```

진짜 쓸모는 `Uncovered Line #s` — 142-148 이 "related 7개 초과" 경고 분기라면 그 케이스 테스트가 없다는 뜻이다. Branch 가 Stmts 보다 낮은 건 if 의 한쪽만 탔다는 신호. CI 에 "80% 미만이면 실패"를 걸 수는 있지만 숫자 채우기용 테스트가 생기기 쉬우니, 연구실 규모에선 "새 코드에 테스트가 붙었나"를 리뷰에서 보는 편이 낫다. (위 수치는 설명용 예시다 [확인 필요])

## 헷갈리기 쉬운 것

- **커버리지 100% ≠ 버그 0**. 줄이 실행됐다는 것이지 결과를 `expect` 로 확인했다는 뜻이 아니다. 단언 없는 테스트도 커버리지는 올린다.
- **Line 과 Branch**: 한 줄에 `a ? b : c` 가 있으면 Line 은 1/1, Branch 는 1/2 일 수 있다. Branch 가 더 엄격하다.
