---
id: emr-ehr
term: EMR/EHR
aliases:
  - Electronic Medical Record
  - Electronic Health Record
  - 전자의무기록
  - 전자 차트
category: medical
tags:
  - 병원시스템
  - 의료데이터
level: 1
related:
  - his
  - ocs
  - fhir
  - medical-data-law
  - rdbms
  - telemedicine
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

종이 차트를 대신해 환자 진료 기록을 **전산으로 저장·조회**하는 시스템.

## 비유

병원의 **종이 차트 캐비닛을 통째로 컴퓨터에 옮긴 것**. 의사가 서랍을 뒤지는 대신 환자 번호를 치면 지난 진료 내용이 바로 뜬다.

## 예시

```sql
-- EMR 뒤에는 결국 관계형 DB 가 있다. 한 환자의 외래 기록 조회
SELECT visit_date, diagnosis_code, note
FROM   encounter
WHERE  patient_id = 'P2026-0421'
ORDER  BY visit_date DESC;
```

연구실에서는 EMR 에서 뽑은 진료 기록 테이블을 IRB 승인 후 가명화해서 받는다. 의사가 자유롭게 쓴 텍스트(`note`)와 코드로 정리된 항목(`diagnosis_code`)이 섞여 있어서, 실제로는 전처리가 일의 절반이다. 국내 대학병원은 EMR 을 자체 개발한 곳이 많아 스키마가 병원마다 다르다.

## 헷갈리기 쉬운 것

- **EMR** 은 한 병원 안의 진료 기록, **EHR** 은 여러 기관의 기록을 환자 중심으로 합친 개념. 한국 병원 현장에서는 둘 다 그냥 "EMR" 이라 부르는 경우가 대부분이다.
- **HIS** 는 EMR 을 포함한 병원 전체 시스템(원무·수납·약국까지). EMR 은 그중 진료 기록 부분만 가리킨다.
