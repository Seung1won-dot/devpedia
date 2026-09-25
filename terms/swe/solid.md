---
id: solid
term: SOLID
aliases:
  - SOLID 원칙
  - 객체지향 설계 5원칙
  - 솔리드
category: swe
tags:
  - 설계원칙
  - OOP
level: 2
related:
  - oop
  - inheritance-polymorphism
  - design-pattern
  - refactoring
  - class-instance
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

고치기 쉬운 객체지향 코드를 위한 **다섯 가지 설계 원칙**의 머리글자.

## 비유

잘 만든 **조립식 가구 규칙**. 서랍 하나가 한 가지 일만 하고(S), 새 서랍을 끼울 때 기존 걸 톱질하지 않아도 되고(O), 규격 나사면 어느 회사 것이든 맞는다(D).

## 예시

Devpedia 빌드 스크립트에 대입하면 이렇다.

```text
S  단일 책임     validate.ts 는 검사만, render.ts 는 HTML 변환만 — 한 파일이 바뀌는 이유는 하나
O  개방-폐쇄     새 카테고리는 categories.yml 한 줄로 끝나야지, 빌드 코드를 고치면 안 됨
L  리스코프 치환 "카드" 자리에 "초안 카드"를 넣어도 렌더링이 깨지지 않아야 함
I  인터페이스 분리 검색기는 term·aliases 만 받으면 되지, 카드 전체 타입을 요구하지 말 것
D  의존성 역전   검증기는 "파일 읽기"가 아니라 "문자열"에 의존 — 테스트에선 파일 없이 문자열만 넘김
```

실제로 `parseTermMarkdown(source, file = '<memory>')` 이 D 의 예다 — 파일 시스템에 묶이지 않아 테스트에서 문자열만 넘긴다. 다섯 개를 다 외우기보다 S 와 D 두 개만 지켜도 코드가 눈에 띄게 나아진다.

## 헷갈리기 쉬운 것

- **DRY/KISS/YAGNI**는 언어를 가리지 않는 짧은 격언. SOLID 는 객체지향(클래스·인터페이스)을 전제로 한 원칙 묶음.
- **디자인 패턴**은 SOLID 를 지키기 위한 구체적 구조. 예컨대 전략 패턴은 O 를 지키는 한 방법.
