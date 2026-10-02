---
id: core-web-vitals
term: Core Web Vitals
aliases:
  - 코어 웹 바이탈
  - 웹 바이탈
  - LCP/INP/CLS
  - 웹 성능 지표
  - Web Vitals
category: frontend
tags:
  - 성능최적화
  - 브라우저
  - 검색
level: 2
kind: metric
related:
  - web-performance
  - lazy-loading
  - browser-rendering
  - csr-ssr-ssg
  - cdn
  - asset-optimization
see_also:
  - https://web.dev/articles/vitals
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

구글이 정한 **사용자가 느끼는 속도 세 가지 지표**(LCP·INP·CLS)와 그 합격선.

## 비유

식당 평가의 세 항목. **메인 요리가 나오기까지(LCP), 종업원을 불렀을 때 반응하기까지(INP), 먹는 도중 접시가 밀려 움직이는지(CLS)**.

## 예시

| 지표 | 뜻 | 좋음 | 나쁨 |
|---|---|---|---|
| LCP (Largest Contentful Paint) | 가장 큰 콘텐츠(히어로 이미지·제목)가 그려지기까지 | 2.5초 이하 | 4초 초과 |
| INP (Interaction to Next Paint) | 클릭·입력 뒤 화면이 반응하기까지(방문 중 거의 최악값) | 200ms 이하 | 500ms 초과 |
| CLS (Cumulative Layout Shift) | 로딩 중 요소가 갑자기 밀리는 정도(점수) | 0.1 이하 | 0.25 초과 |

```bash
npm run preview                                   # dist/ 를 http://localhost:4173 에 띄우고
npx lighthouse http://localhost:4173 --only-categories=performance --view
# 실제 방문자 데이터는 PageSpeed Insights(pagespeed.web.dev) 와 Search Console 에서
```

측정값은 두 종류다. **랩 데이터** — Lighthouse 가 내 PC 에서 흉내 내어 재는 값, **필드 데이터** — 실제 방문자의 Chrome 이 보고한 값(PageSpeed Insights, Search Console). 구글 검색 순위에 반영되므로 SEO 에도 영향이 있다. 흔한 처방은 LCP 는 히어로 이미지 preload 와 서버 응답 단축, INP 는 긴 JS 작업 쪼개기, CLS 는 이미지에 `width`/`height` 지정과 광고·배너 자리 미리 잡기. 면접에서는 "Core Web Vitals 세 지표를 설명하고 각각 개선 방법을 말해 보세요" 로 나온다.

## 헷갈리기 쉬운 것

- **FID → INP**: FID(First Input Delay)는 첫 입력의 지연만 쟀는데, 2024년 3월부터 INP 가 대체했다. 옛 자료에 FID 가 나오면 그렇게 읽는다.
- **Lighthouse 점수 vs Core Web Vitals**: Lighthouse 성능 점수(0~100)는 여러 지표를 가중 평균한 랩 값이고, CWV 는 그중 셋을 실제 사용자 기준으로 판정한 것. 점수가 90인데 필드 CLS 가 나쁠 수 있다.
- **TTFB / FCP**: 보조 지표. TTFB 는 첫 바이트가 오기까지(서버·네트워크), FCP 는 무엇이든 처음 그려지기까지. LCP 가 느리면 이 둘부터 본다.
