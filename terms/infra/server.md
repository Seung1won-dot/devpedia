---
id: server
term: 서버
aliases:
  - Server
  - 서버 컴퓨터
  - 호스트
category: infra
tags:
  - 서버운영
  - 리눅스운영
level: 1
related:
  - on-premise-vs-cloud
  - port
  - ssh
  - homelab
  - api
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

다른 컴퓨터의 **요청을 받아 처리해 주는** 역할을 맡은 컴퓨터나 프로그램.

## 비유

식당의 **주방**. 손님(클라이언트)이 주문(요청)을 넣으면 주방이 만들어 내보내고, 손님은 주방이 어디 있는지 몰라도 된다.

## 예시

```bash
# 연구실 서버에 들어가서 뭐가 돌고 있는지 보기
ssh lab@10.0.0.10
hostnamectl        # OS·커널·호스트명
ss -tlnp           # 어떤 프로그램이 어느 포트를 열고 기다리는지
uptime             # 켜진 지 얼마나 됐는지, 부하
```

`ss -tlnp` 에 뜨는 것들(sshd 22, caddy 443, ollama 11434)이 이 컴퓨터를 "서버"로 만드는 프로그램들이다 — 하드웨어가 특별해서가 아니라 "받아 주는 역할"을 하니까 서버다.

## 헷갈리기 쉬운 것

- **클라이언트**는 요청을 보내는 쪽. 같은 노트북도 브라우저를 열면 클라이언트, `python -m http.server` 를 띄우면 서버다.
- **호스트**는 네트워크에 붙은 컴퓨터 전부를 부르는 말. 서버는 그중 "받아 주는 역할"을 맡은 것.
