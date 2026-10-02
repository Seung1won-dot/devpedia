---
id: critical-section
term: 임계 구역
aliases:
  - Critical Section
  - 임계 영역
  - 크리티컬 섹션
  - 임계구역 문제
category: os
tags:
  - 동기화
  - 프로세스
level: 2
kind: concept
related:
  - race-condition
  - mutex
  - synchronization
  - deadlock
  - thread
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

공유 자원을 건드려서 **한 번에 하나만 들어가야 하는** 코드 구간.

## 비유

**탈의실 한 칸**. 여럿이 줄을 서도 안에는 한 명만 들어가고, 들어간 사람은 반드시 나와야 하며, 줄 선 사람은 언젠가는 들어갈 수 있어야 한다.

## 예시

```c
#include <pthread.h>
pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;
long balance = 0;

void *deposit(void *arg) {
    for (int i = 0; i < 100000; i++) {
        pthread_mutex_lock(&m);      // 진입 구역 (entry section)
        balance += 1;                // 임계 구역 — 공유 변수 접근
        pthread_mutex_unlock(&m);    // 퇴출 구역 (exit section)
    }
    return NULL;
}
```

임계 구역은 `balance += 1` 딱 한 줄이고, 나머지는 그 한 줄을 지키려고 붙인 진입·퇴출 코드다. 락 안에 파일 읽기나 네트워크 호출까지 넣으면 다른 스레드가 그동안 다 대기하니 **임계 구역은 최대한 짧게** 가 원칙이다. 면접에서는 "임계 구역 문제의 해결 조건 3가지" 를 외웠는지 묻는다.

### 해결 조건 3가지

| 조건 | 뜻 |
|---|---|
| 상호 배제 (mutual exclusion) | 한 번에 하나만 임계 구역 안에 있다 |
| 진행 (progress) | 아무도 안에 없으면, 들어가려는 쪽 중 하나는 반드시 들어간다 |
| 유한 대기 (bounded waiting) | 기다리는 쪽은 언젠가는 들어간다 (무한 대기·기아 없음) |

## 헷갈리기 쉬운 것

- **임계 구역 vs 뮤텍스**: 임계 구역은 "보호해야 할 코드 범위", 뮤텍스는 그걸 보호하는 "도구". 문제와 해결책의 관계.
- **경쟁 상태**는 임계 구역을 보호하지 않았을 때 생기는 "증상". 임계 구역을 찾아 잠그는 게 치료.
- **피터슨 알고리즘**은 락 없이 변수 두 개(flag, turn)로 세 조건을 만족시키는 교과서 풀이. 현대 CPU 는 명령 순서를 바꿔서 실제로는 잘 안 쓰고, 하드웨어 원자 명령(TAS, CAS)을 쓴다.
