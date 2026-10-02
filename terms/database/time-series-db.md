---
id: time-series-db
term: 시계열 DB
aliases:
  - Time-Series Database
  - TSDB
  - 시계열 데이터베이스
  - TimescaleDB
  - InfluxDB
category: database
tags:
  - 생체신호
  - 데이터
  - 성능
  - 모니터링
level: 2
kind: concept
related:
  - ecg
  - vital-signs
  - wearable
  - monitoring
  - postgresql
  - data-warehouse
see_also:
  - https://docs.timescale.com/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

**시각이 붙은 측정값**이 끝없이 쌓이는 데이터를 넣고 구간별로 뽑는 데 특화된 DB.

## 비유

매초 찍히는 **심전도 종이**. 뒤에 계속 덧붙여질 뿐 중간을 고칠 일은 없고, "어젯밤 3시~4시만 보여 줘" 처럼 시간 구간으로 잘라 본다.

## 예시

```sql
CREATE EXTENSION IF NOT EXISTS timescaledb;      -- Postgres 위에 얹는 시계열 확장

CREATE TABLE ecg (
  ts         timestamptz NOT NULL,
  patient_id uuid        NOT NULL,
  lead_ii    real                                 -- 리드 II 전압(mV)
);
SELECT create_hypertable('ecg', 'ts');           -- 시간 단위로 자동 분할(청크)

-- 최근 1시간을 1분 단위로 다운샘플링
SELECT time_bucket('1 minute', ts) AS minute, avg(lead_ii), max(lead_ii)
FROM ecg
WHERE patient_id = '7c9e6679-7425-40de-944b-e07fc1f90ae7'
  AND ts > now() - interval '1 hour'
GROUP BY minute ORDER BY minute;

SELECT add_retention_policy('ecg', interval '90 days');   -- 오래된 청크 자동 삭제
```

250Hz 심전도는 환자 한 명이 하루 2천만 행이 넘는다. 일반 표에 그냥 넣으면 인덱스가 비대해지고 오래된 데이터를 `DELETE` 하는 것만으로 서버가 멈춘다. 시계열 DB 는 시간 단위로 쪼개 저장하고(청크), 지난 구간은 압축하고, 보존 기간이 지난 청크를 통째로 떨어뜨리고, 시간 구간 집계 함수를 제공한다. 선택지는 Postgres 확장인 TimescaleDB, 독립 제품인 InfluxDB, 서버 메트릭 전용 Prometheus, 대규모 분석용 ClickHouse 정도이며, 연구실은 Postgres 를 이미 쓰니 TimescaleDB 로 시작하면 SQL 과 기존 표를 그대로 쓸 수 있다.

## 헷갈리기 쉬운 것

- **일반 RDB 에 timestamp 열**로도 수백만 행까지는 충분하다. 초당 수천 건 이상 들어오거나 수억 행·시간 기반 삭제가 필요해질 때 시계열 DB 를 고른다.
- **Prometheus** 는 CPU·요청 수 같은 서버 메트릭용 시계열 DB 다. 환자 생체신호처럼 임의의 데이터를 넣는 용도로는 설계되지 않았다.
- **데이터 웨어하우스**는 온갖 데이터를 모아 분석하는 창고, 시계열 DB 는 측정값 흐름을 빠르게 넣고 구간 집계하는 데 특화된 저장소다.
