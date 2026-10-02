---
id: ssh
term: SSH
aliases:
  - Secure Shell
  - 시큐어 셸
  - 에스에스에이치
category: infra
tags:
  - 원격접속
  - 보안통신
  - 리눅스운영
  - 연구실
level: 1
kind: protocol
related:
  - port
  - firewall
  - public-key-cryptography
  - vpn
  - scp-rsync
  - dotfiles
  - tmux
see_also:
  - https://www.openssh.com/manual.html
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

다른 컴퓨터의 터미널에 **암호화된 통신으로 원격 접속**하는 방법.

## 비유

연구실 서버 앞에 앉는 대신 **도청 안 되는 전화선**으로 키보드를 연결하는 것. 집에서 치는 명령이 그대로 연구실 컴퓨터에서 실행된다.

## 예시

```bash
# 1) 내 노트북에서 키 쌍 만들고 공개키를 서버에 등록
ssh-keygen -t ed25519 -C "may@laptop"
ssh-copy-id lab@10.0.0.10
# 2) 서버에서 비밀번호 로그인 끄기 → 키 없으면 아예 못 들어옴
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh
# 3) 별명 등록 → 이제 `ssh lab` 한 줄
printf 'Host lab\n    HostName 10.0.0.10\n    User lab\n' >> ~/.ssh/config
```

키 로그인만 남기면 22번 포트가 인터넷에 열려 있어도 비밀번호 무차별 대입이 통하지 않는다 — 그래도 서버는 Tailscale 뒤에 두고 방화벽에서 22번을 닫는 편이 더 안전하다.

## 헷갈리기 쉬운 것

- **TLS/HTTPS** 도 암호화 통신이지만 브라우저-웹 서버용이고 CA 가 발급한 인증서를 쓴다. SSH 는 터미널용이고 내가 만든 키 쌍을 서버에 직접 등록한다.
- **VPN** 은 네트워크 전체를 잇는 것. SSH 는 컴퓨터 한 대의 셸에 들어가는 것이라, 보통 VPN 으로 연구실 망에 들어간 뒤 SSH 로 서버에 붙는다.
