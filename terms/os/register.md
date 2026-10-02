---
id: register
term: 레지스터/ALU/제어장치
aliases:
  - Register
  - ALU
  - Control Unit
  - 레지스터
  - 산술논리연산장치
  - 제어장치
  - 프로그램 카운터
category: os
tags:
  - 하드웨어
  - 컴퓨터구조
level: 2
kind: concept
related:
  - cpu
  - cache-memory
  - pcb
  - memory-hierarchy
  - pipelining
  - von-neumann
  - register-allocation
status: review
created: 2026-09-29
updated: 2026-10-03
---

## 한 줄 정의

CPU 안에 있는 **가장 빠른 임시 저장 칸**으로, ALU·제어장치와 함께 CPU 를 이룬다.

## 비유

요리사(CPU)의 **양손(레지스터)**, **칼과 도마(ALU)**, **레시피를 읽고 다음 동작을 지시하는 머리(제어장치)**. 양손에 든 재료만 바로 썰 수 있고, 선반(캐시)이나 창고(RAM)에 있는 건 일단 손에 들어야 한다.

## 예시

```c
long add(long a, long b) { return a + b; }
```

```text
; gcc -O2 -S 로 뽑은 x86-64 어셈블리
add:
    lea  rax, [rdi + rsi]    ; rdi=a, rsi=b (인자 레지스터) → rax (반환 레지스터)
    ret                      ; rsp(스택 포인터)가 가리키는 복귀 주소를 rip(PC)에 넣음
```

C 의 `a + b` 한 줄은 CPU 안에서 "인자 레지스터 두 개를 ALU 에 넣고 결과를 `rax` 에 담아라" 가 된다. 제어장치는 `rip`(프로그램 카운터)가 가리키는 명령을 가져와(fetch) IR 에 넣고 해독해(decode) ALU 와 레지스터에 신호를 보낸다(execute). 컨텍스트 스위칭 때 PCB 에 저장하는 것도 결국 이 레지스터들의 값이다. 면접에서는 "CPU 의 3대 구성 요소", "PC 와 IR 의 차이", "레지스터와 캐시의 차이" 를 묻는다.

### 자주 나오는 레지스터

| 이름 | 역할 |
|---|---|
| PC (Program Counter, x86 은 `rip`) | 다음에 실행할 명령어 주소 |
| IR (Instruction Register) | 지금 해독 중인 명령어 자체 |
| SP (Stack Pointer, `rsp`) | 스택 꼭대기 주소 (함수 호출·지역 변수) |
| 범용 레지스터 (`rax`, `rdi`, ...) | 계산 중인 값 (x86-64 는 16개, 64비트) |
| 상태 레지스터 (FLAGS) | 마지막 연산 결과가 0 인지, 넘쳤는지 |

## 헷갈리기 쉬운 것

- **레지스터 vs 캐시**: 레지스터는 명령어에서 이름으로 직접 지정하는 몇십 개의 칸(컴파일러가 관리), 캐시는 RAM 의 복사본을 하드웨어가 알아서 넣고 빼는 곳(주소로 접근). 레지스터가 더 빠르고 훨씬 적다.
- **PC vs IR**: PC 는 "다음 명령 주소", IR 은 "지금 명령 내용". PC 는 실행마다 자동으로 증가하고 분기 명령이 덮어쓴다.
- **ALU vs FPU/GPU**: ALU 는 정수·논리 연산, 부동소수점은 FPU 가 따로 한다. GPU 는 이런 연산 유닛을 수천 개 깔아 놓은 것.
