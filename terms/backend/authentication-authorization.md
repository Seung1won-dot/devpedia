---
id: authentication-authorization
term: 인증/인가
aliases:
  - Authentication / Authorization
  - AuthN/AuthZ
  - 인증과 권한 부여
  - 로그인과 권한
category: backend
tags:
  - 인증
  - 인가
  - 보안
level: 1
kind: concept
related:
  - session-auth
  - jwt
  - oauth
  - rls
  - least-privilege
  - api-key
  - iam
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

**인증은 누구인지 확인**, **인가는 무엇을 해도 되는지 확인**하는 단계.

## 비유

회사 정문의 **사원증 확인(인증)**과 그 사원증으로 **열리는 문이 정해진 것(인가)**. 사원증이 진짜여도 서버실 문은 안 열릴 수 있다.

## 예시

Ender Chest(Supabase) 의 두 단계:

```ts
// 인증: 이메일+비밀번호로 "누구인지" 확인 → 세션(JWT) 발급
const { data, error } = await supabase.auth.signInWithPassword({ email, password })
```

```sql
-- 인가: RLS 정책 — 로그인했어도 "내 행"만 보인다
create policy "own rows" on items
  for select using (auth.uid() = owner_id);
```

로그인(인증)은 통과했지만 남의 행을 읽으면 0건이 돌아온다(인가에서 걸림). HTTP 로는 인증 실패가 **401**, 인가 실패가 **403**.

## 헷갈리기 쉬운 것

- **401 Unauthorized** 는 이름과 달리 "인증이 안 됨(누군지 모름)", **403 Forbidden** 이 "인가 실패(누군지는 알지만 권한 없음)".
- **세션/JWT** 는 인증 결과를 다음 요청까지 기억시키는 수단이고, **RLS·최소 권한 원칙**은 인가 쪽 도구.
