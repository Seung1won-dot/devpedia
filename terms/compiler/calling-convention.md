---
id: calling-convention
term: 호출 규약 · ABI
aliases:
  - Calling Convention
  - ABI
  - Application Binary Interface
  - System V ABI
  - 호출 규칙
category: compiler
tags:
  - 컴파일러
  - 저수준
  - 메모리
level: 3
kind: concept
related:
  - stack-heap-memory
  - register
  - assembly-language
  - linker
  - register-allocation
  - system-call
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

함수 호출 때 **인자·반환값·레지스터를 주고받는 방식**을 정한 약속.

## 비유

택배 회사끼리 정한 **상자 규격과 송장 위치**다. 보내는 쪽과 받는 쪽이 같은 규격을 지켜야 내용물이 엉뚱한 칸에서 꺼내지지 않는다.

## 예시

| | 정수 인자 1~4 | 반환값 | 비고 |
| :-- | :-- | :-- | :-- |
| Linux/macOS x86-64 (System V) | rdi, rsi, rdx, rcx (5·6번째는 r8, r9) | rax | 7번째부터 스택 |
| Windows x64 | rcx, rdx, r8, r9 | rax | 스택에 32바이트 예약 공간 |

```python
import ctypes
libm = ctypes.CDLL("libm.so.6")          # Linux 의 C 수학 라이브러리
libm.pow.restype = ctypes.c_double
libm.pow.argtypes = [ctypes.c_double, ctypes.c_double]
print(libm.pow(2.0, 10.0))               # 1024.0
```

`argtypes`/`restype` 를 빼먹으면 Python 이 인자를 정수 레지스터에 넣어 버려 엉뚱한 값이 나온다. 실수 인자는 xmm 레지스터로 간다는 규약을 어긴 셈이다. **ABI** 는 호출 규약에 구조체 배치·이름 규칙·시스템 콜 번호까지 더한 "기계어 수준의 약속" 전체다.

## 헷갈리기 쉬운 것

- **API vs ABI**: API 는 소스 코드에서 맞춰야 할 약속(함수 이름·인자), ABI 는 컴파일된 바이너리끼리 맞춰야 할 약속이다. API 가 같아도 ABI 가 바뀌면 재컴파일이 필요하다.
- **트레이드오프**: C ABI 는 수십 년 안 바뀌어 모든 언어의 공용어(FFI)가 됐지만 최적화 여지가 적다. C++·Rust 는 ABI 를 고정하지 않아 더 빠르게 진화하는 대신, 다른 언어와 붙일 땐 `extern "C"` 로 C ABI 를 빌린다.
