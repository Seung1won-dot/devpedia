---
id: http-versions
term: "HTTP/1.1, 2, 3"
aliases:
  - HTTP/1.1
  - HTTP/2
  - HTTP/3
  - QUIC
  - HTTP 버전
  - 에이치티티피 버전
category: network
tags:
  - HTTP
  - 프로토콜
  - 성능
level: 2
kind: protocol
related:
  - http
  - tcp-udp
  - three-way-handshake
  - tls
  - caddy
  - latency-bandwidth
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

같은 HTTP 요청/응답을 **더 적은 왕복으로, 여러 개를 동시에** 나르도록 고쳐 온 버전들.

## 비유

식당 주문 방식의 진화. 1.1 은 **한 종업원이 주문 하나를 다 갖다 준 뒤에야 다음 주문**을 받고, 2 는 한 종업원이 여러 테이블 주문을 섞어 나르며, 3 은 주방 문(TCP)이 막히면 다 같이 기다리는 게 싫어 **다른 문(UDP)**을 새로 뚫은 것이다.

## 예시

```bash
curl -sI --http1.1 https://lab.example.com | head -1   # HTTP/1.1 200
curl -sI --http2   https://lab.example.com | head -1   # HTTP/2 200
curl -sI --http3   https://lab.example.com | head -1   # HTTP/3 200 (HTTP/3 지원 curl 빌드일 때)
# Caddy 는 설정 없이 세 버전을 다 켠다. HTTP/3 은 UDP 443 이라 방화벽에서 따로 열어야 한다
sudo ufw allow 443/udp
```

| 버전 | 바닥 | 핵심 변화 | 남은 문제 |
|---|---|---|---|
| 1.1 | TCP | keep-alive 로 연결 재사용 | 한 연결에 응답이 순서대로만 와서 앞이 늦으면 뒤가 다 밀림(HOL 블로킹). 브라우저는 도메인당 연결 6개로 버팀 |
| 2 | TCP | 한 연결에 여러 요청을 프레임 단위로 섞어 보냄(멀티플렉싱), HPACK 헤더 압축, 이진 프레임 | 패킷 하나 유실되면 TCP 가 순서를 맞추느라 모든 스트림이 같이 멈춤(TCP 단의 HOL) |
| 3 | UDP(QUIC) | 스트림마다 독립 전송이라 하나 유실돼도 나머지는 계속, TLS 1.3 내장으로 첫 연결 왕복 감소, IP 가 바뀌어도(와이파이→LTE) 연결 유지 | UDP 를 막는 망에서는 2 로 내려감 |

브라우저 개발자 도구 Network 탭의 Protocol 열에 `h2`, `h3` 로 보인다. Devpedia 처럼 작은 JS·CSS 파일이 수십 개인 SPA 는 1.1 → 2 로만 바꿔도 체감이 큰데, 1.1 시절에 파일을 하나로 합치던(번들링·스프라이트) 이유가 바로 연결 수 제한이었다.

면접에서는 "HTTP/2 의 멀티플렉싱이 뭔가?", "HTTP/3 은 왜 UDP 를 쓰나?" 로 나온다. 후자의 답은 "TCP 의 순서 보장이 HOL 블로킹을 만들고, OS 커널에 박힌 TCP 는 고치기 어려워 UDP 위에 QUIC 을 새로 만들었다".

## 헷갈리기 쉬운 것

- **HTTPS 와 HTTP/2·3**: 버전과 암호화는 다른 축이지만, 브라우저는 2·3 을 HTTPS 에서만 켜 준다. 그래서 사실상 HTTPS 가 전제.
- **keep-alive 와 멀티플렉싱**: keep-alive(1.1)는 연결을 "재사용" 하되 요청은 하나씩, 멀티플렉싱(2)은 한 연결에서 "동시에" 여럿.
- **QUIC 과 HTTP/3**: QUIC 은 UDP 위의 전송 계층 프로토콜, HTTP/3 은 그 위에 얹은 HTTP. TCP 와 HTTP/1.1 의 관계와 같다.
