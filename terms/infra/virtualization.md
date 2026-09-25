---
id: virtualization
term: 가상화
aliases:
  - Virtualization
  - 버추얼라이제이션
  - 서버 가상화
category: infra
tags:
  - 가상화
  - 서버운영
level: 1
related:
  - hypervisor
  - vm
  - proxmox
  - lxc
  - docker
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

컴퓨터 한 대를 소프트웨어로 **여러 대처럼 쪼개** 쓰는 기술.

## 비유

큰 사무실 하나에 **칸막이**를 쳐서 여러 팀이 따로 쓰는 것. 벽(하드웨어)은 하나지만 각 칸은 자기 방처럼 잠그고 꾸밀 수 있다.

## 예시

```bash
# CPU 가 가상화를 지원하는지 (0 보다 크면 됨)
grep -cE 'vmx|svm' /proc/cpuinfo
# Proxmox 호스트에서 지금 돌고 있는 VM·컨테이너 목록
qm list
pct list
```

연구실 서버 한 대(64코어·256GB)에 웹 서버 VM, DB VM, GPU 실험 VM 을 따로 올려 두고 각각 껐다 켰다 한다 — 실험 VM 이 죽어도 웹 서버는 멀쩡하다.

## 헷갈리기 쉬운 것

- **컨테이너(Docker)**는 OS 는 하나를 같이 쓰고 프로세스만 격리한다. 가상화(VM)는 OS 까지 통째로 따로 올린다.
- **에뮬레이션**은 다른 종류의 CPU 를 흉내 내는 것(x86 에서 ARM 등). 가상화는 같은 CPU 를 나눠 쓰는 것이라 훨씬 빠르다.
