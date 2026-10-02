---
id: context-free-grammar
term: 문맥 자유 문법
aliases:
  - Context-Free Grammar
  - CFG
  - BNF
  - 배커스-나우르 표기법
  - 문맥 자유 언어
category: theory
tags:
  - 계산이론
  - 컴파일러
level: 3
kind: concept
related:
  - parser
  - regular-language
  - ast
  - lexer
  - recursion
  - stack-queue
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

**"기호 → 기호들" 규칙**을 재귀적으로 적용해 중첩 구조 문장을 만들어 내는 문법.

## 비유

**레고 조립 설명서**. "문장 = 주어 + 서술어", "주어 = 명사 또는 (수식어 + 주어)" 처럼 큰 부품을 작은 부품으로 계속 쪼개는 규칙만 있으면 아무리 깊은 구조도 만들 수 있다.

## 예시

```text
expr   ::= term   ( ("+" | "-") term )*
term   ::= factor ( ("*" | "/") factor )*
factor ::= NUMBER | "(" expr ")"
```

```python
# 위 BNF 를 그대로 옮긴 재귀 하향 파서 (토큰은 공백으로 구분된다고 가정)
def parse(tokens):
    def expr():
        v = term()
        while tokens and tokens[0] in "+-":
            v = v + term() if tokens.pop(0) == "+" else v - term()
        return v
    def term():
        v = factor()
        while tokens and tokens[0] in "*/":
            v = v * factor() if tokens.pop(0) == "*" else v / factor()
        return v
    def factor():
        t = tokens.pop(0)
        if t == "(":
            v = expr(); tokens.pop(0); return v
        return int(t)
    return expr()

print(parse("2 * ( 3 + 4 )".split()))  # 14
```

규칙 하나가 함수 하나가 되고, `factor` 가 다시 `expr` 을 부르는 재귀가 괄호 중첩을 처리한다. 프로그래밍 언어 문법, JSON, SQL 이 모두 CFG 로 정의된다. 트레이드오프: CFG 는 중첩은 잘 표현하지만 "변수는 선언 후 사용" 같은 문맥 의존 규칙은 못 담아 그건 의미 분석 단계로 넘긴다. 또 문법이 **모호**하면(`1-2-3` 을 어느 쪽부터 묶나) 파서가 두 가지 트리를 만들 수 있어, 실무에서는 우선순위·결합 방향을 문법 구조에 박아 넣거나 파서 생성기(ANTLR, Lark)에 맡긴다.

## 헷갈리기 쉬운 것

- **정규 문법**은 CFG 의 특수한 경우다. 정규식으로 안 되는 괄호 짝이 CFG 로는 된다(내부적으로 스택이 필요).
- **문법 vs 파서**: 문법은 "무엇이 올바른가"의 명세, 파서는 그 명세대로 입력을 읽어 트리를 만드는 프로그램이다.
