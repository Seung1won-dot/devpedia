---
id: vm
term: VM
aliases:
  - Virtual Machine
  - 가상 머신
  - 가상 컴퓨터
category: infra
tags:
  - 가상화
  - 서버운영
level: 1
related:
  - virtualization
  - hypervisor
  - proxmox
  - lxc
  - docker
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

진짜 컴퓨터처럼 **OS 까지 통째로 돌아가는** 가상의 컴퓨터 한 대.

## 비유

컴퓨터 안에 만든 **컴퓨터 모형 방**. 안에서는 윈도우든 리눅스든 마음대로 깔고 망가뜨려도, 방을 없애면(삭제하면) 바깥 컴퓨터는 멀쩡하다.

## 예시

```bash
# Proxmox 에서 VM 상태 확인·스냅샷·복제
qm list                                  # 모든 VM 과 상태
qm snapshot 101 before-cuda-upgrade      # 드라이버 올리기 전에 찍어 두기
qm clone 101 102 --name web-test --full  # 똑같은 VM 하나 더
# VM 안에서 자기 사양 확인 — 호스트 전체가 아니라 배정받은 만큼만 보인다
nproc && free -h
```

연구실에서 새 CUDA 버전을 시험할 때 GPU VM 을 복제해 놓고 거기서 먼저 깨뜨려 본다 — 실패해도 원본은 그대로다.

## 헷갈리기 쉬운 것

- **컨테이너(Docker/LXC)**는 커널을 호스트와 같이 쓴다. VM 은 커널까지 자기 것이라 무겁지만 윈도우도 올릴 수 있고 격리가 더 확실하다.
- **이미지/템플릿**은 VM 을 찍어내는 원본 파일. VM 은 그것으로 만들어 실제로 켜진 것.
