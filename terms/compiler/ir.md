---
id: ir
term: 중간 표현(IR)
aliases:
  - Intermediate Representation
  - 중간 코드
  - LLVM IR
  - SSA
category: compiler
tags:
  - 컴파일러
  - 저수준
level: 3
kind: concept
related:
  - llvm
  - compiler-optimization
  - ast
  - bytecode-vm
  - register-allocation
  - compilation-pipeline
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

소스와 기계어 사이에서 **분석·최적화하기 좋게** 만든 중간 단계 코드.

## 비유

여러 나라 말을 서로 번역할 때 일단 **영어로 옮겨 두는** 것과 같다. 언어 N개 × 기계 M종을 각각 짝지으면 N×M 개 번역기가 필요하지만, 가운데 공용어를 두면 N+M 개면 된다.

## 예시

```c
/* add.c */
int add(int a, int b) { return a + b; }
```

```bash
clang -O1 -S -emit-llvm add.c -o add.ll
```

```llvm
define dso_local i32 @add(i32 noundef %0, i32 noundef %1) {
  %3 = add nsw i32 %1, %0
  ret i32 %3
}
```

LLVM IR 은 **SSA**(정적 단일 대입) 형식이라 `%3` 같은 값은 딱 한 번만 정해진다. 값이 어디서 왔는지가 분명해서 상수 전파·죽은 코드 제거를 하기 쉽다(속성·이름은 clang 버전마다 조금 다르다). GCC 는 GIMPLE, JVM·CPython 은 바이트코드라는 각자의 IR 을 쓴다.

## 헷갈리기 쉬운 것

- **AST vs IR**: AST 는 소스 모양을 따르는 트리, IR 은 기계에 가까운 명령 목록(또는 그래프)이다. 최적화는 대부분 IR 에서 한다.
- **트레이드오프**: IR 단계를 하나 더 두면 최적화·다중 타깃이 쉬워지지만 컴파일러가 복잡해지고 느려진다. 설정 파일 언어 같은 작은 DSL 은 AST 를 바로 해석하는 편이 낫다.
