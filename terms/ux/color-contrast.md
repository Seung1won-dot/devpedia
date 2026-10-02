---
id: color-contrast
term: 색 대비(WCAG)
aliases:
  - Color Contrast
  - Contrast Ratio
  - 명도 대비
  - 대비율
  - WCAG
category: ux
tags:
  - 접근성
  - UI디자인
  - 표준
level: 2
kind: metric
related:
  - a11y
  - design-token
  - visual-hierarchy
  - typography
  - heuristic-evaluation
see_also:
  - https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

글자색과 배경색의 **밝기 차이를 1:1~21:1 비율**로 나타낸 접근성 지표.

## 비유

**햇빛 아래 휴대폰 화면**. 회색 글씨에 회색 배경이면 시력이 좋아도 안 보인다 — 대비율은 그 "안 보임" 을 숫자로 잰 것이다.

## 예시

WCAG AA 기준은 본문 **4.5:1**, 큰 글자(대략 24px 이상, 굵으면 18.66px 이상) **3:1** 이다. Devpedia 는 리디자인 때 텍스트 색 조합 46개를 모두 재서 `docs/redesign/contrast.md` 에 남겼다.

```text
테마   글자        배경          대비    판정
light  --accent    --surface-3   4.72   AA (가장 낮음)
dark   --text-3    --surface-3   4.73   AA
```

토큰을 바꾸면 이 표도 다시 재야 한다. 크롬 개발자 도구에서 요소의 색 견본을 클릭하면 대비율이 바로 나오고, 4.5 아래면 경고 표시가 뜬다.

## 헷갈리기 쉬운 것

- **AA vs AAA**: AAA 는 본문 7:1 로 더 엄격하다. 대부분의 서비스와 공공 기준은 AA 를 목표로 한다.
- 대비는 **밝기** 차이만 본다. 빨강과 초록은 색상은 달라도 밝기가 비슷하면 대비가 낮고, 색각 이상이 있으면 구분이 안 된다. 그래서 색만으로 상태를 표시하지 않는다.
