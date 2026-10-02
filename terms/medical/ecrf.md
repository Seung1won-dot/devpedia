---
id: ecrf
term: eCRF
aliases:
  - Electronic Case Report Form
  - 전자 증례기록서
  - 전자 증례기록지
  - EDC
  - REDCap
category: medical
tags:
  - 임상연구
  - 의료데이터
level: 2
kind: concept
related:
  - clinical-trial
  - e-consent
  - irb
  - emr-ehr
  - data-validation
  - audit-log
see_also:
  - https://projectredcap.org/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

임상연구에서 피험자별로 **수집할 항목을 정해 놓은 전자 입력 양식**.

## 비유

**정답 칸이 정해진 설문지**. 자유롭게 쓰는 일기(진료기록)와 달리 질문·단위·허용 범위가 미리 정해져 있어 100명이 써도 표 하나로 바로 모인다.

## 예시

```text
[eCRF: Visit 1 — 기초 정보]     단위          입력 규칙             자동 검증
subject_id   피험자 번호        -             필수, 유일            정규식 ^S-\d{3}$
visit_date   방문일             YYYY-MM-DD    동의일 이후           visit_date >= consent_date
sbp          수축기 혈압        mmHg          정수                  70~250 벗어나면 쿼리 발생
hba1c        당화혈색소         %             소수 1자리            4.0~15.0
```

항목마다 타입·단위·범위를 정해 두면 입력 즉시 검증되고, 범위를 벗어난 값은 **쿼리**(연구 간호사에게 확인 요청)로 남는다. 국내 대학병원 임상시험센터는 REDCap 이나 상용 EDC 를 쓰는 곳이 많다 [확인 필요]. EMR 화면을 보고 값을 옮겨 적는 수작업이 아직 많아서, EMR → eCRF 자동 전송(FHIR 연동)이 연구 IT 의 숙제다. 누가 언제 어떤 값을 왜 고쳤는지 **감사 추적**이 남는 것이 엑셀과의 결정적 차이이고, 식약처 승인 임상시험(GCP)에서는 이 기록이 필수다 [확인 필요].

## 헷갈리기 쉬운 것

- **CRF** 는 종이 양식, **eCRF** 는 그 전자판. **EDC** 는 eCRF 를 담아 돌리는 시스템 전체(계정·권한·감사 추적·내보내기 포함).
- **EMR** 은 진료 기록(원자료, source), eCRF 는 거기서 연구에 필요한 것만 옮겨 적은 2차 기록. 둘이 일치하는지 대조하는 작업이 SDV(원자료 확인)다.
- **엑셀 시트**로도 모을 수 있지만 범위 검증·권한·수정 이력이 없어서, 임상시험 자료로는 인정받기 어렵다.
