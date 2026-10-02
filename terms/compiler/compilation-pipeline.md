---
id: compilation-pipeline
term: 컴파일 과정
aliases:
  - Compilation Pipeline
  - Compilation Process
  - 빌드 과정
  - 전처리-컴파일-어셈블-링크
category: compiler
tags:
  - 컴파일러
  - 컴파일
  - 저수준
  - 면접
level: 1
kind: concept
related:
  - compiler-interpreter
  - lexer
  - parser
  - assembly-language
  - linker
  - ir
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

소스 코드가 **전처리→컴파일→어셈블→링크**를 거쳐 실행 파일이 되는 과정.

## 비유

요리로 치면 재료 손질(전처리), 레시피를 조리 순서로 바꾸기(컴파일), 실제 요리(어셈블), 여러 접시를 한 상에 차리기(링크)다. `gcc hello.c` 한 줄은 이 네 사람이 차례로 일한 결과다.

## 예시

```bash
gcc -E hello.c -o hello.i   # 1. 전처리: #include·#define 을 펼친 C 코드
gcc -S hello.i -o hello.s   # 2. 컴파일: 어셈블리어(.s)
gcc -c hello.s -o hello.o   # 3. 어셈블: 기계어 목적 파일(.o)
gcc hello.o -o hello        # 4. 링크: printf 가 든 libc 와 이어 실행 파일로
./hello

gcc -save-temps hello.c     # 중간 파일(.i .s .o)을 한 번에 남겨 보기
```

2단계 "컴파일" 안에서 다시 렉서→파서→의미 분석→IR→최적화→코드 생성이 일어난다. 에러 메시지가 어느 단계에서 났는지 알면 고칠 곳이 보인다: `undeclared` 는 컴파일 단계, `undefined reference` 는 링크 단계다.

## 헷갈리기 쉬운 것

- **컴파일러 vs 인터프리터**: 이 카드는 컴파일러 "안쪽" 의 단계 이야기다. 둘의 차이 자체는 compiler-interpreter 카드에서.
- **빌드**는 컴파일 과정에 테스트·패키징·의존성 설치까지 얹은 더 넓은 말이다. Python 은 `.py` → 바이트코드(.pyc) 컴파일만 자동으로 하고 링크 단계가 없다.
