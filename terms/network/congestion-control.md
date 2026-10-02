---
id: congestion-control
term: TCP 혼잡 제어
aliases:
  - Congestion Control
  - 혼잡 제어
  - 슬로 스타트
  - CUBIC
  - BBR
  - 혼잡 윈도우(cwnd)
category: network
tags:
  - TCP/IP
  - 성능
  - 프로토콜
  - 면접
level: 3
kind: concept
related:
  - tcp-udp
  - three-way-handshake
  - latency-bandwidth
  - http-versions
  - packet
  - mtu
see_also:
  - https://datatracker.ietf.org/doc/html/rfc5681
  - https://datatracker.ietf.org/doc/html/rfc9438
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

TCP 가 **망이 막히는 낌새를 보고 보내는 속도를 스스로 줄이고 늘리는** 방식.

## 비유

고속도로 **진입로 신호등**. 앞이 막히는 기색(패킷 손실, 지연 증가)이 보이면 차를 천천히 들여보내고, 뚫리면 조금씩 더 보낸다.

## 예시

```bash
sysctl net.ipv4.tcp_congestion_control             # = cubic (리눅스 기본)
sysctl net.ipv4.tcp_available_congestion_control   # cubic reno bbr …
sudo sysctl -w net.ipv4.tcp_congestion_control=bbr # 바꿔 보기 (재부팅 전까지)
ss -tin | grep -oE "cubic|bbr|cwnd:[0-9]+|rtt:[0-9.]+"   # 연결별 알고리즘·혼잡 윈도우·RTT
```

연결은 작게 시작해(초기 cwnd 10개 안팎) 왕복마다 두 배로 키우다가(**슬로 스타트**), 어느 선부터는 하나씩만 늘리고(혼잡 회피), 손실이 감지되면 확 줄인다. 그래서 새 연결은 처음 몇 왕복 동안 선 속도를 못 쓰고, HTTP 가 연결을 재사용(keep-alive, HTTP/2)하는 이유가 된다. 연구실 장면: 양쪽 다 1Gbps 인데 집→연구실 Tailscale 로 100GB 데이터셋을 받으면 몇십 Mbps 에서 멈춘다. 왕복 시간이 길고 손실이 조금만 있어도 CUBIC 은 "막혔다" 고 보고 윈도우를 줄이기 때문이다. 트레이드오프: **BBR** 은 손실 대신 실제 대역폭×지연을 재서 긴 경로·무선에서 훨씬 빠르지만, 같은 선을 쓰는 CUBIC 연결을 밀어낼 수 있어 연구실 랙 안(짧고 깨끗한 경로)에서는 기본값으로 둬도 충분하다.

## 헷갈리기 쉬운 것

- **흐름 제어(flow control)** 는 받는 쪽 버퍼가 넘치지 않게 하는 것(rwnd), 혼잡 제어는 중간 망이 막히지 않게 하는 것(cwnd). 실제 보내는 양은 둘 중 작은 쪽.
- **슬로 스타트는 느리지 않다** — 지수적으로 커진다. "느린" 건 출발점이 작다는 뜻.
- **UDP 에는 혼잡 제어가 없다.** 그래서 QUIC(HTTP/3)·WebRTC 는 UDP 위에 혼잡 제어를 직접 구현하고, 아무 제어 없이 UDP 를 쏘는 프로그램은 남의 트래픽을 밀어낸다.
