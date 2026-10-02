---
id: transpiler
term: 트랜스파일러(Babel/tsc)
aliases:
  - Transpiler
  - Source-to-Source Compiler
  - 트랜스파일
  - Babel
  - tsc
  - esbuild
category: compiler
tags:
  - 컴파일러
  - JavaScript
  - TypeScript
  - 번들링
level: 1
kind: tool
related:
  - typescript
  - bundler
  - compiler-interpreter
  - ast
  - linter-formatter
see_also:
  - https://babeljs.io/docs/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

한 고수준 언어를 **다른 고수준 언어(또는 옛 문법)** 로 바꿔 주는 컴파일러.

## 비유

요즘 말로 쓴 글을 **어르신도 읽게 옛 말투로 고쳐 주는** 번역기다. 뜻은 같고 표현만 바뀌며, 결과물도 여전히 사람이 읽을 수 있는 글이다.

## 예시

```ts
// src/user.ts
type User = { name?: string };
export const getName = (u: User) => u?.name ?? "익명";
```

```bash
npx tsc src/user.ts --target ES2019 --outDir dist
```

```js
// dist/user.js — 타입은 지워지고 ?. ?? 는 옛 문법으로 풀린다
export const getName = (u) => { var _a; return (_a = u === null || u === void 0 ? void 0 : u.name) !== null && _a !== void 0 ? _a : "익명"; };
```

(출력 모양은 tsc 버전마다 조금 다르다.) 브라우저·Node 가 TypeScript 를 바로 못 읽으니, React/Vite 프로젝트는 저장할 때마다 esbuild 나 SWC 가 TS·JSX 를 JS 로 바꿔 준다. 내부적으로는 코드를 AST 로 파싱해 노드를 고친 뒤 다시 출력한다.

## 헷갈리기 쉬운 것

- **tsc vs Babel/esbuild**: tsc 는 타입 검사 + 변환을 다 하고, Babel·esbuild·SWC 는 타입을 **검사 없이 지우기만** 해서 빠르다. 그래서 Vite 프로젝트도 CI 에 `tsc --noEmit` 을 따로 둔다.
- **번들러**는 여러 파일을 하나로 묶는 도구이고, 트랜스파일은 그 안에서 파일 하나하나에 일어나는 변환이다. Vite 가 둘을 같이 해서 헷갈린다.
- **폴리필**: 트랜스파일러는 문법(`?.`)만 바꾼다. 옛 브라우저에 없는 함수(`Array.prototype.at`)는 폴리필 코드를 따로 넣어야 한다.
