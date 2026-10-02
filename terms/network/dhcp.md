---
id: dhcp
term: DHCP
aliases:
  - Dynamic Host Configuration Protocol
  - 동적 호스트 설정 프로토콜
  - IP 자동 할당
  - DHCP 예약
category: network
tags:
  - TCP/IP
  - 프로토콜
  - 홈랩
  - 서버운영
level: 1
kind: protocol
related:
  - ip-address
  - gateway
  - private-ip
  - mac-address
  - dns
  - subnet-cidr
see_also:
  - https://datatracker.ietf.org/doc/html/rfc2131
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

네트워크에 새로 붙은 장비에 **IP 주소와 접속 설정을 자동으로 나눠 주는** 규칙.

## 비유

식당 입구의 **번호표 기계**. 빈 번호(IP)를 하나 뽑아 주면서 화장실·계산대 위치(게이트웨이·DNS)까지 알려 주고, 손님이 나가면 그 번호를 다음 사람에게 다시 쓴다.

## 예시

```bash
ip -4 addr show eth0    # inet 192.168.10.23/24 ... scope global dynamic  ← dynamic 이면 DHCP 로 받은 것
sudo dhclient -v eth0   # 임대(lease) 다시 받기: DISCOVER → OFFER → REQUEST → ACK 순서가 로그에 찍힌다
```

노트북을 연구실 Wi-Fi 에 붙이면 아무 설정 없이 인터넷이 되는 게 DHCP 덕이다. 받은 IP 는 임대 기간(보통 몇 시간~며칠)이 있어 그 안에 갱신하지 않으면 회수된다. 서버는 IP 가 바뀌면 SSH 설정·Caddy·Tailscale 서브넷 라우팅이 다 흔들리므로, 공유기 DHCP 메뉴에서 서버 MAC 주소에 특정 IP 를 묶어 두는 **DHCP 예약**을 걸거나 아예 고정 IP 를 쓴다.

## 헷갈리기 쉬운 것

- **고정 IP** 는 장비 쪽에 직접 적어 두는 것, **DHCP 예약**은 서버가 "이 MAC 엔 항상 이 번호"로 기억하는 것. 결과는 같지만 예약 쪽이 한 화면에서 관리되어 편하다.
- **DNS** 는 이름→IP 변환, DHCP 는 IP 자체를 나눠 주는 것. DHCP 가 "DNS 서버는 여기야"라고 같이 알려 주기 때문에 늘 붙어 다닌다.
- 같은 네트워크에 DHCP 서버가 둘(공유기 + 실수로 켠 VM 의 dnsmasq)이면 장비마다 다른 대역을 받아 접속이 들쭉날쭉해진다 — 홈랩 단골 사고.
