---
id: dau-mau
term: DAU · MAU
aliases:
  - Daily Active Users
  - Monthly Active Users
  - 일간 활성 사용자
  - 월간 활성 사용자
  - Stickiness
category: product
tags:
  - 지표
  - SQL
  - 데이터분석
level: 1
kind: metric
related:
  - retention-churn
  - north-star-metric
  - okr-kpi
  - funnel
  - group-by-aggregate
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

하루(**DAU**) 또는 한 달(**MAU**) 동안 서비스를 실제로 쓴 사람 수.

## 비유

헬스장 **회원 수**가 아니라 **출석한 사람 수**다. 한 달에 한 번이라도 온 사람이 MAU, 오늘 온 사람이 DAU.

## 예시

```sql
-- 날짜별 DAU
SELECT event_date, COUNT(DISTINCT user_id) AS dau
FROM events GROUP BY event_date;

-- 9월 MAU
SELECT COUNT(DISTINCT user_id) AS mau
FROM events WHERE event_date BETWEEN '2026-09-01' AND '2026-09-30';
```

9월 평균 DAU 가 1,200 이고 MAU 가 6,000 이면 **DAU/MAU = 20%** 다. 월 사용자가 한 달에 평균 6일쯤 들어온다는 뜻으로, 이 비율을 **고착도(stickiness)** 라 부른다. 메신저처럼 매일 쓰는 앱은 높고 여행 앱은 낮은 게 정상이라 업계 평균 수치는 서비스 종류별로 따로 봐야 한다 [확인 필요].

## 헷갈리기 쉬운 것

- **"활성"의 정의**가 회사마다 다르다. 앱 실행만으로 셀지, 글 하나 읽어야 셀지 먼저 합의하지 않으면 숫자를 비교할 수 없다.
- **가입자 수**는 누적이라 줄지 않는다. DAU·MAU 는 줄어들 수 있어서 진짜 건강 상태를 보여 준다.
