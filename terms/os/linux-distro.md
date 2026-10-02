---
id: linux-distro
term: 리눅스 배포판
aliases:
  - Linux Distribution
  - 배포판
  - 우분투
  - Ubuntu/Debian/RHEL
  - LTS
category: os
tags:
  - 리눅스
  - 리눅스운영
  - 연구실
level: 1
kind: concept
related:
  - kernel
  - apt
  - shell
  - proxmox
  - lxc
  - docker-image
  - raspberry-pi
see_also:
  - https://ubuntu.com/about/release-cycle
  - https://www.debian.org/releases/
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

리눅스 **커널에 패키지 관리자와 기본 도구를 묶어** 바로 설치할 수 있게 만든 묶음.

## 비유

같은 **엔진(커널)** 을 넣고 회사마다 다르게 조립해 파는 **자동차(Ubuntu, Debian, RHEL)**. 운전법(명령)은 거의 같지만 부품 가게(패키지 관리자)와 정비 주기(릴리스·지원 기간)가 다르다.

## 예시

```bash
cat /etc/os-release        # 어느 배포판·버전인지  (PRETTY_NAME="Ubuntu 24.04.2 LTS")
uname -r                   # 커널 버전 — 배포판 버전과는 별개
```

```text
Debian 계열 : Debian → Ubuntu → Linux Mint, Pop!_OS        apt / .deb
RHEL 계열   : RHEL → Rocky, AlmaLinux, Fedora(실험장)       dnf / .rpm
그 외       : Arch(pacman), Alpine(apk — 도커 이미지에 흔함), NixOS
```

연구실 표준은 Proxmox(Debian 기반) 호스트 위에 **Ubuntu LTS** VM 이다. LTS 는 짝수 해 4월에 나와(22.04, 24.04) 5년간 보안 업데이트를 받으므로 서버는 LTS 만 쓴다. Docker 이미지 `python:3.12-slim` 은 Debian 기반이라 안에서 `apt` 가 되지만, `python:3.12-alpine` 은 Alpine 이라 `apk` 를 써야 하고 일부 파이썬 휠이 안 맞는다. 병원 전산실 서버는 유료 지원이 되는 RHEL 계열이 많아서 `apt` 대신 `dnf` 를 쳐야 할 때가 있다.

## 헷갈리기 쉬운 것

- **리눅스 vs 배포판**: 엄밀히 "리눅스" 는 커널 이름이고, 우리가 설치하는 것은 그 커널에 셸·패키지 관리자·systemd 등을 얹은 배포판이다.
- **Ubuntu vs Debian**: Ubuntu 는 Debian 을 바탕으로 더 자주, 더 새 패키지로 내는 배포판. 명령과 파일 위치가 거의 같아 Debian 문서가 Ubuntu 에도 대부분 통한다.
- **LTS vs 일반 릴리스**: 일반 릴리스는 9개월만 지원된다. 노트북이면 몰라도 서버에 일반 릴리스를 깔면 1년도 안 돼 업데이트가 끊긴다.
- **WSL** 은 Windows 안에서 Ubuntu 같은 배포판을 돌리는 기능이지 배포판이 아니다.
