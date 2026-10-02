---
id: merge-conflict
term: 머지 충돌 해결
aliases:
  - Merge Conflict
  - 충돌 해결
  - 컨플릭트
  - conflict
category: devops
tags:
  - Git
  - 협업
  - 흔한실수
level: 2
kind: concept
related:
  - commit-branch-merge
  - rebase
  - pull-request
  - git-flow
  - git
  - cherry-pick-stash
see_also:
  - https://docs.github.com/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

두 브랜치가 **같은 줄을 다르게 고쳐** Git 이 혼자 합치지 못하고 사람에게 묻는 상황.

## 비유

두 사람이 같은 문서의 **같은 문장을 각자 다르게 고쳐 온 것**. 편집장은 어느 쪽이 맞는지 모르니 "둘이 정해서 알려 달라" 며 멈춘다.

## 예시

```text
<<<<<<< HEAD
term: 커밋/브랜치/머지
=======
term: 커밋·브랜치·머지
>>>>>>> feat/devops-cards
```

```bash
git merge feat/devops-cards      # CONFLICT (content): Merge conflict in terms/devops/commit-branch-merge.md
# 파일을 열어 마커 3줄을 지우고 남길 내용만 남긴다
git add terms/devops/commit-branch-merge.md
git commit                       # merge 중이면 commit, rebase 중이면 git rebase --continue
```

`<<<<<<< HEAD` 부터 `=======` 까지가 **내 쪽(현재 브랜치)**, 그 아래 `>>>>>>>` 까지가 **가져오는 쪽**이다. 한쪽을 고르거나 둘을 섞어 쓴 뒤 마커 세 줄은 반드시 지우며, VS Code 는 충돌 구간 위에 Accept Current / Incoming / Both 버튼을 띄워 준다. 다른 줄을 고친 건 Git 이 알아서 합치므로 충돌은 진짜 겹친 줄에서만 나고, 예방은 **PR 을 작게 쪼개고 main 을 자주 pull** 하는 것이다. 면접에서는 "머지 충돌은 어떻게 해결했나요?" 로 나오며, 상대 커밋의 의도를 확인하고 골랐다는 점을 말하면 좋다.

## 헷갈리기 쉬운 것

- **충돌은 에러가 아니다**: Git 이 고장난 게 아니라 판단을 사람에게 넘긴 것. 마커를 안 지운 채 커밋하면 그때 진짜 버그가 된다.
- **merge 중 vs rebase 중**: 마무리 명령이 다르다. merge 는 `git commit`, rebase 는 `git rebase --continue`, 포기하려면 각각 `--abort`. rebase 는 커밋 하나마다 충돌이 다시 날 수 있다.
- **`git pull` 할 때도 난다**: pull 은 fetch + merge 라서 동료가 같은 줄을 먼저 push 했으면 똑같은 화면을 만난다.
