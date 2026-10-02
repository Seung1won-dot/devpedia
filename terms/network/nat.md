---
id: nat
term: NAT
aliases:
  - Network Address Translation
  - 네트워크 주소 변환
category: network
tags:
  - TCP/IP
  - 라우팅
  - 홈랩
level: 2
kind: concept
related:
  - private-ip
  - ip-address
  - port
  - firewall
  - tailscale
  - port-forwarding
see_also:
  - https://datatracker.ietf.org/doc/html/rfc3022
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

사설 IP 여러 대가 **공인 IP 하나를 같이 쓰도록** 공유기가 주소를 바꿔 주는 기능.

## 비유

회사 **대표번호 교환원**. 직원들이 밖으로 전화하면 전부 대표번호로 나가고, 답이 오면 교환원이 "이건 3번 내선 거" 하고 기억해 뒀다가 연결해 준다.

## 예시

```bash
# Proxmox 호스트에서 VM(192.168.10.20) 의 8000번을 밖에서 들어오는 8000번에 연결
iptables -t nat -A PREROUTING -p tcp --dport 8000 -j DNAT --to 192.168.10.20:8000
```

집 공유기 관리 화면의 **포트포워딩** 메뉴가 바로 이 설정이다. 밖에서 들어오는 방향(DNAT)은 이렇게 손으로 열어야 하지만, 안에서 나가는 방향(SNAT)은 공유기가 알아서 한다. 요즘 연구실은 포트를 아예 안 열고 Tailscale 로 들어오는 편.

## 헷갈리기 쉬운 것

- **사설 IP** 는 주소 자체, NAT 는 그 주소를 공인 IP 로 바꾸는 동작. 사설 IP 가 인터넷에 나가려면 NAT 가 꼭 필요하다.
- **리버스 프록시**도 "밖에서 온 요청을 안쪽 서버로 넘긴다"는 점은 같지만, HTTP 내용을 읽고 도메인별로 나눈다. NAT 는 내용을 모르고 IP 와 포트만 본다.
