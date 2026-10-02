---
id: sso
term: SSO/SAML
aliases:
  - Single Sign-On
  - 싱글 사인온
  - 통합 로그인
  - SAML
  - OIDC
  - OpenID Connect
category: security
tags:
  - 인증
  - 접근제어
  - 프로토콜
level: 2
kind: protocol
related:
  - oauth
  - authentication-authorization
  - mfa
  - jwt
  - rbac
  - iam
see_also:
  - https://openid.net/developers/how-connect-works/
  - https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

한 번 로그인하면 **여러 서비스에 다시 로그인 없이** 들어가게 해 주는 방식.

## 비유

놀이공원 **자유이용권 팔찌**. 입구에서 신분 확인을 한 번 받고 팔찌를 차면, 놀이기구마다 신분증을 다시 꺼내지 않고 팔찌만 보여 준다.

## 예시

학교 포털에 한 번 로그인하면 메일·도서관·LMS 가 그냥 열리는 것이 SSO 다. 등장인물은 둘 — 신원을 확인해 주는 **IdP**(Identity Provider, 학교 인증 서버·Google Workspace·Okta)와, 그 결과를 믿고 문을 열어 주는 **SP**(Service Provider, 각 서비스). 흐름은 (1) SP 가 사용자를 IdP 로 보냄 → (2) IdP 에서 로그인(여기서 MFA) → (3) IdP 가 "이 사람 맞음" 이라고 서명한 증명서를 SP 에 돌려줌 → (4) SP 가 서명을 확인하고 자기 세션을 만든다. 두 번째 서비스에 가면 IdP 에 이미 세션이 있어 2단계가 생략되고 바로 증명서가 날아온다 — 그래서 "한 번만 로그인".

증명서 포맷이 두 갈래다. **SAML** 은 XML 문서를 브라우저 POST 로 넘기는 오래된 표준으로 학교·기업 시스템에 많고, **OIDC** 는 OAuth 2.0 위에서 JWT(ID 토큰) 를 넘기는 쪽으로 요즘 앱·모바일의 기본값이다.

```bash
# OIDC 를 지원하는 IdP 는 이 주소 하나로 필요한 엔드포인트가 다 나온다
curl -s https://accounts.google.com/.well-known/openid-configuration \
  | jq '{authorization_endpoint, token_endpoint, jwks_uri}'
```

연구실 규모에선 Authentik·Keycloak 같은 셀프호스팅 IdP 를 하나 띄우고 Grafana·Proxmox(OpenID Connect realm)·자체 FastAPI 앱을 전부 거기에 붙이는 식이다. 대신 IdP 가 뚫리면 전부 뚫리므로 IdP 계정엔 MFA 가 필수고, 한 곳에서 로그아웃해도 다른 SP 세션은 살아 있을 수 있다(Single Logout 은 생각보다 잘 안 된다)는 점을 알고 써야 한다.

## 헷갈리기 쉬운 것

- **OAuth 2.0** 은 "내 대신 이 API 를 써도 된다" 는 권한 위임이지 "이 사람이 누구다" 가 아니다. 그 위에 ID 토큰을 얹어 로그인 용도로 만든 것이 **OIDC** 고, "구글로 로그인" 버튼은 OIDC 다.
- **SSO vs SAML/OIDC**: SSO 는 사용자 경험(한 번만 로그인)의 이름이고, SAML 과 OIDC 는 그것을 구현하는 프로토콜이다. 같은 역할을 SAML 은 IdP/SP, OIDC 는 OP/RP 라고 부른다.
- **MFA** 는 IdP 가 "한 번" 확인할 때 얼마나 꼼꼼히 하느냐의 문제, SSO 는 그 한 번의 확인을 여러 곳에 실어 나르는 문제. SSO 에 MFA 가 없으면 비밀번호 하나로 모든 서비스가 열린다.
