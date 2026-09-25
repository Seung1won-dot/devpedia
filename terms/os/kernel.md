---
id: kernel
term: 커널
aliases:
  - Kernel
  - 리눅스 커널
  - OS 핵심
category: os
tags:
  - 리눅스
  - 프로세스
level: 2
related:
  - system-call
  - process
  - scheduler
  - virtual-memory
  - lxc
see_also:
  - https://www.kernel.org/doc/html/latest/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

하드웨어를 직접 다루며 프로세스·메모리·파일을 **관리하는 OS 의 핵심 부분**.

## 비유

건물의 **관리사무소**. 입주자(프로그램)는 전기·수도 배관을 직접 못 만지고 관리사무소에 신청해야 하며, 사무소가 누가 얼마나 쓸지 배분한다.

## 예시

```bash
uname -r                 # 커널 버전 (예: 6.8.12-4-pve — Proxmox 커널)
dmesg | tail -20         # 커널이 남긴 로그 (OOM, 디스크 오류, GPU 드라이버)
lsmod | grep nvidia      # 커널에 올라간 모듈 확인 (GPU 드라이버는 커널 모듈)
```

Proxmox 에서 LXC 컨테이너는 **호스트 커널을 그대로 공유**하고, VM 은 자기 커널을 따로 띄운다. 그래서 LXC 가 가볍지만 다른 커널 버전이 필요하면 VM 을 써야 한다. Docker 컨테이너도 마찬가지로 호스트 커널 위에서 돈다.

## 헷갈리기 쉬운 것

- **OS(운영체제)** 는 커널 + 셸 + 기본 도구 전체. "리눅스" 는 엄밀히 커널 이름이고, Ubuntu·Debian 은 그 커널에 도구를 얹은 배포판.
- **셸**은 사용자가 커널에 명령을 전달하는 창구. 커널이 관리사무소라면 셸은 민원 창구.
