---
id: irb
term: IRB
aliases:
  - Institutional Review Board
  - 기관생명윤리위원회
  - 연구윤리심의위원회
  - 아이알비
category: medical
tags:
  - 규제
  - 의료데이터
  - 연구실
level: 1
kind: regulation
related:
  - medical-data-law
  - de-identification
  - cdss
  - medical-image-segmentation
  - omop-cdm
  - correlation-causation
  - hypothesis-test
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

사람(환자) 데이터를 쓰는 연구가 **윤리적으로 괜찮은지 미리 심사**하는 기관 내 위원회.

## 비유

건물 짓기 전에 받는 **건축 허가**. 설계도(연구계획서)를 내고 "이 정도면 안전하다" 승인을 받아야 착공(데이터 수집)할 수 있다.

## 예시

```text
연구계획서 제출 → IRB 심의(정규 / 신속 / 면제 판단) → 승인번호 발급
   → 승인 범위 안에서만 데이터 수집·분석 → 연차 보고 / 계획 변경 시 재심의
```

의료 AI 연구실의 전형: "CT 세그멘테이션 모델 개발" 연구계획서에 데이터 출처(병원 PACS), 대상 기간, 가명화 방법, 보관 장소(폐쇄망 서버), 보관 기간을 적어 IRB 승인을 받은 뒤에야 데이터를 받을 수 있다. 이미 있는 기록만 쓰는 후향적 연구는 동의 면제·신속 심의가 되는 경우가 많다 [확인 필요]. 논문 투고 때 승인번호를 요구하니, 승인 전에 데이터부터 받으면 나중에 논문을 못 낸다.

## 헷갈리기 쉬운 것

- **개인정보보호법 준수** 와 IRB 승인은 별개. IRB 는 연구 윤리 심의, 법은 데이터 처리 근거. IRB 를 받았어도 가명처리·반출 절차는 따로 지켜야 한다.
- **DRB(데이터심의위원회)** 는 병원이 데이터 반출·연구 활용을 따로 심사하는 위원회로, IRB 뒤에 추가로 거치는 병원이 많다 [확인 필요].
