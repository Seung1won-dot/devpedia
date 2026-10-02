---
id: compiler-interpreter
term: 컴파일러/인터프리터
aliases:
  - Compiler / Interpreter
  - 컴파일러와 인터프리터
  - 컴파일 언어/인터프리터 언어
  - 번역기
category: lang
tags:
  - 컴파일
  - 개발도구
level: 1
kind: concept
related:
  - static-dynamic-typing
  - bundler
  - typescript
  - cpu
  - process
  - jit
  - compilation-pipeline
status: review
created: 2026-09-25
updated: 2026-10-03
---

## 한 줄 정의

코드를 **미리 통째로** 번역해 두면 컴파일러, **한 줄씩 바로** 실행하면 인터프리터다.

## 비유

컴파일러는 책 한 권을 **미리 다 번역해서 출판**하는 번역가, 인터프리터는 옆에 붙어 **말할 때마다 통역**해 주는 통역사. 출판본은 읽기 빠르지만 고칠 때마다 다시 찍어야 하고, 통역은 바로바로 되지만 매번 조금 느리다.

## 예시

```bash
# 컴파일: 소스 → 실행 파일을 먼저 만들고, 그걸 실행
gcc hello.c -o hello && ./hello

# 인터프리터: 소스 파일을 바로 실행
python analyze.py

# TypeScript 는 tsc 가 JS 로 "컴파일"하고, 그 JS 를 Node 가 실행한다
npx tsc src/index.ts && node src/index.js
```

## 헷갈리기 쉬운 것

- **트랜스파일러**(tsc, Babel)는 TS→JS 처럼 고수준 언어끼리 바꾸는 컴파일러의 한 종류. 기계어까지는 안 간다.
- **JIT**: Node(V8)·Java 는 실행 중에 자주 쓰는 부분만 그때그때 기계어로 컴파일한다. 둘의 중간이라 "JS 는 인터프리터 언어" 라는 말은 반만 맞다.
