---
id: ram
term: RAM
aliases:
  - Random Access Memory
  - 주기억장치
  - 메모리
  - 램
category: os
tags:
  - 하드웨어
  - 메모리
level: 1
related:
  - cpu
  - cache-memory
  - virtual-memory
  - vram
  - process
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

CPU 가 지금 쓰는 프로그램과 데이터를 **잠시 올려두는** 빠른 작업 공간.

## 비유

책상의 **작업 공간**. 서랍(디스크)에서 지금 볼 책만 꺼내 책상에 펼쳐 놓는데, 책상이 넓을수록 여러 책을 한 번에 펼칠 수 있고 퇴근하면 다 치운다.

## 예시

```bash
free -h          # 전체·사용 중·여유 메모리
```

```text
               total        used        free      shared  buff/cache   available
Mem:            62Gi        18Gi        2.1Gi       1.0Gi        42Gi        43Gi
```

`free` 가 2 GB 라고 겁먹지 말 것. `buff/cache` 는 리눅스가 남는 RAM 을 파일 캐시로 쓰는 것이라 필요하면 바로 비워준다. 진짜 여유는 `available`. Proxmox 에서 VM 에 8 GB 를 주면 호스트 RAM 8 GB 를 떼어 주는 것이고, Ollama 로 7B 모델을 CPU 로 돌리면 이 RAM 에 모델이 통째로 올라온다.

## 헷갈리기 쉬운 것

- **디스크(SSD/HDD)** 는 전원을 꺼도 남는 창고, RAM 은 전원을 끄면 비워진다. "저장 공간 부족" 은 디스크, "메모리 부족(OOM)" 은 RAM 얘기.
- **VRAM** 은 GPU 에 붙은 전용 RAM. 모델이 VRAM 에 안 들어가면 시스템 RAM 으로 넘쳐서 확 느려진다.
