---
id: trigger-procedure
term: 트리거/저장 프로시저
aliases:
  - Trigger
  - Stored Procedure
  - 트리거
  - 저장 프로시저
  - PL/pgSQL
  - DB 함수
category: database
tags:
  - SQL
  - 관계형
  - 운영
level: 2
kind: concept
related:
  - sql
  - transaction-acid
  - constraint
  - audit-log
  - baas
  - migration
see_also:
  - https://www.postgresql.org/docs/current/plpgsql-trigger.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

DB 안에 저장해 두는 코드로, 프로시저는 **불러서** 실행하고 트리거는 **이벤트에 자동으로** 돈다.

## 비유

프로시저는 은행 창구의 **"적금 해지" 버튼** — 누르면 정해진 절차가 쭉 돈다. 트리거는 현관의 **센서등** — 누가 지나가면(INSERT/UPDATE) 묻지도 않고 켜진다.

## 예시

```sql
-- 1) 트리거 함수: 고칠 때마다 updated_at 을 자동 갱신
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER items_set_updated_at
BEFORE UPDATE ON items
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 2) 프로시저: CALL 로 직접 호출
CREATE PROCEDURE archive_vitals(days int) AS $$
BEGIN
  INSERT INTO vitals_archive SELECT * FROM vitals WHERE measured_at < now() - make_interval(days => days);
  DELETE FROM vitals                            WHERE measured_at < now() - make_interval(days => days);
END;
$$ LANGUAGE plpgsql;

CALL archive_vitals(365);
```

트리거의 대표 쓰임은 `updated_at` 갱신, 변경 내용을 감사 로그 표에 복사하기, 어느 앱 경로로 들어오든 규칙을 보장하기다. 대신 로직이 DB 안에 숨어 "값이 왜 바뀌지?" 를 추적하기 어렵고, 코드가 Git 이 아니라 DB 에 있으니 반드시 마이그레이션 파일로 함께 버전 관리한다. Supabase 의 `rpc()` 가 부르는 것도 이런 DB 함수다.

## 헷갈리기 쉬운 것

- **함수 vs 프로시저**(PostgreSQL): 함수는 값을 돌려주고 `SELECT` 안에서 부르며 트랜잭션을 직접 끝낼 수 없다. 프로시저는 `CALL` 로 부르고 안에서 `COMMIT` 할 수 있다. 트리거에 붙이는 것은 함수다.
- **CHECK 제약조건**으로 되는 단순 규칙은 제약조건이 더 싸고 눈에 띈다. 트리거는 다른 표를 건드리거나 계산이 필요할 때만.
- **앱 코드(서비스 레이어)** 에서 같은 일을 해도 된다. DB 트리거는 모든 진입로를 한 번에 막는 장점, 단위 테스트·디버깅이 어려운 단점이 있어 팀 규칙으로 정해 둔다.
