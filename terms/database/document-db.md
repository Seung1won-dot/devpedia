---
id: document-db
term: 문서형 DB(MongoDB)
aliases:
  - Document Database
  - 도큐먼트 DB
  - MongoDB
  - 몽고DB
category: database
tags:
  - NoSQL
  - 데이터
level: 2
kind: tool
related:
  - nosql
  - json
  - rdbms
  - normalization
  - key-value-store
see_also:
  - https://www.mongodb.com/docs/manual/core/document/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

데이터를 행이 아니라 **JSON 같은 문서 덩어리** 단위로 저장하고 조회하는 NoSQL DB.

## 비유

환자마다 **서류 봉투 하나**에 검사지·처방전을 통째로 넣어 두는 것. 사람마다 든 서류가 달라도 되고 봉투 하나만 꺼내면 다 나오지만, "모든 환자의 처방전만" 모으려면 봉투를 하나씩 열어야 한다.

## 예시

```python
from pymongo import MongoClient
db = MongoClient("mongodb://localhost:27017").lab

db.experiments.insert_one({
    "name": "qwen-lora-v3", "gpu": "RTX 4090",
    "metrics": {"loss": 0.41, "epochs": 3}, "tags": ["rag", "lora"],
})
print(db.experiments.find_one({"tags": "lora"})["metrics"]["loss"])
```

중첩 구조(metrics, tags)를 표 여러 개로 쪼개지 않고 그대로 넣는다. Postgres 의 `jsonb` 열도 비슷하게 쓸 수 있어서, Supabase 만 쓰는 프로젝트에선 굳이 MongoDB 를 따로 띄우지 않는 경우가 많다.

## 헷갈리기 쉬운 것

- **키-값 저장소**는 키로 값을 통째로 꺼낼 뿐 값 안쪽(`metrics.loss`)을 조건으로 검색하지 못한다. 문서형은 안쪽 필드로 검색·인덱스가 된다.
- **관계형 DB 의 jsonb** 와의 차이는 "기본이 뭐냐". Postgres 는 표가 기본이고 문서는 보조, MongoDB 는 문서가 기본이라 표 간 JOIN 이 약하다.
