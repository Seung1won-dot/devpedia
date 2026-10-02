---
id: mimic
term: 공개 의료 데이터셋(MIMIC)
aliases:
  - Medical Information Mart for Intensive Care
  - MIMIC-IV
  - 미믹
  - PhysioNet
  - 공개 임상 데이터셋
category: medical
tags:
  - 임상연구
  - 의료데이터
  - 연구
level: 2
kind: concept
related:
  - de-identification
  - irb
  - omop-cdm
  - sql
  - time-series-db
  - ecg
  - cdw
see_also:
  - https://physionet.org/content/mimiciv/
  - https://mimic.mit.edu/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

미국 한 병원의 중환자실·응급실 기록을 **가명화해 연구용으로 공개**한 대표 임상 데이터셋.

## 비유

도서관의 **열람 자격증이 필요한 희귀본 서가**. 누구나 올 수는 있지만, 윤리 교육을 듣고 서약서에 서명해야 책을 꺼내 볼 수 있다.

## 예시

```sql
-- MIMIC-IV 를 PostgreSQL 에 적재했을 때: 중환자실 병동별 입실 건수와 평균 재원 일수
SELECT first_careunit, COUNT(*) AS stays, ROUND(AVG(los)::numeric, 1) AS avg_los_days
FROM   mimiciv_icu.icustays
GROUP  BY first_careunit
ORDER  BY stays DESC;
```

접근 절차: PhysioNet 계정 → **CITI 교육**(Data or Specimens Only Research 과정) 수료증 업로드 → 신원·소속 확인(credentialing) → 데이터 사용 계약(DUA) 서명 → 다운로드하거나 Google BigQuery 에서 바로 쿼리. 환자 이름·ID 는 지워져 있고 날짜는 환자마다 다른 폭으로 미래로 밀려 있어서(date shifting) 연도 분석이나 외부 데이터와의 결합은 안 된다. 중환자 예측 모델의 벤치마크로 널리 쓰이지만, 미국 한 기관 데이터라 국내 환자에 그대로 일반화되진 않는다. 국내 공개 데이터는 심평원·건보공단 표본 자료처럼 청구 기반이 많고 별도의 신청·심의 절차가 있다 [확인 필요].

## 헷갈리기 쉬운 것

- **PhysioNet** 은 데이터를 올려 두는 플랫폼(저장소), **MIMIC** 은 거기 올라간 데이터셋 중 하나. eICU 같은 다른 데이터셋도 PhysioNet 에 있다.
- **MIMIC-III** 와 **MIMIC-IV** 는 스키마가 다르다. 예전 논문 코드가 III 기준이면 테이블·컬럼 이름이 안 맞으니 버전부터 확인할 것.
- "공개" 라고 해도 **오픈 데이터**(누구나 다운로드)가 아니다. 자격 심사를 거친 사람만 받을 수 있고, 받은 뒤에도 재배포와 재식별 시도가 금지된다.
