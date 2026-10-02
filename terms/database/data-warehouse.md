---
id: data-warehouse
term: 데이터 웨어하우스/레이크
aliases:
  - Data Warehouse
  - Data Lake
  - DW
  - 데이터 웨어하우스
  - 데이터 레이크
  - 레이크하우스
  - OLAP
category: database
tags:
  - 데이터엔지니어링
  - 데이터
  - 아키텍처
  - 의료데이터
level: 2
kind: concept
related:
  - etl-pipeline
  - cdw
  - omop-cdm
  - object-storage
  - csv-parquet
  - denormalization
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

여러 시스템의 데이터를 **분석용으로 모아 둔 창고**로, 정리해 넣으면 웨어하우스, 원본째면 레이크.

## 비유

웨어하우스는 **라벨 붙여 선반에 정리한 창고**, 레이크는 **일단 다 쏟아 넣은 큰 저수지**. 창고는 찾기 쉽지만 넣을 때 손이 가고, 저수지는 넣기 쉬운 대신 꺼낼 때 걸러야 한다.

## 예시

```python
# 레이크: EMR 추출 CSV 를 손대지 않고 Parquet 로 쌓는다 (MinIO/S3 호환 저장소)
import pandas as pd
pd.read_csv("emr_export_2026-10.csv").to_parquet("s3://lake/raw/emr/2026-10.parquet")
```

```sql
-- 웨어하우스: 분석 질문에 맞춰 미리 JOIN 해 둔 넓은 표 (운영 DB 와 달리 중복을 허용)
CREATE TABLE fact_visit AS
SELECT v.visit_id, v.visit_date, p.sex, p.birth_year, d.icd10, h.dept_name
FROM stg.visit v
JOIN stg.patient    p USING (patient_id)
JOIN stg.diagnosis  d USING (visit_id)
JOIN stg.department h USING (dept_id);

-- 질문은 대부분 집계 (OLAP)
SELECT icd10, date_trunc('month', visit_date) AS m, count(*)
FROM fact_visit GROUP BY 1, 2 ORDER BY 2, 3 DESC;
```

운영 DB 는 "행 하나 넣고 고치기" 에 최적화돼 있어 거기서 수억 행 집계를 돌리면 서비스가 느려진다. 그래서 EMR·PACS 메타·설문·웨어러블 데이터를 밤마다 ETL 로 뽑아 분석 전용 저장소에 모은다. 병원의 CDW 가 바로 임상 데이터 웨어하우스이고, OMOP CDM 은 그 표 모양의 표준이다. 레이크 위에 표 구조와 트랜잭션을 얹어 둘의 장점을 합친 것을 레이크하우스(Iceberg/Delta Lake)라 부른다.

## 헷갈리기 쉬운 것

- **운영 DB(OLTP) vs 웨어하우스(OLAP)**: 앞은 많은 작은 읽기·쓰기에 정규화된 표, 뒤는 적은 큰 읽기에 반정규화된 넓은 표와 열 지향 저장(Parquet, ClickHouse, BigQuery).
- **ETL** 은 옮기는 과정, 웨어하우스는 도착지. "웨어하우스를 만든다" 의 절반은 ETL 파이프라인 짜기다.
- **레이크 vs 그냥 파일 서버**: 둘 다 결국 S3 의 파일이지만, 포맷(Parquet)·폴더 규칙·"어떤 파일이 무엇인지" 카탈로그가 있어야 레이크다. 없으면 아무도 못 찾는 데이터 늪이 된다.
