---
id: tree-shaking
term: 트리 셰이킹
aliases:
  - Tree Shaking
  - 트리 쉐이킹
  - 데드 코드 제거
  - Dead Code Elimination
  - sideEffects
category: frontend
tags:
  - 번들링
  - 성능최적화
  - JavaScript
level: 3
kind: concept
related:
  - bundler
  - web-performance
  - module-import
  - lazy-loading
  - package-manager
see_also:
  - https://developer.mozilla.org/ko/docs/Glossary/Tree_shaking
  - https://rollupjs.org/configuration-options/#treeshake
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

번들러가 **import 됐지만 실제로 안 쓰는 코드를 빌드 때 떨어내는** 최적화.

## 비유

나무를 **흔들어 죽은 잎을 떨어뜨리는 것**. 가지(import)로 이어져 있어도 실제로 쓰이지 않는 잎(함수)은 흔들면 떨어지고, 살아 있는 것만 남는다.

## 예시

```ts
// src/utils/date.ts — 셋 다 export 하지만
export function formatDate(d: Date) { return d.toISOString().slice(0, 10) }
export function daysBetween(a: Date, b: Date) { return Math.round((+b - +a) / 86_400_000) }
export function toKST(d: Date) { return new Date(d.getTime() + 9 * 3_600_000) }

// src/App.tsx — 하나만 쓰면
import { formatDate } from './utils/date'
// → npm run build 결과물에는 formatDate 만 들어가고 나머지 둘은 사라진다
```

```jsonc
// package.json (라이브러리를 배포할 때) — "import 만으로 생기는 부작용이 없다" 선언
{ "sideEffects": false }
// CSS 처럼 import 자체가 효과인 파일은 남긴다: "sideEffects": ["*.css"]
```

전제는 **ESM**(`import`/`export`)이다. ESM 은 어떤 이름을 가져오는지가 실행 없이(정적으로) 정해지므로 번들러(Rollup/esbuild)가 "이 export 는 아무도 안 쓴다" 를 빌드 때 판단할 수 있고, CommonJS(`require`)는 실행해 봐야 알 수 있어 거의 못 떨어낸다. 흔히 깨지는 지점: `import _ from 'lodash'`(전체를 끌고 옴 → `lodash-es` 에서 named import), 모듈 최상단에서 전역을 건드리는 코드(부작용이 있다고 보고 못 버림). 트레이드오프: 앱 코드는 Vite 가 알아서 하니 신경 쓸 일이 적지만, **라이브러리를 배포한다면** ESM 으로 빌드하고 `sideEffects` 를 정직하게 선언해야 사용자가 혜택을 본다 — `false` 로 거짓말하면 CSS import 같은 것이 조용히 사라진다. 효과는 `npm run build` 의 청크 크기나 `rollup-plugin-visualizer` 로 확인한다.

## 헷갈리기 쉬운 것

- **코드 스플리팅** 은 쓰는 코드를 **나눠서 나중에** 받는 것, 트리 셰이킹은 안 쓰는 코드를 **아예 빼는** 것. 둘 다 번들 크기 문제지만 수단이 다르고, Vite 는 둘 다 한다.
- **미니파이(압축)** 는 변수명 줄이기·공백 제거라 코드 양은 그대로고 글자 수만 준다. 트리 셰이킹은 코드 자체를 없앤다. 빌드 때 둘 다 같이 돈다.
- **데드 코드 제거(DCE)** 는 컴파일러가 `if (false)` 같은 **도달 불가능한 코드**를 지우는 일반 용어. 트리 셰이킹은 그중 **모듈 경계의 안 쓰는 export** 에 초점을 둔 번들러 쪽 용어다.
