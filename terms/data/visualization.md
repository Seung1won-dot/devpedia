---
id: visualization
term: 시각화(matplotlib/plotly)
aliases:
  - Data Visualization
  - matplotlib
  - plotly
  - seaborn
  - 데이터 시각화
  - 차트
  - 플롯
category: data
tags:
  - 데이터분석
  - Python
  - 연구
level: 1
kind: tool
related:
  - pandas-numpy
  - descriptive-stats
  - outlier
  - correlation-causation
  - vital-signs
  - monitoring
see_also:
  - https://matplotlib.org/stable/users/index.html
  - https://plotly.com/python/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

숫자 표를 **그래프로 바꿔** 분포·추세·이상한 점을 눈으로 바로 잡아내게 하는 도구.

## 비유

환자 모니터의 심전도 파형. 숫자 1000개를 표로 읽는 대신 선 하나를 보면 "어, 여기 튄다" 가 바로 보인다.

## 예시

```python
import pandas as pd, matplotlib.pyplot as plt
plt.rc("font", family="Malgun Gothic")            # 한글 축 제목이 네모로 깨지지 않게 (Windows)
df = pd.read_csv("vitals.csv", parse_dates=["measured_at"])

fig, ax = plt.subplots(1, 2, figsize=(10, 4))
df["sbp"].plot.hist(bins=40, ax=ax[0]); ax[0].set_title("수축기 혈압 분포 (n=%d)" % df["sbp"].notna().sum())
one = df[df["patient_id"] == "P0001"].sort_values("measured_at")
ax[1].plot(one["measured_at"], one["sbp"], marker="."); ax[1].set_title("P0001 혈압 추이")
fig.autofmt_xdate(); fig.tight_layout(); fig.savefig("sbp.png", dpi=150)
```

분석의 첫 단계는 모델이 아니라 히스토그램이다 — 혈압 열에 0 이나 999 가 섞였는지, 단위가 mmHg 인지 kPa 인지는 그림 한 장이 `describe()` 보다 빨리 말해 준다. 도구는 용도별로 셋: matplotlib 은 논문·보고서용 정적 그림(축·폰트를 세밀히 조절, PNG/PDF 저장), seaborn 은 그 위에서 박스플롯·히트맵 같은 통계 그래프를 한 줄로, plotly 는 마우스를 올리면 값이 보이는 인터랙티브 HTML(탐색·발표·대시보드). 보고용 그림에는 축 단위·표본 수(n)·제목을 빠뜨리지 않는다.

## 헷갈리기 쉬운 것

- **히스토그램 vs 막대그래프**: 히스토그램은 수치 하나의 분포(구간별 개수), 막대그래프는 범주별 값 비교. 혈압 분포는 히스토그램, 진료과별 환자 수는 막대.
- **matplotlib vs plotly**: 정적 그림(논문) vs 인터랙티브(탐색·대시보드). 둘 다 pandas 의 `df.plot` 뒤에 붙여 쓸 수 있다.
- **시각화 vs 모니터링 대시보드(Grafana)**: Grafana 는 서버 지표가 실시간으로 흘러드는 운영 화면이고, 여기서 말하는 시각화는 손에 든 데이터셋을 그려서 이해하는 분석 작업이다.
