---
id: fail2ban
term: fail2ban
aliases:
  - Fail2ban
  - 페일투밴
  - 로그인 실패 IP 차단
category: security
tags:
  - 리눅스운영
  - 네트워크보안
  - 인증공격
  - 서버운영
level: 1
kind: tool
related:
  - brute-force
  - ssh
  - ssh-key
  - iptables
  - firewall
  - ids-ips
see_also:
  - https://github.com/fail2ban/fail2ban
  - https://fail2ban.readthedocs.io/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

로그를 지켜보다 **로그인 실패를 반복하는 IP 를 방화벽에서 잠시 차단**하는 도구.

## 비유

현관 비밀번호를 **다섯 번 틀린 사람을 경비원이 한 시간 동안 건물 밖으로 내보내는 것**. 깜빡한 입주민은 잠깐 기다리면 되지만, 번호를 하나씩 다 눌러 보려던 사람은 평생 걸리게 된다.

## 예시

```ini
# /etc/fail2ban/jail.local — 기본값(jail.conf)은 두고 여기서만 덮어쓴다
[DEFAULT]
ignoreip = 127.0.0.1/8 100.64.0.0/10   # 내 Tailscale 대역은 절대 차단하지 않음
findtime = 10m                          # 10분 안에
maxretry = 5                            # 5번 실패하면
bantime  = 1h                           # 1시간 차단
bantime.increment = true                # 재범이면 차단 시간이 배로 늘어남

[sshd]
enabled = true
```

```bash
sudo systemctl restart fail2ban
sudo fail2ban-client status sshd                     # 지금 차단된 IP·누적 실패 수
sudo fail2ban-client set sshd unbanip 203.0.113.7    # 비밀번호 깜빡한 동료 풀어 주기
```

동작은 세 단계다. **필터**가 `/var/log/auth.log`(또는 journald)에서 "Failed password from 1.2.3.4" 같은 줄을 정규식으로 잡고, **jail** 이 IP 별로 `findtime` 안의 실패 횟수를 세다가, `maxretry` 를 넘으면 **액션**이 iptables/nftables 에 차단 규칙을 넣는다. `bantime` 이 지나면 규칙을 다시 뺀다. sshd 말고도 Nginx 의 401 반복, Postfix 등 로그만 있으면 어떤 서비스든 jail 을 만들 수 있다.

한계도 분명하다. 실패가 쌓인 뒤에야 반응하므로 IP 를 계속 바꾸는 봇넷이나 아주 느린 공격은 그대로 들어온다. 그래서 fail2ban 은 "로그를 조용하게 만드는" 도구고, 진짜 방어는 비밀번호 로그인을 끄고(키 전용) 22번 포트를 Tailscale 뒤로 숨기는 것이다.

## 헷갈리기 쉬운 것

- **방화벽(iptables)** 은 규칙대로 막는 손이고, fail2ban 은 로그를 읽고 그 규칙을 넣었다 빼는 머리다. fail2ban 이 방화벽을 대신하지 않으며, 방화벽이 없으면 fail2ban 도 할 수 있는 게 없다.
- **IDS/IPS** 는 네트워크 패킷 자체를 들여다보며 공격 패턴을 찾는다. fail2ban 은 패킷은 전혀 모르고 애플리케이션이 남긴 로그 한 줄만 본다 — 훨씬 가볍지만 로그에 안 남는 공격은 못 본다.
- **레이트 리밋**은 애플리케이션 안에서 "성공이든 실패든 요청 수" 를 제한한다. fail2ban 은 "실패" 만 세고, 차단도 앱이 아니라 네트워크 층에서 한다.
