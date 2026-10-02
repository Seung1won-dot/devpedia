---
id: ecg
term: 심전도(ECG) 데이터
aliases:
  - Electrocardiogram
  - ECG
  - EKG
  - 심전도
  - 12유도 심전도
category: medical
tags:
  - 생체신호
  - 의료데이터
  - 의료AI
level: 1
kind: concept
related:
  - time-series-db
  - vital-signs
  - wearable
  - cnn
  - labeling
  - mimic
see_also:
  - https://physionet.org/content/mitdb/1.0.0/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

심장이 뛸 때 생기는 **전기 신호를 시간순으로 기록한 파형** 데이터.

## 비유

지진계가 그리는 **지진 기록지**. 땅이 흔들릴 때마다 바늘이 위아래로 움직여 종이에 그려지는데, 그 모양을 보고 전문가가 어떤 종류의 흔들림인지 읽어낸다.

## 예시

```python
import wfdb   # pip install wfdb — PhysioNet 공개 파형 포맷 리더
rec = wfdb.rdrecord("100", pn_dir="mitdb")   # MIT-BIH 부정맥 DB 레코드 100 (온라인에서 받음)
sig, fs = rec.p_signal, rec.fs               # (650000, 2) 배열, 360 Hz
print(sig.shape, fs, rec.sig_name)           # ['MLII', 'V5']
```

표준 12유도 심전도는 10초를 500Hz 로 찍으면 유도 하나당 5000개 점이고, 24시간 홀터나 중환자실 모니터는 하루에 수천만 점이 쌓인다. 그래서 저장은 일반 테이블보다 시계열 DB 나 파형 전용 파일(WFDB, EDF)이 맞고, 분석 단위도 "환자 한 명의 값" 이 아니라 "한 구간의 배열" 이 된다. AI 쪽에서는 10초 파형을 1D CNN 에 넣어 부정맥(심방세동 등)을 분류하는 것이 교과서적 과제이고, 라벨은 심장내과 의사의 판독 소견에서 온다. 병원 장비 원본은 제조사별 XML·PDF 인 경우가 많아 파형 숫자를 뽑아내는 파싱이 첫 단계다.

## 헷갈리기 쉬운 것

- **맥박(HR)** 은 심전도의 R 피크 간격으로 계산한 **숫자 하나**(분당 72회), **심전도** 는 그 숫자가 나온 **원본 파형**. 바이탈 테이블의 HR 만으로는 부정맥 모양을 알 수 없다.
- **EEG(뇌파)** 는 뇌의 전기 신호. 파형 처리 기법은 비슷하지만 전극 위치·주파수 대역·판독 방식이 다르다.
- **ECG 와 EKG** 는 같은 말(EKG 는 독일어식 표기). 미국 병원 자료에 EKG 가 자주 보인다.
