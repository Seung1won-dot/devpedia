---
id: sqld
term: SQLD
aliases:
  - SQL Developer
  - SQL 개발자
  - 에스큐엘디
  - SQLD 자격증
category: career
tags:
  - 자격증
  - SQL
level: 1
kind: regulation
related:
  - sql
  - normalization
  - join
  - subquery
  - group-by-aggregate
  - engineer-information-processing
  - erd
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

데이터 모델링과 **SQL 작성 능력**을 검증하는 국가공인 민간 자격증.

## 비유

외국어 회화 시험. 문법책(모델링 이론)을 아는지와 실제로 문장(SQL)을 만들어 낼 수 있는지를 함께 본다.

## 예시

| 과목 | 내용 | 비고 |
| --- | --- | --- |
| 1과목 데이터 모델링의 이해 | 엔터티·속성·관계, 정규화, 식별자, 데이터 모델과 SQL 의 관계 | 배점 작음 |
| 2과목 SQL 기본 및 활용 | SELECT·함수·GROUP BY·조인·서브쿼리·집합 연산, 윈도우 함수, 계층 쿼리, DDL/DML/TCL | 배점 대부분 |
| 형식 | 객관식 50문항, 100점 만점 60점 합격, 과목별 40% 미만 과락 | [확인 필요] |
| 일정 | 연 4회, 주관 한국데이터산업진흥원, 응시 자격 제한 없음 | [확인 필요] |

단골 함정 하나만 보면 시험의 결이 보인다.

```sql
-- score 가 (90, NULL, 70) 인 세 행일 때
SELECT COUNT(*), COUNT(score), AVG(score) FROM exam;
-- 결과: 3, 2, 80   ← AVG 는 NULL 을 빼고 나눈다 (160/2)
```

이런 문제가 정규화 단계 고르기, 조인 종류별 결과 행 수, 서브쿼리 위치(SELECT/FROM/WHERE 절), RANK 와 DENSE_RANK 차이, ROLLUP/CUBE 결과 맞히기로 이어진다. 연구실 Supabase(Postgres)에 실제 테이블을 만들고 **출제 유형을 직접 쳐서 결과를 확인**하면 2과목의 절반은 공부가 끝난다. 계층 쿼리(CONNECT BY)와 일부 함수는 Oracle 기준이라 Postgres 와 다르니 그 부분만 교재로 [확인 필요].

DB·데이터 직무(백엔드, 데이터 엔지니어, DBA, 분석) 이력서에 한 줄 보탬이 되고, 준비 기간은 2~4주면 충분한 편이다. 면접에서는 "GROUP BY 와 윈도우 함수의 차이는?", "정규화를 하면 왜 조인이 늘어나나?" 처럼 SQLD 범위가 그대로 나온다.

## 헷갈리기 쉬운 것

- **SQLP**(SQL 전문가)는 상위 자격. 서술형 실기에 옵티마이저·튜닝까지 들어간다. SQLD 먼저.
- **ADsP**(데이터 분석 준전문가)는 같은 기관의 다른 자격. 통계·분석 방법론이 중심이라 SQL 은 조금만 나온다.
- **정처기 DB 과목**과 겹치지만 SQLD 는 SQL 문법과 결과 예측의 깊이가 훨씬 깊다. 둘 다 따면 겹치는 부분은 한 번만 공부하는 셈.
