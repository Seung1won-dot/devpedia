---
id: orchestration
term: 워크플로 오케스트레이션(Airflow)
aliases:
  - Workflow Orchestration
  - Apache Airflow
  - 에어플로우
  - Prefect
  - Dagster
  - DAG
  - 워크플로 스케줄러
category: data
tags:
  - 데이터엔지니어링
  - 크론
  - 운영
level: 3
kind: tool
related:
  - etl-pipeline
  - cron
  - background-job
  - data-lineage
  - idempotency
  - docker-compose
see_also:
  - https://airflow.apache.org/docs/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

여러 단계의 데이터 작업을 **순서·의존성·재시도·알림**까지 묶어 자동으로 돌려 주는 도구.

## 비유

공장 생산 라인 관리자. "A 공정이 끝나야 B 를 시작, 실패하면 세 번까지 다시, 그래도 안 되면 담당자 호출" 을 매일 같은 시각에 사람 없이 진행시킨다.

## 예시

```python
# dags/emr_daily.py — Airflow 가 이 폴더를 읽어 매일 03:00 에 실행한다
from datetime import datetime, timedelta
from airflow.decorators import dag, task

@dag(schedule="0 3 * * *", start_date=datetime(2026, 1, 1), catchup=False,
     default_args={"retries": 3, "retry_delay": timedelta(minutes=10)})
def emr_daily():
    @task
    def extract(ds=None):                 # ds = 실행 날짜(YYYY-MM-DD). 같은 날짜를 다시 돌려도 같은 결과
        return f"/data/raw/vitals_{ds}.parquet"

    @task
    def validate(path):                   # pandera 스키마 검사, 어긋나면 여기서 멈춘다
        return path

    @task
    def load(path):                       # OMOP measurement 테이블에 적재 (멱등하게 upsert)
        ...

    load(validate(extract()))             # 의존성: extract → validate → load

emr_daily()
```

cron 한 줄로 돌리던 ETL 이 "추출 → 가명화 → 검증 → CDM 적재 → 리포트" 다섯 단계가 되고, 셋째 단계가 실패했을 때 처음부터 다시 돌리면 중복 적재가 되는 지경이 되면 오케스트레이터가 필요하다. Airflow 는 단계들을 DAG(방향 비순환 그래프)로 선언하면 순서대로 실행하고, 실패한 단계만 재시도하고, 웹 UI 에 성공/실패 이력을 남기고, 빠진 날짜만 골라 다시 돌린다(백필). 트레이드오프: 스케줄러·웹서버·메타데이터 DB 를 띄워야 하는 인프라가 하나 늘어난다 — 하루 한 번 스크립트 하나면 cron + 로그로 충분하고, 단계 간 의존성과 재실행이 자주 필요해질 때 넘어간다. 연구실 규모면 Docker Compose 로 한 VM 에 올리거나 더 가벼운 Prefect/Dagster 를 쓴다. 어느 쪽이든 각 단계를 멱등하게 짜야 재시도가 안전하다.

## 헷갈리기 쉬운 것

- **cron**: "언제 실행" 만 안다 — 의존성·재시도·이력·백필이 없다. 오케스트레이터 안에서도 시각은 cron 식으로 적는다.
- **백그라운드 워커(Celery)**: 웹 요청 중 생긴 일(메일 발송, 썸네일)을 즉시 비동기로 처리하는 작업 큐. 오케스트레이터는 정해진 시각에 도는 배치 흐름을 관리한다.
- **CI/CD(GitHub Actions)**: 코드가 바뀔 때 빌드·테스트·배포를 돌리는 파이프라인. 모양은 DAG 로 비슷하지만 트리거가 "커밋" 이지 "날짜·데이터 도착" 이 아니다.
