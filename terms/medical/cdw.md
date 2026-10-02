---
id: cdw
term: 임상 데이터 웨어하우스(CDW)
aliases:
  - Clinical Data Warehouse
  - CDW
  - 임상데이터웨어하우스
  - 연구용 데이터 저장소
category: medical
tags:
  - 의료데이터
  - 데이터엔지니어링
  - 병원시스템
level: 2
kind: concept
related:
  - data-warehouse
  - emr-ehr
  - omop-cdm
  - etl-pipeline
  - de-identification
  - drb
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

진료용 EMR 에서 **연구·통계용으로 데이터를 따로 모아 정리해 둔** 병원 안 저장소.

## 비유

매장 계산대(POS)와 별도로 본사가 만든 **판매 분석용 창고**. 계산대는 손님 받느라 바쁘니 매일 밤 영수증 사본만 창고로 옮겨 두고, 분석은 창고에서 한다.

## 예시

```sql
-- CDW 에서 연구 코호트 뽑기: 2020~2024 고혈압 진단 + 진단 당일 수축기 혈압
SELECT p.research_id, d.diag_date, v.sbp
FROM   cdw.diagnosis d
JOIN   cdw.patient   p ON p.patient_key = d.patient_key
JOIN   cdw.vitals    v ON v.patient_key = d.patient_key
                      AND v.measured_at::date = d.diag_date
WHERE  d.diag_code LIKE 'I10%'
  AND  d.diag_date BETWEEN '2020-01-01' AND '2024-12-31';
```

운영 EMR DB 에 연구 쿼리를 직접 날리면 진료가 느려지고, 테이블 구조도 연구에 안 맞는다(수백 개 테이블, 코드 값투성이). 그래서 병원은 밤마다 ETL 로 EMR·OCS·LIS·PACS 메타데이터를 CDW 로 복제하고, 연구자에게는 CDW 만 연다. 환자 식별자는 CDW 안에서 이미 가명 키로 바뀌어 있는 경우가 많고, 연구자가 IRB·DRB 승인 범위의 조건으로 추출을 신청하면 담당 부서가 CSV 를 뽑아 준다. 연구실에 오는 "EMR 추출 CSV" 의 출처가 대개 여기다. OMOP CDM 은 이 CDW 를 표준 스키마로 한 번 더 변환한 것이라고 보면 된다.

## 헷갈리기 쉬운 것

- **EMR(운영 DB)** 은 지금 진료를 위한 시스템이라 최신·정규화·트랜잭션 중심, **CDW** 는 분석용이라 과거 전체·조인하기 편한 넓은 테이블·읽기 중심. 같은 데이터가 양쪽에 있어도 모양이 다르다.
- **OMOP CDM** 은 여러 병원이 공유하는 **표준 스키마**, CDW 는 병원마다 자기 식으로 만든 저장소. CDW → CDM 변환 ETL 이 따로 있다.
- **데이터 웨어하우스(일반)** 와 원리는 같다. "임상" 이 붙으면 가명화·접근 통제·추출 승인 절차가 함께 따라온다는 점이 다르다.
