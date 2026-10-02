---
id: postgresql
term: PostgreSQL
aliases:
  - Postgres
  - 포스트그레스
  - 포스트그레SQL
  - psql
category: database
tags:
  - 관계형
  - SQL
  - 연구실
  - 운영
level: 1
kind: tool
related:
  - rdbms
  - sql
  - sqlite
  - pgvector
  - mvcc
  - baas
see_also:
  - https://www.postgresql.org/docs/current/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

확장(extension)으로 기능을 끝없이 덧붙일 수 있는 **오픈소스 관계형 DB 서버**.

## 비유

동네 공방의 **종합 공구함**. 기본 공구(SQL)는 다 들어 있고, 벡터 검색·시계열·지도 같은 특수 공구(확장)는 칸만 끼우면 추가된다.

## 예시

```yaml
# docker-compose.yml — 연구실 서비스 뒤의 본 DB
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data      # 컨테이너를 지워도 데이터는 남게
    ports:
      - "127.0.0.1:5432:5432"                # 호스트 밖으로는 열지 않음
volumes:
  pgdata:
```

```bash
docker compose exec db psql -U postgres          # 접속
# \l 데이터베이스 목록  \dt 표 목록  \d vitals 표 구조  \x 세로 출력  \q 나가기
```

연구실에서는 FastAPI 뒤의 본 DB, Supabase 의 속, RAG 의 벡터 저장(pgvector)까지 Postgres 하나로 해결한다. `JSONB`·배열·범위 타입, 윈도우 함수, 표준 SQL 준수가 강점이고 기본 포트는 5432 다. 접속은 Tailscale 안이나 SSH 터널로만 하고, 공인 IP 에 5432 를 여는 일은 없어야 한다.

## 헷갈리기 쉬운 것

- **MySQL/MariaDB** 도 오픈소스 RDBMS 다. Postgres 는 확장·타입·표준 준수에서, MySQL 은 웹 호스팅 보급률에서 앞선다. 둘 다 SQL 이지만 세부 문법(`SERIAL` vs `AUTO_INCREMENT`, 따옴표 규칙)이 달라 그대로 옮겨지지 않는다.
- **Supabase** 는 Postgres 를 호스팅하고 인증·REST API 를 덧붙인 서비스. 속은 그냥 Postgres 라 `psql` 로 직접 붙을 수 있다.
- **psql** 은 서버가 아니라 서버에 접속하는 터미널 클라이언트. "Postgres 깔았는데 psql 이 없다" 는 클라이언트 패키지만 빠진 것이다.
