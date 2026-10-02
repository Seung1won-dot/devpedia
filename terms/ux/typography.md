---
id: typography
term: 타이포그래피 기초
aliases:
  - Typography
  - 타이포
  - 행간
  - 자간
  - word-break keep-all
category: ux
tags:
  - UI디자인
  - CSS
  - 흔한실수
level: 2
kind: concept
related:
  - visual-hierarchy
  - design-token
  - asset-optimization
  - i18n
  - responsive-design
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

글꼴·크기·행간·자간·줄 길이를 골라 **글을 편하게 읽히게** 만드는 기술.

## 비유

책의 **조판**. 같은 원고라도 줄 간격이 빽빽하거나 한 줄이 너무 길면 읽다가 줄을 놓친다.

## 예시

Devpedia 본문에 실제로 쓰는 값들:

```css
body {
  font-size: 16.5px;        /* --text-body */
  line-height: 1.7;         /* --leading-body: 한글 본문은 1.6~1.8 이 무난 */
  word-break: keep-all;     /* 한글을 어절 단위로 줄바꿈 */
}
.prose { max-width: 680px; } /* --prose-max: 한 줄이 너무 길지 않게 */
h1 { letter-spacing: -0.03em; } /* 큰 제목은 자간을 살짝 좁힌다 */
```

`word-break` 기본값에선 한글이 글자 단위로 끊겨 "데이터베이\n스" 처럼 단어가 쪼개진다. `keep-all` 을 주면 띄어쓰기에서만 끊는다. 다만 아주 긴 영문 URL 은 넘칠 수 있어 `overflow-wrap: anywhere` 를 함께 두는 경우가 많다.

## 헷갈리기 쉬운 것

- **행간(line-height)** 은 줄과 줄 사이, **자간(letter-spacing)** 은 글자와 글자 사이다. 본문 가독성은 행간이 훨씬 크게 좌우한다.
- **웹폰트 최적화**는 글꼴을 빨리 불러오는 문제, 타이포그래피는 불러온 글꼴을 어떻게 배치하느냐의 문제다.
