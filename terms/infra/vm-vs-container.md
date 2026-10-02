---
id: vm-vs-container
term: VM vs 컨테이너
aliases:
  - VM vs Container
  - 가상 머신과 컨테이너 비교
  - 가상머신 대 컨테이너
  - 컨테이너와 VM 의 차이
category: infra
tags:
  - 가상화
  - 컨테이너
level: 2
kind: concept
related:
  - vm
  - docker
  - lxc
  - hypervisor
  - kernel
  - virtualization
  - proxmox
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

VM 은 **OS 를 통째로** 따로 올리고, 컨테이너는 **호스트 커널을 같이 쓰며** 프로세스만 격리한다.

## 비유

VM 은 한 땅에 지은 **독채 여러 채**(각자 기초·배관·보일러 = OS), 컨테이너는 한 건물 안의 **원룸 여러 개**(배관·보일러 = 커널은 공용, 방문만 따로 잠금). 독채는 튼튼하지만 짓는 데 오래 걸리고, 원룸은 금방 들어가지만 보일러가 터지면 다 같이 춥다.

## 예시

```bash
# Proxmox 호스트에서 셋을 나란히 — 기동 시간과 크기 차이가 바로 보인다
time qm start 101 && qm guest exec 101 -- uname -r     # VM: 수십 초. 게스트 커널 버전은 VM 마음대로
time pct start 201 && pct exec 201 -- uname -r         # LXC: 1초 안팎. 커널 버전 = 호스트와 동일
time docker run --rm alpine uname -r                   # Docker: 1초 미만. 역시 호스트 커널
docker images alpine                                   # 이미지 약 8MB (VM 디스크는 수 GB)
```

| | VM | LXC | Docker |
|---|---|---|---|
| 격리 수단 | 하이퍼바이저(하드웨어 층) | 커널 네임스페이스·cgroup | 커널 네임스페이스·cgroup |
| 안에 든 것 | 커널 + OS 전체 | OS 유저 공간(systemd, apt) | 앱 하나 + 라이브러리 |
| 기동 | 수십 초 | 1초 | 1초 미만 |
| 크기 | 수 GB | 수백 MB | 수십 MB |
| 격리 강도 | 가장 강함(커널 취약점에도 안전) | 중간 | 중간(커널 공유가 약점) |
| 다른 OS | 윈도우도 됨 | 리눅스만 | 리눅스만 |

연구실의 실제 배치가 그대로 답이다. GPU 패스스루·커널 모듈·윈도우가 필요한 실험은 **VM**, Caddy·Pi-hole 처럼 OS 한 대처럼 굴리는 상시 서비스는 **LXC**, Ollama·Postgres·Grafana 처럼 앱 단위로 갈아 끼우는 것은 VM 안의 **Docker Compose**. 컨테이너는 커널을 공유하므로 호스트 커널이 죽으면 전부 죽고 커널 취약점 하나가 모든 컨테이너에 걸린다 — 남의 코드를 돌리는 멀티테넌트 환경에서 VM 을 고집하는 이유다.

면접에서는 "VM 과 컨테이너의 차이는? 컨테이너가 가벼운 이유는?" 이 거의 확정 질문이다. 답의 핵심어는 **하이퍼바이저·게스트 OS** 대 **커널 공유·네임스페이스·cgroup**, 그리고 "격리 강도와 가벼움의 트레이드오프".

## 헷갈리기 쉬운 것

- **Docker 가 VM 을 대체한다?** 아니다. 보통 VM 안에 Docker 를 띄운다(클라우드의 EC2 위 컨테이너, 연구실의 Proxmox VM 위 Compose). 서로 층이 다르다.
- **맥·윈도우의 Docker Desktop** 은 사실 작은 리눅스 VM 을 하나 띄우고 그 안에서 컨테이너를 돌린다. 컨테이너가 리눅스 커널을 필요로 하기 때문.
- **LXC 와 Docker** 는 둘 다 컨테이너지만 용도가 다르다. LXC 는 "OS 한 대", Docker 는 "앱 하나" 단위이고 이미지 레지스트리 생태계가 Docker 의 핵심.
