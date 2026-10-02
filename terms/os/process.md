---
id: process
term: 프로세스
aliases:
  - Process
  - 실행 중인 프로그램
  - PID
category: os
tags:
  - 프로세스
  - 리눅스
level: 1
kind: concept
related:
  - thread
  - cpu
  - ram
  - scheduler
  - docker-image
  - multiprocess-multithread
  - daemon
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

실행 중인 프로그램 하나로, OS 가 **메모리와 번호(PID)를 따로 배정**한 단위.

## 비유

레시피(프로그램)는 종이 한 장이지만, 그걸 보고 실제로 **요리를 진행 중인 조리대** 하나가 프로세스다. 같은 레시피로 조리대 두 개를 동시에 돌리면 프로세스가 둘이다.

## 예시

```bash
ps aux | grep -E "caddy|ollama"      # 실행 중인 프로세스와 PID
docker compose ps                    # 컨테이너도 결국 호스트의 프로세스
kill -15 <PID>                       # 정중하게 종료 요청 (SIGTERM)
kill -9  <PID>                       # 강제 종료 (마지막 수단)
```

Proxmox VM 안에서 Caddy 가 안 뜬다면 `ps` 로 옛 프로세스가 80번 포트를 잡고 있는지부터 본다.

## 헷갈리기 쉬운 것

- **프로그램**은 디스크에 있는 파일, 프로세스는 그게 실행되어 살아 있는 것. `python` 실행 파일은 하나, 프로세스는 띄운 만큼.
- **스레드**는 프로세스 안에서 일하는 작은 실행 흐름. 프로세스끼리는 메모리를 안 나누고, 스레드끼리는 나눈다.
