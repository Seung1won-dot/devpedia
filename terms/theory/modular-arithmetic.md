---
id: modular-arithmetic
term: 모듈러 연산
aliases:
  - Modular Arithmetic
  - 나머지 연산
  - mod
  - "MOD 1e9+7"
category: theory
tags:
  - 이산수학
  - 코딩테스트
  - 암호화
level: 2
kind: concept
related:
  - hash-table
  - public-key-cryptography
  - combinatorics
  - dynamic-programming
  - twos-complement
  - hash
see_also:
  - https://docs.python.org/3/library/functions.html#pow
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

수를 어떤 값 m 으로 나눈 **나머지만 가지고** 더하고 곱하는 계산 체계.

## 비유

**시계 바늘**. 12를 넘으면 다시 0부터 돌기 때문에, 10시에서 5시간 뒤는 15시가 아니라 3시다.

## 예시

```python
MOD = 1_000_000_007   # 코테 단골: 큰 소수라 곱셈 역원이 존재

# 덧셈·곱셈은 중간중간 나눠도 결과가 같다
ways = 1
for i in range(1, 100_001):
    ways = ways * i % MOD          # 100000! mod p

print(pow(3, 10**18, MOD))         # 빠른 거듭제곱 (O(log n))
print(pow(5, -1, MOD))             # 곱셈 역원 (Python 3.8+)
print(-7 % 3, (-7) // 3)           # 2 -3  (파이썬은 음수 나머지도 0 이상)
```

"답을 1,000,000,007 로 나눈 나머지를 출력하라"는 오버플로 없이 큰 경우의 수를 비교하려는 장치다. 해시 테이블의 `hash(key) % 버킷수`, RSA 의 `m^e mod n` 도 모두 모듈러 연산이다.

## 헷갈리기 쉬운 것

- **나눗셈은 그냥 나누면 안 된다**. `(a / b) % m` 대신 b 의 역원을 곱한다(`a * pow(b, -1, m) % m`). m 이 소수일 때만 항상 가능.
- 음수의 `%` 결과는 언어마다 다르다. 파이썬은 `-7 % 3 == 2`, C/Java 는 `-1`.
