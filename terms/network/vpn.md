---
id: vpn
term: VPN
aliases:
  - Virtual Private Network
  - 가상 사설망
  - 브이피엔
category: network
tags:
  - 보안통신
  - 원격접속
  - 네트워크보안
level: 1
kind: concept
related:
  - tailscale
  - private-ip
  - tls
  - firewall
  - ssh
see_also:
  - https://tailscale.com/kb/1151/what-is-tailscale
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

인터넷 위에 **암호화된 전용 통로**를 만들어 밖에서도 내부망에 있는 것처럼 쓰게 하는 기술.

## 비유

집과 회사 사이에 놓은 **나만 다니는 비밀 터널**. 밖(카페 와이파이)에 있어도 터널로 들어가면 회사 책상에 앉은 것과 똑같이 사내 자료를 본다.

## 예시

```bash
# Tailscale: 연구실 GPU 서버와 내 노트북을 한 사설망으로 묶기
sudo tailscale up
tailscale status            # 100.x.x.x 주소 목록
ssh me@gpu-server           # MagicDNS 이름으로 바로 접속
```

연구실은 공유기 포트를 안 열고 Tailscale(WireGuard 기반)로 Proxmox 웹·Ollama·Grafana 에 접속한다. 학교 도서관 논문 DB 를 집에서 보게 해 주는 학교 VPN 도 같은 원리.

## 헷갈리기 쉬운 것

- **Tailscale** 은 VPN 의 한 종류로, 장비끼리 직접 잇는 그물형이다. 전통 VPN 은 중앙 서버 하나를 거쳐 모든 트래픽이 흐른다.
- **프록시**는 특정 앱(브라우저)의 요청만 대신 보내고 암호화가 필수도 아니다. VPN 은 OS 전체 트래픽을 통째로 터널에 넣는다.
