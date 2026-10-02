---
id: git-tag-release
term: 깃 태그/릴리스
aliases:
  - Git Tag
  - GitHub Release
  - 태그
  - 릴리스
  - 버전 태그
category: devops
tags:
  - Git
  - 배포
  - 협업
level: 1
kind: concept
related:
  - semver
  - git
  - commit-branch-merge
  - rollback
  - changelog
  - container-registry
see_also:
  - https://git-scm.com/docs/git-tag
  - https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

특정 커밋에 **v1.2.0 같은 버전 이름표를 붙여** "이 시점이 배포본" 이라고 표시하는 것.

## 비유

두꺼운 실험 노트의 특정 페이지에 **"학회 제출본" 포스트잇**을 붙여 두는 것. 페이지(커밋)는 계속 늘어나도 포스트잇은 그 자리에 고정이라 언제든 바로 펼 수 있다.

## 예시

```bash
git tag -a v1.2.0 -m "RAG API: 리랭커 추가"   # 지금 커밋에 주석 달린 태그
git push origin v1.2.0                      # 태그는 따로 push 해야 올라간다
git tag -l "v1.*"                           # 태그 목록
git checkout v1.1.0                         # 문제 생기면 이전 배포 시점으로 돌아가 보기
gh release create v1.2.0 --generate-notes   # GitHub 릴리스 + 커밋 기반 변경 노트 자동 생성
```

태그가 있어야 "지난주 배포본이 정확히 어느 커밋이었지?" 에 답할 수 있다. GitHub Actions 는 `on: push: tags: ['v*']` 로 태그가 올라올 때만 Docker 이미지를 빌드해 같은 이름(`api:1.2.0`)으로 레지스트리에 올리는 식으로 쓴다. 번호를 어떻게 올릴지는 시맨틱 버저닝 카드.

## 헷갈리기 쉬운 것

- **브랜치**는 커밋할 때마다 앞으로 움직이는 포인터, 태그는 한 커밋에 박혀 움직이지 않는다. 배포 지점을 브랜치로 표시하면 누가 커밋하는 순간 사라진다.
- **릴리스**는 GitHub 의 기능으로, 태그 위에 변경 노트와 첨부 파일(빌드 결과물)을 얹은 것. 태그는 Git 자체 기능이라 GitHub 없이도 있다.
- `git tag v1.2.0`(lightweight) 과 `-a`(annotated): 전자는 이름만, 후자는 작성자·날짜·메시지가 남는다. 배포 태그는 `-a` 로.
