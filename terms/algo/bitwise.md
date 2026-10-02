---
id: bitwise
term: 비트 연산
aliases:
  - Bitwise Operation
  - 비트마스크
  - Bitmask
  - 비트 연산자
  - AND/OR/XOR/시프트
category: algo
tags:
  - 컴퓨터구조
  - 코딩테스트
  - 메모리
level: 1
kind: concept
related:
  - twos-complement
  - file-permission
  - set-map
  - dynamic-programming
  - backtracking
  - subnet-cidr
  - gpio
see_also:
  - "https://docs.python.org/3/reference/expressions.html#binary-bitwise-operations"
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

숫자를 **0 과 1 의 자리 하나하나**로 보고 자리끼리 AND·OR·XOR 하거나 옆으로 미는 연산.

## 비유

**전등 스위치 8개짜리 패널**. 켜짐/꺼짐을 0/1 로 한 줄에 적어 두면, 3번만 켜기(OR)·끄기(AND)·뒤집기(XOR) 를 숫자 하나로 처리한다.

## 예시

```python
A, B, C = 1 << 0, 1 << 1, 1 << 2       # 0b001, 0b010, 0b100 — 항목 하나 = 비트 한 자리

mask = 0
mask |= A | C                          # A, C 켜기                 → 0b101 (5)
print(bool(mask & B))                  # B 가 켜져 있나?           → False
mask ^= C                              # C 뒤집기(켜져 있으니 끔)  → 0b001
mask &= ~A                             # A 끄기                    → 0b000

print(bin(0o755))                      # 0b111101101 — chmod 755 = rwx r-x r-x
print(13 >> 1, 13 << 1)                # 6 26 — 2 로 나누기, 2 곱하기
```

항목이 20개 안팎이면 "어떤 항목을 골랐나" 라는 집합을 정수 하나로 담을 수 있다 — 이게 **비트마스크**다. 코딩테스트의 외판원 순회(TSP)·부분집합 순회가 `for mask in range(1 << n)` 으로 시작하는 이유이고, 리눅스 권한 `755`, 서브넷 마스크 `255.255.255.0`, 파일 열기 옵션 `O_RDONLY | O_CREAT` 도 전부 비트 자리마다 뜻을 둔 것이다.

## 헷갈리기 쉬운 것

- **논리 연산 `and`/`or`** 는 값 전체를 참/거짓 하나로 보고, **비트 연산 `&`/`|`** 는 자리마다 따로 본다. Python 에서 `1 and 2` 는 `2`, `1 & 2` 는 `0`.
- **XOR(`^`)** 은 같으면 0, 다르면 1. 같은 수를 두 번 XOR 하면 원래대로 돌아와서 "짝이 없는 숫자 하나 찾기" 와 간단한 체크섬·암호화에 쓰인다.
- **음수와 시프트**: Python 정수는 크기 제한이 없어 넘침(오버플로)이 없고 `~x` 는 `-x-1`(2의 보수) 이다. C/Java 의 32비트 `int` 에서는 `1 << 31` 이 음수가 되니 코테 언어를 바꿀 때 조심.
