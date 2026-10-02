---
id: cherry-pick-stash
term: cherry-pick/stash
aliases:
  - cherry-pick
  - stash
  - 체리픽
  - 스태시
  - 임시 저장
category: devops
tags:
  - Git
  - 개발도구
level: 1
kind: concept
related:
  - commit-branch-merge
  - rebase
  - merge-conflict
  - git
  - git-flow
see_also:
  - https://git-scm.com/docs/git-cherry-pick
  - https://git-scm.com/docs/git-stash
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

커밋 하나만 골라 가져오는 **cherry-pick** 과 하던 작업을 잠시 치워 두는 **stash**.

## 비유

cherry-pick 은 남의 노트에서 **필요한 한 장만 복사**해 내 노트에 끼우는 것, stash 는 하던 숙제를 **서랍에 잠깐 넣어 두고** 급한 일을 본 뒤 다시 꺼내는 것. 둘 다 "전부가 아니라 일부만, 지금 당장" 이 포인트다.

## 예시

```bash
# stash: 작업 중인데 급히 main 의 버그를 고쳐야 할 때
git stash -u                    # 수정 중인 파일(새 파일 포함)을 치우고 작업 트리를 깨끗하게
git switch main && git pull     # 급한 일 처리
git switch feature/rag-rerank
git stash pop                   # 치워 둔 변경 복원 (git stash list 로 여러 개 관리)

# cherry-pick: main 에 들어간 핫픽스 커밋 하나만 release 브랜치에도 넣기
git switch release/1.2
git cherry-pick 3f2a9c1         # 그 커밋의 변경만 새 커밋으로 복사
```

`-u` 를 빼면 아직 `git add` 안 한 새 파일은 stash 되지 않아 "파일이 안 사라졌네?" 하는 일이 흔하다. cherry-pick 은 같은 변경이 두 브랜치에 **다른 해시**로 존재하게 되므로, 나중에 두 브랜치를 머지하면 같은 줄에서 충돌이 날 수 있다.

## 헷갈리기 쉬운 것

- **merge/rebase** 는 브랜치의 커밋 전부를 가져오지만, cherry-pick 은 고른 커밋만. "핫픽스 하나만 급히" 가 아니면 머지가 낫다.
- **stash 와 커밋**: stash 는 내 컴퓨터에만 있고 push 되지 않으며 브랜치 이력에 남지 않는다. 하루 넘게 둘 거면 WIP 커밋이 더 안전하다.
- **`git stash` 와 `git checkout -- .`**: 전자는 치워 두는 것(복원 가능), 후자는 변경을 버리는 것(복구 불가).
