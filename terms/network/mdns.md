---
id: mdns
term: mDNS
aliases:
  - Multicast DNS
  - 멀티캐스트 DNS
  - ".local"
  - Bonjour
  - Avahi
  - DNS-SD
category: network
tags:
  - DNS
  - 프로토콜
  - 홈랩
level: 2
kind: protocol
related:
  - dns
  - dns-record
  - dhcp
  - tailscale
  - arp
  - subnet-cidr
see_also:
  - https://datatracker.ietf.org/doc/html/rfc6762
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

DNS 서버 없이 **같은 네트워크 안 장비끼리 `이름.local` 로 서로 찾는** 규칙.

## 비유

사무실에서 "**프린터 어디 있어요?**" 하고 외치면 프린터가 "저 여기요" 하고 직접 대답하는 것. 안내 데스크(DNS 서버)가 없어도 같은 방 안에서는 통한다.

## 예시

```bash
ping raspberrypi.local              # 라즈베리파이·맥·프린터는 IP 를 몰라도 이름으로 잡힌다
avahi-browse -art | head            # 같은 네트워크에서 광고 중인 서비스(_ssh._tcp, _ipp._tcp …)
sudo apt install avahi-daemon       # Ubuntu VM 도 gpu-server.local 로 찾히게 하려면
```

`gpu-server.local` 을 치면 내 컴퓨터가 멀티캐스트 주소(224.0.0.251, 5353번)로 "이 이름 누구?" 를 던지고, 그 이름을 가진 장비가 직접 IP 를 답한다. DHCP 로 IP 가 바뀌어도 이름은 그대로라 홈랩에서 편하다. 한계는 **라우터를 못 넘는다**는 것 — 멀티캐스트는 같은 서브넷에만 퍼지므로 집에서 Tailscale 로 들어오면 `.local` 은 안 풀린다(그래서 MagicDNS 를 쓴다). 학교 Wi-Fi 처럼 단말 간 통신을 막아 둔 망에서도 안 되고, 도커 브리지 안의 컨테이너도 기본으로는 듣지 못한다. macOS 는 Bonjour, 리눅스는 Avahi 가 이 일을 하고, Windows 도 요즘 버전은 기본 지원한다 [확인 필요].

## 헷갈리기 쉬운 것

- **DNS** 는 서버에 물어보고 인터넷 전체를 다루며, mDNS 는 서버 없이 같은 서브넷 안에서 외친다. 이름이 비슷해도 패킷이 가는 곳이 다르다.
- **`.local` 은 mDNS 전용**으로 예약된 이름. 공유기나 사내 DNS 의 내부 도메인을 `.local` 로 지으면(옛 Windows AD 관행) 둘이 충돌하니 `.lan` 이나 `.home.arpa` 를 쓴다.
- **ARP** 도 "외쳐서 찾기" 지만 IP→MAC 이고, mDNS 는 이름→IP 다.
