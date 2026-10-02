---
id: git
term: Git
aliases:
  - 깃
  - 버전 관리 시스템
  - VCS
  - 분산 버전 관리
category: devops
tags:
  - Git
  - 개발도구
  - 협업
level: 1
kind: tool
related:
  - commit-branch-merge
  - pull-request
  - gitignore
  - github-actions
  - semantic-commit
  - git-tag-release
  - pre-commit
see_also:
  - https://git-scm.com/doc
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

파일의 **변경 이력을 저장**하고 여러 사람이 같이 고칠 수 있게 하는 도구.

## 비유

**되돌리기가 무한한 공동 문서**. 누가 언제 어디를 고쳤는지 다 남고, 망치면 어제 상태로 돌아갈 수 있다.

## 예시

```bash
git init                         # 이 폴더를 저장소로 만들기
git add terms/devops/git.md      # 바뀐 파일을 담기
git commit -m "term(devops): add git"
git push origin main             # GitHub 에 올리기
```

Devpedia 카드 하나를 추가해 GitHub 에 올리는 최소 흐름. 커밋 메시지 형식은 시맨틱 커밋 카드 참고.

## 헷갈리기 쉬운 것

- **GitHub** 은 Git 저장소를 올려 두는 웹 서비스. Git 은 내 컴퓨터에서 도는 프로그램이라 GitHub 없이도 쓸 수 있다.
- **SVN** 같은 옛 방식은 서버 한 곳에만 이력이 있지만, Git 은 clone 한 사람마다 전체 이력을 갖는다(분산).
