---
id: clinical-code-systems
term: 코드 체계(ICD/SNOMED/LOINC)
aliases:
  - Clinical Terminology
  - 임상 용어 체계
  - 의료 코드 체계
  - ICD-10/KCD
category: medical
tags:
  - 표준
  - 의료데이터
  - 표준화
level: 2
related:
  - omop-cdm
  - fhir
  - lis
  - emr-ehr
  - primary-foreign-key
see_also:
  - https://icd.who.int/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

진단·검사·증상 같은 의료 개념마다 **전 세계 공통 번호를 붙인 표준 사전**.

## 비유

책마다 붙는 **ISBN 번호** 같은 것. "해리포터 1권" 이라고 말로 하면 판본이 헷갈리지만, 번호를 대면 전 세계 서점이 같은 책을 찾는다.

## 예시

```text
체계          쓰임                 예
ICD-10 / KCD  진단명(청구·통계)     I10 = 본태성 고혈압, C34 = 기관지 및 폐의 악성 신생물
SNOMED CT     임상 개념 전반        38341003 = 고혈압(Hypertensive disorder)
LOINC         검사·측정 항목        2160-0 = 혈청 크레아티닌, 718-7 = 혈색소
ATC / EDI     약품                 한국 청구는 EDI 코드 [확인 필요]
```

한국 병원 EMR 의 진단 테이블은 KCD(한국표준질병사인분류, ICD-10 기반) 코드로 저장되고, 검사 코드는 병원 자체 코드인 경우가 많다. 그래서 여러 병원 데이터를 합쳐 연구할 때는 로컬 코드 → LOINC/SNOMED 매핑표부터 만들어야 하고, OMOP CDM 은 이 매핑을 아예 구조로 강제한다. 개발자 관점에서는 "코드 테이블의 외래키가 되는 표준 마스터" 라고 보면 된다.

## 헷갈리기 쉬운 것

- **ICD** 는 진단명 분류(청구·통계용, 거칠다), **SNOMED CT** 는 증상·시술·소견까지 포함한 훨씬 세밀한 임상 용어 체계. SNOMED 개념 여러 개가 ICD 코드 하나로 뭉뚱그려지는 일이 흔하다.
- **LOINC** 는 "무엇을 측정했나"(검사 항목) 코드이지 결과값이 아니다. 결과값 1.1 mg/dL 은 LOINC 2160-0 항목의 값.
