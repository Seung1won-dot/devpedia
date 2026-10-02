---
id: linker
term: 링커 · 정적/동적 링킹
aliases:
  - Linker
  - Static Linking
  - Dynamic Linking
  - 링킹
  - ld
  - undefined reference
category: compiler
tags:
  - 컴파일러
  - 저수준
  - 흔한실수
level: 2
kind: concept
related:
  - compilation-pipeline
  - symbol-table
  - module-import
  - package-manager
  - assembly-language
  - calling-convention
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

목적 파일과 라이브러리를 **하나의 실행 파일로 이어 붙이는** 도구.

## 비유

여러 사람이 나눠 쓴 보고서 챕터를 **한 권으로 제본**하면서, "자세한 건 3장 참고" 같은 참조에 실제 쪽수를 채워 넣는 편집자다. 3장이 빠져 있으면 제본을 거부한다.

## 예시

```bash
gcc -c main.c util.c          # main.o, util.o (서로를 아직 모름)
gcc main.o -o app             # undefined reference to `util_add'  ← util.o 를 빠뜨림
gcc main.o util.o -o app -lm  # 함께 링크 (-lm: 수학 라이브러리 libm)

ldd ./app                     # 실행할 때 붙는 동적 라이브러리 목록
#   libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6
#   libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6

gcc -static main.o util.o -o app_static -lm   # 라이브러리를 통째로 넣은 정적 링킹
```

**정적 링킹**은 라이브러리 코드를 실행 파일 안에 복사해 넣어 어디서나 돌지만 파일이 크다. **동적 링킹**은 실행 순간에 `.so`(리눅스)·`.dll`(Windows)·`.dylib`(macOS)를 찾아 붙여 파일은 작지만, 서버에 그 버전이 없으면 `error while loading shared libraries` 가 난다. Docker 이미지가 libc 포함 이미지를 고르는 이유 중 하나다.

## 헷갈리기 쉬운 것

- **`undeclared` vs `undefined reference`**: 앞은 컴파일러가 "선언을 못 봤다", 뒤는 링커가 "선언은 봤는데 실제 몸체를 못 찾았다" 는 뜻이다. 뒤는 `.o`·`-l` 을 빠뜨렸거나 순서가 틀린 경우가 많다.
- **import 와의 차이**: Python 의 `import` 는 실행 중에 모듈을 읽어 오는 동작이라 링커 단계가 따로 없다. `pip install` 한 휠 안의 `.so` 는 결국 동적 링킹으로 붙는다.
