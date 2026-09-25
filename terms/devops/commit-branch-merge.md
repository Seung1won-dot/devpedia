---
id: commit-branch-merge
term: 커밋/브랜치/머지
aliases:
  - commit / branch / merge
  - 커밋
  - 브랜치
  - 병합
category: devops
tags:
  - Git
  - 협업
level: 1
related:
  - git
  - rebase
  - pull-request
  - semantic-commit
see_also:
  - https://git-scm.com/docs/git-merge
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**커밋**은 저장 지점, **브랜치**는 갈라진 작업 줄기, **머지**는 다시 합치기.

## 비유

커밋은 게임의 **세이브 포인트**, 브랜치는 세이브 파일을 복사해 다른 루트를 가 보는 것. 머지는 두 루트에서 얻은 아이템을 한 세이브에 합치는 일이다.

## 예시

```bash
git switch -c feat/devops-cards      # 새 브랜치 만들고 이동
git add terms/devops/ && git commit -m "term(devops): add 17 cards"
git switch main
git merge feat/devops-cards          # main 에 합치기
```

devops 카드 작업을 브랜치에서 하고 main 에 합치는 흐름. 같은 줄을 양쪽에서 고쳤으면 충돌(conflict)이 나서 손으로 골라 줘야 한다.

## 헷갈리기 쉬운 것

- **머지 vs rebase**: 둘 다 합치지만 머지는 "합쳤다"는 커밋이 하나 생기고, rebase 는 내 커밋을 상대 뒤에 다시 얹어 한 줄로 만든다.
- **commit vs push**: commit 은 내 컴퓨터에만 저장, push 해야 GitHub 에 올라간다.
