---
id: typescript
term: TypeScript
aliases:
  - TS
  - 타입스크립트
  - Typed JavaScript
category: frontend
tags:
  - TypeScript
  - 타입
  - JavaScript
level: 1
related:
  - html-css-js
  - static-dynamic-typing
  - variable-type
  - react
  - bundler
see_also:
  - https://www.typescriptlang.org/ko/docs/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

JavaScript 에 **타입 표시를 붙여** 실행 전에 실수를 잡아주고, 결국 JS 로 변환되는 언어.

## 비유

콘센트의 **모양이 정해진 플러그**. 아무 구멍에나 억지로 꽂는 대신 모양이 맞아야만 들어가니, 잘못 꽂아서 터지는 사고가 꽂기 전에 막힌다.

## 예시

```ts
// Ender Chest: Supabase 에서 받는 아이템의 모양을 미리 정해 둔다
type Item = { id: string; name: string; count: number }

function total(items: Item[]) {
  return items.reduce((sum, i) => sum + i.count, 0)
}

total([{ id: '1', name: '철괴', count: '64' }])
//                                    ^^^^ 문자열은 number 자리에 못 들어감.
//                                         저장하는 순간 에디터가 빨간 줄을 긋는다
```

실행해 보기 전에 에디터가 잡아주고, 자동완성이 `item.` 만 쳐도 `id / name / count` 를 띄워 주는 것이 가장 체감되는 이점이다.

## 헷갈리기 쉬운 것

- **JavaScript 와 별개 언어가 아니다.** JS 문법 그대로에 타입만 얹은 것이라, `.ts` 파일에서 타입 표시를 지우면 그대로 JS 가 된다.
- 타입 검사는 **컴파일 때만** 한다. 브라우저에서 돌 땐 타입이 사라지므로, API 응답처럼 밖에서 들어온 값은 zod 같은 걸로 따로 검사해야 한다.
