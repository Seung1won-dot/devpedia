---
id: wearable
term: 웨어러블 데이터
aliases:
  - Wearable Data
  - 웨어러블 기기 데이터
  - 스마트워치 데이터
  - PPG
  - 라이프로그
category: medical
tags:
  - 생체신호
  - 의료데이터
  - 모바일
level: 2
kind: concept
related:
  - vital-signs
  - ecg
  - time-series-db
  - telemedicine
  - dtx
  - missing-data
  - samd
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

스마트워치·패치처럼 **몸에 붙이고 다니는 기기가 일상에서 계속 기록**하는 생체 데이터.

## 비유

병원에서 한 번 재는 혈압이 **증명사진**이라면, 웨어러블은 하루 종일 돌아가는 **블랙박스**다. 화질은 낮지만 끊김 없이 찍히고, 안 차고 있던 시간은 통째로 비어 있다.

## 예시

```python
import pandas as pd
hr = pd.read_csv("watch_heart_rate.csv", parse_dates=["timestamp"])  # timestamp,bpm — 기기 앱에서 내보낸 파일
hr = hr.set_index("timestamp").sort_index()
hourly = hr["bpm"].resample("1h").agg(["mean", "count"])            # count 가 0 이면 안 차고 있던 시간
print(hourly[hourly["count"] == 0].index[:5])                       # 결측 구간 확인
```

시계는 PPG(빛 반사) 센서로 심박수·SpO2 를, 가속도계로 걸음·수면을 추정하고, 일부 기기는 손가락을 대면 1채널 심전도도 찍는다. 연구에서 부딪히는 문제는 세 가지다: 기기·앱마다 내보내기 포맷과 샘플링 주기가 다르고, 벗어 둔 시간이 결측으로 남으며, 같은 "심박수" 라도 제조사 알고리즘이 달라 기기 간 비교가 어렵다. 병원 바이탈과 합치려면 환자 식별 매핑(기기 ID ↔ 연구 번호)과 시간대 정리가 먼저다. 소비자용 시계라도 심전도 기능처럼 의료기기 허가를 받은 기능이 따로 있고, 국내 식약처 허가 여부는 기기·기능별로 다르다 [확인 필요].

## 헷갈리기 쉬운 것

- **바이탈(활력징후)** 은 병원에서 정해진 시점에 정확한 장비로 잰 값, 웨어러블은 일상에서 추정한 값. 정확도는 낮지만 추세와 빈도에서 이긴다.
- **PPG** 는 피부에 빛을 쏴 혈류 변화를 보는 방식(심박수 추정), **ECG** 는 심장의 전기 신호 자체. 시계의 "심박수" 는 대개 PPG 다.
- **웰니스 기기**와 **의료기기**는 같은 하드웨어여도 규제가 다르다. 걸음 수는 웰니스, 심방세동 알림은 의료기기(SaMD) 영역으로 넘어간다.
