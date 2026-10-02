---
id: design-pattern
term: 디자인 패턴
aliases:
  - Design Pattern
  - 설계 패턴
  - GoF 패턴
category: swe
tags:
  - 설계원칙
  - OOP
  - 아키텍처패턴
level: 2
kind: pattern
related:
  - solid
  - oop
  - inheritance-polymorphism
  - refactoring
  - middleware
  - singleton
status: review
created: 2026-09-25
updated: 2026-09-29
---

## 한 줄 정의

자주 만나는 설계 문제에 대해 **이름이 붙은 검증된 해결 틀**.

## 비유

요리의 **기본 조리법 이름**. "볶음", "찜"이라고만 말해도 순서와 도구가 떠오르듯, "싱글턴", "옵저버"라고 하면 개발자끼리 구조 설명이 한 단어로 끝난다.

## 예시

옵저버 패턴 — 별표(즐겨찾기)가 바뀌면 관심 있는 쪽에 알린다.

```ts
type Listener = (starred: Set<string>) => void
const listeners: Listener[] = []

export function onStarChange(fn: Listener) { listeners.push(fn) }

export function toggleStar(id: string) {
  starred.has(id) ? starred.delete(id) : starred.add(id)
  listeners.forEach((fn) => fn(starred)) // 헤더 카운트·카드 아이콘이 각자 갱신
}
```

자주 보는 것 — 싱글턴(인스턴스 하나만: DB 커넥션 풀), 팩토리(생성 로직 분리), 옵저버(변경 알림: React 상태 구독), 전략(알고리즘 갈아끼우기: 정렬 기준), 어댑터(인터페이스 변환: HL7 → FHIR 변환기). 이름을 안다고 다 쓰려 들면 오히려 과설계가 되니, 같은 문제를 두 번 겪었을 때 꺼내는 게 맞다.

## 헷갈리기 쉬운 것

- **아키텍처 패턴**(MVC, 계층형, 마이크로서비스)은 앱 전체 뼈대 수준. 디자인 패턴은 클래스 몇 개 사이의 관계 수준.
- **SOLID**는 "좋은 설계의 원칙"(왜), 디자인 패턴은 그 원칙을 지키는 "구체적 방법"(어떻게).
