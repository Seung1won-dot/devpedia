---
id: responsive-design
term: 반응형 디자인
aliases:
  - Responsive Web Design
  - RWD
  - 반응형 웹
  - 미디어 쿼리
category: frontend
tags:
  - CSS
  - 브라우저
level: 1
related:
  - html-css-js
  - pwa
  - a11y
  - dom
see_also:
  - https://developer.mozilla.org/ko/docs/Learn_web_development/Core/CSS_layout/Responsive_Design
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

화면 크기에 따라 **레이아웃이 알아서 바뀌어** 폰·태블릿·PC 에서 다 잘 보이게 만드는 방식.

## 비유

**물**은 어떤 컵에 부어도 컵 모양대로 채워진다. 반응형 페이지도 한 벌만 만들어 두면 폰이든 모니터든 담기는 화면 모양에 맞춰 스스로 펴지고 접힌다.

## 예시

```css
/* Ender Chest 인벤토리 그리드: 폰은 2열, 768px 이상(태블릿·PC)은 4열 */
.inventory {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

@media (min-width: 768px) {
  .inventory { grid-template-columns: repeat(4, 1fr); }
}
```

`index.html` 의 `<meta name="viewport" content="width=device-width, initial-scale=1">` 를 빼먹으면 폰이 PC 화면을 통째로 축소해 보여주므로 미디어 쿼리가 소용없어진다. Chrome 개발자 도구의 기기 모드(Ctrl+Shift+M)로 폰 크기를 흉내 내며 확인한다.

## 헷갈리기 쉬운 것

- **적응형(Adaptive)** 은 폰용·PC용 페이지를 따로 만들어 골라 보내는 것. 반응형은 한 벌이 늘었다 줄었다 한다.
- **PWA** 는 "설치·오프라인처럼 앱답게 동작하나" 의 문제고, 반응형은 "화면 크기에 맞나" 의 문제. PWA 를 만들려면 보통 반응형은 기본으로 깔고 간다.
