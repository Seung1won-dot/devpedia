---
id: jwt
term: JWT
aliases:
  - JSON Web Token
  - 제이더블유티
  - 제이슨 웹 토큰
  - 조트
category: backend
tags:
  - 인증
  - 세션
  - 보안
level: 2
kind: protocol
related:
  - session-auth
  - authentication-authorization
  - oauth
  - digital-signature
  - rls
  - refresh-token
see_also:
  - https://datatracker.ietf.org/doc/html/rfc7519
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

사용자 정보를 **서명해 담은 토큰**으로, 서버가 저장 없이 검증하는 인증 방식.

## 비유

위조 방지 도장이 찍힌 **놀이공원 손목밴드**. 밴드에 이름·등급이 적혀 있고 도장(서명)만 확인하면 되니, 직원이 명단(서버 저장소)을 뒤질 필요가 없다.

## 예시

Supabase 가 로그인 후 주는 `access_token` 이 JWT 다. `헤더.페이로드.서명` 세 부분이 점으로 이어져 있고, 페이로드를 풀면:

```json
{ "sub": "42f0…(사용자 uuid)", "role": "authenticated", "email": "user@example.com", "exp": 1790000000 }
```

이후 요청마다 헤더에 실어 보낸다:

```http
GET /rest/v1/items HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOi…
```

RLS 는 이 토큰의 `sub` 를 `auth.uid()` 로 꺼내 "내 행"을 판단한다. 페이로드는 **암호화가 아니라 인코딩(base64)** 이라 누구나 열어볼 수 있고, 서명은 위조만 막는다 — 비밀번호 같은 걸 넣으면 안 된다.

## 헷갈리기 쉬운 것

- **세션 인증**은 서버가 상태를 기억하므로 로그아웃 즉시 무효화가 쉽다. JWT 는 만료(`exp`)까지 유효해서 강제 무효화가 어렵다 → 짧은 만료 + 리프레시 토큰으로 보완.
- **OAuth 2.0** 은 "권한을 위임하는 절차"고, JWT 는 "토큰의 형식". OAuth 결과로 받은 액세스 토큰이 JWT 일 수도, 아닐 수도 있다.
