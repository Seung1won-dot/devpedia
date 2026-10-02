---
id: lis
term: LIS
aliases:
  - Laboratory Information System
  - 진단검사정보시스템
  - 검사실 시스템
category: medical
tags:
  - 병원시스템
  - 의료데이터
level: 1
kind: concept
related:
  - ocs
  - his
  - hl7-v2
  - clinical-code-systems
  - emr-ehr
  - order
  - interface-engine
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

혈액·소변 같은 **검체 검사의 접수부터 결과 보고까지** 관리하는 검사실 시스템.

## 비유

세탁소의 **접수표·세탁기·완료 알림을 묶은 관리 장부**. 옷(검체)에 번호표를 붙여 받고, 어느 기계에 들어갔는지 추적하고, 끝나면 주인에게 알린다.

## 예시

```text
OCS 오더(CBC) → LIS 접수 → 바코드 라벨 출력 → 자동분석기 결과 수신 → 검증 → EMR 회신
```

```text
검사코드(LOINC)  항목명         결과   단위     참고치
2160-0          Creatinine    1.1    mg/dL    0.7-1.3
718-7           Hemoglobin    13.8   g/dL     13-17
```

자동분석기가 결과를 직렬/TCP 로 LIS 에 밀어 넣고, LIS 는 이걸 HL7 v2 ORU 메시지로 EMR 에 돌려준다. 연구실에서 받는 "검사 결과 테이블" 은 이 LIS 데이터인데, 병원마다 검사 코드가 자체 코드라서 LOINC 같은 표준 코드로 매핑하는 게 첫 단계다.

## 헷갈리기 쉬운 것

- **OCS** 는 "검사해라" 는 지시를 전달하는 쪽, **LIS** 는 지시를 받아 검사실 안에서 실제 처리하고 결과를 내는 쪽.
- **PACS** 는 영상 검사(CT·X-ray) 담당, LIS 는 검체 검사(혈액·소변·조직) 담당. 둘 다 "검사 결과 시스템" 이지만 데이터 종류가 다르다.
