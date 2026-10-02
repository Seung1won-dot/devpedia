---
id: rls
term: RLS(Row Level Security)
aliases:
  - Row Level Security
  - 행 수준 보안
  - 행 단위 보안
  - RLS 정책
category: database
tags:
  - 보안
  - 관계형
  - 인가
level: 3
kind: pattern
related:
  - authentication-authorization
  - baas
  - jwt
  - least-privilege
  - sql
  - multi-tenancy
see_also:
  - https://supabase.com/docs/guides/database/postgres/row-level-security
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

표의 **행 하나하나에 누가 읽고 쓸 수 있는지** 규칙을 두고 DB 가 직접 걸러 주는 기능.

## 비유

회사 서류함은 하나뿐인데 각 서류에 **"작성자 본인만 열람"** 딱지가 붙어 있고, 경비원이 신분증을 보고 걸러 주는 것. 앱 코드가 깜빡해도 경비원(DB)이 막는다.

## 예시

Ender Chest 의 Supabase 에서 "자기 아이템만" 보이게 하는 정책.

```sql
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- 읽기: 로그인한 사용자의 id 와 owner_id 가 같은 행만
CREATE POLICY items_select_own ON items
  FOR SELECT USING (owner_id = auth.uid());

-- 쓰기: 남의 owner_id 로는 못 넣게
CREATE POLICY items_insert_own ON items
  FOR INSERT WITH CHECK (owner_id = auth.uid());
```

프론트에서 `supabase.from('items').select()` 를 아무 조건 없이 불러도 DB 가 JWT 속 사용자 id(`auth.uid()`)와 대조해 남의 행은 아예 돌려주지 않는다. ENABLE 만 하고 정책을 하나도 안 만들면 **아무도 못 읽는** 상태가 된다.

## 헷갈리기 쉬운 것

- **앱 코드의 인가**(`if (user.id === item.ownerId)`)와 달리 RLS 는 DB 층에서 한다. 코드에 구멍이 나도 DB 가 마지막 방어선이라 둘을 같이 두는 게 좋다.
- Supabase 의 **service_role 키**는 RLS 를 통째로 건너뛴다. 서버 쪽에서만 쓰고 프론트 번들에 절대 넣으면 안 된다.
