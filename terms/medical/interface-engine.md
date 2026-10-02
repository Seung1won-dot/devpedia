---
id: interface-engine
term: 인터페이스 엔진(Mirth)
aliases:
  - Interface Engine
  - 인터페이스 엔진
  - Mirth Connect
  - 머스 커넥트
  - 통합 엔진
category: medical
tags:
  - 병원시스템
  - 표준
level: 2
kind: tool
related:
  - hl7-v2
  - fhir
  - his
  - lis
  - message-queue
  - middleware
see_also:
  - https://github.com/nextgenhealthcare/connect
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

병원 시스템 사이에서 **HL7 메시지를 받아 변환하고 전달**해 주는 중계 소프트웨어.

## 비유

여러 나라 손님이 오는 호텔의 **통역 데스크**. 손님(시스템)마다 말이 조금씩 달라도 데스크가 받아서 상대가 알아듣는 말로 바꿔 전해 주니, 손님끼리 서로 말을 배울 필요가 없다.

## 예시

```javascript
// Mirth Connect 채널 — Source: MLLP 리스너(포트 6661) / Destination: Database Writer
// Transformer(JavaScript): PID 세그먼트에서 환자번호·이름을 꺼내 변수에 담기
var mrn  = msg['PID']['PID.3']['PID.3.1'].toString();
var name = msg['PID']['PID.5']['PID.5.1'].toString();
channelMap.put('mrn', mrn);
channelMap.put('name', name);
```

OCS 가 보낸 ORM(처방) 메시지를 받아 LIS 가 기대하는 필드 순서로 고치고, 동시에 연구용 DB 에도 한 줄 넣는 식의 "채널" 을 GUI 로 만든다. 병원마다 HL7 v2 필드 쓰는 법이 달라서 이 변환 로직이 연동 작업의 대부분이고, 재전송·에러 큐·메시지 보관도 엔진이 맡는다. Mirth Connect 는 오랫동안 무료 오픈소스였지만 2025년부터 라이선스가 바뀌어 커뮤니티 포크(Open Integration Engine)가 생겼다 [확인 필요]. 상용으로는 Rhapsody, InterSystems 계열이 있다.

## 헷갈리기 쉬운 것

- **메시지 큐**(RabbitMQ/Kafka)는 메시지를 "쌓아 두고 전달" 만 하고 내용을 모른다. 인터페이스 엔진은 HL7 을 파싱해 내용을 고치고 조건에 따라 보낼 곳을 정한다.
- **FHIR 서버**는 데이터를 REST 로 제공하는 쪽, 인터페이스 엔진은 그 사이를 잇는 변환기. v2 메시지를 FHIR 리소스로 바꿔 FHIR 서버에 넣는 데 엔진을 쓴다.
- **미들웨어**는 일반 소프트웨어 용어, 인터페이스 엔진은 의료 연동(HL7/DICOM)에 특화된 미들웨어다.
