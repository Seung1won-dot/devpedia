---
id: zombie-process
term: 좀비/고아 프로세스
aliases:
  - Zombie Process
  - Orphan Process
  - 좀비 프로세스
  - 고아 프로세스
  - defunct
  - wait()
category: os
tags:
  - 프로세스
  - 리눅스
  - 면접
  - 리눅스운영
level: 2
kind: concept
related:
  - process
  - ps-kill
  - pcb
  - systemd
  - daemon
  - docker
see_also:
  - https://man7.org/linux/man-pages/man2/wait.2.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

좀비는 **끝났지만 부모가 종료 코드를 안 거둔** 프로세스, 고아는 **부모가 먼저 죽은** 프로세스.

## 비유

좀비는 **퇴사했는데 인사팀(부모)이 퇴직 처리를 안 해 명부에 남은 사람**, 고아는 **팀장이 먼저 그만둬 사장(PID 1)이 직접 맡게 된 직원**. 좀비는 일을 안 하니 자리를 안 차지하지만 명부(PID 표) 한 줄은 계속 쓴다.

## 예시

```bash
ps -eo pid,ppid,stat,cmd | awk '$3 ~ /Z/'     # STAT 에 Z 가 있으면 좀비 (<defunct> 로 표시)
ps -o ppid= -p 4321                           # 좀비의 부모 PID 찾기
kill -CHLD 4000                               # 부모에게 "자식 거둬 가라" 신호 — 제대로 짠 부모면 먹힌다
```

```python
import subprocess
p = subprocess.Popen(["python", "preprocess.py"])
# p 를 잊고 계속 돌리면 preprocess 가 끝나도 좀비로 남는다
p.wait()        # 종료 코드를 거두는 순간 좀비가 사라진다
```

좀비는 이미 죽은 것이라 `kill -9` 를 보내도 변화가 없다. 없애려면 부모가 `wait()` 를 하게 하거나 부모를 종료시켜야 하는데, 부모가 죽으면 좀비는 고아가 되어 PID 1(systemd)이 입양하고 바로 거둬 간다. Docker 컨테이너에서는 PID 1 이 systemd 가 아니라 내 파이썬 스크립트라 이 뒷정리를 안 해서, 자식을 많이 만드는 컨테이너는 좀비가 쌓인다 — `docker run --init` 이나 compose 의 `init: true` 로 작은 init(tini)을 PID 1 에 넣어 해결한다. 면접 단골은 "좀비와 고아의 차이", "좀비는 왜 kill 이 안 되나".

## 헷갈리기 쉬운 것

- **좀비 vs 고아**: 좀비는 죽었는데 기록이 남은 것, 고아는 살아 있고 부모만 PID 1 로 바뀐 것. 고아는 문제가 아니며 데몬은 일부러 만든 고아다(부모가 fork 하고 먼저 종료).
- **D 상태(uninterruptible sleep)**: `kill -9` 가 안 먹는 또 다른 경우지만 이쪽은 살아서 디스크·NFS 응답을 기다리는 중이다. STAT 가 `D` 면 I/O 문제, `Z` 면 부모 문제.
- **메모리 누수** 와 다르다. 좀비는 메모리를 거의 안 쓰고 PID 한 칸만 차지한다. 다만 PID 상한까지 쌓이면 새 프로세스를 못 만든다.
