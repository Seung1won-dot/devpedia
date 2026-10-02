---
id: webassembly
term: WebAssembly
aliases:
  - WebAssembly
  - Wasm
  - 웹어셈블리
  - WASI
category: compiler
tags:
  - 컴파일러
  - 브라우저
  - 성능최적화
level: 2
kind: protocol
related:
  - llvm
  - bytecode-vm
  - transpiler
  - sandbox
  - html-css-js
  - assembly-language
see_also:
  - https://webassembly.org/
  - https://developer.mozilla.org/en-US/docs/WebAssembly
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

브라우저에서 C·Rust 코드를 **빠르고 안전하게** 돌리는 이진 명령 형식.

## 비유

브라우저 안에 들여놓은 **표준 규격 컨테이너 박스**다. 어느 공장(C·Rust·Go)에서 만든 짐이든 이 박스에 담으면 모든 브라우저 항구가 같은 크레인으로 내려 준다.

## 예시

```c
/* add.c */
int add(int a, int b) { return a + b; }
```

```bash
clang --target=wasm32 -O2 -nostdlib -Wl,--no-entry -Wl,--export=add add.c -o add.wasm
```

```js
// 같은 폴더를 npx serve 등으로 띄운 뒤 브라우저 콘솔에서
const { instance } = await WebAssembly.instantiateStreaming(fetch("add.wasm"));
console.log(instance.exports.add(2, 3)); // 5
```

실제로는 **Pyodide**(브라우저 속 Python + pandas), **SQLite Wasm**, **ffmpeg.wasm** 처럼 무거운 C 라이브러리를 설치 없이 웹에서 쓰는 데 많이 쓴다. 폐쇄망 PC 에 아무것도 깔 수 없을 때, 의료 영상 뷰어나 데이터 전처리를 브라우저만으로 돌리는 선택지가 된다.

## 헷갈리기 쉬운 것

- **JavaScript 대체가 아니다**: Wasm 은 DOM 을 직접 만지지 못해 화면 조작은 JS 를 거친다. 무거운 계산은 Wasm, 나머지는 JS 가 보통의 분담이다.
- **어셈블리어**라는 이름이지만 특정 CPU 의 명령이 아니라, JVM 바이트코드처럼 가상 기계용 명령이다. 브라우저가 받아서 실제 CPU 기계어로 다시 컴파일한다.
- **WASI** 는 브라우저 밖(서버·엣지)에서 Wasm 을 돌리기 위한 시스템 인터페이스 표준이다. 아직 발전 중이다 [확인 필요].
