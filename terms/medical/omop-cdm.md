---
id: omop-cdm
term: 데이터 표준화(CDM/OMOP)
aliases:
  - OMOP Common Data Model
  - 공통 데이터 모델
  - 오몹
  - OHDSI CDM
category: medical
tags:
  - 표준화
  - 의료데이터
level: 3
kind: protocol
related:
  - clinical-code-systems
  - emr-ehr
  - normalization
  - sql
  - de-identification
  - data-validation
  - correlation-causation
see_also:
  - https://ohdsi.github.io/CommonDataModel/
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

병원마다 다른 진료 DB 를 **같은 테이블 구조·같은 코드**로 바꿔 놓은 연구용 표준 스키마.

## 비유

나라마다 다른 **전기 콘센트를 하나의 규격 어댑터로 통일하는 것**. 어댑터(CDM)에 맞춰 놓으면 같은 분석 코드(플러그)를 어느 병원 데이터에나 꽂을 수 있다.

## 예시

```sql
-- 고혈압 진단 후 1년 안에 크레아티닌 검사를 받은 환자 수 (concept_id 는 예시)
SELECT COUNT(DISTINCT c.person_id)
FROM   condition_occurrence c
JOIN   measurement m ON m.person_id = c.person_id
WHERE  c.condition_concept_id   = 320128    -- Essential hypertension
  AND  m.measurement_concept_id = 3016723   -- Creatinine [Mass/volume] in Serum
  AND  m.measurement_date BETWEEN c.condition_start_date
                              AND c.condition_start_date + 365;
```

병원 A 의 `진단테이블.진단코드(KCD)` 와 병원 B 의 `DX.ICD10` 이 둘 다 `condition_occurrence.condition_concept_id` 로 들어가므로, 위 쿼리가 두 병원에서 그대로 돈다. 변환(ETL) 작업이 전체 일의 대부분이고 로컬 코드 → 표준 concept 매핑이 그 핵심이다. 한국은 여러 대학병원이 CDM 을 구축해 놓아, 다기관 연구 때 쿼리만 보내고 집계 결과만 받는 분산 연구가 가능하다(환자 단위 데이터는 병원 밖으로 안 나감).

## 헷갈리기 쉬운 것

- **FHIR** 는 시스템 간 실시간 교환용(API), **OMOP CDM** 은 분석용 저장 구조(DB 스키마). FHIR 로 받아서 CDM 으로 쌓는 조합이 가능하다.
- **DB 정규화** 와 다르다. 정규화는 한 DB 안의 중복 제거, CDM 은 여러 기관의 DB 를 같은 모양으로 맞추는 것.
