---
id: ping-traceroute
term: ping/traceroute
aliases:
  - ping
  - traceroute
  - tracert
  - mtr
  - ICMP
  - 핑
category: network
tags:
  - 네트워크
  - TCP/IP
  - 리눅스운영
  - 흔한실수
level: 1
kind: tool
related:
  - latency-bandwidth
  - ip-address
  - gateway
  - firewall
  - dns
  - packet
see_also:
  - https://man7.org/linux/man-pages/man8/ping.8.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

ping 은 **상대가 응답하는지와 왕복 시간**을, traceroute 는 **거쳐 가는 경로**를 보는 도구.

## 비유

ping 은 산에서 "**야호**" 하고 외쳐 메아리가 돌아오는지, 몇 초 걸리는지 재는 것. traceroute 는 택배 **배송 조회** 화면처럼 물건이 거쳐 간 집하장을 순서대로 보여 주는 것.

## 예시

```bash
ping -c 4 192.168.10.20        # 연구실 GPU 서버: time=0.3 ms 안팎이면 정상, 집에서 Tailscale 로는 20~40 ms
ping -c 4 gpu-server           # IP 로는 되는데 이름으로 안 되면 네트워크가 아니라 DNS 문제
traceroute 1.1.1.1             # 홉마다 라우터 주소와 시간. Windows 는 tracert
mtr -r -c 20 lab.example.com   # ping + traceroute 합본: 홉별 손실률까지 한 표로
```

둘 다 ICMP 라는 작은 제어 패킷을 쓴다. 장애가 나면 "내 게이트웨이 → 공유기 바깥 → 목적지" 순으로 ping 범위를 넓혀 가며 어느 구간에서 끊기는지 좁힌다. 단, 클라우드·학교망·병원 폐쇄망은 ICMP 를 아예 막아 두는 곳이 많아서 **ping 이 안 와도 서버는 멀쩡할 수 있다**. 그럴 땐 `nc -zv gpu-server 22` 나 `curl` 처럼 실제 포트를 두드려 본다. traceroute 에서 `* * *` 로 찍히는 홉도 대개 죽은 게 아니라 응답을 안 해 주는 것이다.

## 헷갈리기 쉬운 것

- **ping 과 포트 확인**: ping 에는 포트 개념이 없다. "ping 은 되는데 접속이 안 된다" 는 방화벽이 막거나 프로그램이 안 떠 있는 문제이지 네트워크 단절이 아니다.
- **지연시간**은 재는 값이고 ping 은 재는 도구인데, 게임에서 "핑 높다"고 할 만큼 도구 이름이 값의 별명이 됐다.
- **traceroute 와 tracert**: 리눅스 traceroute 는 기본으로 UDP 를, Windows tracert 는 ICMP 를 보낸다. 방화벽 정책에 따라 한쪽만 통과하기도 해서 결과가 다를 수 있다.
