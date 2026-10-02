---
id: mrn
term: 환자 식별자(MRN)
aliases:
  - Medical Record Number
  - 환자번호
  - 등록번호
  - 병록번호
  - Patient ID
category: medical
tags:
  - 병원시스템
  - 의료데이터
  - 연구실
level: 1
kind: concept
related:
  - de-identification
  - emr-ehr
  - his
  - primary-foreign-key
  - uuid-vs-serial
  - omop-cdm
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

병원이 환자 한 명에게 붙이는 **고유 번호**로, 그 환자의 모든 기록이 이 번호로 묶인다.

## 비유

학교의 **학번**. 이름이 같은 학생이 둘 있어도 학번은 다르고, 성적표·도서관 대출·학생증이 전부 학번 하나로 연결된다.

## 예시

```sql
-- 연구용 추출본에서 진단 테이블과 검사 테이블을 합칠 때 MRN 이 조인 키
SELECT d.mrn, d.diag_code, l.test_name, l.result_value
FROM   diagnosis  d
JOIN   lab_result l ON l.mrn = d.mrn
WHERE  d.diag_code LIKE 'I10%';   -- 고혈압
```

EMR·OCS·LIS·PACS 가 저마다 테이블을 갖지만 전부 MRN 컬럼이 있어서, 연구 데이터셋을 만들 때 MRN 이 모든 조인의 기준이 된다. 그런데 MRN 자체가 개인 식별자라 병원 밖으로 못 나간다 — 가명화 단계에서 솔트 붙인 해시나 연구용 일련번호로 바꾸고, 원래 번호와의 대조표는 병원 안에 둔다. 한 사람이 번호를 두 개 받은 "중복 등록" 이 가끔 있어, 데이터 정제 때 병합 이력을 확인해야 한다.

## 헷갈리기 쉬운 것

- **주민등록번호** 는 나라가 주는 번호라 병원이 달라도 같지만, **MRN** 은 병원마다 다르다. 다기관 연구에서 같은 환자를 MRN 으로 맞출 수 없는 이유다.
- **연구 ID(가명 키)** 는 MRN 을 가명화해 만든 번호. 연구실에 온 CSV 의 "환자번호" 컬럼은 대개 이 가명 키지 진짜 MRN 이 아니다.
- **접수번호·입원번호(encounter ID)** 는 방문 한 번마다 새로 생긴다. MRN 하나에 접수번호 여러 개가 달리는 1:N 관계다.
