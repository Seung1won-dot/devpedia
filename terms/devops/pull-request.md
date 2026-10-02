---
id: pull-request
term: PR/코드 리뷰
aliases:
  - Pull Request
  - 풀 리퀘스트
  - 코드 리뷰
  - Merge Request(GitLab)
category: devops
tags:
  - Git
  - 협업
level: 1
kind: pattern
related:
  - commit-branch-merge
  - git
  - github-actions
  - testing-levels
  - refactoring
  - dependabot
  - codeowners
see_also:
  - https://docs.github.com/pull-requests
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

내 브랜치를 **합쳐 달라고 요청**하고 동료가 코드를 검토하는 절차.

## 비유

논문 초안을 지도교수에게 **첨삭 받는 것**. 바로 학회에 내지 않고, 빨간 펜 코멘트를 반영한 뒤에야 최종본에 들어간다.

## 예시

```bash
git push -u origin feat/devops-cards
gh pr create --title "term(devops): add 17 cards" --body "validate 통과"
gh pr view --web          # 브라우저에서 리뷰 코멘트 확인
```

PR 을 열면 GitHub Actions 가 `npm run validate` 를 자동으로 돌리고, 검사 통과 + 리뷰 승인이 있어야 main 에 머지한다.

## 헷갈리기 쉬운 것

- **git pull** 은 원격 변경을 내 컴퓨터로 가져오는 명령. Pull Request 는 "내 것을 가져가 달라"는 반대 방향의 요청이다.
- **Merge Request** 는 GitLab 에서 같은 개념을 부르는 이름.
