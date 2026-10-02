---
id: floating-point
term: 부동소수점
aliases:
  - Floating Point
  - IEEE 754
  - 부동 소수점
  - float
  - float16/bfloat16
category: os
tags:
  - 컴퓨터구조
  - 타입
  - 딥러닝
  - 흔한실수
level: 2
kind: concept
related:
  - twos-complement
  - variable-type
  - quantization
  - vram
  - model-parameters
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

실수를 **부호·지수·가수**로 쪼개 저장하는 방식으로, 소수를 근사값으로 다룬다.

## 비유

**과학 표기법(1.23 × 10^4)** 을 2진수로 한 것. 유효숫자 자릿수가 정해져 있어 아주 크거나 작은 수도 적을 수 있지만, 1/3 을 0.333 으로 적듯 딱 떨어지지 않는 수는 근사값으로 저장된다.

## 예시

```python
0.1 + 0.2 == 0.3                 # False
0.1 + 0.2                        # 0.30000000000000004
import math
math.isclose(0.1 + 0.2, 0.3)     # True  ← 실수 비교는 이렇게

import struct
bits = struct.unpack(">I", struct.pack(">f", 0.1))[0]
print(f"{bits:032b}")            # 0 01111011 10011001100110011001101
#                                  부호 지수(8) 가수(23)  — float32
```

10진수 0.1 은 2진수로 `0.0001100110011...` 무한 반복이라 어디선가 잘라야 하고, 그 오차가 `0.1 + 0.2` 에서 드러난다. 그래서 돈 계산은 float 대신 정수(원 단위)나 `Decimal` 을 쓰고, 실수 비교는 `==` 대신 오차 허용치로 한다. 딥러닝에서 float32 대신 **bfloat16**(지수 8비트 그대로, 가수만 7비트)을 쓰는 이유는 표현 범위는 유지하면서 VRAM 과 대역폭을 절반으로 줄이기 위해서다. 로컬 Qwen 7B 를 bf16 으로 띄우면 가중치만 약 14 GB, int4 로 양자화하면 4 GB 대로 줄어든다. 면접에서는 "0.1 + 0.2 가 왜 0.3 이 아닌가?", "float 과 double 차이" 로 나온다.

### 형식 비교

| 형식 | 비트 | 지수 | 가수 | 쓰임 |
|---|---|---|---|---|
| float64 (double) | 64 | 11 | 52 | 파이썬 `float`, 과학 계산 |
| float32 (float) | 32 | 8 | 23 | C `float`, 전통적 딥러닝 학습 |
| float16 (half) | 16 | 5 | 10 | 추론, 범위가 좁아 오버플로 주의 |
| bfloat16 | 16 | 8 | 7 | 딥러닝 학습·추론 (범위는 float32 와 같음) |

## 헷갈리기 쉬운 것

- **float16 vs bfloat16**: 둘 다 16비트지만 float16 은 정밀도, bfloat16 은 범위를 택했다. 학습 중 기울기가 아주 작아지는 걸 견디려면 범위가 중요해서 bf16 이 표준이 됐다.
- **NaN 과 inf**: `0.0 / 0.0` 은 예외가 아니라 NaN 이고 `NaN == NaN` 도 False 다. 학습 loss 가 NaN 이 되면 어딘가 오버플로나 0 으로 나누기가 있었다는 신호.
