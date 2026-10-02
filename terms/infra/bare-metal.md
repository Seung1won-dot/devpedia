---
id: bare-metal
term: 베어메탈
aliases:
  - Bare Metal
  - 베어 메탈
  - 물리 서버
  - 베어메탈 서버
category: infra
tags:
  - 하드웨어
  - 서버운영
  - GPU
  - 가상화
level: 3
kind: concept
related:
  - gpu-cuda
  - hypervisor
  - vm
  - on-premise-vs-cloud
  - proxmox
  - numa
see_also:
  - https://pve.proxmox.com/wiki/PCI(e)_Passthrough
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

하이퍼바이저 없이 **OS 를 물리 서버에 직접 올려** 하드웨어를 통째로 쓰는 방식.

## 비유

아파트(VM)가 아니라 **단독주택**. 벽을 뚫든 마당에 뭘 두든 내 마음이고 윗집 소음(다른 VM 의 간섭)도 없지만, 방이 남아도 세를 못 놓고 집이 비면 그냥 빈 집이다.

## 예시

```bash
# 지금 이 서버가 베어메탈인지 VM 인지 — VM 이면 kvm, vmware 같은 이름이 뜬다
systemd-detect-virt                     # none → 베어메탈
# GPU 4장이 CPU 소켓·NVLink 와 어떻게 연결됐는지 — 베어메탈이어야 토폴로지가 그대로 보인다
nvidia-smi topo -m
# 베어메탈 + Docker: 가상화 손실 없이 실험 환경 분리는 된다
docker run --rm --gpus '"device=0,1"' pytorch/pytorch:2.4.0-cuda12.4-cudnn9-runtime \
  python -c "import torch; print(torch.cuda.device_count())"
```

GPU 학습 서버는 베어메탈이 정석이다. VM 을 거치면 GPU 를 PCIe 패스스루로 넘겨야 해서 호스트는 그 GPU 를 못 쓰고, NVLink·NUMA 토폴로지가 가려지며 드라이버 문제가 한 층 더 생긴다 — 성능 손실은 몇 % 수준이어도 [확인 필요] 설정 복잡도가 비싸다. 반대로 Caddy·Postgres·RAG API 같은 작은 서비스 여럿을 한 대에 섞어 올리고 스냅샷·자원 할당을 바꾸고 싶으면 VM 이 맞다. 연구실의 흔한 배치: **GPU 서버는 베어메탈 Ubuntu + Docker, 나머지는 Proxmox 위 VM/LXC**. 클라우드의 베어메탈 인스턴스(AWS `.metal`)는 최소 크기가 커서 시간당 요금이 매우 높다 [확인 필요].

## 헷갈리기 쉬운 것

- **온프레미스**는 "장비가 어디 있나"(내 건물), 베어메탈은 "가상화 층이 있나". 클라우드에도 베어메탈이 있고, 온프레미스도 대부분 VM 으로 쓴다.
- **Type 1 하이퍼바이저**(Proxmox, ESXi)는 하드웨어에 직접 깔려 "베어메탈 하이퍼바이저" 라 불리지만, 그 위의 서버는 VM 이지 베어메탈이 아니다.
- **컨테이너**는 가상화 층이 아니라 커널 격리라, 베어메탈 위 Docker 의 성능은 베어메탈과 거의 같다.
