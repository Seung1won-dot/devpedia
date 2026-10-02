---
id: homelab
term: 홈랩
aliases:
  - Homelab
  - 홈 서버
  - 자택 서버
category: infra
tags:
  - 홈랩
  - 서버운영
  - 가상화
level: 1
kind: concept
related:
  - proxmox
  - on-premise-vs-cloud
  - tailscale
  - snapshot-backup
  - docker-compose
  - nas
  - ups
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

집(또는 연구실)에 **내 서버를 직접 꾸며 배우고 굴리는** 개인 인프라.

## 비유

요리를 배우려고 집에 차린 **작은 주방**. 식당(회사 인프라)만큼 크진 않지만 불도 내 보고 칼도 써 보면서 몸으로 익힌다.

## 예시

```bash
# 1) 중고 미니PC 에 Proxmox 설치 → 2) LXC 로 Caddy, VM 으로 Docker 호스트
pct create 201 local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst --hostname caddy --memory 512
qm create 101 --name docker-host --memory 8192 --cores 4 --net0 virtio,bridge=vmbr0
# 3) Tailscale 로 밖에서 접속, 4) 매일 새벽 백업 (크론이나 웹 UI 로 예약)
tailscale up
vzdump --all --storage nas-backup --mode snapshot --compress zstd
```

위 넉 줄이 곧 "홈랩 4종 세트"(가상화·컨테이너·원격접속·백업)이고, 연구실 서버도 결국 큰 홈랩이라 집에서 한 번 굴려 본 사람은 연구실 서버 운영을 금방 맡을 수 있다.

## 헷갈리기 쉬운 것

- **NAS** 는 파일 저장이 주목적인 기기(Synology 등). 홈랩은 NAS 를 포함해 VM·컨테이너·네트워크까지 굴리는 "환경" 이다.
- **온프레미스**는 기업이 자기 데이터센터를 두는 것. 홈랩은 그 축소판이자 연습장.
