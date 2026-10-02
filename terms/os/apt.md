---
id: apt
term: OS 패키지 관리자(apt/brew)
aliases:
  - apt
  - apt-get
  - brew
  - Homebrew
  - dnf/yum
  - winget
  - 시스템 패키지 관리자
category: os
tags:
  - 리눅스
  - 리눅스운영
  - 개발도구
  - 셸
level: 1
kind: tool
related:
  - package-manager
  - linux-distro
  - sudo-root
  - virtualenv
  - docker-image
  - lockfile
see_also:
  - https://wiki.debian.org/AptCLI
  - https://brew.sh/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

OS 전체에 **프로그램과 라이브러리를 설치·갱신·삭제**해 주는 시스템 패키지 관리자.

## 비유

운영체제에 딸린 **공식 앱 스토어**. 검증된 창고(저장소)에서 받아 오고, 필요한 부속품(의존성)도 같이 깔아 주며, 버튼 하나로 전부 업데이트한다.

## 예시

```bash
sudo apt update                        # 저장소 카탈로그 새로고침 (설치 아님 — 설치 전에 꼭)
sudo apt install tmux htop git         # 설치
sudo apt upgrade                       # 깔린 것 전부 최신으로
apt list --installed | grep nvidia     # 뭐가 깔려 있나
apt show caddy                         # 버전·설명·의존성
sudo apt remove --purge caddy          # 설정 파일까지 삭제
```

```bash
brew install tmux          # macOS (Homebrew)
winget install Git.Git     # Windows 11
sudo dnf install tmux      # RHEL / Rocky
```

Docker, Caddy, Tailscale 처럼 Ubuntu 기본 저장소에 없거나 오래된 것은 각 프로젝트의 공식 저장소를 `/etc/apt/sources.list.d/` 에 추가한 뒤 `apt install` 한다. `apt` 는 사람이 치는 용도(진행 막대·색), `apt-get` 은 스크립트·Dockerfile 용으로 출력 형식이 안 바뀐다.

## 헷갈리기 쉬운 것

- **pip/npm(언어 패키지 관리자)** 는 "이 프로젝트가 쓰는 라이브러리" 를 가상환경·`node_modules` 안에 깐다. apt 는 **컴퓨터 전체에 하나**다. `sudo pip install` 은 시스템 파이썬을 망가뜨린다. 라이브러리는 pip, 도구(git, tmux, docker)는 apt 가 원칙.
- **apt update vs upgrade**: update 는 "뭐가 새로 나왔나 목록만" 받고, upgrade 가 실제로 바꾼다. update 없이 install 하면 옛날 목록 기준이라 404 가 난다.
- **snap** 은 Ubuntu 의 또 다른 패키지 형식(격리 실행). Docker 를 snap 으로 깔면 권한 문제가 잦아 공식 apt 저장소로 까는 게 낫다.
