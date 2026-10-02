---
id: cdss
term: 의료 AI/CDSS
aliases:
  - Clinical Decision Support System
  - 임상의사결정지원시스템
  - 의료 AI
  - 진료 보조 AI
category: medical
tags:
  - 의료AI
  - 병원시스템
level: 2
kind: concept
related:
  - samd
  - machine-learning
  - medical-image-segmentation
  - emr-ehr
  - hallucination
  - sensitivity-specificity
  - mfds-approval
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

진료 시점에 의사에게 **경고·추천·예측을 띄워 판단을 돕는** 소프트웨어.

## 비유

운전할 때 **내비게이션이 "전방 사고, 우회 추천" 하고 알려주는 것**. 운전대(최종 결정)는 여전히 사람이 잡고, 내비는 정보를 더 줄 뿐이다.

## 예시

```text
[EMR 처방 화면]   ⚠ 와파린 + 아스피린 병용: 출혈 위험 상승 — 계속하시겠습니까?   (규칙 기반 CDSS)
[판독 워크리스트]  흉부 X-ray #4821: 기흉 의심 확률 0.93 → 우선 판독 권고          (AI 기반 CDSS)
```

옛날 CDSS 는 if-then 규칙(약물 상호작용, 알레르기 경고)이었고, 요즘 "의료 AI" 는 딥러닝 모델이 영상·검사 수치에서 확률을 낸다. 연구실에서 만든 세그멘테이션·분류 모델이 실제 병원에서 쓰이려면 EMR/PACS 화면에 결과를 붙이는 연동(HL7 v2 / FHIR / DICOM), 그리고 진단 목적이면 의료기기 인허가(SaMD)가 따라온다. LLM 을 붙일 때는 할루시네이션을 의사가 걸러낼 수 있게 근거를 같이 보여주는 설계가 필수다.

## 헷갈리기 쉬운 것

- **SaMD(의료기기 소프트웨어)** 는 규제 관점의 이름. CDSS 중 진단·치료에 직접 영향을 주는 것은 의료기기로 인허가를 받아야 하고, 단순 참고 정보 제공은 제외되기도 한다 [확인 필요].
- **의료 AI 모델** 과 **CDSS** 는 다른 층. 모델은 확률을 내는 함수, CDSS 는 그것을 언제·어떻게 의사에게 보여줄지까지 포함한 시스템.
