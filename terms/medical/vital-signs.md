---
id: vital-signs
term: 바이탈/생체신호
aliases:
  - Vital Signs
  - 활력징후
  - 바이탈 사인
  - V/S
  - 생체신호
category: medical
tags:
  - 생체신호
  - 의료데이터
  - 병원시스템
level: 1
kind: concept
related:
  - ecg
  - wearable
  - time-series-db
  - emr-ehr
  - hl7-v2
  - outlier
  - i2c-spi
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

체온·맥박·호흡·혈압처럼 **몸 상태를 숫자로 보여 주는 기본 측정값**.

## 비유

자동차 **계기판**. 속도계·연료계·엔진 온도 몇 개만 봐도 지금 차가 괜찮은지 바로 알 수 있고, 바늘이 빨간 구역에 들어가면 경고가 뜬다.

## 예시

```python
import pandas as pd
vs = pd.read_csv("vitals.csv", parse_dates=["measured_at"])
# 컬럼: research_id, measured_at, sbp, dbp, hr, rr, temp, spo2
vs = vs[vs["sbp"].between(50, 250) & vs["hr"].between(20, 250)]   # 입력 오류(혈압 1200) 제거
daily = (vs.set_index("measured_at").groupby("research_id")
           .resample("1D").mean(numeric_only=True))               # 환자별 일 평균
```

병동에서는 간호사가 하루 몇 번 재서 EMR 에 입력하고(간격이 들쭉날쭉한 시계열), 중환자실에서는 모니터가 초 단위로 자동 기록한다(촘촘한 시계열). 연구에서 바이탈은 "환자 상태 악화 예측" 류 모델의 핵심 입력이지만 결측·단위 혼용(체온 °F)·오타가 많아 범위 필터와 결측 처리가 먼저다. 통상 항목은 수축기/이완기 혈압(SBP/DBP), 맥박(HR), 호흡수(RR), 체온(BT), 산소포화도(SpO2)이고, 통증 점수를 포함하는 병원도 있다.

## 헷갈리기 쉬운 것

- **생체신호(biosignal)** 는 심전도·뇌파처럼 **파형** 자체를 가리킬 때가 많고, **바이탈** 은 그 파형에서 뽑은 **요약 숫자**(맥박 72)다. 둘 다 "생체신호" 로 부르기도 해서 데이터를 받을 때 파형인지 숫자인지 확인한다.
- **검사 결과(lab)** 는 피·소변을 채취해 검사실(LIS)에서 나오는 값. 바이탈은 침상에서 바로 재는 값이고 훨씬 자주 측정된다.
