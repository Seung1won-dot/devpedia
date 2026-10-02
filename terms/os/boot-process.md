---
id: boot-process
term: 부팅 과정
aliases:
  - Boot Process
  - 부트 시퀀스
  - BIOS/UEFI
  - 부트로더
  - GRUB
category: os
tags:
  - 리눅스
  - 컴퓨터구조
  - 리눅스운영
  - 면접
level: 2
kind: concept
related:
  - kernel
  - systemd
  - mount-partition
  - hypervisor
  - vm
  - cloud-init
see_also:
  - https://man7.org/linux/man-pages/man7/boot.7.html
  - https://man7.org/linux/man-pages/man7/bootup.7.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

전원을 켠 뒤 **펌웨어→부트로더→커널→init(systemd)** 순서로 OS 가 올라오는 과정.

## 비유

아침에 **눈 뜨고(펌웨어가 하드웨어 점검) → 알람 끄고 일어나(부트로더가 커널 선택) → 정신 차리고(커널이 장치 인식) → 출근 준비(systemd 가 서비스 기동)** 하는 순서. 어느 단계에서 멈췄는지 알면 왜 못 일어났는지도 안다.

## 예시

```text
1. 펌웨어 (BIOS/UEFI)   전원이 들어오면 하드웨어 점검(POST), 어느 디스크로 부팅할지 결정
2. 부트로더 (GRUB)       커널 이미지와 initramfs 를 메모리에 올리고 옵션을 넘김
3. 커널                  드라이버 로드, 루트 파일 시스템 마운트, PID 1 실행
4. init (systemd)        fstab 마운트·네트워크·서비스를 의존 순서대로 기동 → 로그인/SSH 가능
```

```bash
systemd-analyze                   # 단계별 부팅 시간 (firmware / loader / kernel / userspace)
systemd-analyze blame | head      # 어떤 서비스가 오래 걸렸나
journalctl -b -p err              # 이번 부팅의 에러 로그
journalctl -b -1 -e               # 직전 부팅 로그 — 갑자기 재부팅됐을 때 원인 추적
ls /sys/firmware/efi              # 있으면 UEFI, 없으면 레거시 BIOS
cat /proc/cmdline                 # 부트로더가 커널에 넘긴 옵션
```

연구실에서 겪는 부팅 사고는 거의 3→4 단계다. fstab 에 적힌 외장 디스크가 빠져 있으면 복구 모드(emergency mode)에서 멈추고, NVIDIA 드라이버 모듈이 새 커널과 안 맞으면 화면이 검게 나오며, Secure Boot 가 켜진 서버는 서명 안 된 드라이버 모듈을 거부한다. Proxmox VM 은 1단계가 가상 펌웨어(SeaBIOS 또는 UEFI 용 OVMF)이고, 클라우드 VM 은 4단계에서 cloud-init 이 SSH 키·호스트명을 심는다.

## 헷갈리기 쉬운 것

- **BIOS vs UEFI**: 둘 다 1단계 펌웨어다. UEFI 가 후속으로 GPT 디스크(2TB 초과)와 Secure Boot 를 지원하며, 요즘 하드웨어는 거의 UEFI 다.
- **부트로더 vs 커널**: 부팅 때 잠깐 뜨는 GRUB 메뉴에서 커널 버전을 고르는 게 2단계이고, 거기서 고른 파일이 3단계의 커널이다. 커널 업데이트 후 부팅이 안 되면 GRUB 에서 이전 커널을 고르면 된다.
- **재부팅 vs 서비스 재시작**: `systemctl restart caddy` 는 4단계의 한 조각만 다시 하는 것. 커널·드라이버를 바꿨을 때만 전체 재부팅이 필요하다.
