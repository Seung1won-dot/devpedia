---
id: four-way-handshake
term: "4-way handshake"
aliases:
  - "4방향 핸드셰이크"
  - 포웨이 핸드셰이크
  - TCP 연결 종료
  - FIN/ACK
category: network
tags:
  - TCP/IP
  - 프로토콜
level: 2
kind: concept
related:
  - three-way-handshake
  - tcp-udp
  - port
  - http-versions
  - latency-bandwidth
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

TCP 가 연결을 닫을 때 **FIN → ACK → FIN → ACK 네 번 주고받는** 마무리 절차.

## 비유

전화를 끊을 때 "나 이제 끊을게" → "응, 알았어" → (하던 말을 마치고) "나도 끊는다" → "응" 하고 나서야 수화기를 내려놓는 것. 한쪽이 먼저 끝났어도 상대는 아직 할 말이 남았을 수 있어서 양쪽이 따로따로 끝을 알린다.

## 예시

```bash
# 연구실 서버에서 TCP 연결 상태별 개수 보기
ss -tan | awk 'NR>1 {print $1}' | sort | uniq -c
#   120 ESTAB
#   340 TIME-WAIT      ← 먼저 끊은 쪽(보통 서버·프록시)에 잔뜩 쌓인다. 정상
#     3 CLOSE-WAIT     ← 상대가 FIN 을 보냈는데 우리 앱이 close() 를 안 한 것. 버그 신호
```

순서는 이렇다. 먼저 끊는 쪽이 FIN(1)을 보내고, 받은 쪽은 일단 ACK(2)로 "알았다" 고 한 뒤 보내던 데이터를 마저 보내고 자기도 FIN(3)을 보낸다. 마지막 ACK(4)를 보낸 쪽은 바로 닫지 않고 **TIME_WAIT** 상태로 잠시(리눅스 60초) 기다린다 — 이 ACK 가 유실되면 상대가 FIN 을 다시 보낼 텐데 그때 답해 줄 사람이 있어야 하고, 늦게 도착한 옛 패킷이 같은 포트로 새로 열린 연결에 섞이는 것도 막아야 하기 때문이다. Caddy 뒤에 API 를 두면 요청마다 Caddy 가 먼저 끊어서 TIME_WAIT 이 Caddy 쪽에 쌓이는데, 그게 정상이다.

면접에서는 "연결은 3번인데 종료는 왜 4번인가?" 로 나온다. 답은 "TCP 연결은 양방향이라 각 방향을 따로 닫아야 하고, FIN 을 받은 쪽에 아직 보낼 데이터가 남아 있을 수 있어서 ACK 와 FIN 을 한 패킷에 못 합치기 때문" 이다.

## 헷갈리기 쉬운 것

- **3-way handshake** 는 여는 절차, 4-way 는 닫는 절차. 열 때는 SYN 과 ACK 를 한 패킷(SYN-ACK)에 합칠 수 있지만, 닫을 때는 남은 데이터 때문에 합치기 어렵다.
- **TIME_WAIT 과 CLOSE_WAIT**: TIME_WAIT 은 먼저 끊은 쪽이 정상적으로 기다리는 상태라 많아도 괜찮다. CLOSE_WAIT 이 쌓이면 우리 코드가 소켓을 안 닫고 있다는 뜻이다.
- **RST** 는 이 절차를 건너뛰고 연결을 강제로 끊는 패킷. 로그의 "Connection reset by peer" 가 이것.
