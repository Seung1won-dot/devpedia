---
id: kernel-user-mode
term: 커널 모드/유저 모드
aliases:
  - Kernel Mode vs User Mode
  - 커널 모드
  - 사용자 모드
  - 유저 모드
  - 이중 모드
  - 모드 비트
category: os
tags:
  - 리눅스
  - 컴퓨터구조
  - 프로세스
level: 2
kind: concept
related:
  - kernel
  - system-call
  - interrupt
  - register
  - docker
  - sandbox
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

CPU 실행 권한을 **모든 명령이 가능한 커널 모드와 제한된 유저 모드**로 나눈 것.

## 비유

은행에서 **손님(유저)은 창구 앞까지만, 직원(커널)만 금고 안에 들어간다**. 손님이 금고를 열려면 직접 못 하고 창구에 신청서(시스템 콜)를 내야 하며, 그 순간만 직원이 대신 들어갔다 나온다.

## 예시

```bash
top -bn1 | grep "%Cpu"
# %Cpu(s): 12.3 us,  4.1 sy,  0.0 ni, 83.2 id ...
#           ↑ 유저 모드 시간   ↑ 커널 모드 시간
strace -c python -c "open('/etc/hostname').read()"   # 유저→커널 전환 목록
```

```python
# 유저 모드에서 하드웨어 I/O 포트를 직접 건드리려 하면 CPU 가 거부한다
import ctypes
ctypes.CDLL(None).outb(0, 0x80)     # Segmentation fault (특권 명령 → 예외)
```

`top` 의 `us` 는 내 코드가 돈 시간, `sy` 는 그 코드가 부탁한 일을 커널이 대신 한 시간이다. 파일 열기·네트워크·메모리 할당 요청은 전부 유저 → 커널 → 유저로 갔다 오며, 이 전환은 CPU 의 **모드 비트**(x86 은 ring 0/3)를 바꾸고 커널 스택으로 갈아타는 비용이 있어 시스템 콜을 남발하면 `sy` 가 치솟는다. Docker 컨테이너는 같은 커널을 쓰면서 유저 모드 프로그램들만 격리한 것이라, 커널 취약점 하나면 컨테이너 경계가 뚫린다. 면접에서는 "유저 모드에서 커널 모드로 전환되는 3가지 경우는?(시스템 콜·인터럽트·예외)" 로 나온다.

## 헷갈리기 쉬운 것

- **root 권한 vs 커널 모드**: root 는 OS 의 사용자 권한(파일·프로세스에 뭘 할 수 있나), 커널 모드는 CPU 의 실행 권한. root 로 실행해도 프로그램은 여전히 유저 모드에서 돈다.
- **시스템 콜 vs 라이브러리 호출**: `printf` 는 유저 모드에서 돌다가 필요할 때만 `write` 시스템 콜로 커널에 들어간다. 모든 함수 호출이 모드 전환은 아니다.
- **VM 은 한 층 더**: 하이퍼바이저(Proxmox)는 게스트 커널보다 더 높은 권한(VT-x, 흔히 ring -1 이라 부름)에서 돌아 게스트의 커널 모드조차 감시한다.
