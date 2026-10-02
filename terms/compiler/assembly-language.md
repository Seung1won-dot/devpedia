---
id: assembly-language
term: 어셈블리어
aliases:
  - Assembly Language
  - 어셈블리
  - asm
  - objdump
  - 디스어셈블
category: compiler
tags:
  - 컴파일러
  - 저수준
  - 컴퓨터구조
level: 2
kind: concept
related:
  - compilation-pipeline
  - register
  - cpu
  - calling-convention
  - register-allocation
  - linker
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

CPU 기계어 명령을 사람이 읽을 수 있는 **기호로 1:1** 옮긴 저수준 언어.

## 비유

기계어가 피아노 롤의 **구멍 패턴**이라면 어셈블리어는 그걸 "도-미-솔" 로 적은 **악보**다. 음표 하나가 구멍 하나에 그대로 대응한다.

## 예시

```bash
gcc -O2 -c add.c -o add.o
objdump -d add.o                 # 기계어 바이트와 어셈블리를 나란히
objdump -d -M intel add.o        # Intel 문법으로 보기
```

```text
0000000000000000 <add>:
   0:   8d 04 37        lea    (%rdi,%rsi,1),%eax
   3:   c3              ret
```

가운데가 기계어 바이트, 오른쪽이 어셈블리다. `%rdi`·`%rsi` 는 첫째·둘째 인자, `%eax` 는 반환값 레지스터다(호출 규약). Ubuntu 기본 GCC 는 함수 맨 앞에 `endbr64` 가 더 붙을 수 있다. 직접 짤 일은 드물지만 성능 병목·크래시 덤프·보안 분석을 볼 때 읽을 줄 알면 강하다.

## 헷갈리기 쉬운 것

- **어셈블리어 vs 기계어**: 같은 내용을 글자로 쓴 것과 숫자로 쓴 것. 어셈블러(`as`)가 글자 → 숫자로 바꾼다.
- **x86 vs ARM**: CPU 종류마다 명령어 집합이 달라 어셈블리도 다르다. 노트북(x86-64)과 Apple Silicon·라즈베리 파이(ARM64)의 출력이 다른 이유다.
- **AT&T vs Intel 문법**: `mov %rsp,%rbp`(AT&T, 출발→도착)와 `mov rbp, rsp`(Intel, 도착←출발)는 같은 명령이다. 피연산자 순서가 반대라 처음엔 꼭 헷갈린다.
