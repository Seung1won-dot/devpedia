---
id: pandas-numpy
term: Pandas/NumPy
aliases:
  - pandas
  - NumPy
  - 판다스
  - 넘파이
  - DataFrame
  - 벡터화
category: data
tags:
  - Python
  - 데이터
  - ML기초
  - 연구실
  - 데이터분석
level: 1
kind: tool
related:
  - machine-learning
  - etl-pipeline
  - pytorch
  - train-validation-test
  - sql
  - csv-parquet
  - missing-data
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

**NumPy** 는 숫자 배열을 한 번에 계산하고, **Pandas** 는 그걸로 표를 다루는 파이썬 라이브러리.

## 비유

NumPy 는 숫자 100개를 한꺼번에 더하는 주판, Pandas 는 그 주판으로 굴러가는 엑셀 시트. 엑셀에서 열 하나를 통째로 선택해 수식을 넣듯 표 전체를 한 번에 다룬다.

## 예시

```python
import numpy as np, pandas as pd
sbp = np.array([118, 135, 142, 127])             # 수축기 혈압 4명
print(sbp * 0.75, (sbp > 130).sum())             # 전 원소에 한 번에 / 130 넘는 사람 수 → 2

df = pd.read_csv("labs.csv")                     # 열: patient_id, dept, glucose, hba1c
print(df.groupby("dept")["hba1c"].mean())        # 진료과별 평균 당화혈색소
df["high"] = df["glucose"] > 126                 # 조건으로 새 열 만들기 (반복문 없음)
print(df.loc[df["high"], ["patient_id", "glucose"]].head())
X = df[["glucose", "hba1c"]].to_numpy()          # sklearn / PyTorch 에 넘길 행렬
```

`sbp * 0.75` 처럼 배열과 숫자 하나를 곱하면 NumPy 가 모양을 알아서 맞춰 전 원소에 적용하는 것이 브로드캐스팅이다. `for` 루프로 원소를 하나씩 돌면 파이썬이 매번 타입 확인과 객체 생성을 하지만, 벡터 연산은 C 로 짜인 반복문 하나가 연속된 메모리를 훑기 때문에 100만 개 기준 수십~수백 배 빠르다. 연구실에서 CSV 로 받은 검사 결과를 정리해 모델에 넣기 직전까지가 거의 다 Pandas 이고, 모델에 들어가는 순간 NumPy 배열이나 torch 텐서가 된다.

면접·과제 리뷰에서는 "Pandas 에서 반복문 대신 벡터화를 쓰는 이유는?" 으로 나온다. 인터프리터 오버헤드와 연속 메모리, 두 단어로 답한다.

## 헷갈리기 쉬운 것

- **NumPy 배열 vs 파이썬 리스트**: 리스트는 아무 타입이나 섞이는 포인터 묶음, 배열은 같은 타입이 연속 메모리에 붙어 있어 빠르고 메모리도 적게 쓴다.
- **DataFrame vs SQL 테이블**: 하는 일(select·where·group by·join)은 거의 같다. 메모리에 다 올라가면 Pandas, 안 올라가면 DB 에서 SQL 로 줄여서 가져온다.
- **torch 텐서**: NumPy 배열에 GPU 와 자동 미분이 붙은 것. `torch.from_numpy()` 로 복사 없이 넘어간다.
