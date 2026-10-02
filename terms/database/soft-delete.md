---
id: soft-delete
term: 소프트 딜리트
aliases:
  - Soft Delete
  - 논리 삭제
  - deleted_at
  - is_deleted
  - 소프트 삭제
category: database
tags:
  - SQL
  - 설계원칙
  - 운영
  - 의료데이터
level: 2
kind: pattern
related:
  - crud
  - view
  - backup-restore
  - audit-log
  - medical-data-law
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

행을 실제로 지우지 않고 **"삭제됨" 표시만 남겨** 조회에서 숨기는 방식.

## 비유

서류를 파쇄하는 대신 **"폐기" 도장을 찍어 캐비닛 뒤칸으로** 옮기는 것. 평소엔 안 보이지만 필요하면 꺼낼 수 있고, 대신 캐비닛은 계속 차오른다.

## 예시

```sql
ALTER TABLE items ADD COLUMN deleted_at timestamptz;          -- NULL 이면 살아 있음

UPDATE items SET deleted_at = now() WHERE id = 42;            -- "삭제" = UPDATE
SELECT * FROM items WHERE deleted_at IS NULL;                 -- 모든 조회에 이 조건이 붙는다

-- 조건 빼먹기를 막는 뷰 + 산 행만 색인하는 부분 인덱스
CREATE VIEW live_items AS SELECT * FROM items WHERE deleted_at IS NULL;
CREATE INDEX ON items (owner_id) WHERE deleted_at IS NULL;

-- UNIQUE 도 산 행에만 걸어야 "탈퇴한 이메일로 재가입" 이 된다
CREATE UNIQUE INDEX ON users (email) WHERE deleted_at IS NULL;
```

장점은 실수 복구가 쉽고, 변경 이력이 남고, 외래키로 엮인 다른 표가 깨지지 않는 것. 단점은 모든 쿼리에 `deleted_at IS NULL` 을 빼먹으면 "지운 게 다시 보여요" 버그가 나고, UNIQUE·외래키 규칙이 꼬이며, 표가 계속 커진다는 것이다. 개인정보는 보유 기간이 지나면 **진짜 파기**해야 하므로, `deleted_at` 이 N 일 지난 행을 실제 `DELETE` 하는 배치를 함께 둔다.

## 헷갈리기 쉬운 것

- **하드 딜리트(`DELETE`)** 는 진짜 삭제. 개인정보 파기 의무·용량 정리는 결국 하드 딜리트가 필요해서, 소프트 딜리트는 "나중에 지우기" 의 유예 단계다.
- **아카이브 표**로 옮기기: 지운 행을 다른 표로 이동시키면 본 표가 가벼워지지만 이력 JOIN 이 번거롭다.
- **백업**은 DB 전체를 과거 시점으로 되돌리는 것, 소프트 딜리트는 행 하나를 되살리는 것. 서로 대신하지 못한다.
