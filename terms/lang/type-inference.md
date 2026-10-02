---
id: type-inference
term: 타입 추론
aliases:
  - Type Inference
  - 타입 인퍼런스
  - 타입 유추
  - 자동 타입 결정
category: lang
tags:
  - 타입
  - TypeScript
  - Python
level: 2
kind: concept
related:
  - static-dynamic-typing
  - type-hint
  - generics
  - typescript
  - structural-typing
see_also:
  - https://www.typescriptlang.org/docs/handbook/type-inference.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

타입을 일일이 적지 않아도 **도구가 코드를 보고 타입을 알아내는** 기능.

## 비유

**눈치 빠른 카페 점원**. "늘 먹던 거요" 라고만 해도 어제 주문을 보고 아이스 아메리카노인 걸 알아내지만, 처음 온 손님에게는 그럴 수 없으니 그때는 직접 말해 줘야 한다.

## 예시

```ts
const mrn = '001'                        // string — 적지 않아도 안다
const ages = [31, 45, 62]                // number[]
const byMrn = new Map<string, number>()  // 빈 컬렉션은 근거가 없어 적어 줘야 한다

function mean(xs: number[]) {            // 반환 타입을 안 적어도 number 로 추론
  return xs.reduce((a, b) => a + b, 0) / xs.length
}
let total = mean(ages)                   // total: number
total = '42'                             // 오류 — 처음 대입된 타입으로 굳었다

if (typeof input === 'string') {
  input.toUpperCase()                    // 이 블록 안에서만 string 으로 좁혀진다(narrowing)
}
```

```python
df = pd.read_csv("vitals.csv")   # pyright: DataFrame — 힌트 없이도 자동완성이 된다
rows = []                        # list[Unknown] — 빈 리스트는 추론 불가, rows: list[str] = [] 로 적는다
```

실무 규칙은 단순하다 — **지역 변수와 반환값은 추론에 맡기고, 함수 매개변수·빈 컬렉션·외부에 공개되는 API 경계는 직접 적는다.** 매개변수는 호출하는 코드를 다 보기 전엔 알 수 없고, 공개 함수의 반환 타입을 추론에 맡기면 구현을 살짝 바꿨을 때 쓰는 쪽 전부가 조용히 다른 타입을 받게 된다.

## 헷갈리기 쉬운 것

- **동적 타입**: 추론은 **실행 전에** 알아내는 것이고 한 번 정해지면 고정된다(`total = '42'` 가 오류). 동적 타입은 실행 중에 뭐든 들어갈 수 있다.
- **`any` / Unknown**: 추론할 근거가 없을 때 TS 는 암묵적 `any` 로, pyright 는 `Unknown` 으로 포기한다. `noImplicitAny` 를 켜면 포기하는 대신 "적어 달라" 고 오류를 낸다.
- **타입 힌트**: 힌트는 사람이 적는 것, 추론은 도구가 알아내는 것이다. 힌트를 적으면 추론 결과를 덮어쓴다.
