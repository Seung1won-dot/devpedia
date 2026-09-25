---
id: context-switching
term: 컨텍스트 스위칭
aliases:
  - Context Switching
  - 문맥 교환
  - 컨텍스트 스위치
category: os
tags:
  - 프로세스
  - 스케줄링
level: 2
related:
  - process
  - thread
  - scheduler
  - cpu
  - kernel
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

CPU 가 하던 일의 **상태를 저장하고 다른 프로세스로 갈아타는** 동작.

## 비유

요리사 한 명이 여러 주문을 돌아가며 처리하는 것. 냄비를 옮길 때마다 **"어디까지 했더라" 를 메모하고 다음 냄비 메모를 읽는** 시간이 들어서, 너무 자주 바꾸면 요리보다 메모에 시간을 더 쓴다.

## 예시

```bash
vmstat 1 5          # cs 열 = 초당 컨텍스트 스위치 횟수
pidstat -w -p $(pgrep -f "ollama serve" | head -1) 1
# cswch/s   : 자발적 (기다리려고 스스로 양보)
# nvcswch/s : 비자발적 (시간 다 써서 뺏김)
```

GPU 서버에서 DataLoader 워커를 코어 수보다 훨씬 많이 띄우면 `cs` 가 치솟고 GPU 는 노는 경우가 있다. 워커 수를 코어 수 근처로 줄이면 오히려 빨라진다.

## 헷갈리기 쉬운 것

- **스케줄러**는 "다음에 누굴 돌릴지" 정하는 쪽, 컨텍스트 스위칭은 그 결정에 따라 "실제로 갈아타는" 동작. 결정과 실행의 차이.
- **스레드 전환**은 프로세스 전환보다 싸다. 메모리 공간은 그대로 두고 레지스터·스택만 바꾸면 되기 때문.
