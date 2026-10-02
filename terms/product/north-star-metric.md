---
id: north-star-metric
term: 북극성 지표
aliases:
  - North Star Metric
  - NSM
  - 핵심 지표
category: product
tags:
  - 지표
  - 그로스
  - SQL
level: 2
kind: metric
related:
  - okr-kpi
  - dau-mau
  - retention-churn
  - funnel
  - product-market-fit
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

사용자가 얻는 가치를 가장 잘 대변해 **팀 전체가 같이 키우는 지표 하나**.

## 비유

배 여러 척이 밤바다에서 **같은 북극성**을 보고 가면 흩어지지 않는다. 마케팅·개발·디자인이 각자 다른 숫자를 쫓으면 서로 발목을 잡는다.

## 예시

Devpedia 라면 "방문자 수"보다 **"주 3장 이상 카드를 끝까지 읽은 사용자 수"** 가 더 가치에 가깝다. 방문만 하고 나간 사람은 도움을 받지 않았기 때문이다.

```sql
-- 주별 북극성 지표: 그 주에 카드 3장 이상 읽은 사용자 수
SELECT week, COUNT(*) AS nsm
FROM (
  SELECT date_trunc('week', read_at) AS week, user_id
  FROM card_reads
  WHERE scroll_ratio >= 0.9
  GROUP BY 1, 2
  HAVING COUNT(DISTINCT card_id) >= 3
) t
GROUP BY week ORDER BY week;
```

좋은 북극성 지표는 매출보다 **앞서 움직이고**, 팀이 직접 바꿀 수 있어야 한다.

## 헷갈리기 쉬운 것

- **허영 지표**(누적 가입자, 페이지뷰)는 늘 오르기만 해서 기분은 좋지만 판단에 쓸 수 없다. 북극성 지표는 나빠질 수도 있어야 한다.
- **KPI** 는 여러 개를 동시에 보고, 북극성 지표는 그중 맨 위의 하나다.
