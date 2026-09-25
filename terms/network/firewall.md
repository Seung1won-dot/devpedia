---
id: firewall
term: 방화벽
aliases:
  - Firewall
  - 파이어월
  - ufw
  - 패킷 필터
category: network
tags:
  - 네트워크보안
  - 보안정책
  - 서버운영
level: 1
related:
  - port
  - ip-address
  - nat
  - least-privilege
  - ssh
see_also:
  - https://documentation.ubuntu.com/server/how-to/security/firewalls/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

정해 둔 규칙에 따라 **들어오고 나가는 통신을 막거나 허용하는** 문지기.

## 비유

건물 **출입구 경비원**. "택배는 1층 창구(80/443)로만, 관리자는 뒷문(22)으로 사원증 있을 때만, 나머지는 전부 돌려보내" 라는 목록대로 문을 열고 닫는다.

## 예시

```bash
# Ubuntu VM 기본 세팅: 다 막고 필요한 것만 연다
sudo ufw default deny incoming
sudo ufw allow from 100.64.0.0/10 to any port 22   # SSH 는 Tailscale 대역에서만
sudo ufw allow 80,443/tcp                           # Caddy
sudo ufw enable
sudo ufw status numbered
```

Proxmox 도 데이터센터·노드·VM 3단계로 방화벽을 따로 건다. 클라우드에서는 "보안 그룹(Security Group)" 이 같은 역할.

## 헷갈리기 쉬운 것

- **NAT/포트포워딩**은 길을 "연결"하는 것이고, 방화벽은 그 길을 "허가"하는 것. 포트포워딩을 했는데 안 되면 방화벽이 막고 있는지 먼저 본다.
- **Docker 는 ufw 를 우회**한다. `ports: "5432:5432"` 를 적으면 ufw 에서 안 열어도 밖에서 접속되니, DB 는 `127.0.0.1:5432:5432` 로 묶어 둔다.
