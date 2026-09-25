---
id: proxmox
term: Proxmox
aliases:
  - Proxmox VE
  - 프록스목스
  - PVE
category: infra
tags:
  - 가상화
  - 홈랩
  - 서버운영
level: 1
related:
  - hypervisor
  - vm
  - lxc
  - snapshot-backup
  - homelab
see_also:
  - https://pve.proxmox.com/pve-docs/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

웹 화면에서 **VM 과 LXC 컨테이너를 만들고 관리**하는 무료 가상화 OS.

## 비유

컴퓨터 한 대를 **여러 방이 있는 하숙집**으로 바꿔 주는 관리인. 브라우저에서 방(VM)을 새로 만들고, 잠그고, 사진(스냅샷) 찍어 두는 일을 클릭 몇 번으로 한다.

## 예시

```bash
# Proxmox 호스트 셸에서 Ubuntu VM 만들기 (ID 101, 8GB RAM, 4코어, 32GB 디스크)
qm create 101 --name web --memory 8192 --cores 4 --net0 virtio,bridge=vmbr0
qm set 101 --scsi0 local-lvm:32 --cdrom local:iso/ubuntu-24.04-live-server-amd64.iso
qm start 101
# 같은 일을 LXC 컨테이너로 — 훨씬 가볍다 (템플릿 이름은 `pveam list local` 로 확인)
pct create 201 local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst --hostname caddy --memory 1024
```

웹 UI(`https://서버IP:8006`)에서도 똑같이 할 수 있고, 연구실에서는 GPU 실험은 VM, Caddy·DB 같은 가벼운 상시 서비스는 LXC 로 나눠 올린다.

## 헷갈리기 쉬운 것

- **VMware ESXi** 는 같은 역할의 상용 제품. Proxmox 는 오픈소스(Debian 기반)라 홈랩·연구실에서 많이 쓴다.
- **Docker** 는 Proxmox 를 대체하지 않는다. 보통 Proxmox 로 VM/LXC 를 만들고 그 안에 Docker 를 설치한다.
