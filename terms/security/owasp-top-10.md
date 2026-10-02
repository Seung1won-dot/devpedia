---
id: owasp-top-10
term: OWASP Top 10
aliases:
  - OWASP Top 10
  - 오와스프 탑텐
  - 웹 취약점 Top 10
  - OWASP
category: security
tags:
  - 웹취약점
  - 보안정책
level: 2
kind: protocol
related:
  - sql-injection
  - xss
  - csrf
  - cve
  - authentication-authorization
see_also:
  - https://owasp.org/www-project-top-ten/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

웹 앱에서 **가장 흔하고 위험한 취약점 유형 10가지**를 정리한 목록.

## 비유

보건소가 해마다 내는 **"올해 가장 조심할 질병 10가지"**. 병을 다 알 수는 없어도 이 열 개는 예방접종처럼 기본으로 챙긴다.

## 예시

가장 최근 판은 2025 판이다. 연구실 웹 프로젝트에 그대로 대입해 보면 체크리스트가 된다.

- A01 접근 통제 실패 → Supabase RLS 켰나, service_role 키가 프론트에 없나
- A02 보안 설정 오류 → Proxmox·DB 기본 비밀번호, 불필요하게 열린 포트
- A03 소프트웨어 공급망 실패 → `npm audit`, 락파일 커밋, 출처 모르는 패키지 금지
- A04 암호화 실패 → 비밀번호는 bcrypt/argon2, 통신은 HTTPS
- A05 인젝션 → SQL 파라미터 바인딩, React 이스케이프 우회 금지
- A07 인증 실패 → MFA, fail2ban, 레이트 리밋

나머지는 A06 안전하지 않은 설계, A08 소프트웨어·데이터 무결성 실패, A09 로깅·경보 실패, A10 예외 상황 처리 미흡.

## 헷갈리기 쉬운 것

- **CVE** 는 특정 제품의 개별 결함 번호. Top 10 은 "이런 종류의 실수가 흔하다" 는 유형 분류라, 코드를 짜기 전에 보는 쪽.
- **OWASP ASVS** 는 같은 단체가 만든 훨씬 상세한 검증 기준표. Top 10 은 입문용 요약, ASVS 는 감사·체크리스트용.
