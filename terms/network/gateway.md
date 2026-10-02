---
id: gateway
term: 게이트웨이
aliases:
  - Gateway
  - Default Gateway
  - 기본 게이트웨이
  - 디폴트 게이트웨이
category: network
tags:
  - 라우팅
  - TCP/IP
  - 홈랩
level: 1
kind: concept
related:
  - router-switch
  - ip-address
  - subnet-cidr
  - dhcp
  - nat
  - private-ip
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

내 네트워크 **밖으로 나가는 패킷이 제일 먼저 가는** 라우터의 주소.

## 비유

집 **현관문**. 집 안(같은 네트워크)에서는 방끼리 바로 오가지만, 어디로 가든 바깥으로 나갈 땐 일단 현관문을 거친다.

## 예시

```bash
ip route | head -1       # default via 192.168.10.1 dev eth0  ← 기본 게이트웨이
ping -c 3 192.168.10.1   # 여기까지는 되는데 인터넷이 안 되면 공유기 바깥쪽 문제
```

Windows 에서는 `ipconfig` 의 "기본 게이트웨이" 줄이 같은 값이다. 보통 DHCP 가 IP 와 함께 알려 주지만, 서버에 고정 IP 를 손으로 넣을 때 게이트웨이를 빼먹으면 **같은 랙의 장비와는 통신되는데 `apt update` 만 안 되는** 전형적인 증상이 난다. 내 PC 는 서브넷 마스크로 목적지가 같은 네트워크인지 보고, 아니면 무조건 게이트웨이로 던진다.

## 헷갈리기 쉬운 것

- **라우터**는 장비이고, 게이트웨이는 그 장비가 내 입장에서 맡는 역할(출구). 집 공유기는 라우터이자 기본 게이트웨이다.
- **API 게이트웨이**는 전혀 다른 뜻 — 여러 백엔드 API 앞에 서는 단일 입구 서버. 이름만 같다.
- **프록시**는 HTTP 수준에서 요청을 대신 보내 주는 것, 게이트웨이는 IP 수준에서 패킷이 지나가는 통로.
