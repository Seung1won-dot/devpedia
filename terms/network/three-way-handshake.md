---
id: three-way-handshake
term: "3-way handshake"
aliases:
  - "3방향 핸드셰이크"
  - 쓰리웨이 핸드셰이크
  - TCP 핸드셰이크
  - SYN/SYN-ACK/ACK
category: network
tags:
  - TCP/IP
  - 프로토콜
level: 2
related:
  - tcp-udp
  - port
  - tls
  - latency-bandwidth
  - osi-model
see_also:
  - https://datatracker.ietf.org/doc/html/rfc9293
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

TCP 가 연결을 열 때 **SYN → SYN-ACK → ACK 세 번 주고받는** 준비 절차.

## 비유

전화 걸 때 "여보세요" → "네, 말씀하세요" → "아 네, 접니다" 하고 나서야 용건을 꺼내는 것. 양쪽 다 듣고 있다는 걸 확인해야 본론을 시작한다.

## 예시

```bash
# GPU 서버에서 Ollama 포트로 오는 핸드셰이크를 눈으로 보기
sudo tcpdump -i any port 11434 -n
# 출력에 [S] → [S.] → [.] 세 줄이 먼저 찍힌 뒤에야 데이터가 흐른다
curl http://localhost:11434/api/tags
```

연결마다 이 왕복이 필요해서 지연시간이 큰 곳(해외 서버)에서는 요청 하나에도 체감이 난다. HTTP 가 한 연결을 여러 요청에 재사용(keep-alive)하는 이유가 이것.

## 헷갈리기 쉬운 것

- **TLS 핸드셰이크**는 이 다음에 이어지는 별도 단계(암호화 열쇠 맞추기). TCP 3번 + TLS 몇 번이 끝나야 HTTPS 요청이 나간다.
- **UDP** 는 핸드셰이크가 아예 없다. 그래서 빠르지만 상대가 듣고 있는지 모른 채 보낸다.
