---
id: sql-injection
term: SQL 인젝션
aliases:
  - SQL Injection
  - SQL 인젝션
  - SQLi
  - 에스큐엘 인젝션
category: security
tags:
  - 웹취약점
  - SQL
level: 1
kind: concept
related:
  - sql
  - orm
  - xss
  - owasp-top-10
  - rls
see_also:
  - https://community.owasp.org/attacks/SQL_Injection
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

사용자 입력이 **SQL 문장의 일부로 끼어들어** 의도 밖 쿼리가 실행되는 취약점.

## 비유

택배 송장의 "받는 사람" 칸에 **"홍길동, 그리고 창고 문 열어 둘 것"** 이라고 적었는데 직원이 그대로 따르는 것. 이름 칸은 무슨 글자가 와도 이름으로만 읽어야 한다.

## 예시

입력을 문자열로 이어 붙이지 말고, 항상 "값" 자리로 따로 넘긴다(파라미터 바인딩).

```python
# ❌ name = "x' OR '1'='1" 이 들어오면 모든 행이 나온다
cur.execute(f"SELECT * FROM users WHERE name = '{name}'")

# ✅ 입력은 문장 구조를 못 바꾸고 값으로만 취급된다
cur.execute("SELECT * FROM users WHERE name = %s", (name,))
```

Supabase 클라이언트(`.eq('name', name)`)나 ORM 은 바인딩을 대신 해 주지만, 직접 쓰는 raw SQL 은 예외다. 뚫려도 피해를 줄이려면 DB 계정 권한을 최소로 하고 RLS 를 켠다.

## 헷갈리기 쉬운 것

- **XSS** 는 같은 "입력이 코드로 해석되는" 문제지만 무대가 다르다. SQL 인젝션은 서버의 DB, XSS 는 다른 사용자의 브라우저.
- **입력 검증(validation)** 만으로는 부족하다. 검증은 보조이고, 근본 방어는 바인딩이다.
