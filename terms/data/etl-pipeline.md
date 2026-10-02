---
id: etl-pipeline
term: 데이터 파이프라인/ETL
aliases:
  - ETL
  - Extract Transform Load
  - 추출·변환·적재
  - ELT
  - Data Pipeline
  - 데이터 파이프라인
category: data
tags:
  - 데이터
  - 의료데이터
  - 크론
  - 연구실
  - 데이터엔지니어링
level: 2
kind: concept
related:
  - omop-cdm
  - cron
  - emr-ehr
  - pandas-numpy
  - de-identification
  - csv-parquet
  - data-validation
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

여러 곳의 데이터를 **꺼내(추출)·다듬어(변환)·쌓는(적재)** 흐름을 자동으로 돌리는 것.

## 비유

시장에서 재료를 사 오고(추출), 씻고 썰어(변환), 냉장고에 칸 맞춰 넣는(적재) 장보기 루틴. 매주 같은 순서로 반복되니 자동화해 두면 편하다.

## 예시

```python
# etl_vitals.py — 매일 새벽 3시 cron 으로 실행:  0 3 * * * python etl_vitals.py
import pandas as pd, sqlalchemy as sa
emr = sa.create_engine("mssql+pyodbc://...")       # 병원 EMR, 읽기 전용 계정
cdm = sa.create_engine("postgresql://.../cdm")     # 연구용 OMOP CDM (Postgres)

df = pd.read_sql("SELECT pt_no, sbp, meas_dt FROM vital "
                 "WHERE meas_dt >= CAST(GETDATE()-1 AS DATE)", emr)     # E: 어제 치 추출
df["person_id"] = df.pop("pt_no").map(pseudonymize)                     # T: 환자번호 가명화
df["measurement_concept_id"] = 3004249                                  # T: 표준 concept 매핑
df = df.rename(columns={"sbp": "value_as_number", "meas_dt": "measurement_datetime"})
df.to_sql("measurement", cdm, if_exists="append", index=False)          # L: 적재
```

병원 EMR 을 OMOP CDM 으로 바꾸는 작업이 그대로 ETL 이다 — 원본 테이블에서 뽑고(E), 로컬 코드를 표준 concept 으로 매핑하고 가명화하고 단위를 맞추고(T), CDM 테이블에 넣는다(L, concept_id 는 예시). 이 스크립트를 cron 한 줄로 매일 돌리면 파이프라인이 되고, 단계가 수십 개로 늘어 "A 끝나면 B, 실패하면 재시도·알림" 이 필요해지면 Airflow 같은 워크플로 도구가 그 순서도(DAG)를 관리한다. 요즘은 원본을 웨어하우스에 일단 그대로 넣고(EL) 나중에 SQL 로 변환하는(T) ELT 도 흔한데, 저장이 싸지고 SQL 엔진이 빨라져서다.

면접에서는 "ETL 과 ELT 의 차이는?", "파이프라인이 중간에 실패하면 어떻게 하나?"(같은 날짜를 다시 돌려도 중복이 안 생기게 — 멱등성) 로 나온다.

## 헷갈리기 쉬운 것

- **ETL vs ELT**: 변환을 적재 전에 하느냐(ETL, 목적지 스키마가 엄격할 때), 적재 후에 하느냐(ELT, 원본을 보존하고 싶을 때)의 차이.
- **cron vs Airflow**: cron 은 "몇 시에 실행" 만 안다. 단계 간 의존성·재시도·실패 알림·실행 이력이 필요하면 Airflow(또는 Prefect, Dagster).
- **배치 vs 스트리밍**: 위 예는 하루치를 모아 처리하는 배치. 병상 모니터처럼 초 단위로 흘러오는 데이터는 Kafka 같은 스트리밍 파이프라인.
