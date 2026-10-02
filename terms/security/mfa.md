---
id: mfa
term: 2FA/MFA
aliases:
  - Multi-Factor Authentication
  - 다중 인증
  - 2단계 인증
  - 2FA
category: security
tags:
  - 인증
  - 인증공격
level: 1
kind: concept
related:
  - authentication-authorization
  - phishing
  - brute-force
  - password-hashing
  - ssh
  - social-engineering
see_also:
  - https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

비밀번호 외에 **다른 종류의 증거를 하나 더** 내야 로그인되는 방식.

## 비유

은행 **금고**는 비밀번호도 알아야 하고 열쇠도 갖고 있어야 열린다. 둘 중 하나만 훔쳐서는 못 열기 때문에, 비밀번호가 새도 계정은 버틴다.

## 예시

연구실 GitHub 조직은 Settings → Authentication security 에서 "Require two-factor authentication" 을 켜 두고, 각자 계정이 켜져 있는지 확인한다.

```bash
gh api user -q '.two_factor_authentication'   # true 여야 한다
```

Proxmox 웹 UI 도 Datacenter → Permissions → Two Factor 에서 TOTP(인증 앱 6자리) 를 켤 수 있다 [확인 필요: 메뉴 경로]. 증거의 종류는 "아는 것(비밀번호)·가진 것(폰, 하드웨어 키)·나인 것(지문)" 이고, 문자(SMS)보다 인증 앱, 인증 앱보다 하드웨어 키가 안전하다.

## 헷갈리기 쉬운 것

- **2FA 와 MFA** 는 같은 개념이다. 2FA 는 "정확히 두 종류", MFA 는 "두 종류 이상".
- **2단계 ≠ 2요소**. 비밀번호를 두 번 묻는 건 2단계지만 둘 다 "아는 것" 이라 요소는 하나다. 종류가 달라야 MFA.
