---
id: lexer
term: 렉서(어휘 분석)
aliases:
  - Lexer
  - Lexical Analysis
  - Tokenizer
  - 스캐너
  - 토크나이저(컴파일러)
category: compiler
tags:
  - 컴파일러
  - 계산이론
level: 2
kind: concept
related:
  - parser
  - compilation-pipeline
  - token
  - regex
  - finite-automata
  - regular-language
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

소스 코드 글자를 **토큰**(키워드·이름·숫자·기호) 단위로 끊는 첫 단계.

## 비유

띄어쓰기 없는 문장에 **띄어쓰기와 품사 스티커**를 붙이는 일이다. 문장이 말이 되는지는 아직 따지지 않고, "이건 명사, 이건 조사" 만 표시한다.

## 예시

```python
import re

TOKEN = re.compile(r"\s*(?:(\d+)|([A-Za-z_]\w*)|(\S))")

def tokenize(src):
    for num, name, op in TOKEN.findall(src):
        if num:    yield ("NUM", num)
        elif name: yield ("NAME", name)
        else:      yield ("OP", op)

print(list(tokenize("x = 3 + 42")))
# [('NAME', 'x'), ('OP', '='), ('NUM', '3'), ('OP', '+'), ('NUM', '42')]
```

```bash
echo "x = 3 + 42" | python -m tokenize   # 파이썬 자체 렉서 결과 보기
```

공백과 주석은 여기서 버려지고, 렉서가 만든 토큰 줄을 파서가 받아 문법을 따진다. 토큰 규칙은 대부분 정규식으로 쓸 수 있어서, 렉서 생성기(flex 등)는 내부적으로 유한 오토마타를 만든다.

## 헷갈리기 쉬운 것

- **LLM 토큰**(ai 의 token)은 통계로 자른 글자 조각(BPE)이라 `"tokenize"` 가 `token`+`ize` 로 쪼개질 수 있다. 렉서 토큰은 언어 문법이 정한 의미 단위다.
- **파서**와의 차이: 렉서는 `( 1 + 2` 를 문제없이 토큰으로 자른다. 괄호가 안 닫혔다고 화내는 건 파서다.
