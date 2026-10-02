---
id: router-switch
term: 라우터/스위치
aliases:
  - Router
  - Switch
  - 라우터
  - 스위치
  - 공유기
  - L2 스위치/L3 스위치
category: network
tags:
  - 네트워크장비
  - 라우팅
  - 홈랩
level: 1
kind: concept
related:
  - gateway
  - mac-address
  - ip-address
  - subnet-cidr
  - nat
  - osi-model
see_also:
  - https://www.cloudflare.com/learning/network-layer/what-is-a-router/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

스위치는 **같은 네트워크 안** 장비끼리, 라우터는 **다른 네트워크 사이**를 이어 주는 장비.

## 비유

스위치는 아파트 **한 동의 복도**라서 같은 동 이웃집엔 바로 간다. 라우터는 **단지 정문 경비실**이라 다른 동이나 바깥으로 갈 때 반드시 거친다.

## 예시

```bash
ip route | head -1   # default via 192.168.10.1 dev eth0 → 이 주소가 라우터(공유기)
ip neigh             # 같은 스위치에 꽂힌 이웃 장비들의 IP ↔ MAC 목록
```

연구실 랙은 Proxmox 호스트·NAS·GPU 서버가 8포트 스위치 하나에 꽂혀 있고, 그 스위치가 공유기(라우터)에 연결된다. VM 끼리 주고받는 트래픽은 스위치 안에서 끝나고, 인터넷이나 학교망으로 나갈 때만 라우터를 거친다. 집에서 쓰는 "공유기"는 라우터 + 스위치 + 무선 AP + DHCP 서버가 한 상자에 들어간 것이다.

## 헷갈리기 쉬운 것

- **허브**는 받은 것을 모든 포트에 그대로 뿌리고, 스위치는 MAC 주소를 외워 두었다가 해당 포트로만 보낸다. 요즘 파는 건 거의 다 스위치.
- **L3 스위치**는 라우팅까지 하는 스위치라 라우터와 경계가 흐리다. 데이터센터 안에서 VLAN 사이를 빠르게 이을 때 쓴다.
- **게이트웨이**는 장비 이름이 아니라 역할 — 내 PC 입장에서 "밖으로 나가는 첫 라우터"를 부르는 말이다.
