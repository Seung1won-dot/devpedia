---
id: oauth
term: "OAuth 2.0"
aliases:
  - OAuth2
  - 오어스
  - 오오스
  - 소셜 로그인 프로토콜
category: backend
tags:
  - 인증
  - 인가
  - 보안
level: 2
related:
  - authentication-authorization
  - jwt
  - baas
  - session-auth
  - https
see_also:
  - https://oauth.net/2/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

비밀번호 대신 **제3자 서비스가 발급한 토큰**으로 권한을 위임받는 표준 절차.

## 비유

호텔 프런트에서 주는 **발레파킹 키**. 차 주인이 마스터키(비밀번호)를 주지 않고도 "주차만 할 수 있는 키(토큰)"를 건네고, 언제든 회수할 수 있다.

## 예시

Ender Chest 의 "GitHub 로 로그인":

```ts
await supabase.auth.signInWithOAuth({
  provider: "github",
  options: { redirectTo: "https://chest.lab.example.com/auth/callback" },
})
```

흐름은 (1) 사용자를 GitHub 로그인 페이지로 보냄 → (2) 사용자가 "이 앱에 이메일 읽기 허용" 동의 → (3) GitHub 가 우리 콜백 URL 로 일회용 코드를 돌려줌 → (4) 서버가 그 코드를 액세스 토큰으로 교환. 우리 앱은 사용자의 GitHub 비밀번호를 끝까지 모른다. Supabase 가 3~4단계를 대신 처리하고 자체 JWT 를 발급해 준다.

## 헷갈리기 쉬운 것

- **OpenID Connect(OIDC)** 는 OAuth 2.0 위에 "이 사람이 누구인지(ID 토큰)" 를 얹은 것. OAuth 만으로는 엄밀히 인가(권한 위임)이고, 소셜 로그인은 OIDC 까지 쓰는 셈.
- **JWT** 는 토큰의 포장 형식, OAuth 는 토큰을 주고받는 절차.
