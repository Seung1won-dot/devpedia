---
id: fhir
term: FHIR
aliases: [Fast Healthcare Interoperability Resources, 파이어, HL7 FHIR]
category: medical
tags: [표준, 의료데이터, 표준화]
level: 2
kind: protocol
related:
  - hl7-v2
  - emr-ehr
  - rest
  - json
  - dicom
  - hl7-cda
see_also:
  - https://www.hl7.org/fhir/
status: published
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

병원 시스템끼리 환자·진료 데이터를 **REST API + JSON** 으로 주고받기 위한 국제 표준.

## 비유

병원마다 다른 언어로 쓰던 진료기록을 위한 **공용 서식과 우편 규격**. 서식(Patient, Observation 같은 리소스)이 정해져 있어서 A 병원 데이터를 B 병원 앱이 바로 읽는다.

## 예시

```http
GET https://hospital.example.org/fhir/Patient/12345
```

```json
{ "resourceType": "Patient", "name": [{ "family": "김", "given": ["승원"] }] }
```

웹 개발자가 아는 REST 방식 그대로라서, 의료 데이터 다루는 앱을 만들 때 진입 장벽이 낮다.

## 헷갈리기 쉬운 것

- **HL7 v2** 는 같은 단체(HL7)의 옛 표준. 파이프(|)로 구분된 텍스트 메시지라 읽기 어렵다. FHIR 가 그 현대판.
- **DICOM** 은 영상(CT/MRI) 전용 표준. FHIR 는 진료 정보 전반.
