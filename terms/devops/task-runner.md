---
id: task-runner
term: Makefile/npm scripts
aliases:
  - Task Runner
  - 태스크 러너
  - Makefile
  - npm scripts
  - make
  - just
category: devops
tags:
  - 개발도구
  - 셸
  - 협업
level: 1
kind: tool
related:
  - package-manager
  - shell
  - ci-cd
  - readme
  - docker-compose
see_also:
  - https://www.gnu.org/software/make/manual/make.html
  - https://docs.npmjs.com/cli/v10/using-npm/scripts
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

자주 치는 긴 명령에 **짧은 이름을 붙여** `make test` 처럼 한 단어로 실행하게 하는 도구.

## 비유

전화기 **단축번호**. 11자리를 외우는 대신 "1번 길게" 면 집에 걸리고, 팀 전체가 같은 단축번호표를 쓰니 새로 온 사람도 "일단 `make dev`" 로 시작할 수 있다.

## 예시

```makefile
# Makefile — 명령 줄 들여쓰기는 반드시 탭(스페이스면 에러)
.PHONY: dev test lint up

dev:
	uv run uvicorn app.main:app --reload --port 8000

test:
	uv run pytest -q

lint:
	uv run ruff check . && uv run ruff format --check .

up:
	docker compose up -d --build
```

```jsonc
// package.json — 프론트엔드는 보통 이쪽. npm run dev / npm test
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "test": "vitest run"
}
```

새 팀원은 README 의 `make dev` 한 줄만 보면 되고, 명령이 바뀌어도 이름은 그대로라 손에 익은 습관이 안 깨진다. CI 도 같은 `make test` 를 부르게 하면 "로컬에선 되는데 CI 에서 깨짐" 이 줄어든다 — 로컬과 CI 가 글자 그대로 같은 명령을 돌리기 때문.

## 헷갈리기 쉬운 것

- **Makefile** 은 원래 C 컴파일용(바뀐 파일만 다시 빌드)이라 문법이 낡았고 탭 함정이 있다. 그냥 명령 모음이 목적이면 **just**(justfile) 가 더 편하지만, make 는 어디에나 깔려 있다는 게 장점.
- **npm scripts** 는 package.json 안에 있어 JS 프로젝트 전용, Makefile 은 언어 무관. Python 프로젝트는 Makefile/just 나 `uv run` 을 쓴다.
- **크론**은 "언제 돌릴지", 태스크 러너는 "무엇을 돌릴지". 크론 줄에 `make backup` 을 적는 식으로 같이 쓴다.
