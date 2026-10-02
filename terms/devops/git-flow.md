---
id: git-flow
term: Git Flow/브랜치 전략
aliases:
  - Git Flow
  - Branching Strategy
  - 브랜치 전략
  - GitHub Flow
  - Trunk-based Development
  - 깃 플로우
category: devops
tags:
  - Git
  - 협업
  - 배포
level: 2
kind: pattern
related:
  - commit-branch-merge
  - pull-request
  - merge-conflict
  - ci-cd
  - semver
  - environments
  - codeowners
see_also:
  - https://nvie.com/posts/a-successful-git-branching-model/
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

팀이 **어떤 브랜치를 언제 만들고 어디로 합칠지** 미리 정해 둔 약속.

## 비유

회사 문서의 **결재선**. 초안은 각자 책상(feature)에서 쓰고, 팀 검토본(develop)을 거쳐, 최종 승인본(main)만 밖으로 나간다.

## 예시

```bash
# Git Flow: feature 는 develop 에서 갈라져 develop 으로 돌아간다
git switch develop && git switch -c feature/elk-cards
# ... 작업 → PR → develop 에 머지

# 배포 준비: release 브랜치에서 QA → main 에 머지 + 버전 태그, develop 에도 반영
git switch -c release/1.3.0 develop
git switch main && git merge release/1.3.0 && git tag v1.3.0
git switch develop && git merge release/1.3.0

# 운영 중 급한 버그: main 에서 hotfix → main 과 develop 양쪽에 머지
git switch -c hotfix/1.3.1 main
```

Git Flow 는 `main`(배포본)·`develop`(통합)·`feature/*`·`release/*`·`hotfix/*` 다섯 종류를 쓴다. **GitHub Flow** 는 `main` 과 `feature` 브랜치 둘뿐이고 PR 이 머지되면 바로 배포한다. **Trunk-based** 는 브랜치를 거의 두지 않고 모두가 하루에 여러 번 `main` 에 작게 합치며, 미완성 기능은 feature flag 로 숨긴다. Devpedia 같은 소규모 프로젝트는 GitHub Flow 면 충분하고, 면접에서 "브랜치 전략은 뭘 썼고 왜?" 라고 물으면 팀 규모와 배포 주기에 맞춰 골랐다고 답한다.

## 헷갈리기 쉬운 것

- **Git Flow vs GitHub Flow**: 이름은 비슷하지만 전자는 브랜치 다섯 종류를 두는 무거운 전략, 후자는 두 종류뿐인 가벼운 전략. 앱처럼 버전 단위로 배포하면 전자, 웹 서비스처럼 수시 배포하면 후자가 맞다.
- **Trunk-based 가 되려면**: CI 와 자동 테스트가 튼튼해야 한다. 그게 없으면 `main` 이 늘 깨져 있게 된다.
- **브랜치 전략 vs 커밋 규칙**: 전략은 브랜치를 어떻게 나누느냐, 커밋 규칙(Conventional Commits)은 메시지를 어떻게 쓰느냐. 둘 다 팀 약속이지만 층이 다르다.
