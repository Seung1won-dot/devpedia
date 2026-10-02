---
id: design-token
term: 디자인 토큰
aliases:
  - Design Token
  - 토큰
  - CSS 변수
  - CSS Custom Properties
category: ux
tags:
  - 디자인시스템
  - CSS
level: 2
kind: concept
related:
  - design-system
  - color-contrast
  - typography
  - tailwind
  - media-query
  - figma
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

색·간격·글꼴 크기 같은 디자인 값에 **이름을 붙여 한곳에서 관리**하는 변수.

## 비유

요리책의 "**간장 1큰술**". 큰술이 몇 ml 인지 한 번 정해 두면 레시피 백 개를 고치지 않고 숟가락만 바꾸면 된다.

## 예시

Devpedia 의 `src/styles/tokens.css` 일부:

```css
:root {
  --surface-1: #15161a; /* 카드·헤더 */
  --text-3: #8c8f97;    /* 메타 */
  --accent: #f2b84b;    /* 링크·포커스·선택 */
  --space-4: 16px;
}

.card { background: var(--surface-1); padding: var(--space-4); }
.meta { color: var(--text-3); }
```

컴포넌트는 `#15161a` 를 직접 쓰지 않고 `--surface-1` 만 쓴다. 그래서 라이트 테마는 `[data-theme="light"]` 아래에서 같은 이름에 다른 값만 넣으면 끝난다. 이름을 `--gray-900` 처럼 **값 기준**이 아니라 `--surface-1`·`--text-3` 처럼 **역할 기준**으로 짓는 게 핵심이다 — 다크에선 어둡고 라이트에선 밝아도 역할은 같기 때문이다.

## 헷갈리기 쉬운 것

- **CSS 변수 vs 디자인 토큰**: CSS 변수는 구현 수단 하나이고, 토큰은 Figma·iOS·Android 에서도 같은 이름으로 쓰는 약속이다. 같은 토큰을 JSON 으로 두고 여러 플랫폼 코드로 뽑기도 한다.
- **Tailwind 설정의 theme** 도 토큰 목록이다. `bg-surface-1` 클래스가 결국 같은 값을 가리키게 만든다.
