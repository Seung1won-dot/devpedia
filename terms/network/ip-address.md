---
id: ip-address
term: IP 주소
aliases:
  - IP Address
  - Internet Protocol Address
  - 아이피 주소
  - 아이피
category: network
tags:
  - TCP/IP
  - 라우팅
  - 네트워크
level: 1
kind: concept
related:
  - subnet-cidr
  - private-ip
  - port
  - dns
  - nat
  - ipv4-ipv6
  - bgp
see_also:
  - https://developer.mozilla.org/ko/docs/Glossary/IP_Address
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

인터넷에 연결된 **장비마다 붙는 번호 주소**로, 데이터가 찾아갈 목적지를 나타낸다.

## 비유

집마다 붙는 **도로명 주소**. 택배(데이터)가 배달되려면 받는 집 주소가 있어야 하듯, 컴퓨터끼리 데이터를 보내려면 상대 IP 를 알아야 한다.

## 예시

```bash
ip -4 a                    # 내 IP 확인 (리눅스)
ping 192.168.10.1          # 연구실 Proxmox 호스트에 닿는지 확인
ssh me@100.101.102.103     # Tailscale 이 붙여 준 IP 로 GPU 서버 접속
```

`192.168.10.1` 처럼 점으로 나눈 4덩이 숫자가 IPv4, `2001:db8::1` 처럼 콜론으로 나눈 긴 주소가 IPv6 다. 주소가 모자라서 IPv6 가 나왔지만 연구실 안에서는 아직 IPv4 만 봐도 된다.

## 헷갈리기 쉬운 것

- **MAC 주소**는 랜카드에 공장에서 새겨진 번호로, 같은 공유기 아래에서만 쓰인다. IP 는 네트워크를 넘나드는 주소이고 접속 장소에 따라 바뀐다.
- **도메인**(`lab.example.com`)은 사람이 외우기 쉬운 이름일 뿐이고, 실제 배달은 DNS 가 바꿔 준 IP 로 간다.
