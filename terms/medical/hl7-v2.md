---
id: hl7-v2
term: HL7 v2
aliases:
  - Health Level Seven Version 2
  - HL7 메시지
  - 에이치엘세븐
category: medical
tags:
  - 표준
  - 병원시스템
level: 2
related:
  - fhir
  - his
  - ocs
  - lis
  - message-queue
see_also:
  - https://www.hl7.org/implement/standards/product_brief.cfm?product_id=185
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

병원 시스템끼리 환자·처방·검사 정보를 **파이프(|) 구분 텍스트**로 주고받는 표준.

## 비유

병원 부서끼리 주고받는 **정해진 칸에 맞춰 쓴 전보**. 칸 순서만 서로 알면 되지만, 전보라서 사람 눈으로는 읽기 어렵다.

## 예시

```text
MSH|^~\&|OCS|SCH_HOSP|LIS|SCH_LAB|202609251030||ORM^O01|MSG0001|P|2.5
PID|1||P2026-0421^^^SCH^MR||홍^길동||19800101|M
OBR|1|ORD778||CBC^혈액검사|||202609251025
```

OCS 에서 LIS 로 "이 환자 혈액검사 지시" 를 보내는 ORM 메시지. 세그먼트(MSH, PID, OBR)가 줄 단위, 필드가 `|` 단위, 하위 필드가 `^` 단위다. 국내 병원 내부 연동(OCS↔LIS, EMR↔PACS)은 아직 대부분 v2 이고, 병원마다 필드 쓰는 법이 조금씩 달라서 중간에 인터페이스 엔진(Mirth 등)을 두고 변환하는 게 실무의 큰 부분이다.

## 헷갈리기 쉬운 것

- **FHIR** 는 같은 HL7 단체의 현대 표준(REST + JSON). v2 를 대체하려고 나왔지만 병원 내부 연동은 여전히 v2 가 많다.
- **HL7 v3 / CDA** 는 v2 와 FHIR 사이에 나온 XML 기반 표준. 진료의뢰서·진료기록 요약 같은 "문서" 교환에 쓰이고, 실시간 메시지 연동은 v2 가 주류.
