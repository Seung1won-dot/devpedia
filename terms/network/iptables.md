---
id: iptables
term: iptables/nftables
aliases:
  - iptables
  - nftables
  - nft
  - netfilter
  - 리눅스 방화벽
  - 패킷 필터링
category: network
tags:
  - 네트워크보안
  - 리눅스운영
  - 서버운영
level: 2
kind: tool
related:
  - firewall
  - nat
  - port-forwarding
  - docker-network
  - fail2ban
  - kernel
see_also:
  - https://wiki.nftables.org/
  - https://www.netfilter.org/projects/iptables/index.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

리눅스 커널의 패킷 필터(netfilter)에 **방화벽·NAT 규칙을 넣는 명령줄 도구**.

## 비유

경비원(방화벽)이 들고 있는 **출입 규칙 수첩에 직접 글을 쓰는 펜**. ufw 나 Proxmox 방화벽 화면은 그 수첩을 대신 써 주는 비서이고, 결국 수첩에는 iptables/nft 문장이 적힌다.

## 예시

```bash
sudo iptables -L -n -v --line-numbers   # 지금 규칙 전부 (ufw·Docker·Tailscale 이 넣은 것도 다 보인다)
sudo iptables -t nat -L -n              # NAT 테이블: docker -p 매핑이 DNAT 규칙으로 들어가 있다
sudo nft list ruleset                   # nftables 식으로 보기
# PostgreSQL 5432 는 연구실 대역에서만 (Docker 컨테이너 앞에 거는 체인)
sudo iptables -I DOCKER-USER -p tcp --dport 5432 ! -s 192.168.10.0/24 -j DROP
sudo apt install iptables-persistent && sudo netfilter-persistent save   # 재부팅 후에도 남기기
```

규칙은 테이블(filter·nat·mangle)과 체인(INPUT·OUTPUT·FORWARD·PREROUTING·POSTROUTING)에 줄 세워 들어가고, 패킷은 위에서 아래로 훑다가 **처음 맞는 규칙**에서 끝난다. 저장하지 않으면 재부팅 때 사라진다. Docker 가 ufw 를 우회하는 이유가 여기 있다 — Docker 는 자기 체인(DOCKER)을 FORWARD 앞에 끼워 넣기 때문에, 컨테이너로 가는 트래픽을 막으려면 그보다 먼저 평가되는 `DOCKER-USER` 체인에 적어야 한다. nftables 는 iptables 의 후속으로 문법이 다르고(`nft add rule …`), Ubuntu 22.04 등 요즘 배포판은 iptables 명령도 속으로 nftables 규칙으로 바꿔 넣는다 [확인 필요].

## 헷갈리기 쉬운 것

- **ufw** 는 iptables 를 쉽게 쓰게 해 주는 껍데기. 둘을 섞어 만지면 꼬이니 서버 하나에서는 한 가지 방식만 쓴다.
- **nftables vs iptables**: 같은 netfilter 위의 두 명령. 옛 문서는 iptables, 새 문서는 nft 라 둘 다 읽을 줄 알면 되고, 새로 짤 땐 nft 를 권한다.
- **Proxmox 방화벽·클라우드 보안 그룹**은 VM 바깥(호스트나 네트워크)에서 거는 벽. VM 안의 iptables 와 별개라 둘 다 열려야 통한다.
