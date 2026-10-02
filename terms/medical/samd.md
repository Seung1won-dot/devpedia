---
id: samd
term: 의료기기 소프트웨어(SaMD)
aliases:
  - Software as a Medical Device
  - 의료기기 소프트웨어
  - 디지털 의료기기
  - 소프트웨어 의료기기
category: medical
tags:
  - 규제
  - 의료AI
level: 3
kind: regulation
related:
  - cdss
  - medical-data-law
  - testing-levels
  - semver
  - ci-cd
  - mfds-approval
  - clinical-trial
see_also:
  - https://www.mfds.go.kr/
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

하드웨어 없이 **소프트웨어 자체가 진단·치료 목적의 의료기기**로 인허가를 받는 것.

## 비유

앱이 **약처럼 허가를 받는 것**. 다이어트 앱은 그냥 앱이지만, "이 앱이 폐암을 찾아줍니다" 라고 하는 순간 약이나 청진기처럼 효과·안전성을 증명하고 허가를 받아야 한다.

## 예시

```text
연구실 모델 (PyTorch .pt)         →   제품 (SaMD)
 - 성능: 검증셋 Dice 0.91              - 임상시험/성능평가로 민감도·특이도 입증
 - 코드: git main 브랜치                 - 버전 고정, 변경 관리 문서, 위험 관리(ISO 14971)
 - 테스트: 검증셋 1회 돌려봄            - 소프트웨어 수명주기 문서(IEC 62304) + 검증·유효성 확인
 - 배포: 서버에 pip install            - 식약처 허가/인증 → 등급(1~4)별 절차 [확인 필요]
```

한국에서는 식약처가 관리하고, 국내 AI 판독 소프트웨어(폐 결절·뇌출혈 검출 등)가 이 절차를 거쳐 허가받았다. 모델 가중치를 바꾸면 "변경 허가" 대상이 될 수 있어서, 연구처럼 자주 재학습해서 배포하는 게 쉽지 않다 [확인 필요]. 그래서 제품 팀은 시맨틱 버저닝, 재현 가능한 CI 파이프라인, 테스트 문서를 연구실보다 훨씬 엄격하게 관리한다.

## 헷갈리기 쉬운 것

- **CDSS/의료 AI** 는 기능 이름, **SaMD** 는 규제 분류. 같은 소프트웨어가 "참고용" 이면 SaMD 가 아닐 수 있고, "진단 보조" 라고 표방하면 SaMD 가 된다.
- **SiMD(Software in a Medical Device)** 는 MRI 장비 안에 들어간 펌웨어처럼 하드웨어의 일부인 소프트웨어. SaMD 는 범용 PC·서버·스마트폰에서 도는 소프트웨어 그 자체.
