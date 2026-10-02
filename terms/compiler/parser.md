---
id: parser
term: 파서(구문 분석)
aliases:
  - Parser
  - Syntax Analysis
  - 구문 분석기
  - 파싱
category: compiler
tags:
  - 컴파일러
  - 계산이론
  - 트리
level: 2
kind: concept
related:
  - lexer
  - ast
  - context-free-grammar
  - semantic-analysis
  - recursion
  - compilation-pipeline
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

토큰 줄을 **문법 규칙**에 맞춰 트리 구조로 묶는 단계.

## 비유

단어 카드 더미를 받아 **주어·서술어·목적어로 문장 성분을 묶는** 국어 시간의 문장 분석이다. 성분이 빠지거나 순서가 틀리면 "비문" 이라고 빨간 줄을 긋는다.

## 예시

문법은 보통 BNF 로 적는다(곱셈이 덧셈보다 먼저 묶이도록 층을 나눔).

```text
expr   := term   (("+" | "-") term)*
term   := factor (("*" | "/") factor)*
factor := NUMBER | "(" expr ")"
```

```bash
python -c "import ast; ast.parse('x = (1 + 2')"
# SyntaxError: '(' was never closed
```

규칙 하나를 함수 하나로 옮기면 그대로 **재귀 하강 파서**가 된다(`expr()` 가 `term()` 을, `factor()` 가 다시 `expr()` 을 부름). 직접 짜기 싫으면 ANTLR·Lark·tree-sitter 같은 파서 생성기를 쓴다. 문법 오류(SyntaxError)는 전부 이 단계에서 난다.

## 헷갈리기 쉬운 것

- **렉서**는 글자를 단어로, 파서는 단어를 문장 구조로 만든다.
- 일상에서 말하는 "JSON 파싱", "HTML 파싱" 도 같은 일이다. 문자열을 읽어 구조(객체·트리)로 바꾸는 것은 모두 파싱이다.
- 파서가 통과시켜도 `"a" - 1` 처럼 뜻이 틀린 코드는 **의미 분석**에서 걸린다.
