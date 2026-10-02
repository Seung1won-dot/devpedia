---
id: llvm
term: LLVM
aliases:
  - LLVM
  - Clang
  - 엘엘브이엠
  - LLVM 컴파일러 인프라
category: compiler
tags:
  - 컴파일러
  - 개발도구
  - 저수준
level: 2
kind: tool
related:
  - ir
  - compiler-optimization
  - compilation-pipeline
  - assembly-language
  - webassembly
see_also:
  - https://llvm.org/docs/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

Clang·Rust·Swift 가 함께 쓰는 **컴파일러 백엔드와 도구 모음**.

## 비유

여러 출판사가 공동으로 쓰는 **인쇄 공장**이다. 각 출판사(언어)는 원고를 공장 규격(LLVM IR)으로만 넘기면, 종이 고르기·인쇄·제본(최적화·기계어 생성)은 공장이 알아서 한다.

## 예시

```bash
clang -O2 -S -emit-llvm add.c -o add.ll   # C → LLVM IR (사람이 읽는 .ll)
opt -O2 add.ll -S -o add.opt.ll           # IR 단계 최적화만 따로 돌리기
llc add.opt.ll -o add.s                   # IR → 대상 CPU 어셈블리
rustc --emit=llvm-ir main.rs              # Rust 도 같은 IR 로 내려온다
```

언어마다 앞단(프런트엔드: 렉서·파서·타입 검사)만 만들고 IR 로 내보내면, x86·ARM·WebAssembly 용 기계어 생성과 최적화는 LLVM 이 공짜로 준다. 그래서 새 언어들이 LLVM 위에서 시작하는 경우가 많다. macOS 의 `gcc` 명령은 실제로 Clang 인 경우가 흔하다(`gcc --version` 으로 확인).

## 헷갈리기 쉬운 것

- **LLVM vs Clang**: Clang 은 C/C++ 용 프런트엔드, LLVM 은 그 뒤의 공용 백엔드다. 보통 묶어서 "LLVM 툴체인" 이라 부른다.
- **LLVM vs GCC**: 둘 다 C/C++ 컴파일러 계열이지만 GCC 는 하나의 큰 프로그램, LLVM 은 라이브러리로 쪼개져 다른 도구가 가져다 쓰기 쉽다.
- 이름에 VM 이 들어가지만 JVM 같은 **가상 머신이 아니다**. 지금은 약자가 아니라 그냥 고유명사로 쓴다.
