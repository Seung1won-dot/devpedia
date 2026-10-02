---
id: rbac
term: RBAC
aliases:
  - Role-Based Access Control
  - 역할 기반 접근 제어
  - 역할 기반 권한 관리
  - 롤 기반 권한
category: security
tags:
  - 접근제어
  - 인가
  - 보안정책
level: 2
kind: pattern
related:
  - rls
  - least-privilege
  - authentication-authorization
  - iam
  - sso
  - audit-log
see_also:
  - https://csrc.nist.gov/projects/role-based-access-control
  - https://kubernetes.io/docs/reference/access-authn-authz/rbac/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

권한을 사람에게 직접 주지 않고 **역할에 묶어 두고 사람에겐 역할만** 주는 인가 방식.

## 비유

병원 **직원증의 직군**(의사·간호사·행정). 신입 간호사가 오면 간호사 직군 직원증을 하나 찍어 주면 끝이지, 문마다 출입 허용을 한 사람씩 다시 등록하지 않는다.

## 예시

연구 DB 에서 "연구원은 가명화 스키마만 읽기, 데이터 엔지니어는 원본 스키마 쓰기" 를 PostgreSQL 역할로 만들기.

```sql
-- 1) 역할 = 권한 묶음. 사람이 아니라 직군을 만든다
CREATE ROLE researcher NOLOGIN;
CREATE ROLE data_engineer NOLOGIN;
GRANT USAGE ON SCHEMA deid TO researcher;
GRANT SELECT ON ALL TABLES IN SCHEMA deid TO researcher;
GRANT USAGE ON SCHEMA raw TO data_engineer;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA raw TO data_engineer;

-- 2) 사람은 역할을 '입을' 뿐
CREATE ROLE kim LOGIN PASSWORD 'change-me';
GRANT researcher TO kim;
REVOKE researcher FROM kim;      -- 연구실을 떠나면 한 줄
```

권한 변경은 역할에 한 번만 하면 그 역할을 가진 모두에게 적용되고, 감사도 "누가 어떤 역할인가" 만 보면 된다. 웹 앱에선 JWT 의 `role` 클레임을 보고 FastAPI 의존성으로 `require_role("admin")` 처럼 거는 식이고, Kubernetes 의 Role/RoleBinding, AWS IAM 의 역할도 같은 모델이다. 병원 EMR 의 의사·간호사·원무 권한 체계가 전형적인 RBAC 이고, 여기에 "누가 어느 차트를 봤나" 감사 로그가 따라붙는다.

함정은 **역할 폭발** — 예외가 생길 때마다 `researcher_icu_2026` 식으로 역할을 쪼개다 보면 사람 수만큼 역할이 생겨 RBAC 의 의미가 사라진다. "특정 환자군만", "근무 시간에만" 같은 조건은 역할이 아니라 RLS 나 속성 기반 규칙으로 푼다.

## 헷갈리기 쉬운 것

- **ACL** 은 자원마다 "누가 뭘 할 수 있나" 목록을 붙이는 방식(파일 권한 chmod 가 그 축소판). 사용자 수 × 자원 수만큼 항목이 늘어 관리가 터진다. RBAC 은 그 사이에 "역할" 을 끼워 곱셈을 덧셈으로 바꾼 것.
- **ABAC** 은 역할 대신 속성(부서, 환자의 병동, 시간대)으로 규칙을 쓰는 방식. 더 유연하지만 "지금 누가 뭘 볼 수 있지?" 를 한눈에 답하기 어렵다. 대개 RBAC 을 뼈대로 두고 ABAC 조건을 얹는다.
- **RLS** 는 DB 가 행 단위로 거르는 "집행 장치" 다. RBAC 이 "연구원은 deid 테이블을 읽을 수 있다" 를 정하면, RLS 가 "그중 IRB 승인 코호트 행만" 을 거른다 — 층이 다르므로 같이 쓴다.
