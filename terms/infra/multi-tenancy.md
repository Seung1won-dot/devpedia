---
id: multi-tenancy
term: 멀티테넌시
aliases:
  - Multi-tenancy
  - 멀티 테넌시
  - 멀티테넌트
  - 테넌트 격리
category: infra
tags:
  - 아키텍처
  - 클라우드
  - 접근제어
  - 보안
level: 3
kind: concept
related:
  - rls
  - iaas-paas-saas
  - sharding
  - rbac
  - vpc
  - iam
see_also:
  - https://www.postgresql.org/docs/current/ddl-rowsecurity.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

시스템 하나를 **여러 고객(테넌트)이 같이 쓰되 서로의 데이터는 못 보게** 나누는 구조.

## 비유

**오피스텔 건물**. 건물·엘리베이터·경비(서버·DB·인증)는 공유하지만 각 호실은 자기 열쇠로만 열리고, 옆집 소음이 넘어오면(성능 간섭) 문제가 된다.

## 예시

```sql
-- 공유 테이블 방식: 모든 행에 tenant_id, RLS 로 자기 테넌트 행만 보이게 DB 가 강제
ALTER TABLE patients ADD COLUMN tenant_id uuid NOT NULL;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON patients
  USING (tenant_id = current_setting('app.tenant_id')::uuid);

-- API 가 요청마다 JWT 의 테넌트 클레임을 세션에 심는다
SET app.tenant_id = '6b1e4d2a-0000-4000-8000-00000000a001';
SELECT count(*) FROM patients;   -- A 병원 환자만 센다, WHERE 를 빼먹어도
```

다기관 연구 플랫폼이라면 격리 수준을 골라야 한다. 1) **공유 DB + tenant_id 컬럼**(가장 싸고 흔함, RLS 필수), 2) **테넌트별 스키마/DB**(섞일 위험은 줄고 마이그레이션은 N 배), 3) **테넌트별 전용 인스턴스/VPC**(규제·대형 고객용, 비용도 N 배). 공유 모델은 운영비가 1/N 이지만 한 테넌트의 무거운 쿼리가 모두를 느리게 하고(noisy neighbor), 조건 하나 빼먹으면 곧바로 데이터 유출이라 DB 층에서 RLS 로 막는다. 병원 간 데이터가 섞이면 안 되면 2·3번이 설명하기 쉽지만, 사용자 열 명·기관 한 곳인 연구실 내부 도구에 미리 설계하는 것은 과하다 — 두 번째 기관이 생길 때 tenant_id 를 넣어도 늦지 않다.

## 헷갈리기 쉬운 것

- **멀티유저**는 사용자가 여럿인 것(모든 웹앱). 멀티테넌트는 **조직 단위**로 데이터·설정·과금이 분리되는 것.
- **샤딩**은 성능 때문에 데이터를 쪼개는 것, 멀티테넌시는 격리 때문에 나누는 것. 테넌트를 샤딩 키로 써서 겹치기도 한다.
- **VM/컨테이너 격리**는 인프라 층의 분리, 멀티테넌시는 같은 앱 안에서 데이터 층을 나누는 설계다.
