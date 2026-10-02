---
id: bytecode-vm
term: 바이트코드 · 가상 머신(JVM/CPython)
aliases:
  - Bytecode
  - Virtual Machine
  - Process VM
  - JVM
  - CPython
  - .pyc
category: compiler
tags:
  - 컴파일러
  - Python
level: 2
kind: concept
related:
  - jit
  - compiler-interpreter
  - garbage-collection
  - ir
  - vm
  - gil
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

코드를 가상 CPU용 명령(**바이트코드**)으로 바꾼 뒤 VM 이 실행하는 방식.

## 비유

전 세계 어느 부엌에서도 통하는 **표준 레시피 카드**를 만들어 두고, 각 부엌의 요리사(VM)가 자기 도구로 그 카드를 따라 요리하는 것이다. 레시피는 한 번만 쓰고 부엌마다 다시 쓰지 않는다.

## 예시

```bash
python -c "import dis; dis.dis('a + b * 2')"
```

```text
  1           2 LOAD_NAME                0 (a)
              4 LOAD_NAME                1 (b)
              6 LOAD_CONST               0 (2)
              8 BINARY_OP                5 (*)
             12 BINARY_OP                0 (+)
             16 RETURN_VALUE
```

```bash
javac Add.java && javap -c Add   # static int add(int a, int b) { return a + b; }
#   0: iload_0
#   1: iload_1
#   2: iadd
#   3: ireturn
```

두 VM 모두 값을 **스택에 올리고 연산하는** 스택 기계다(위 출력은 Python 3.11 기준이라 버전마다 명령 이름이 다르다). `__pycache__/*.pyc` 가 이 바이트코드를 저장해 둔 캐시이고, `.class`·`.jar` 는 JVM 바이트코드다. 같은 바이트코드가 Windows 노트북과 리눅스 서버에서 그대로 도는 게 핵심 장점이다.

## 헷갈리기 쉬운 것

- **가상 머신(VM, infra)**: Proxmox 의 VM 은 컴퓨터 전체를 흉내 내는 시스템 VM, JVM·CPython 은 프로그램 하나를 돌리는 프로세스 VM 이다. 이름만 같다.
- **JIT**: 바이트코드를 한 줄씩 해석하면 느리니, JVM·V8 은 자주 도는 부분을 실행 중에 기계어로 바꾼다. CPython 은 오랫동안 순수 해석 방식이었다.
- **"Python 은 컴파일 안 한다"** 는 반만 맞다. 기계어로는 안 하지만 바이트코드로는 매번 컴파일한다.
