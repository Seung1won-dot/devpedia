---
id: tcp-udp
term: TCP/UDP
aliases:
  - Transmission Control Protocol
  - User Datagram Protocol
  - 티씨피
  - 유디피
category: network
tags:
  - TCP/IP
  - 프로토콜
  - 면접
level: 1
kind: protocol
related:
  - three-way-handshake
  - port
  - http
  - osi-model
  - websocket
  - http-versions
  - congestion-control
see_also:
  - https://datatracker.ietf.org/doc/html/rfc9293
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

TCP 는 **빠짐없이 순서대로** 보내는 방식, UDP 는 **확인 없이 빨리** 던지는 방식이다.

## 비유

TCP 는 **등기 우편**(받았는지 확인하고, 못 받았으면 다시 보냄), UDP 는 **전단지 뿌리기**(몇 장 날아가도 신경 안 쓰고 빠르게).

## 예시

```bash
curl https://api.lab.example.com/health   # HTTP → TCP 443
dig @1.1.1.1 example.com                  # DNS 조회 → UDP 53
```

웹·SSH·DB 접속은 거의 다 TCP. 영상 통화, 게임, DNS 처럼 "늦게 오느니 한두 개 빠뜨리는 게 낫다" 싶은 곳이 UDP 다. Tailscale 이 쓰는 WireGuard 도 UDP 위에서 돈다.

## 헷갈리기 쉬운 것

- **HTTP** 는 TCP 위에서 도는 상위 규칙. TCP 가 "편지가 안전하게 도착하게" 하고, HTTP 가 "편지에 뭘 어떻게 쓸지" 정한다. HTTP/3 는 예외로 UDP(QUIC) 위에서 돈다.
- **IP** 는 한 층 아래로, 어느 컴퓨터까지 갈지만 정한다. TCP/UDP 가 포트 번호로 어느 프로그램인지까지 정한다.
