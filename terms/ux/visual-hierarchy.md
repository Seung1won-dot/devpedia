---
id: visual-hierarchy
term: 시각적 위계
aliases:
  - Visual Hierarchy
  - 시각 계층
  - 정보 위계
category: ux
tags:
  - UI디자인
  - 설계원칙
level: 2
kind: concept
related:
  - typography
  - gestalt-principles
  - color-contrast
  - information-architecture
  - wireframe
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

크기·굵기·색·여백 차이로 **무엇을 먼저 볼지** 순서를 정해 주는 화면 배치 원리.

## 비유

**신문 1면**. 헤드라인은 크고 굵게, 기사 본문은 작게, 날짜는 더 작고 흐리게 — 읽는 순서를 지면이 대신 정해 준다.

## 예시

Devpedia 카드 상세 페이지의 위계:

```css
.lead { font-size: var(--text-lead); color: var(--text); }   /* 1순위: 한 줄 정의 21px */
.body { font-size: var(--text-body); color: var(--text-2); } /* 2순위: 본문 16.5px */
.meta { font-size: var(--text-sm); color: var(--text-3); }   /* 3순위: 수정일 13px, 흐림 */
```

위계는 **한 번에 하나만 강하게** 만들 때 생긴다. 모든 것을 굵게·크게·강조색으로 하면 아무것도 눈에 안 들어온다. 디자이너가 "여기 좀 약하게" 라고 하면 크기를 줄이기 전에 색을 `--text-2` → `--text-3` 로 한 단계 내리는 방법도 있다.

## 헷갈리기 쉬운 것

- **정보 구조(IA)** 는 사이트 전체에서 콘텐츠가 어디 있는지, 시각적 위계는 한 화면 안에서 무엇이 먼저 보이는지다.
- **시맨틱 HTML 의 h1~h6** 은 문서 구조(낭독기·검색엔진용)이고, 시각적 크기와 따로 간다. 작게 보이는 제목도 구조상 h2 일 수 있다.
