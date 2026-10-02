---
id: ast
term: AST(추상 구문 트리)
aliases:
  - Abstract Syntax Tree
  - 추상 구문 트리
  - 구문 트리
category: compiler
tags:
  - 컴파일러
  - 트리
  - 개발도구
level: 2
kind: concept
related:
  - parser
  - semantic-analysis
  - linter-formatter
  - transpiler
  - metaprogramming
  - tree
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

코드의 구조를 괄호·공백 없이 **의미 단위의 트리**로 나타낸 것.

## 비유

긴 문장을 **조직도처럼** 그린 그림이다. "x 에 (1 더하기 2) 를 넣는다" 를 맨 위에 '대입', 그 아래 'x' 와 '덧셈', 덧셈 아래 '1' 과 '2' 로 매단다.

## 예시

```bash
python -c "import ast; print(ast.dump(ast.parse('x = 1 + 2'), indent=2))"
# Python 3.11 출력. 3.13 부터는 빈 필드(type_ignores=[])가 생략된다 [확인 필요]
```

```text
Module(
  body=[
    Assign(
      targets=[
        Name(id='x', ctx=Store())],
      value=BinOp(
        left=Constant(value=1),
        op=Add(),
        right=Constant(value=2)))],
  type_ignores=[])
```

코드를 문자열로 다루면 깨지기 쉽지만 AST 로 다루면 안전하다. **ESLint** 는 JS 의 AST 를 돌며 규칙 위반 노드를 찾고, **Babel** 은 AST 를 고쳐 옛 문법으로 다시 찍고, **Prettier** 는 AST 를 자기 규칙대로 다시 출력한다. 대규모 이름 바꾸기 같은 **코드모드(codemod)** 도 AST 변환이다. astexplorer.net 에 코드를 붙여 넣으면 트리를 바로 볼 수 있다.

## 헷갈리기 쉬운 것

- **파스 트리(구체 구문 트리)** 는 괄호·세미콜론까지 문법 기호를 전부 노드로 남긴다. AST 는 의미에 필요 없는 것을 버린 "추상" 버전이다.
- **가상 DOM** 도 트리지만 화면 요소를 나타낸다. AST 는 코드를 나타낸다.
