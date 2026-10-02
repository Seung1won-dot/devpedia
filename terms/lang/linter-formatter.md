---
id: linter-formatter
term: 린터/포매터
aliases:
  - Linter / Formatter
  - 린터
  - 포매터
  - ESLint
  - Prettier
  - ruff
  - black
category: lang
tags:
  - 개발도구
  - 품질
  - 협업
level: 1
kind: tool
related:
  - coding-convention
  - pre-commit
  - ci-cd
  - clean-code
  - code-smell
see_also:
  - https://docs.astral.sh/ruff/
  - https://prettier.io/docs/en/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

**린터**는 의심스러운 코드를 지적하고, **포매터**는 들여쓰기·따옴표 같은 모양을 자동으로 맞춘다.

## 비유

**맞춤법 검사기와 자동 줄맞춤**. 맞춤법 검사기(린터)는 "이 문장은 주어가 없어요" 하고 빨간 줄을 긋고, 자동 줄맞춤(포매터)은 띄어쓰기와 들여쓰기를 알아서 가지런히 한다.

## 예시

```bash
# Python — ruff 하나로 린트 + 포맷 (flake8/isort/black 을 대체)
pip install ruff
ruff check . --fix        # 안 쓰는 import, 정의 안 된 변수, 비교 실수 등을 지적·자동 수정
ruff format .             # 들여쓰기·따옴표·줄 길이를 통일

# TypeScript — ESLint(린터) + Prettier(포매터)
npx eslint src --fix
npx prettier --write src
```

```toml
# pyproject.toml — 팀 규칙은 설정 파일에 적어 저장소에 같이 커밋한다
[tool.ruff]
line-length = 100
[tool.ruff.lint]
select = ["E", "F", "I", "B"]   # 기본 오류, pyflakes, import 정렬, 흔한 버그 패턴
```

에디터의 "저장 시 자동 포맷" 을 켜 두면 손으로 정리할 일이 사라지고, pre-commit 훅이나 CI 에 걸어 두면 규칙 어긴 코드가 아예 들어오지 못한다. 포매터의 진짜 가치는 "탭이냐 스페이스냐" 같은 **스타일 논쟁을 끝내는 것** — 한 번 정하고 기계에 맡기면 PR 리뷰가 로직 얘기만 남는다.

## 헷갈리기 쉬운 것

- **타입 체커**(mypy/pyright/tsc): 린터는 "안 쓰는 변수" 같은 패턴을 보고, 타입 체커는 "str 을 int 자리에 넣었다" 를 본다. ESLint 는 타입 오류를 못 잡고, tsc 는 스타일을 안 본다 — 보통 셋을 같이 돌린다.
- **코딩 컨벤션**: 사람끼리의 약속(문서)이고, 린터·포매터는 그 약속을 기계가 강제하게 만든 도구다. 컨벤션만 있고 도구가 없으면 금방 안 지켜진다.
- **`ruff check --fix` vs `ruff format`**: 둘 다 코드를 고치지만 전자는 안 쓰는 import 제거처럼 **의미**에 가까운 수정, 후자는 **모양**만 바꾼다.
