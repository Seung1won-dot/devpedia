---
id: regular-language
term: 정규 언어
aliases:
  - Regular Language
  - 정규 집합
  - 정규 문법
category: theory
tags:
  - 계산이론
  - 흔한실수
level: 2
kind: concept
related:
  - regex
  - finite-automata
  - context-free-grammar
  - parser
  - pigeonhole-principle
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

**유한 오토마타나 정규식으로 판별할 수 있는** 문자열들의 모임.

## 비유

**기억력이 메모지 한 장뿐인 검사원**. "숫자 다음에 하이픈" 같은 모양은 잘 보지만, "여는 괄호를 몇 개 봤는지" 끝없이 세어 두는 일은 못 한다.

## 예시

```python
import re
# 정규 언어: 전화번호, 날짜, 이메일 대략 모양 → 정규식이 잘하는 일
print(bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", "2026-10-03")))  # True

# 정규 언어가 아닌 것: 짝이 맞는 괄호 "((()))" — 깊이를 세야 함
def balanced(s: str) -> bool:
    depth = 0
    for ch in s:
        depth += 1 if ch == "(" else -1
        if depth < 0:
            return False
    return depth == 0
```

"정규식으로 HTML/JSON 을 파싱하지 마라"는 말의 이론적 근거가 이것이다. 중첩 구조는 정규 언어 밖이라 깊이가 정해지지 않으면 정규식으로 정확히 잡을 수 없다(펌핑 보조정리로 증명). 그럴 땐 `json`, `html.parser` 같은 진짜 파서를 쓴다.

## 헷갈리기 쉬운 것

- 실제 **정규식 엔진**(Python `re`, PCRE)은 역참조(`\1`) 같은 기능이 있어 이론상 정규 언어보다 조금 더 표현하지만, 그 대가로 최악 지수 시간이 걸릴 수 있다(ReDoS).
- **문맥 자유 언어**는 정규 언어를 포함하는 더 큰 집합으로, 괄호 짝·사칙연산식이 여기 속한다.
