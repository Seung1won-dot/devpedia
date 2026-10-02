---
id: csv-parquet
term: CSV/Parquet
aliases:
  - Comma-Separated Values
  - Apache Parquet
  - 파케이
  - 열 지향 포맷
  - 컬럼 기반 저장
category: data
tags:
  - 데이터엔지니어링
  - 데이터
  - Python
level: 1
kind: protocol
related:
  - pandas-numpy
  - etl-pipeline
  - data-warehouse
  - json
  - object-storage
  - serialization
see_also:
  - https://parquet.apache.org/docs/
  - https://pandas.pydata.org/docs/user_guide/io.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

표 데이터를 **글자 그대로**(CSV) 또는 **열 단위 압축 이진**(Parquet)으로 저장하는 파일 포맷.

## 비유

CSV 는 손글씨 장부 — 누구나 펼쳐 읽지만 두껍고 숫자인지 글자인지 적혀 있지 않다. Parquet 은 열마다 따로 묶어 진공 포장한 장부 — 필요한 열만 꺼내 볼 수 있고 가볍지만 전용 기계가 있어야 열린다.

## 예시

```python
import pandas as pd
# 병원 시스템 추출본은 CP949 인 경우가 많고, 환자번호 앞자리 0 이 숫자로 읽히면 사라진다
df = pd.read_csv("emr_labs.csv", encoding="cp949",
                 dtype={"patient_id": str}, parse_dates=["measured_at"])
df.to_parquet("emr_labs.parquet", index=False)              # pyarrow 설치 필요
labs = pd.read_parquet("emr_labs.parquet", columns=["patient_id", "glucose"])  # 필요한 열만 읽기
```

CSV 는 "값, 값, 값" 을 줄마다 적은 텍스트라 어떤 프로그램이든 열리지만, 타입 정보가 없어서 `00012345` 가 12345 로 변하고 날짜는 문자열로 남는다 — 그래서 읽을 때마다 `dtype`·`parse_dates` 를 적어 줘야 한다. Parquet 은 타입과 압축이 파일 안에 들어 있고 열 단위로 저장되어, 100개 열 중 2개만 쓸 때 그 2개만 디스크에서 읽는다. 연구실 관례는 EMR 에서 받은 원본 CSV 는 손대지 않고 보관하고, 정리한 중간 산출물부터 Parquet 으로 저장하는 것. 용량이 크게 줄고 다시 읽을 때 타입 때문에 고생할 일이 없다.

## 헷갈리기 쉬운 것

- **CSV vs 엑셀(xlsx)**: 엑셀은 서식·여러 시트가 든 압축 XML 이고 CSV 는 값만 있는 텍스트. 엑셀로 CSV 를 열었다 저장하면 앞자리 0 이 사라지고 날짜 형식이 바뀌는 사고가 잦다.
- **Parquet vs JSON**: JSON 은 중첩 구조가 자유로운 글자 기반 교환 포맷(API 응답용), Parquet 은 표 모양 대용량 데이터를 분석용으로 쌓아 두는 저장 포맷.
- **행 지향 vs 열 지향**: CSV·DB 테이블은 한 행(환자 한 명)을 통째로 이어 쓰고, Parquet 은 한 열(혈당 전부)을 이어 쓴다. "환자 한 명 조회" 는 전자가, "혈당 평균" 은 후자가 빠르다.
