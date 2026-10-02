---
id: port
term: 포트
aliases:
  - Port
  - 포트 번호
  - TCP 포트
category: network
tags:
  - TCP/IP
  - 프로토콜
  - 서버운영
level: 1
kind: concept
related:
  - ip-address
  - tcp-udp
  - firewall
  - reverse-proxy
  - docker-compose
  - port-mapping
see_also:
  - https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

한 컴퓨터 안에서 **어느 프로그램에게 온 데이터인지** 구분하는 0~65535 번호.

## 비유

IP 가 **아파트 주소**라면 포트는 **호수**. 같은 건물에 왔어도 101호(웹)인지 202호(SSH)인지 정해야 배달이 된다.

## 예시

```yaml
# docker-compose.yml — 호스트 8080 → 컨테이너 80 (왼쪽:오른쪽)
services:
  web:
    image: nginx
    ports:
      - "8080:80"
```

```bash
ss -tlnp          # 지금 열려 있는 포트와 그걸 듣고 있는 프로그램
```

자주 보는 번호: 22(SSH) 80(HTTP) 443(HTTPS) 5432(PostgreSQL) 8006(Proxmox 웹) 11434(Ollama). 1024 아래는 관리자만 열 수 있어서 개발 서버는 3000, 5173, 8000 같은 번호를 쓴다.

## 헷갈리기 쉬운 것

- **IP 주소**는 "어느 컴퓨터", 포트는 "그 컴퓨터의 어느 프로그램". `192.168.10.20:8000` 처럼 항상 붙어 다닌다.
- **방화벽에서 포트를 연다**는 건 그 번호로 오는 데이터를 통과시킨다는 뜻이지, 프로그램이 저절로 뜨는 게 아니다. 프로그램이 그 포트를 듣고(listen) 있어야 응답이 온다.
