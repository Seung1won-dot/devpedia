---
id: arp
term: ARP
aliases:
  - Address Resolution Protocol
  - 주소 결정 프로토콜
  - ARP 테이블
  - ARP 캐시
  - ip neigh
category: network
tags:
  - TCP/IP
  - 프로토콜
  - 네트워크장비
level: 2
kind: protocol
related:
  - mac-address
  - ip-address
  - router-switch
  - gateway
  - subnet-cidr
  - packet
see_also:
  - https://datatracker.ietf.org/doc/html/rfc826
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

같은 네트워크 안에서 **IP 주소로 상대의 MAC 주소를 알아내는** 규칙.

## 비유

강의실에서 "**학번 20231234 누구예요?**" 하고 외치면 당사자만 손을 드는 것. 그 얼굴(MAC)을 적어 두면 다음부턴 묻지 않고 바로 찾아간다.

## 예시

```bash
ip neigh                      # 192.168.10.1 dev eth0 lladdr 3c:7c:3f:aa:bb:cc REACHABLE  ← ARP 테이블
sudo tcpdump -i eth0 -n arp   # Request who-has 192.168.10.20 tell 192.168.10.5
                              # Reply 192.168.10.20 is-at a0:36:9f:12:34:56
sudo ip neigh flush dev eth0  # 캐시 비우기 (서버 MAC 이 바뀌었는데 안 잡힐 때)
```

IP 는 길을 찾는 주소지만 실제 케이블과 스위치는 MAC 으로만 배달하므로, 같은 서브넷 안에서 패킷을 보내려면 먼저 "이 IP 의 MAC 이 뭐냐" 를 전체에게(브로드캐스트) 물어야 한다. 목적지가 다른 네트워크면 상대가 아니라 **게이트웨이의 MAC** 을 묻는다. 연구실에서 겪는 장면: Proxmox 에서 VM 을 백업으로 복원해 MAC 은 바뀌고 IP 는 그대로일 때, 공유기가 옛 MAC 을 몇 분간 기억하고 있어 "ping 이 안 되다가 갑자기 된다". 두 장비가 같은 IP 를 주장하면 ARP 응답이 뒤섞여 접속이 들쭉날쭉해진다(IP 충돌).

## 헷갈리기 쉬운 것

- **DNS** 는 이름→IP 를 인터넷 전체에서, ARP 는 IP→MAC 을 같은 서브넷 안에서만. 둘 다 "주소 변환" 이지만 층이 다르다.
- **ARP 스푸핑**은 "그 IP 내 거야" 하고 거짓 응답을 보내 트래픽을 가로채는 공격. 공용 Wi-Fi 에서 HTTPS 가 아니면 위험한 이유 중 하나.
- **IPv6** 에는 ARP 가 없고 같은 역할을 NDP(Neighbor Discovery)가 한다. `ip -6 neigh` 로 본다.
