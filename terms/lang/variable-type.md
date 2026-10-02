---
id: variable-type
term: 변수/타입
aliases:
  - Variable / Type
  - 변수와 자료형
  - 자료형
  - 데이터 타입
category: lang
tags:
  - 타입
level: 1
kind: concept
related:
  - static-dynamic-typing
  - stack-heap-memory
  - typescript
  - json
  - array
  - scope
  - null-handling
see_also:
  - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

**변수**는 값에 붙이는 이름표이고, **타입**은 그 값의 종류다.

## 비유

냉장고 안 **반찬통에 붙인 라벨**. "김치" 라벨(변수 이름)을 보면 안에 뭐가 들었는지 알고, "국물류/반찬류"(타입) 표시가 있으면 어떻게 다뤄야 할지도 안다.

## 예시

```ts
// Ender Chest 인벤토리 아이템 하나를 변수로 표현
let count: number = 3                    // 숫자
let name: string = 'Diamond Sword'       // 문자열
let stackable: boolean = false           // 참/거짓
const tags: string[] = ['tool', 'rare']  // 문자열 배열

count = count + 1     // OK: 숫자에 숫자
count = 'four'        // 오류: string 을 number 에 넣을 수 없음
```

## 헷갈리기 쉬운 것

- **정적/동적 타입**은 "타입을 언제 검사하느냐" 의 문제. 변수/타입은 그 앞 단계의 기본 개념이다.
- **상수(const)** 는 한 번 정하면 못 바꾸는 변수. TS 의 `const` 는 재할당만 막을 뿐, 배열 안의 내용은 바뀔 수 있다.
