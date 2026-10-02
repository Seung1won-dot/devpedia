---
id: data-lineage
term: 데이터 계보(lineage)
aliases:
  - Data Lineage
  - Data Provenance
  - 데이터 출처 추적
  - 데이터 혈통
  - OpenLineage
category: data
tags:
  - 데이터엔지니어링
  - 연구
  - 의료데이터
level: 3
kind: concept
related:
  - etl-pipeline
  - orchestration
  - data-validation
  - reproducibility
  - omop-cdm
  - audit-log
see_also:
  - https://openlineage.io/docs/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

어떤 데이터가 **어디서 와서 어떤 변환을 거쳐** 지금 표가 되었는지 거슬러 추적하는 기록.

## 비유

식품 포장지의 원산지·유통 이력. 문제가 생겼을 때 "이 소시지는 어느 농장 돼지, 어느 공장, 몇 월 며칠 라인" 을 거꾸로 짚을 수 있다.

## 예시

```python
# 파이프라인의 각 단계가 산출물 옆에 "어디서 왔나" 를 같이 남긴다 (가장 작은 시작)
import hashlib, json, subprocess, pandas as pd
from datetime import datetime, timezone

src = "raw/emr_vitals_2026-09.csv"
raw = pd.read_csv(src, dtype={"patient_id": str}); n_in = len(raw)
df = raw[raw["sbp"].between(40, 300)]                        # 변환 1: 불가능한 값 제거
df["person_id"] = df.pop("patient_id").map(pseudonymize)     # 변환 2: 가명화 (함수는 별도)
out = "curated/vitals_2026-09.parquet"; df.to_parquet(out, index=False)

json.dump({
    "output": out, "inputs": [src],
    "input_sha256": hashlib.sha256(open(src, "rb").read()).hexdigest(),
    "code_commit": subprocess.check_output(["git", "rev-parse", "HEAD"]).decode().strip(),
    "rows_in": n_in, "rows_out": len(df),
    "run_at": datetime.now(timezone.utc).isoformat(),
}, open(out + ".lineage.json", "w"), indent=2)
```

심사자가 "이 코호트 3,412명은 어떻게 뽑혔고 제외된 환자는 몇 명인가" 라고 물으면 계보가 답이다 — 원본의 해시, 각 단계가 몇 행을 걸렀는지, 어떤 코드 버전으로 돌렸는지. 위처럼 산출물마다 JSON 한 장을 남기는 게 출발점이고, Airflow 같은 오케스트레이터는 OpenLineage 표준으로 "이 태스크가 이 테이블을 읽어 저 테이블을 썼다" 를 자동 수집해 그래프로 보여 준다. 쓸모는 세 갈래 — ① 상류 테이블의 오류가 발견됐을 때 영향받은 하류 산출물을 전부 찾아내기, ② 재현성(같은 입력·같은 코드 → 같은 결과), ③ 가명화를 거쳤다는 사실을 IRB·DRB 에 증빙하기. 트레이드오프: 단계마다 메타데이터를 남기는 비용이 들어 1회성 분석 노트북에는 과하다. 매달 갱신되는 CDM 이나 논문에 들어갈 데이터셋부터 적용한다.

## 헷갈리기 쉬운 것

- **데이터 계보 vs 감사 로그**: 감사 로그는 "누가 언제 어떤 환자 기록을 열람했나"(사람의 접근 기록, 규제 요구), 계보는 "이 데이터가 어떤 데이터에서 어떻게 만들어졌나"(데이터의 변환 기록).
- **데이터 계보 vs 데이터 카탈로그**: 카탈로그는 "어떤 테이블이 있고 각 열이 무슨 뜻인가"(사전), 계보는 그 테이블들 사이의 흐름(지도).
- **데이터 계보 vs 버전 관리(Git/DVC)**: Git 은 코드의 버전, DVC 는 데이터 파일의 버전. 계보는 그 둘을 "어느 코드로 어느 입력을 어느 출력으로" 이어 주는 기록이다.
