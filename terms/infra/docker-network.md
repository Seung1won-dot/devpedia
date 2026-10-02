---
id: docker-network
term: 도커 네트워크
aliases:
  - Docker Network
  - bridge 네트워크
  - host 네트워크
  - 컨테이너 네트워크
  - docker network
category: infra
tags:
  - 컨테이너
  - 네트워크
  - DNS
level: 2
kind: concept
related:
  - docker
  - docker-compose
  - port-mapping
  - nat
  - dns
  - private-ip
see_also:
  - https://docs.docker.com/engine/network/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

컨테이너끼리 **이름으로 통신하는 가상 내부망**으로, 밖과는 포트 매핑으로만 통한다.

## 비유

회사 **내선 전화망**. 같은 회사(네트워크) 직원끼리는 이름(내선)으로 바로 걸지만, 외부 전화는 대표번호(포트 매핑)를 거쳐야만 들어온다.

## 예시

```yaml
# compose.yml — Caddy 만 밖에 노출, DB 는 내부망에만
services:
  caddy:
    image: caddy:2
    ports: ["80:80", "443:443"]
    networks: [front]
  api:
    build: .
    networks: [front, back]      # 양쪽에 발을 걸침
  db:
    image: postgres:16
    networks: [back]             # ports: 없음 — 호스트에서도 안 보임
networks:
  front:
  back:
```

```bash
docker network ls                       # bridge / host / none + 프로젝트별 네트워크
docker exec api getent hosts db         # 내장 DNS 가 'db' 를 컨테이너 IP 로 풀어 준다
```

Caddyfile 에는 `reverse_proxy api:8000`, API 의 DB 주소는 `postgres://db:5432/...` 처럼 **서비스 이름**을 쓴다. Compose 는 프로젝트마다 `bridge` 드라이버로 사설 대역(172.x)의 네트워크를 만들고 내장 DNS 로 이름을 풀어 주며, 밖으로 나갈 때는 호스트가 NAT 해 준다. 기본 `bridge`(docker0) 에는 이 이름 풀이가 없어서 `docker run` 으로 따로 띄운 컨테이너끼리는 이름으로 못 찾는다. `network_mode: host` 는 격리 없이 호스트 네트워크를 그대로 쓰는 것으로, 포트 매핑이 필요 없는 대신 포트 충돌을 직접 피해야 하며 mDNS 처럼 호스트 인터페이스가 필요할 때 쓴다.

## 헷갈리기 쉬운 것

- **포트 매핑**은 네트워크 밖(호스트·인터넷)에서 들어오는 문, 도커 네트워크는 안에서 서로 통하는 길. DB 처럼 밖에서 닿을 필요 없는 것은 네트워크에만 넣고 포트는 안 연다.
- **컨테이너 안의 localhost** 는 그 컨테이너 자신이지 호스트가 아니다. 호스트의 서비스에 붙으려면 `host.docker.internal`(Linux 는 `extra_hosts` 로 `host-gateway` 지정) 을 쓴다.
- **Proxmox 의 vmbr 브리지**도 같은 개념의 가상 스위치지만 VM 을 잇고, 도커 네트워크는 한 VM 안의 컨테이너를 잇는다. 두 사설 대역이 겹치면 통신이 끊긴다.
