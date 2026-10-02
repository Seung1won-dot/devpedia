---
id: hl7-cda
term: HL7 CDA
aliases:
  - Clinical Document Architecture
  - 임상문서 아키텍처
  - CDA R2
  - C-CDA
  - 진료정보교류 문서
category: medical
tags:
  - 표준
  - 의료데이터
level: 2
kind: protocol
related:
  - hl7-v2
  - fhir
  - emr-ehr
  - clinical-code-systems
  - telemedicine
see_also:
  - https://www.hl7.org/implement/standards/product_brief.cfm?product_id=7
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

진료의뢰서·퇴원요약 같은 **임상 문서를 XML 로 주고받기 위한** HL7 표준.

## 비유

**직인이 찍힌 공문서 봉투**. 겉봉에는 누가·누구에게·언제 보냈는지가 정해진 칸에 적혀 있고, 안에는 사람이 읽는 본문과 기계가 읽는 부록이 함께 들어 있다.

## 예시

```xml
<ClinicalDocument xmlns="urn:hl7-org:v3">
  <code code="34133-9" codeSystem="2.16.840.1.113883.6.1" displayName="Summarization of episode note"/>
  <recordTarget><patientRole><id root="1.2.410.999999.1" extension="P2026-0421"/></patientRole></recordTarget>
  <author><time value="20261002"/><assignedAuthor><id extension="DR0012"/></assignedAuthor></author>
  <component><structuredBody><component><section>
    <code code="11450-4" codeSystem="2.16.840.1.113883.6.1" displayName="Problem list"/>
    <text>고혈압(I10), 2형 당뇨(E11)</text>          <!-- 사람이 읽는 부분 -->
    <entry><!-- 기계가 읽는 코드화된 진단 (OID 는 예시) --></entry>
  </section></component></structuredBody></component>
</ClinicalDocument>
```

헤더(환자·작성자·작성일·문서 종류)는 구조가 고정되어 있고, 본문은 사람이 읽을 `text` 와 기계가 읽을 코드화된 `entry` 를 같이 담는다. 그래서 받는 쪽 시스템이 코드를 다 이해하지 못해도 최소한 사람은 읽을 수 있다 — 이게 CDA 의 설계 원칙이다. 국내 진료정보교류 사업(병원 간 진료의뢰서·회송서·진료기록요약 전송)이 CDA 기반 서식을 쓴다 [확인 필요]. 미국은 C-CDA 라는 템플릿 묶음이 EHR 인증 요건에 들어가 있다 [확인 필요].

## 헷갈리기 쉬운 것

- **HL7 v2** 는 "검사 지시가 생겼다" 같은 **사건 알림 메시지**, CDA 는 서명되어 보관되는 **문서 한 통**. v2 는 짧고 실시간, CDA 는 한 시점의 완결된 기록.
- **FHIR** 로도 문서를 만들 수 있다(Composition 리소스 + Bundle). 새 시스템은 FHIR 로 가는 추세지만, 이미 깔린 교류망과 법적 문서 보관은 CDA 가 많다.
- **CCD/C-CDA** 는 CDA 를 특정 용도(진료요약 등)에 맞게 좁힌 템플릿. CDA 가 문법이면 C-CDA 는 서식집.
