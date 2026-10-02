---
id: brute-force
term: 브루트포스
aliases:
  - Brute-force Attack
  - 무차별 대입 공격
  - 브루트포스
  - 사전 공격
category: security
tags:
  - 인증공격
  - 비밀번호
level: 1
kind: concept
related:
  - password-hashing
  - mfa
  - rate-limit
  - ssh
  - salt
see_also:
  - https://community.owasp.org/attacks/Brute_force_attack
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

비밀번호를 **될 때까지 하나씩 다 넣어보는** 공격.

## 비유

자물쇠 번호를 **0000 부터 9999 까지** 전부 돌려 보는 것. 막으려면 몇 번 틀리면 잠기게 하거나, 자릿수를 늘려 평생 걸리게 만든다.

## 예시

인터넷에 열린 SSH 포트에는 하루에도 수천 번 로그인 시도가 들어온다. fail2ban 으로 "5번 틀리면 1시간 차단" 을 걸고, 비밀번호 로그인 자체를 끈다.

```bash
sudo apt install fail2ban
sudo tee /etc/fail2ban/jail.local <<'CONF'
[sshd]
enabled  = true
maxretry = 5
bantime  = 1h
CONF
sudo systemctl restart fail2ban
sudo fail2ban-client status sshd        # 현재 차단된 IP 목록
```

`/etc/ssh/sshd_config` 에 `PasswordAuthentication no` 를 넣어 키로만 접속하게 하면 추측할 비밀번호 자체가 없어진다. 웹 로그인은 레이트 리밋과 MFA 가 같은 역할.

## 헷갈리기 쉬운 것

- **사전 공격**은 아무 조합이나가 아니라 "자주 쓰는 비밀번호 목록" 부터 넣어 보는 브루트포스의 똑똑한 버전. `password123` 이 위험한 이유.
- **크리덴셜 스터핑**은 다른 사이트에서 유출된 아이디·비밀번호 쌍을 그대로 넣어 보는 것. 사이트마다 다른 비밀번호를 써야 하는 이유.
