---
id: pagination
term: 페이지네이션
aliases:
  - Pagination
  - 페이징
  - 오프셋 페이지네이션
  - 커서 페이지네이션
  - 무한 스크롤
category: backend
tags:
  - API설계
  - REST
  - 성능
level: 1
kind: pattern
related:
  - query-path-param
  - rest
  - index
  - sql
  - lazy-loading
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

목록이 길 때 **한 번에 일부만 잘라서** 다음 조각을 이어 요청하게 하는 방식.

## 비유

두꺼운 책을 한 번에 다 복사해 주는 대신 펼쳐 보여 주는 것. "41쪽부터 20쪽"(오프셋) 하고 펴 주거나, "지난번 끼워 둔 책갈피 다음부터"(커서) 이어서 펴 준다.

## 예시

```sql
-- 오프셋 방식: 3페이지(20개씩)
SELECT * FROM visits ORDER BY id LIMIT 20 OFFSET 40;

-- 커서 방식: 마지막으로 본 id(1040) 다음부터
SELECT * FROM visits WHERE id > 1040 ORDER BY id LIMIT 20;
```

API 로는 `GET /visits?page=3&size=20` 과 `GET /visits?after=1040&size=20` 꼴이 된다. 응답에는 데이터와 함께 `total` 또는 `next_cursor` 를 같이 돌려준다.

**오프셋**은 단순하고 "7페이지로 점프"가 되지만, `OFFSET 100000` 은 DB 가 10만 행을 읽고 버리는 것이라 뒤로 갈수록 느려지고, 사이에 새 행이 들어오면 같은 항목이 두 번 보이거나 빠진다. **커서**는 인덱스를 타서 어느 페이지든 빠르고 중복·누락이 없지만, 임의 페이지로 점프할 수 없다. 관리 화면의 표는 오프셋, 끝없이 내려가는 피드와 수십만 행 EMR 추출은 커서가 맞다.

## 헷갈리기 쉬운 것

- **무한 스크롤**은 화면(UI) 쪽 표현이고, 그 뒤에서 데이터를 가져오는 방식은 보통 커서 페이지네이션이다.
- **레이지 로딩**은 이미지·컴포넌트를 필요해질 때 불러오는 프론트 기법. 페이지네이션은 서버가 데이터를 잘라 주는 API 설계라서 층이 다르다.
- **LIMIT/OFFSET** 은 SQL 문법 하나일 뿐이다. 페이지네이션은 "어떻게 잘라서 어떻게 다음 것을 요청하게 할지" 를 API 수준에서 정하는 패턴.
