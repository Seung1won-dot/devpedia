---
id: register-allocation
term: 레지스터 할당
aliases:
  - Register Allocation
  - 스필
  - Spilling
  - 그래프 컬러링
category: compiler
tags:
  - 컴파일러
  - 저수준
  - 컴퓨터구조
level: 3
kind: concept
related:
  - register
  - compiler-optimization
  - ir
  - calling-convention
  - stack-heap-memory
  - graph
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

수많은 변수를 **몇 개뿐인 CPU 레지스터**에 나눠 앉히는 컴파일러 단계.

## 비유

책상 위(레지스터)엔 책을 몇 권밖에 못 펴 놓으니, 지금 자주 보는 책만 올리고 나머지는 **책장(메모리)** 에 꽂아 두는 정리다. 책장을 오갈수록(스필) 공부가 느려진다.

## 예시

```c
int add(int a, int b) { return a + b; }
```

```text
# gcc -O0 : 인자를 일단 스택(메모리)에 내렸다가 다시 읽는다
movl  %edi, -4(%rbp)
movl  %esi, -8(%rbp)
movl  -4(%rbp), %edx
movl  -8(%rbp), %eax
addl  %edx, %eax

# gcc -O2 : 레지스터 안에서 끝낸다
leal  (%rdi,%rsi), %eax
ret
```

IR 에는 변수(가상 레지스터)가 무한히 있지만 x86-64 범용 레지스터는 16개뿐이다. 동시에 살아 있는 변수끼리 선을 그은 그래프를 만들고 **색칠(그래프 컬러링)** 하듯 레지스터를 배정하며, 모자라면 일부를 스택에 내리는 **스필(spill)** 을 한다.

## 헷갈리기 쉬운 것

- **트레이드오프**: 그래프 컬러링은 결과가 좋지만 느려서, 빨리 컴파일해야 하는 JIT 은 대충이지만 빠른 **선형 스캔(linear scan)** 을 주로 쓴다.
- **레지스터** 카드는 하드웨어 부품 이야기고, 이 카드는 그걸 소프트웨어(컴파일러)가 어떻게 나눠 쓰느냐의 이야기다.
- `register` 키워드(C)는 요즘 컴파일러가 사실상 무시한다. 할당은 컴파일러가 더 잘한다.
