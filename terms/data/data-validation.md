---
id: data-validation
term: 데이터 검증(스키마/품질)
aliases:
  - Data Validation
  - Data Quality Check
  - 데이터 품질 검사
  - 스키마 검증
  - pandera
  - Great Expectations
category: data
tags:
  - 데이터엔지니어링
  - 품질
  - 데이터분석
level: 1
kind: concept
related:
  - etl-pipeline
  - missing-data
  - outlier
  - validation
  - input-validation
  - data-lineage
see_also:
  - https://pandera.readthedocs.io/
  - https://docs.greatexpectations.io/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

데이터셋이 **기대한 모양과 범위**(타입·결측·유니크·값 범위)를 지키는지 자동으로 검사하는 것.

## 비유

택배 입고 검수. 상자를 창고에 넣기 전에 "개수 맞나, 깨진 것 없나, 라벨 붙어 있나" 를 체크리스트로 훑는다 — 넣고 나서 발견하면 어느 상자인지 찾기 어렵다.

## 예시

```python
import pandas as pd, pandera as pa
schema = pa.DataFrameSchema({
    "patient_id":  pa.Column(str, nullable=False),
    "measured_at": pa.Column("datetime64[ns]"),
    "sbp":         pa.Column(float, pa.Check.in_range(40, 300), nullable=True),   # mmHg 로 가능한 범위
    "spo2":        pa.Column(float, pa.Check.in_range(0, 100), nullable=True),
    "sex":         pa.Column(str, pa.Check.isin(["M", "F"])),
}, unique=["patient_id", "measured_at"], coerce=True)

df = pd.read_csv("vitals.csv", parse_dates=["measured_at"], dtype={"patient_id": str})
schema.validate(df, lazy=True)   # 어긋나면 어느 열·몇 번째 행이 왜 틀렸는지 한꺼번에 보고하고 예외
```

ETL 의 추출 직후와 적재 직전에 이 검사를 끼운다. 매달 받는 EMR 추출본은 어느 날 갑자기 열 이름이 바뀌거나, 혈압 단위가 달라지거나, 환자번호 앞자리 0 이 떨어져 온다 — 모델 성능이 떨어진 뒤 거꾸로 찾는 것보다 입구에서 멈추는 쪽이 싸다. 작은 스크립트면 `assert df["sbp"].between(40, 300).all()` 한 줄로 시작해도 되고, 파이프라인이 커지면 pandera(코드로 스키마 선언)나 Great Expectations(검사 묶음 + HTML 리포트)로 옮긴다. 검사 결과는 로그로 남겨 "그 달 데이터는 뭐가 이상했나" 를 추적할 수 있게 한다.

## 헷갈리기 쉬운 것

- **유효성 검사(backend `validation`)**: API 요청 하나의 바디·파라미터가 스키마에 맞는지(pydantic/zod) 보는 것 — 요청 단위, 실시간, 틀리면 400 응답. 데이터 검증은 파일·테이블 전체를 배치로 보며 유니크·분포처럼 "행 사이" 조건까지 본다.
- **입력 검증(security `input-validation`)**: 믿을 수 없는 사용자 입력을 허용 목록으로 걸러 인젝션을 막는 보안 관점. 데이터 검증이 잡는 건 공격이 아니라 실수·포맷 변경·전송 오류다.
- **단위 테스트(pytest)**: 코드가 맞는지 확인한다. 데이터 검증은 코드가 그대로여도 매달 바뀌는 데이터가 맞는지 확인한다.
