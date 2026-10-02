---
id: boolean-algebra
term: 불 대수
aliases:
  - Boolean Algebra
  - 부울 대수
  - 불리언 대수
  - 논리 회로
category: theory
tags:
  - 이산수학
  - 컴퓨터구조
level: 1
kind: concept
related:
  - propositional-logic
  - bitwise
  - register
  - twos-complement
  - set-relation
see_also:
  - https://en.wikipedia.org/wiki/Boolean_algebra
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

**0과 1** 두 값과 AND·OR·NOT 연산만으로 식을 세우고 줄이는 대수.

## 비유

**전등 스위치 배선도**. 스위치 두 개를 직렬로 이으면 둘 다 켜야(AND), 병렬로 이으면 하나만 켜도(OR) 불이 들어오고, 배선을 단순하게 바꿔도 켜지는 조건이 같으면 같은 회로다.

## 예시

```python
FLAGS_READ, FLAGS_WRITE, FLAGS_EXEC = 0b100, 0b010, 0b001
perm = FLAGS_READ | FLAGS_WRITE        # OR: 권한 켜기 -> 0b110
print(bool(perm & FLAGS_WRITE))        # AND: 확인 -> True
perm &= ~FLAGS_WRITE                   # NOT + AND: 끄기 -> 0b100
print(bin(perm ^ 0b111))               # XOR: 뒤집기 -> 0b11
```

`chmod 755` 의 숫자, 비트마스크 플래그, CPU 의 덧셈기(XOR 와 AND 로 만든 반가산기)가 모두 불 대수 위에 서 있다. `A·(A+B) = A` 같은 법칙으로 조건식이나 회로를 더 짧게 줄일 수 있다.

## 헷갈리기 쉬운 것

- **명제 논리**는 "문장의 참/거짓", 불 대수는 그것을 **0/1 계산식**으로 옮긴 것. 내용은 거의 같고 쓰는 쪽이 다르다.
- 파이썬 `and`/`or` 는 값 하나(참/거짓 판단)를, `&`/`|` 는 **비트마다** 계산한다. `3 and 5` 는 5, `3 & 5` 는 1.
