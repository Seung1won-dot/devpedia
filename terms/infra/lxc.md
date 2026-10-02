---
id: lxc
term: LXC 컨테이너
aliases:
  - Linux Containers
  - 리눅스 컨테이너
  - LXC
  - CT
category: infra
tags:
  - 컨테이너
  - 가상화
level: 2
kind: tool
related:
  - vm
  - docker
  - proxmox
  - kernel
  - virtualization
  - linux-distro
see_also:
  - https://linuxcontainers.org/lxc/introduction/
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

호스트 커널을 같이 쓰면서 **리눅스 한 대처럼 통째로** 격리된 가벼운 컨테이너.

## 비유

한 집(커널)의 **셰어하우스 방**. 부엌·보일러(커널)는 공용이지만 각 방은 자기 침대·책상(파일·프로세스·IP)을 따로 갖고 문을 잠근다.

## 예시

```bash
# Proxmox 에서 Debian LXC 만들고 들어가기
pct create 201 local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst \
  --hostname caddy --memory 1024 --cores 2 --net0 name=eth0,bridge=vmbr0,ip=dhcp
pct start 201
pct enter 201            # 컨테이너 안 셸로 — systemd, apt 가 다 있다
pct snapshot 201 clean   # 설정 만지기 전에 스냅샷
```

Caddy·Pi-hole 같은 상시 서비스는 VM 보다 LXC 로 올리면 메모리를 몇백 MB 만 먹고 부팅도 1초다 — Proxmox 에서 "CT" 라고 부르는 게 이것.

## 헷갈리기 쉬운 것

- **Docker** 는 "앱 하나"를 담는 컨테이너(프로세스 하나가 기본, systemd 없음). LXC 는 "OS 한 대"를 담아서 안에서 apt 로 여러 서비스를 설치한다.
- **VM** 은 커널까지 따로 돌린다. GPU 패스스루·윈도우·커널 모듈이 필요하면 VM, 아니면 LXC 가 가볍다.
