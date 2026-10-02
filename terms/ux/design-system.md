---
id: design-system
term: 디자인 시스템
aliases:
  - Design System
  - 컴포넌트 라이브러리
  - UI 키트
category: ux
tags:
  - 디자인시스템
  - UI디자인
  - 협업
level: 2
kind: concept
related:
  - design-token
  - figma
  - component-props-state
  - typography
  - tailwind
  - web-components
see_also:
  - https://m3.material.io/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

토큰·컴포넌트·사용 규칙을 묶어 **여러 화면이 같은 말투로 보이게** 하는 공용 규칙집.

## 비유

**레고 블록 세트와 조립 설명서**. 블록 규격이 정해져 있으니 누가 조립해도 서로 끼워 맞춰진다.

## 예시

디자인 시스템은 보통 세 층이다.

```text
1. 토큰     색·간격·글꼴 크기 값        --accent, --space-4
2. 컴포넌트  토큰으로 만든 부품          Button, Chip, Card
3. 가이드    언제 무엇을 쓰는지 규칙      "강조색은 링크·포커스·선택에만"
```

Devpedia 는 셋째 층 규칙을 `tokens.css` 맨 위 주석에 적어 두었다("그림자는 쓰지 않는다", "카테고리별 색은 없다"). 개발자 입장의 이득은 새 화면을 만들 때 **고를 게 줄어드는 것**이다. 대신 작은 팀이 처음부터 Material 수준의 시스템을 만들면 유지 비용이 제품보다 커지므로, 같은 버튼을 세 번째 복붙할 때쯤 시작하는 편이 현실적이다.

## 헷갈리기 쉬운 것

- **디자인 토큰**은 디자인 시스템의 가장 아래 재료(값)일 뿐, 시스템 전체가 아니다.
- **UI 라이브러리(MUI, shadcn/ui)** 는 남이 만든 디자인 시스템의 코드 구현이다. 그대로 쓰면 빠르지만 우리 제품 말투가 아니라 그 라이브러리 말투가 된다.
