---
id: private-ip
term: 공인 IP/사설 IP
aliases:
  - Public IP
  - Private IP
  - 공인 아이피
  - 내부 IP
category: network
tags:
  - TCP/IP
  - 라우팅
  - 홈랩
level: 1
related:
  - ip-address
  - nat
  - subnet-cidr
  - tailscale
  - vpn
see_also:
  - https://datatracker.ietf.org/doc/html/rfc1918
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

공인 IP 는 **인터넷 전체에서 유일한 주소**, 사설 IP 는 **공유기 안에서만 통하는 주소**다.

## 비유

공인 IP 는 건물 **대표 전화번호**, 사설 IP 는 건물 안에서만 통하는 **내선 번호**. 밖에서는 대표번호로만 걸 수 있고, 내선은 같은 건물 안에서만 누를 수 있다.

## 예시

```bash
curl ifconfig.me          # 공인 IP (연구실 회선 하나에 하나)
ip -4 a | grep inet       # 사설 IP (VM 마다 하나씩, 192.168.10.x)
```

사설 IP 로 정해진 대역은 `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` 세 가지. 연구실 Proxmox VM 은 전부 `192.168.10.x` 를 갖고, 집에서 GPU 서버에 붙으려면 공인 IP 에 포트포워딩을 하거나 Tailscale 로 우회한다.

## 헷갈리기 쉬운 것

- **NAT** 는 사설 IP 여러 개가 공인 IP 하나로 밖에 나가게 해 주는 변환 동작(공유기가 한다). 사설 IP 는 주소의 종류, NAT 는 그 주소를 바꿔 주는 일.
- **고정 IP / 유동 IP** 는 "바뀌느냐"의 문제. 공인 IP 도 유동일 수 있고(가정 회선), 사설 IP 도 고정으로 줄 수 있다.
