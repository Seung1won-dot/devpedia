---
id: information-architecture
term: 정보 구조(IA)
aliases:
  - Information Architecture
  - IA
  - 정보 설계
  - 메뉴 구조
category: ux
tags:
  - UI디자인
  - 설계원칙
  - 검색
level: 2
kind: concept
related:
  - user-flow
  - wireframe
  - client-routing
  - semantic-html
  - full-text-search
  - visual-hierarchy
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

콘텐츠를 **어떻게 나누고 이름 붙이고 연결할지** 정해서 찾기 쉽게 만드는 설계.

## 비유

**대형 마트의 코너 배치와 표지판**. 라면이 어느 코너에 있을지 짐작할 수 있어야 직원에게 묻지 않는다.

## 예시

Devpedia 의 IA 는 세 갈래로 찾게 되어 있다.

```text
분야(category, 한 카드에 하나)   예: network, ux
  └ 태그(tags, 여러 개, 분야를 넘나듦)   예: 접근성, 흔한실수
      └ 카드 → related 로 옆 카드
+ 검색(이름·별칭)으로 바로 점프
```

분야는 겹치지 않는 **분류**, 태그는 겹쳐도 되는 **꼬리표**라서 "보안 분야가 아닌데 보안과 관련된 카드" 도 찾을 수 있다. 개발 쪽에선 이 구조가 URL 경로와 라우트(`/c/network`), 사이드바 메뉴, 검색 인덱스 필드로 그대로 옮겨진다. 메뉴 이름은 만든 사람 용어가 아니라 사용자가 쓰는 말로 짓는다.

## 헷갈리기 쉬운 것

- **사용자 흐름**은 시간 순서(어디서 어디로 가나), IA 는 공간 구조(무엇이 어디에 있나).
- **DB 스키마**도 데이터를 나누지만 저장 효율 기준이고, IA 는 사람이 찾는 방식 기준이다. 둘이 꼭 같은 모양일 필요는 없다.
