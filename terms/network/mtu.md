---
id: mtu
term: MTU
aliases:
  - Maximum Transmission Unit
  - 최대 전송 단위
  - MSS
  - 점보 프레임
  - 단편화(Fragmentation)
  - PMTUD
category: network
tags:
  - TCP/IP
  - 성능
  - 네트워크
  - 홈랩
level: 2
kind: concept
related:
  - packet
  - tcp-udp
  - vpn
  - tailscale
  - latency-bandwidth
  - ipv4-ipv6
see_also:
  - https://datatracker.ietf.org/doc/html/rfc1191
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

한 번에 보낼 수 있는 **패킷 하나의 최대 크기**(바이트)로, 이더넷은 보통 1500.

## 비유

택배 회사의 **상자 최대 크기 규정**. 더 큰 짐은 여러 상자로 나눠야(단편화) 하고, 중간 집하장 하나라도 작은 상자만 받는 곳이면 거기서 짐이 멈춘다.

## 예시

```bash
ip link show eth0 | grep mtu          # mtu 1500
ip link show tailscale0 | grep mtu    # mtu 1280  ← VPN 은 암호화 겉봉투만큼 작아진다
ping -M do -s 1472 192.168.10.20      # 1472 + 헤더 28 = 1500. 성공하면 이 경로는 1500 OK
ping -M do -s 1473 192.168.10.20      # "message too long" 이 뜨면 1500 이 한계
```

MTU 가 문제일 때 증상이 독특하다: ping 도 되고 SSH 로그인도 되는데 **큰 파일 전송이나 웹페이지 로딩만 중간에 멈춘다**. 작은 패킷은 통과하고 큰 패킷만 어딘가에서 조용히 버려지기 때문인데, VPN·PPPoE 구간에서 자주 난다. 해결은 인터페이스 MTU 를 낮추거나(1400 등) 라우터에서 MSS 를 깎아 주는 것. 반대로 NAS↔GPU 서버처럼 같은 스위치 안에서 큰 데이터를 옮길 땐 MTU 9000(점보 프레임)으로 헤더 비율을 줄여 처리량을 올리기도 하는데, 경로의 모든 장비가 9000 을 지원해야 한다.

## 헷갈리기 쉬운 것

- **MSS** 는 그 안에 들어가는 TCP 데이터의 최대 크기. 1500 에서 IP·TCP 헤더 40 을 뺀 1460 이 보통값이다.
- **대역폭**은 초당 얼마나 많이, MTU 는 봉투 하나가 얼마나 크냐. MTU 를 키운다고 선이 빨라지진 않고 헤더 낭비가 줄 뿐이다.
- **단편화**: IPv4 는 중간 라우터가 큰 패킷을 쪼개 줄 수 있지만 IPv6 는 보내는 쪽이 경로 MTU(PMTUD)를 알아내 맞춰야 한다. 그래서 ICMP 를 막아 두면 IPv6 쪽이 더 자주 멈춘다.
