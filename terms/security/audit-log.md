---
id: audit-log
term: 감사 로그
aliases:
  - Audit Log
  - Audit Trail
  - 감사 추적
  - 접속 기록
  - 접근 기록
category: security
tags:
  - 로깅
  - 규제
  - 의료데이터
  - 접근제어
level: 2
kind: concept
related:
  - logging
  - medical-data-law
  - isms-p
  - rbac
  - emr-ehr
  - log-rotation
see_also:
  - https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

**누가 언제 어떤 데이터에 무엇을 했는지** 나중에 따질 수 있게 남기는 기록.

## 비유

병원 차트 보관실의 **열람 대장**. 차트를 꺼낸 사람·시각·이유를 적고, 대장 자체는 아무도 찢거나 고칠 수 없게 잠가 둔다.

## 예시

연구실 EMR 추출 데이터를 조회·내보내기할 때마다 한 줄씩 남긴다. 핵심은 **앱 계정이 쓸 수만 있고 고치거나 지울 수 없게** 하는 것 — 침입자가 자기 흔적을 지우지 못해야 한다.

```sql
create table audit_log (
  id      bigserial primary key,
  at      timestamptz not null default now(),
  actor   text not null,          -- 누가 (사용자 id)
  action  text not null,          -- 무엇을 (read / export / delete)
  target  text not null,          -- 어디에 (patients:1234)
  ip      inet,
  detail  jsonb
);
revoke update, delete on audit_log from labapp;   -- 앱 계정은 insert 만
```

로그인 성공·실패도 포함한다. 개인정보보호법의 안전성 확보조치 기준은 접속 기록을 1년 이상(민감정보·대량 처리 시 2년) 보관하고 월 1회 점검하라고 요구한다 [확인 필요]. ISMS-P 심사에서도 이 기록을 실제로 꺼내 보인다. 보관 기간이 끝나기 전에 로그 로테이션으로 지워지지 않도록 따로 아카이브한다.

## 헷갈리기 쉬운 것

- **애플리케이션 로그**는 개발자가 디버깅하려고 남기는 것이라 레벨로 거르고 며칠 뒤 지워도 된다. 감사 로그는 "책임을 묻기 위한" 기록이라 빠짐없이, 못 고치게, 오래 남긴다.
- **모니터링**은 지금 시스템이 멀쩡한지 보는 지표(CPU, 응답시간). 감사 로그는 과거에 사람이 한 행위의 기록.
- **접근 제어(RBAC)** 는 못 하게 막는 것, 감사 로그는 한 것을 남기는 것. 둘 다 있어야 "권한 있는 사람이 권한을 남용했는지" 까지 잡힌다.
