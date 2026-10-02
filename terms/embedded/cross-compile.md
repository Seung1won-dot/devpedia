---
id: cross-compile
term: 크로스 컴파일 · 툴체인
aliases:
  - Cross Compilation
  - Toolchain
  - 크로스 컴파일러
  - arm-none-eabi-gcc
  - 툴체인
category: embedded
tags:
  - 컴파일
  - 펌웨어
  - 개발도구
level: 2
kind: concept
related:
  - compilation-pipeline
  - linker
  - compiler-interpreter
  - firmware
  - microcontroller
  - assembly-language
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

내 PC 와 **다른 CPU 용 실행 파일**을 PC 에서 만들어 내는 컴파일 방식과 그 도구 묶음.

## 비유

한국에서 **미국 규격 콘센트용 제품**을 만드는 공장. 만드는 곳과 쓰는 곳의 규격이 다르니 전용 금형(툴체인)이 필요하다.

## 예시

```bash
# x86 노트북에서 ARM Cortex-M4 MCU 용 펌웨어 빌드
arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb -O2 \
  -T stm32f4.ld -nostartfiles startup.s main.c -o fw.elf
arm-none-eabi-objcopy -O binary fw.elf fw.bin    # 구울 바이너리
arm-none-eabi-size fw.elf                         # 플래시·RAM 사용량 확인
```

이름 `arm-none-eabi` 는 "ARM 용 / OS 없음(none) / 임베디드 ABI" 라는 뜻이다. **툴체인**은 컴파일러만이 아니라 어셈블러·링커·objcopy·디버거(gdb)까지 한 세트다. 링커 스크립트(`.ld`)로 "코드는 플래시 주소, 변수는 RAM 주소" 를 직접 정해 주는 게 PC 개발과 가장 다른 점이다. 라즈베리 파이용 프로그램을 빠른 서버에서 `aarch64-linux-gnu-gcc` 로 빌드하는 것도 크로스 컴파일이다.

## 헷갈리기 쉬운 것

- **네이티브 컴파일**은 빌드하는 기계와 돌리는 기계가 같은 경우(노트북에서 `gcc main.c` 후 그 노트북에서 실행)다.
- **트랜스파일러**는 언어 → 언어 변환이고, 크로스 컴파일은 같은 언어를 다른 기계어로 바꾸는 것이다.
