---
id: hypervisor
term: 하이퍼바이저
aliases:
  - Hypervisor
  - 가상 머신 모니터
  - VMM
category: infra
tags:
  - 가상화
  - 서버운영
level: 2
related:
  - virtualization
  - vm
  - proxmox
  - kernel
  - cpu
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

하드웨어 위에서 **여러 VM 을 만들고 관리**하는 소프트웨어 층.

## 비유

아파트의 **관리사무소**. 전기·수도(CPU·메모리)를 각 세대(VM)에 나눠 주고, 한 집이 시끄럽다고 옆집이 흔들리지 않게 한다.

## 예시

```bash
# Proxmox 는 리눅스 커널에 들어 있는 KVM 을 하이퍼바이저로 쓴다
lsmod | grep kvm     # kvm_intel 또는 kvm_amd 가 떠 있어야 함
pveversion           # Proxmox VE 버전
qm start 101         # "VM 101 켜 줘" 를 하이퍼바이저에게 요청
```

VM 안에서는 자기가 진짜 컴퓨터라고 믿지만, 실제로는 KVM 이 CPU 시간과 메모리를 나눠 주고 있다 — `lsmod` 에 kvm 이 없으면 BIOS 에서 VT-x/AMD-V 가 꺼져 있는 것이다.

## 헷갈리기 쉬운 것

- **Type 1(베어메탈)**은 하드웨어 위에 바로 올라간다(KVM/Proxmox, ESXi). **Type 2(호스티드)**는 윈도우 같은 일반 OS 위에 앱처럼 설치한다(VirtualBox, VMware Workstation). 서버용은 거의 Type 1.
- **Proxmox** 는 하이퍼바이저(KVM)에 웹 UI·백업·클러스터를 얹은 배포판. 하이퍼바이저 그 자체는 KVM 이다.
