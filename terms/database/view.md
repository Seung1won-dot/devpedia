---
id: view
term: 뷰
aliases:
  - View
  - 데이터베이스 뷰
  - 가상 테이블
  - Materialized View
  - 머티리얼라이즈드 뷰
category: database
tags:
  - SQL
  - 관계형
  - 접근제어
level: 2
kind: concept
related:
  - sql
  - join
  - subquery
  - rls
  - soft-delete
  - denormalization
see_also:
  - https://www.postgresql.org/docs/current/sql-createview.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

자주 쓰는 SELECT 에 **이름을 붙여 표처럼 조회**하게 저장해 둔 가상 테이블.

## 비유

엑셀에서 **필터·열 숨김을 걸어 둔 시트 바로가기**. 원본은 따로 있고, 바로가기를 열 때마다 그 시점의 원본이 걸러져 보인다.

## 예시

```sql
-- 연구자 계정에는 가명 ID 와 필요한 열만 보이게
CREATE VIEW research_vitals AS
SELECT p.pseudo_id, v.sbp, v.measured_at::date AS measured_on
FROM vitals v JOIN patients p ON p.id = v.patient_id;

GRANT SELECT ON research_vitals TO researcher;     -- 원본 표 권한은 안 줌
SELECT * FROM research_vitals WHERE measured_on = '2026-10-01';

-- 무거운 집계는 결과를 저장해 두는 머티리얼라이즈드 뷰로
CREATE MATERIALIZED VIEW daily_counts AS
SELECT measured_at::date AS d, count(*) FROM vitals GROUP BY 1;
REFRESH MATERIALIZED VIEW daily_counts;            -- 새벽 cron 으로 갱신
```

일반 뷰는 데이터를 갖지 않고 조회할 때마다 안의 SELECT 를 다시 돈다. 쓰임새는 셋이다: 긴 JOIN 에 이름 붙여 재사용, 민감한 열(실명·주민번호)을 숨기고 뷰에만 권한 주기, 표 구조를 바꿔도 뷰 이름은 그대로 두어 앱 코드를 보호하기. 뷰를 겹겹이 쌓으면 쿼리 플랜이 읽기 어려워지니 두세 겹을 넘기지 않는다.

## 헷갈리기 쉬운 것

- **뷰 vs 머티리얼라이즈드 뷰**: 뷰는 매번 계산해 항상 최신이지만 느릴 수 있고, 머티리얼라이즈드 뷰는 결과를 디스크에 저장해 빠르지만 `REFRESH` 전까지는 옛 데이터다.
- **테이블**과 달리 뷰는 데이터를 안 가진다. 원본이 바뀌면 뷰도 바로 바뀌고, 뷰를 지워도 데이터는 안 사라진다.
- **RLS** 는 "사용자별로 행을 걸러 주기", 뷰는 "열·조건을 골라 보여 주기". 민감 열을 숨기는 건 뷰, 환자별 접근 제한은 RLS 로 하고 둘을 같이 쓰기도 한다.
