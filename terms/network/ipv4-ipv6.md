---
id: ipv4-ipv6
term: IPv4/IPv6
aliases:
  - Internet Protocol version 4
  - Internet Protocol version 6
  - 아이피 버전 4
  - 아이피 버전 6
  - IPv6 주소
category: network
tags:
  - TCP/IP
  - 라우팅
  - 프로토콜
level: 2
kind: protocol
related:
  - ip-address
  - nat
  - private-ip
  - subnet-cidr
  - dns
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

IPv4 는 **32비트 주소(약 43억 개)**, IPv6 는 그 고갈을 풀려고 만든 **128비트 주소**다.

## 비유

IPv4 는 **8자리 전화번호**라 가입자가 늘자 번호가 바닥났고, IPv6 는 자릿수를 왕창 늘린 새 번호 체계다. 그동안은 회사 대표번호 하나에 내선(NAT)을 붙여 버텨 왔다.

## 예시

```bash
ip -4 a | grep inet       # inet 192.168.10.20/24       ← IPv4: 점으로 나눈 4덩이(각 0~255)
ip -6 a | grep inet6      # inet6 2001:db8:10::20/64    ← IPv6: 콜론으로 나눈 8덩이 16진수
curl -4 https://ifconfig.me    # 공인 IPv4
curl -6 https://ifconfig.me    # IPv6 로 나갈 수 있는 회선이면 응답이 온다
```

IPv6 표기는 `2001:0db8:0000:0000:0000:0000:0000:0020` 처럼 길어서, 각 덩이 앞의 0 을 지우고 연속된 0 덩이는 `::` 로 한 번만 줄여 `2001:db8::20` 으로 쓴다. URL 에 넣을 때는 포트와 헷갈리지 않게 `http://[2001:db8::20]:8000` 처럼 대괄호로 감싼다. 주소가 넉넉하니 NAT 없이 장비마다 공인 주소를 줄 수 있고, 헤더도 단순해졌다.

현실은 **듀얼 스택** — 서버와 회선이 두 주소를 다 갖고, 브라우저는 DNS 에서 AAAA(IPv6)와 A(IPv4)를 둘 다 받아 되는 쪽으로 붙는다. 연구실 내부망과 Proxmox VM 은 여전히 IPv4 만 쓰고, Tailscale 이 붙여 주는 100.x 주소도 IPv4 대역(CGNAT 용 `100.64.0.0/10`)이다. 국내는 이동통신망 쪽 IPv6 비중이 높은 편이다 [확인 필요].

면접에서는 "IPv4 주소가 부족하다는데 어떻게 아직 쓰고 있나?" 로 나온다. 답은 "NAT + 사설 IP 로 공인 IP 하나를 여러 대가 나눠 쓰며 버티고, IPv6 로 서서히 옮겨 가는 중" 이다.

## 헷갈리기 쉬운 것

- **NAT** 는 IPv4 고갈을 "버티는" 임시방편이고, IPv6 는 주소 자체를 늘린 "해결책". IPv6 에서는 원칙적으로 NAT 가 필요 없다.
- **사설 IP** 와 IPv6 는 별개. IPv6 에도 내부용 대역(`fc00::/7`)이 있지만, 굳이 안 써도 될 만큼 주소가 남는다.
- **`::1`** 은 IPv6 의 localhost(`127.0.0.1` 에 해당). `localhost` 가 `::1` 로 먼저 풀려서 IPv4 만 듣는 서버에 연결이 안 되는 사고가 종종 난다.
