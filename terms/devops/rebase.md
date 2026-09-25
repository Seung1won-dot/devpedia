---
id: rebase
term: rebase
aliases:
  - 리베이스
  - git rebase
  - 커밋 다시 쌓기
  - 재배치
category: devops
tags:
  - Git
level: 2
related:
  - commit-branch-merge
  - git
  - pull-request
  - semantic-commit
see_also:
  - https://git-scm.com/docs/git-rebase
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

내 브랜치의 커밋들을 **다른 브랜치 끝에 다시 쌓아** 이력을 한 줄로 만드는 것.

## 비유

친구가 먼저 쌓은 블록 탑 **위에 내 블록을 옮겨 다시 쌓는 것**. 옆에 따로 탑을 세우고 다리로 잇는(머지) 대신, 처음부터 한 탑이었던 것처럼 보인다.

## 예시

```bash
git switch feat/devops-cards
git fetch origin
git rebase origin/main            # main 의 최신 커밋 뒤로 내 커밋 옮기기
git push --force-with-lease       # 이력이 바뀌었으니 "안전한" 강제 푸시
```

PR 올리기 전에 main 을 따라잡을 때 쓴다. 충돌이 나면 커밋 하나씩 멈추므로 고친 뒤 `git rebase --continue` 로 이어 간다.

## 헷갈리기 쉬운 것

- **머지**는 두 줄기를 보존하고 합치는 커밋을 만든다. rebase 는 이력이 깔끔하지만 커밋 해시가 바뀌므로, 남과 공유한 브랜치(main)에는 하지 않는다.
- **squash** 는 커밋 여러 개를 하나로 뭉치는 것. `git rebase -i` 로 같이 하는 경우가 많아 섞이기 쉽다.
