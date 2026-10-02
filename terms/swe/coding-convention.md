---
id: coding-convention
term: 코딩 컨벤션
aliases:
  - Coding Convention
  - 코딩 스타일
  - 스타일 가이드
  - 네이밍 규칙
  - Style Guide
category: swe
tags:
  - 협업
  - 품질
  - 개발도구
level: 1
kind: concept
related:
  - linter-formatter
  - clean-code
  - pre-commit
  - pull-request
  - semantic-commit
  - readme
see_also:
  - https://peps.python.org/pep-0008/
  - https://editorconfig.org/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

팀이 코드를 **같은 모양으로 쓰기로 정한** 들여쓰기·이름·파일 구조 규칙.

## 비유

공동 실험 노트의 **기록 양식**. 날짜는 왼쪽 위, 단위는 SI, 약어는 첫 등장에 풀어 쓰기 — 누가 적었든 같은 자리에서 같은 정보를 찾을 수 있다.

## 예시

```ini
# .editorconfig — 저장할 때 에디터가 자동으로 맞춘다 (VS Code 는 EditorConfig 확장 설치)
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2

[*.py]
indent_size = 4
max_line_length = 100
```

```toml
# pyproject.toml — Python 은 ruff 하나로 린트 + 포맷
[tool.ruff]
line-length = 100

[tool.ruff.lint]
select = ["E", "F", "I", "N"]   # 스타일 오류 · 미사용 import · import 정렬 · PEP 8 네이밍
```

`ruff format . && ruff check --fix .` 한 줄이면 전부 맞춰진다(TypeScript 쪽은 ESLint + Prettier 가 같은 역할). 탭이냐 스페이스냐에 정답은 없고, 중요한 건 **정했으면 사람이 아니라 도구가 강제한다**는 것 — 코드 리뷰에서 공백 지적이 오가면 그 시간이 전부 낭비다. pre-commit 훅이나 CI 에 걸어 두면 어긋난 코드는 아예 머지되지 않는다. 도구가 못 잡는 건 이름 규칙이라 README 에 한 줄로 적어 둔다: Python 은 `snake_case`, JS/TS 는 `camelCase`, 클래스는 `PascalCase`, 상수는 `UPPER_SNAKE`.

## 헷갈리기 쉬운 것

- **클린 코드**는 이름이 뜻을 말하는지, 함수가 한 가지 일만 하는지 같은 **사람의 판단**. 컨벤션은 도구가 자동으로 맞출 수 있는 **표기 규칙**이다.
- **린터 vs 포매터**: 포매터는 모양(공백·줄바꿈)만, 린터는 미사용 변수 같은 잠재 버그까지 잡는다. 컨벤션은 둘의 설정 파일로 들어간다.
- **시맨틱 커밋**은 커밋 메시지 컨벤션. 코드 컨벤션과 짝으로 같이 정한다.
