---
id: gitignore
term: ".gitignore"
aliases:
  - 깃이그노어
  - Git 무시 목록
  - 깃 제외 파일
category: devops
tags:
  - Git
  - 보안
level: 1
kind: tool
related:
  - git
  - secrets-management
  - secret-leak
  - environment-variable
  - package-manager
see_also:
  - https://git-scm.com/docs/gitignore
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

Git 이 **추적하지 않을 파일**의 목록을 적어 두는 설정 파일.

## 비유

이삿짐 목록에서 **"이건 안 가져감"** 표시. 쓰레기(빌드 산출물)와 통장 비밀번호(.env)는 상자에 넣지 않는다.

## 예시

```ini
# Devpedia 의 .gitignore 를 바탕으로 한 예 (.env 는 추가 권장)
node_modules/
dist/
public/terms.json
.env
*.log
```

`node_modules/` 는 `npm install` 로 다시 만들 수 있고, `.env` 에는 Slack 웹훅 URL 같은 비밀이 들어가니 절대 올리지 않는다. 이미 커밋된 파일은 `git rm --cached .env` 로 추적을 끊어야 적용된다.

## 헷갈리기 쉬운 것

- **.gitignore 는 이미 추적 중인 파일을 지워 주지 않는다.** 올린 뒤에 추가하면 늦고, 시크릿이면 이력에 남으니 키를 새로 발급해야 한다(시크릿 유출 카드).
- **.dockerignore** 는 같은 형식이지만 Docker 이미지 빌드에 넣지 않을 파일 목록.
