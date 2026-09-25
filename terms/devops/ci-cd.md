---
id: ci-cd
term: CI/CD
aliases:
  - Continuous Integration / Continuous Delivery
  - 지속적 통합/배포
  - 씨아이씨디
  - 파이프라인
category: devops
tags:
  - CI/CD
  - 배포
  - 테스트
level: 1
related:
  - github-actions
  - testing-levels
  - rollback
  - environments
  - pull-request
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

코드를 올릴 때마다 **자동으로 검사(CI)하고 배포(CD)**하는 방식.

## 비유

공장의 **자동 검수 컨베이어 벨트**. 부품(코드)을 올리면 검사기(테스트)를 지나고, 통과한 것만 자동으로 출하(배포)된다.

## 예시

```bash
# Devpedia 파이프라인 — 로컬에서도 같은 순서로 돌려 볼 수 있다
npm run validate     # CI: 카드 규칙 검사
npm run test         # CI: 단위 테스트
npm run build        # CI: 번들 생성 (dist/)
# → CD: GitHub Actions 가 dist/ 를 GitHub Pages 에 올린다
```

PR 단계에서는 CI 까지만, main 에 머지된 뒤에는 CD 까지 돈다. 하나라도 실패하면 배포가 멈추니 "깨진 채로 올라가는" 일이 없다.

## 헷갈리기 쉬운 것

- **CI 와 CD 는 별개**: CI(통합)는 합치기 전 자동 검사, CD(배포)는 검사 통과분을 자동으로 내보내기. CI 만 있고 배포는 손으로 하는 팀도 많다.
- **Continuous Delivery vs Deployment**: 전자는 "언제든 배포할 수 있게 준비", 후자는 "사람 승인 없이 실제로 배포". 둘 다 CD 라고 줄여 부른다.
