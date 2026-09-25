---
id: static-dynamic-typing
term: 정적 타입/동적 타입
aliases:
  - Static Typing / Dynamic Typing
  - 정적 타이핑과 동적 타이핑
  - 타입 검사 시점
  - 정적 언어/동적 언어
category: lang
tags:
  - 타입
  - TypeScript
  - Python
level: 1
related:
  - variable-type
  - typescript
  - compiler-interpreter
  - exception
  - json
see_also:
  - https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

타입 오류를 **실행 전**에 잡으면 정적, **실행 중**에 잡으면 동적 타입이다.

## 비유

정적 타입은 **출발 전 공항 짐 검사**, 동적 타입은 **도착해서 가방 열어보기**. 검사가 번거롭긴 해도 공항에서 걸리는 게 목적지에 가서 터지는 것보다 낫다.

## 예시

```ts
// TypeScript — 저장(컴파일)하는 순간 에디터가 빨간 줄을 긋는다
function total(price: number, qty: number) { return price * qty }
total('100', 2)   // 오류: '100' 은 number 가 아님
```

```python
# Python — 실행해 봐야 안다
def total(price, qty):
    return price * qty

total("100", 2)     # 실행됨: '100100' (문자열 반복!) — 조용히 이상한 값
total("100", "2")   # 여기서야 TypeError
```

## 헷갈리기 쉬운 것

- **강타입/약타입**은 다른 축이다. 파이썬은 동적이지만 강타입(`"1" + 1` 이 에러), JS 는 동적이면서 약타입(`"1" + 1` 이 `"11"`).
- **컴파일러/인터프리터**와도 별개. TS 는 정적 타입인데 결국 JS 로 바뀌어 인터프리터에서 돈다.
