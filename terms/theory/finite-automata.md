---
id: finite-automata
term: 유한 오토마타(DFA/NFA)
aliases:
  - Finite Automata
  - Finite State Machine
  - DFA
  - NFA
  - 유한 상태 기계
  - 상태 머신
category: theory
tags:
  - 계산이론
  - 컴파일러
level: 2
kind: concept
related:
  - regular-language
  - regex
  - turing-machine
  - lexer
  - kmp
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

**상태 몇 개와 전이 규칙**만으로 입력 문자열을 읽어 받아들일지 정하는 계산 모델.

## 비유

**지하철 개찰구**. "잠김" 상태에서 카드를 찍으면 "열림", 지나가면 다시 "잠김"이 되고, 기억하는 건 지금 상태 하나뿐이다.

## 예시

```python
# 이진수 문자열이 3의 배수인지 판정하는 DFA (상태 = 지금까지의 값 % 3)
def divisible_by_3(bits: str) -> bool:
    state = 0
    for ch in bits:
        state = (state * 2 + int(ch)) % 3   # 전이 함수
    return state == 0                       # 수락 상태 = 0

print(divisible_by_3("110"), divisible_by_3("111"))  # True False
```

정규식 엔진은 패턴을 오토마타로 바꿔 문자열을 한 글자씩 넘기며 실행한다. 컴파일러의 렉서, KMP 의 실패 함수, 프로토콜 파서, UI 의 상태 머신(로딩→성공/실패)도 같은 발상이다.

## 헷갈리기 쉬운 것

- **DFA vs NFA**: DFA 는 다음 상태가 하나로 정해지고, NFA 는 여러 갈래를 동시에 갈 수 있다. 표현력은 같고, NFA 는 DFA 로 바꿀 수 있지만 상태 수가 크게 늘 수 있다.
- **튜링 기계**와 달리 메모리(테이프)가 없어 "괄호 짝 세기"처럼 무한히 세야 하는 일은 못 한다.
