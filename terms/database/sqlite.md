---
id: sqlite
term: SQLite
aliases:
  - 에스큐라이트
  - sqlite3
  - 파일 DB
  - 임베디드 DB
category: database
tags:
  - 관계형
  - SQL
  - 개발도구
level: 1
kind: tool
related:
  - postgresql
  - rdbms
  - sql
  - csv-parquet
  - pandas-numpy
see_also:
  - https://www.sqlite.org/whentouse.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

서버 없이 **파일 하나가 곧 DB** 가 되는, 프로그램 안에 넣어 쓰는 가벼운 관계형 DB.

## 비유

서버실에 두는 큰 금고 대신 **가방에 넣고 다니는 개인 수첩**. 꺼내서 바로 쓰고, 통째로 복사하면 그게 백업이다.

## 예시

```bash
sqlite3 vitals.db "CREATE TABLE vitals (id INTEGER PRIMARY KEY, sbp INTEGER, measured_at TEXT);"
sqlite3 vitals.db "INSERT INTO vitals (sbp, measured_at) VALUES (120, '2026-10-02T09:00');"
sqlite3 vitals.db "SELECT * FROM vitals;"
```

```python
import sqlite3, pandas as pd                     # 표준 라이브러리, 설치 불필요
con = sqlite3.connect("vitals.db")               # 없으면 파일이 새로 생긴다
df = pd.read_sql("SELECT * FROM vitals", con)
```

Python 에 기본으로 들어 있고 설정할 것이 없어서, 실험 결과를 CSV 대신 모아 두거나 노트북에서 돌리는 FastAPI 프로토타입에 딱 맞다. 스마트폰 앱·브라우저의 내부 저장소도 대부분 SQLite 다. 대신 쓰기 락이 파일 단위라 한 번에 한 명만 쓸 수 있어, 여러 서버가 동시에 붙는 서비스에는 맞지 않는다.

## 헷갈리기 쉬운 것

- **PostgreSQL** 은 서버 프로세스가 따로 돌고 여러 앱이 네트워크로 붙는다. SQLite 는 프로그램이 파일을 직접 연다. 혼자 쓰는 프로토타입·분석은 SQLite, 여럿이 붙는 서비스는 Postgres.
- **CSV 파일**도 "파일 하나" 지만 그냥 글자 나열이다. SQLite 는 인덱스·트랜잭션·SQL 조회가 된다.
- SQLite 는 **열 타입을 강제하지 않는다**(`INTEGER` 열에 문자열이 들어감). 나중에 Postgres 로 옮길 때 여기서 놀란다. 표를 만들 때 `STRICT` 를 붙이면 막을 수 있다.
