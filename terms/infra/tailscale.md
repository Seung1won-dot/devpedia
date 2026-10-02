---
id: tailscale
term: Tailscale/WireGuard
aliases:
  - Tailscale
  - WireGuard
  - 테일스케일
  - 와이어가드
category: infra
tags:
  - 원격접속
  - 보안통신
  - 네트워크
  - 연구실
level: 2
kind: tool
related:
  - vpn
  - ssh
  - nat
  - private-ip
  - zero-trust
  - mdns
see_also:
  - https://tailscale.com/kb
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

내 기기들끼리 **어디서든 같은 사설망에 있는 것처럼** 이어 주는 VPN.

## 비유

집·연구실·카페의 내 기기들 사이에 **전용 비밀 통로**를 뚫어 한 방에 모아 두는 것. 공유기 설정(포트포워딩)을 건드리지 않아도 방 안에서는 서로 이름만 부르면 닿는다.

## 예시

```bash
# 연구실 서버(Proxmox VM)와 집 노트북 양쪽에 설치·로그인
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up --ssh          # --ssh: SSH 인증까지 Tailscale 계정으로
tailscale status                 # 100.x.y.z 주소와 기기 이름 목록
# 집에서: 공인 IP·포트 개방 없이 서버 이름으로 바로 접속 (MagicDNS)
ssh lab@gpu-server
```

22번 포트를 인터넷에 열지 않아도 되니 무차별 대입 걱정이 사라지고, 서버가 학교 NAT 뒤에 있어도 집에서 `ssh` 와 Proxmox 웹 UI(`https://pve:8006`)가 그냥 된다.

## 헷갈리기 쉬운 것

- **WireGuard** 는 암호화 터널 프로토콜 자체(빠르고 단순), **Tailscale** 은 그 위에 키 교환·NAT 통과·로그인을 자동화한 서비스. WireGuard 를 직접 쓰면 기기마다 키·IP 를 손으로 나눠 줘야 한다.
- **기존 VPN(OpenVPN 등)**은 "서버 하나에 모두 접속" 구조라 트래픽이 거기로 몰린다. Tailscale 은 기기끼리 직접 연결(메시)이 기본이다.
