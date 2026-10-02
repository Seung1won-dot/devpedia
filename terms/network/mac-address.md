---
id: mac-address
term: MAC 주소
aliases:
  - MAC Address
  - Media Access Control Address
  - 맥 주소
  - 물리 주소
  - 하드웨어 주소
category: network
tags:
  - TCP/IP
  - 네트워크장비
  - 네트워크
level: 1
kind: concept
related:
  - ip-address
  - arp
  - router-switch
  - dhcp
  - osi-model
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

네트워크 카드마다 공장에서 새겨 나오는 **48비트짜리 고유 하드웨어 주소**.

## 비유

IP 주소가 바꿔 달 수 있는 **자동차 번호판**이라면, MAC 주소는 차체에 찍힌 **차대번호**. 같은 주차장(네트워크) 안에서 "저 차"를 콕 집어낼 때 쓴다.

## 예시

```bash
ip link show eth0                 # link/ether a0:36:9f:12:34:56
cat /sys/class/net/eth0/address   # 같은 값
wakeonlan a0:36:9f:12:34:56       # 꺼진 GPU 서버를 MAC 으로 깨우기 (Wake-on-LAN)
```

Windows 는 `ipconfig /all` 의 "물리적 주소" 줄이다. 앞 3바이트(`a0:36:9f`)는 제조사 코드(OUI)라 "이거 Intel 랜카드네" 가 보인다. 공유기의 DHCP 예약, 폐쇄망의 MAC 허용 목록, Wake-on-LAN 이 전부 이 값을 키로 쓴다. 패킷이 라우터를 넘어갈 때마다 겉봉투(프레임)는 새로 싸이므로 **도착지 MAC 은 구간마다 바뀌고 IP 는 끝까지 그대로**다.

## 헷갈리기 쉬운 것

- **IP 주소**는 네트워크 전체에서 길을 찾는 주소(3계층), MAC 은 같은 구간 안에서 장비를 집는 주소(2계층). 둘을 잇는 게 ARP 다.
- "공장 고정"이지만 바꿀 수 있다 — 스마트폰은 Wi-Fi 마다 **랜덤 MAC** 을 쓰고, `ip link set dev eth0 address ...` 로 바꾸는 것도 가능해서 MAC 필터링은 보안책으로 약하다.
