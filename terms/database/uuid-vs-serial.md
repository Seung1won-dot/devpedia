---
id: uuid-vs-serial
term: UUID vs auto-increment
aliases:
  - UUID
  - 자동 증가 키
  - serial
  - IDENTITY
  - Auto Increment
  - 대리키
category: database
tags:
  - 관계형
  - SQL
  - 설계원칙
  - 면접
level: 1
kind: concept
related:
  - primary-foreign-key
  - index
  - sharding
  - mrn
  - b-tree
see_also:
  - https://www.postgresql.org/docs/current/datatype-uuid.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

기본키를 **1,2,3 순번**으로 매길지 **무작위 128비트 식별자**로 매길지의 선택.

## 비유

은행 **대기 번호표**(순번)와 **복권 번호**(UUID). 번호표는 짧고 순서가 보이지만 몇 명 왔는지 들키고, 복권 번호는 어느 지점에서 뽑아도 겹치지 않는다.

## 예시

```sql
-- 순번: 짧고 빠르며 정렬 순서가 곧 생성 순서
CREATE TABLE visits  (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, note text);

-- UUID: 앱·여러 DB 에서 미리 만들어도 안 겹침
CREATE TABLE uploads (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), path text);

INSERT INTO visits  (note) VALUES ('첫 방문')      RETURNING id;  -- 1
INSERT INTO uploads (path) VALUES ('/ct/001.dcm') RETURNING id;  -- 7c9e6679-7425-40de-944b-e07fc1f90ae7
```

순번은 URL 에 그대로 노출되면 `/patients/1025` 다음에 1026 을 찍어 볼 수 있고(열거) 전체 건수까지 드러난다. UUID 는 그 걱정이 없고 서버 여러 대·오프라인 클라이언트에서도 충돌 없이 만들 수 있지만, 16바이트라 인덱스가 커지고 무작위 값이라 B-tree 여기저기에 흩어져 꽂혀 대량 INSERT 가 느려진다. 시간순으로 커지는 UUID v7 이 이 단점을 줄이며, PostgreSQL 18 부터 `uuidv7()` 함수가 내장됐다 [확인 필요]. 연구 데이터라면 환자번호(MRN) 같은 실제 식별자를 기본키로 쓰지 말고 둘 중 하나를 대리키로 두는 편이 가명화할 때 편하다.

## 헷갈리기 쉬운 것

- **serial vs IDENTITY**: 둘 다 순번이다. `serial` 은 Postgres 의 옛 줄임 문법이고 `GENERATED ... AS IDENTITY` 가 표준 SQL 이라 새 표에는 후자를 쓴다.
- **UUID 는 비밀번호가 아니다.** 추측하기 어려울 뿐이라, "URL 만 알면 열람" 식으로 인가 검사를 생략하면 안 된다.
- **자연키**(MRN, 이메일)를 기본키로 삼으면 그 값이 바뀔 때 외래키까지 전부 바꿔야 한다. 대리키를 두고 자연키엔 `UNIQUE` 만 건다.
