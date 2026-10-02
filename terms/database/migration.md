---
id: migration
term: 마이그레이션
aliases:
  - Migration
  - DB 마이그레이션
  - 스키마 마이그레이션
  - 스키마 변경 이력
category: database
tags:
  - 운영
  - SQL
level: 2
kind: concept
related:
  - sql
  - orm
  - rollback
  - environments
  - baas
see_also:
  - https://supabase.com/docs/guides/deployment/database-migrations
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

표 구조 변경을 **번호 붙은 SQL 파일로 기록**해 어느 환경에서든 같은 순서로 적용하는 방법.

## 비유

집 리모델링 **공사 일지**. "1일차 벽 철거, 2일차 배선" 식으로 순서대로 적어 두면 똑같은 집을 다른 동네에 지을 때도 그대로 따라 하면 된다.

## 예시

```bash
# Ender Chest (Supabase CLI)
supabase migration new add_items_tags   # supabase/migrations/20260925120000_add_items_tags.sql 생성
supabase db push                        # 원격 프로젝트에 아직 안 적용된 파일만 순서대로 실행
```

```sql
-- 20260925120000_add_items_tags.sql
ALTER TABLE items ADD COLUMN tags text[] NOT NULL DEFAULT '{}';
```

대시보드에서 손으로 고치면 "어느 환경에 뭘 바꿨는지" 가 기억에만 남는다. 파일로 남기고 코드와 같이 Git 에 커밋하는 게 핵심이라, 로컬·스테이징·프로덕션이 같은 구조를 갖게 된다.

## 헷갈리기 쉬운 것

- **데이터 마이그레이션**(서버 이전, DB 제품 갈아타기)도 같은 단어를 쓴다. 여기서 말하는 건 "스키마 변경 이력 관리".
- **시드(seed)** 는 구조가 아니라 초기 데이터(테스트 계정 등)를 넣는 스크립트. Supabase 의 `supabase/seed.sql` 이 그것.
