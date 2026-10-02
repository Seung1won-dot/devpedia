---
id: performance-improvement-story
term: 성능 개선 수치
aliases:
  - Performance Improvement Story
  - 성능 개선 경험
  - 성능 최적화 경험
  - 응답 시간 개선
category: career
tags:
  - 면접
  - 성능
  - 포트폴리오
level: 2
kind: concept
related:
  - troubleshooting-story
  - n-plus-one
  - index
  - cache
  - web-performance
  - core-web-vitals
  - resume
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

성능을 개선했다는 말을 **측정한 전·후 숫자**와 원인으로 뒷받침하는 이야기.

## 비유

다이어트 후기. "살 많이 뺐어요" 보다 "체중계로 78 → 71 kg, 3개월, 저녁 탄수화물 끊음" 이 믿기고 따라 할 수 있다.

## 예시

이력서·면접에서 통하는 형태는 표 한 장이다.

| 항목 | 개선 전 | 개선 후 | 측정 도구·조건 |
| --- | --- | --- | --- |
| 카드 목록 API p95 응답 | 2.1 s | 0.3 s | k6, 50 VU × 1분, 카드 300장 |
| 목록 1회당 DB 쿼리 수 | 21 | 1 | Supabase 쿼리 로그 |
| Lighthouse Performance | 61 | 92 | Chrome Lighthouse, 모바일 프리셋 |
| 초기 JS 번들 | 890 KB | 310 KB | vite build 출력 |

숫자 뒤에는 반드시 **원인 → 조치**가 붙는다.

```sql
EXPLAIN ANALYZE SELECT * FROM terms WHERE category = 'os';
-- 전: Seq Scan on terms  (actual time=0.02..48.7 rows=120)
-- 후: Index Scan using terms_category_idx  (actual time=0.03..0.9)
```

- 21 → 1 쿼리: 카드마다 태그를 따로 조회하던 N+1 을 JOIN 한 번으로.
- 48 ms → 1 ms: `category` 컬럼에 인덱스가 없어 Seq Scan → 인덱스 추가.
- 카테고리 목록은 하루에 한 번 바뀜 → 60초 캐시.
- 890 → 310 KB: 라우트 단위 코드 스플리팅(lazy loading).

말로 할 때는 이 순서다. "[상황]에서 [지표]가 [전]이었는데, [도구]로 재 보니 [원인]이었습니다. [조치]했더니 [후]가 됐고, 측정 조건은 [환경·부하]입니다." 조건 없는 수치("2초에서 0.3초")는 "로컬에서요? 데이터 몇 건이요?" 한 마디에 흔들린다. **개선 전 수치가 없다면 지금이라도 이전 커밋을 체크아웃해서 재라.** 숫자를 부풀리면 "어떻게 쟀나요?" 에서 무너지고, 숫자가 없으면 "체감상 빨라졌다" 로 끝나 신뢰가 낮다.

면접 꼬리 질문은 "그 개선이 사용자에게 어떤 의미였나요?" 와 "왜 애초에 2초였나요?" 다. 후자는 원인 분석을 제대로 했는지 보는 질문이라, 조치보다 원인을 더 잘 설명할 수 있어야 한다.

## 헷갈리기 쉬운 것

- **트러블슈팅**은 안 되던 것을 되게 한 것, 성능 개선은 되던 것을 빠르게·싸게 만든 것. 구조는 같지만 후자는 숫자 없이 이야기가 성립하지 않는다.
- **평균 vs p95/p99**: 평균은 느린 요청을 숨긴다. "p95" 를 말하면 부하 도구를 실제로 돌려 본 사람으로 보인다.
- **체감 vs 측정**: "빨라진 것 같아요" 는 수치가 아니다. 스톱워치라도 좋으니 재서 적는다.
