---
id: structural-typing
term: 구조적 타이핑
aliases:
  - Structural Typing
  - 구조적 타입 시스템
  - 명목적 타이핑 vs 구조적 타이핑
  - Nominal Typing
  - 타입 호환성(TypeScript)
category: lang
tags:
  - 타입
  - TypeScript
  - 흔한실수
level: 3
kind: concept
related:
  - typescript
  - static-dynamic-typing
  - duck-typing
  - interface-abstract-class
  - type-inference
  - generics
see_also:
  - https://www.typescriptlang.org/docs/handbook/type-compatibility.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

타입의 **이름이 아니라 모양**(필드와 메서드)이 같으면 같은 타입으로 치는 규칙.

## 비유

옷을 **브랜드 이름표가 아니라 치수표**로 고르는 것. 어깨·가슴 치수만 맞으면 어느 브랜드든 입을 수 있고, 치수가 같아도 "우리 브랜드 옷만 됩니다" 하는 쪽이 명목적 타이핑이다.

## 예시

```ts
interface Patient { mrn: string; name: string }
interface Staff   { mrn: string; name: string; role: string }

function greet(p: Patient) { return `${p.name}(${p.mrn})` }

const nurse: Staff = { mrn: "S-01", name: "김간호", role: "RN" }
greet(nurse)                                     // OK — Staff 라는 이름은 상관없고, Patient 의 모양을 다 갖췄다
greet({ mrn: "P-1", name: "홍길동", age: 40 })   // 오류 — 객체 리터럴을 바로 넘길 때만 남는 필드를 잡아 준다

type PatientId = string & { readonly __brand: "PatientId" }
type StaffId   = string & { readonly __brand: "StaffId" }
const pid = "P-100" as PatientId
const sid: StaffId = pid                         // 오류 — 둘 다 string 이지만 __brand 가 다르다
```

TypeScript 가 구조적인 이유는 JS 가 **클래스 없이 객체 리터럴과 JSON 으로 데이터를 주고받는 언어**라서다. 덕분에 API 응답이나 외부 라이브러리 객체를 상속·변환 없이 내 인터페이스 자리에 바로 꽂을 수 있다. 대가는 마지막 네 줄이다 — 환자 번호와 직원 번호가 둘 다 `string` 이면 서로 섞여도 컴파일러가 모르므로, 섞이면 사고 나는 식별자·단위 값에는 **브랜드 타입**(또는 `private` 필드를 가진 클래스)으로 일부러 명목적 울타리를 친다. 모양이 제각각인 데이터를 끼워 맞추는 프런트·API 코드에는 구조적 타이핑이 생산적이지만, 값의 혼동이 치명적인 의료 식별자·금액 같은 곳에서는 그 유연함이 그대로 버그 구멍이 된다.

## 헷갈리기 쉬운 것

- **명목적 타이핑**(Java, C#, Rust): 선언한 이름과 상속 관계로 판정한다. Java 에서 `Staff` 가 `Patient` 를 `implements` 하지 않으면 모양이 같아도 거절되고, TypeScript·Go 는 모양만 본다.
- **덕 타이핑**: 발상은 같지만 **실행 중**에 메서드를 불러 보고 아는 것이고, 구조적 타이핑은 **컴파일 전**에 검사기가 모양을 비교한다.
- **`implements`**: TS 에서 `class Nurse implements Patient` 라고 써도 "모양이 맞는지 확인해 달라" 는 뜻일 뿐, 안 써도 모양만 맞으면 `Patient` 자리에 들어간다. Java 의 `implements` 와 역할이 다르다.
