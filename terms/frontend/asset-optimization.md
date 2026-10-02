---
id: asset-optimization
term: 웹폰트/이미지 최적화
aliases:
  - Asset Optimization
  - 정적 자산 최적화
  - 이미지 최적화
  - 웹폰트 최적화
  - WebP/AVIF
  - font-display
category: frontend
tags:
  - 성능최적화
  - 브라우저
  - CSS
level: 2
kind: concept
related:
  - web-performance
  - core-web-vitals
  - lazy-loading
  - cdn
  - cache
  - browser-rendering
  - texture-mapping
see_also:
  - https://web.dev/learn/images
  - https://web.dev/articles/font-best-practices
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

이미지·글꼴 파일을 **작게·늦게·알맞게 내려받게** 손봐 첫 화면을 빠르게 하는 일.

## 비유

**여행 짐 싸기**와 같다. 사진은 원본 대신 압축본으로, 외투(폰트)는 꼭 입을 것만, 당장 안 입을 옷은 나중에 택배로(지연 로딩) 받는다.

## 예시

```html
<!-- 이미지: 포맷·크기·지연 세 가지를 한 번에 -->
<img
  src="/img/ct-sample-800.webp"
  srcset="/img/ct-sample-400.webp 400w, /img/ct-sample-800.webp 800w, /img/ct-sample-1600.webp 1600w"
  sizes="(min-width: 768px) 50vw, 100vw"
  width="800" height="600"
  loading="lazy" decoding="async"
  alt="흉부 CT 예시(가명화)"
/>
```

```css
/* 웹폰트: 서브셋 + woff2 + swap. CDN 링크 하나로 한글 전체(수 MB)를 받는 것이 흔한 실수 */
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Regular.subset.woff2') format('woff2');
  font-display: swap;   /* 폰트가 올 때까지 시스템 글꼴로 먼저 보여 준다 */
}
```

이미지는 **WebP/AVIF 로 변환**(JPEG 보다 보통 30~50% 작아진다 [확인 필요]), `srcset` 으로 화면 폭에 맞는 크기만 받게 하고, `width`/`height` 를 적어 로딩 중 레이아웃이 밀리는 것(CLS)을 막는다. 첫 화면 밖 이미지는 `loading="lazy"`, 첫 화면 대표 이미지는 반대로 `<link rel="preload">` 로 먼저. 한글 웹폰트는 글자가 11,172자라 유독 크므로 **서브셋(자주 쓰는 2,350자)**·woff2·`font-display: swap` 이 기본 세트다. Vite 는 `src/assets/` 의 파일에 해시 이름을 붙여 주므로 캐시를 1년 걸어도 안전하다.

## 헷갈리기 쉬운 것

- **레이지 로딩** 은 자산 최적화의 한 수단(늦게 받기). 이 카드는 포맷·크기·캐시까지 포함하는 더 넓은 묶음이다.
- **gzip/brotli 압축 vs 이미지 압축**: gzip 은 텍스트(JS/CSS/HTML)에 효과가 크고, 이미지는 이미 압축된 형식이라 gzip 을 걸어도 거의 안 준다. 이미지는 포맷 변환과 크기 조절로 줄여야 한다.
- **CDN 캐시 vs 브라우저 캐시**: 전자는 가까운 서버가 대신 주는 것, 후자는 내 컴퓨터에 둔 것. 둘 다 "다시 안 받기" 지만 파일명에 해시가 있어야 바뀐 파일이 묵은 캐시에 가려지지 않는다.
