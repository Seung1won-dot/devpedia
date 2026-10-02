---
id: refresh-token
term: 리프레시 토큰
aliases:
  - Refresh Token
  - 재발급 토큰
  - 갱신 토큰
  - 액세스 토큰/리프레시 토큰
category: backend
tags:
  - 인증
  - 세션
  - 보안
level: 2
kind: concept
related:
  - jwt
  - oauth
  - session-auth
  - token-storage
  - session-hijacking
  - cookie-vs-session
see_also:
  - https://datatracker.ietf.org/doc/html/rfc6749#section-1.5
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

짧게 만료되는 액세스 토큰을 **다시 로그인 없이 새로 받기 위한** 수명 긴 토큰.

## 비유

놀이공원의 **하루 입장권(리프레시)** 과 **놀이기구 1회권(액세스)**. 1회권은 금방 쓰고 사라지지만 입장권을 보여 주면 매표소에서 또 받아 올 수 있고, 입장권이 정지되면 그날은 아무것도 못 탄다.

## 예시

액세스 토큰은 15분, 리프레시 토큰은 2주처럼 수명을 다르게 두고, 액세스 토큰이 만료되면 클라이언트가 조용히 재발급을 요청한다.

```http
POST /auth/refresh HTTP/1.1
Cookie: refresh_token=8f3c9a…

HTTP/1.1 200 OK
Set-Cookie: refresh_token=1a9b7e…; HttpOnly; Secure; SameSite=Strict; Path=/auth/refresh
Content-Type: application/json

{ "access_token": "eyJhbGciOi…", "expires_in": 900 }
```

서버는 리프레시 토큰(의 해시)을 DB 에 저장해 두므로 **원할 때 폐기**할 수 있다 — JWT 의 "만료 전엔 강제 무효화가 어렵다"는 약점을 여기서 메운다. 쓸 때마다 새 토큰으로 바꿔 주고(회전), 이미 쓴 옛 토큰이 또 들어오면 도난으로 보고 그 사용자의 토큰을 전부 폐기한다. 리프레시 토큰은 `/auth/refresh` 한 곳에만 가면 되니 `Path` 를 좁힌 HttpOnly 쿠키에 두고, 액세스 토큰은 메모리에 들고 다니는 조합이 흔하다. Supabase 클라이언트는 이 갱신을 자동으로 해 준다.

## 헷갈리기 쉬운 것

- **액세스 토큰**은 API 요청마다 붙이고 서버가 저장하지 않는 짧은 토큰. 리프레시 토큰은 재발급 요청에만 쓰고 서버가 저장하는 긴 토큰. 역할이 달라서 유출됐을 때의 피해 범위도 다르다.
- **세션 ID** 와 닮았다. 리프레시 토큰을 DB 에 저장하는 순간 서버는 상태를 갖게 되므로, "JWT 는 무상태라 좋다"는 장점 일부를 포기하고 폐기 가능성을 얻는 트레이드오프다.
- **OAuth 의 리프레시 토큰**은 이 개념이 처음 정의된 곳(RFC 6749)이고, 자체 로그인 시스템도 같은 이름과 아이디어를 빌려 쓴다.
