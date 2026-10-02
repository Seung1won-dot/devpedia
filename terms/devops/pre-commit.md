---
id: pre-commit
term: pre-commit 훅
aliases:
  - pre-commit
  - Git Hook
  - 깃 훅
  - 커밋 전 검사
  - husky
category: devops
tags:
  - Git
  - 개발도구
  - 품질
level: 1
kind: tool
related:
  - linter-formatter
  - git
  - secret-leak
  - ci-cd
  - semantic-commit
  - coding-convention
see_also:
  - https://pre-commit.com/
  - https://git-scm.com/docs/githooks
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

`git commit` 직전에 **린터·포매터·시크릿 검사를 자동 실행**해 문제 있는 커밋을 막는 도구.

## 비유

메일 보내기 버튼을 누르면 **맞춤법 검사기가 먼저 돌고**, 빨간 줄이 있으면 전송이 안 되는 것. 보낸 뒤 "아, 오타" 하는 대신 보내기 전에 잡는다.

## 예시

```yaml
# .pre-commit-config.yaml — 저장소 루트에 커밋해 둔다
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v5.0.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-added-large-files   # DICOM·모델 파일을 실수로 커밋하는 것 방지
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.6.9
    hooks:
      - id: ruff
      - id: ruff-format
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.21.0
    hooks:
      - id: gitleaks                  # API 키·토큰이 섞인 커밋 차단
```

```bash
pip install pre-commit && pre-commit install   # .git/hooks/pre-commit 에 연결 (각자 한 번)
pre-commit run --all-files                     # 처음엔 기존 파일 전부 한 번 정리
```

위 `rev` 값은 작성 시점 예시이고 `pre-commit autoupdate` 가 최신 태그로 바꿔 준다 [확인 필요]. 이후 `git commit` 때마다 바뀐 파일만 검사하고, 포매터가 고친 게 있으면 커밋이 멈추니 `git add` 후 다시 커밋한다. Git 자체 훅은 `.git/hooks/` 의 스크립트라 clone 해도 따라오지 않는데, pre-commit 도구는 설정 파일을 저장소에 두고 각자 `install` 한 번으로 같은 검사를 돌리게 해 준다.

## 헷갈리기 쉬운 것

- **CI** 도 같은 검사를 하지만 push 뒤 서버에서 돈다. pre-commit 은 몇 초짜리 빠른 검사(포맷·린트·시크릿)만, 느린 테스트는 CI 로. `git commit --no-verify` 로 건너뛸 수 있으니 강제는 CI 가 맡는다.
- **Git 훅(pre-commit)** 은 Git 기능의 이름이고, **pre-commit(도구)** 는 그 훅을 관리해 주는 Python 프로그램. JS 생태계는 **husky** + lint-staged 가 같은 역할.
- **린터/포매터**는 검사 도구 자체, pre-commit 은 그걸 "언제 돌릴지" 정하는 자리.
