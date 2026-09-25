---
id: scheduler
term: 스케줄러
aliases:
  - Scheduler
  - CPU 스케줄러
  - 프로세스 스케줄링
category: os
tags:
  - 스케줄링
  - 프로세스
level: 2
related:
  - process
  - thread
  - context-switching
  - kernel
  - cron
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

실행을 기다리는 프로세스 중 **다음에 CPU 를 쓸 것을 고르는** 커널 기능.

## 비유

진료 대기실의 **접수 간호사**. 누굴 먼저 들여보낼지(응급 우선, 오래 기다린 사람 우선) 정하고, 한 사람이 너무 오래 진료실을 차지하면 잠깐 나오게 한다.

## 예시

```bash
nice -n 19 python preprocess.py     # 낮은 우선순위로 실행 (남들 먼저)
sudo renice -n -5 -p <PID>          # 이미 도는 프로세스 우선순위 올리기
chrt -p <PID>                       # 스케줄링 정책 확인 (SCHED_OTHER 등)
```

```yaml
# docker-compose.yml — 컨테이너에 CPU 상한 걸기 (스케줄러가 그만큼만 배정)
services:
  embed-worker:
    image: ghcr.io/lab/embed:latest
    cpus: "2.0"
```

GPU 서버에서 밤새 도는 전처리를 `nice 19` 로 띄워 두면 낮에 다른 사람 실험을 덜 방해한다.

## 헷갈리기 쉬운 것

- **크론**은 "몇 시에 실행할지" 정하는 시계 기반 예약. CPU 스케줄러는 "지금 이 순간 누가 CPU 를 쓸지" 를 밀리초 단위로 정한다. 둘 다 '스케줄' 이지만 층이 다르다.
- **컨텍스트 스위칭**은 스케줄러가 결정한 뒤 실제로 갈아타는 동작.
