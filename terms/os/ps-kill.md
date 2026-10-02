---
id: ps-kill
term: ps/kill(프로세스 관리 명령)
aliases:
  - ps
  - kill
  - top/htop
  - 시그널
  - SIGTERM/SIGKILL
  - 프로세스 관리 명령
category: os
tags:
  - 리눅스
  - 프로세스
  - 셸
level: 1
kind: tool
related:
  - process
  - linux-basic-commands
  - pipe-redirection
  - systemd
  - docker
  - daemon
  - zombie-process
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

실행 중인 프로세스를 **찾아보고(ps) 신호를 보내 끝내는(kill)** 명령.

## 비유

건물 **입주자 명부(ps)** 를 보고 문제 있는 방에 **퇴거 통보(kill)** 를 보내는 것. 보통은 "짐 챙겨 나가세요"(SIGTERM) 라고 하고, 응답이 없을 때만 문을 부수고 들어간다(SIGKILL).

## 예시

```bash
ps aux --sort=-%mem | head -5          # 메모리 많이 쓰는 순 상위 5개
ps -ef --forest | grep -A3 ollama      # 부모-자식 트리로 보기
pgrep -af "python train"               # 이름으로 PID 찾기 (grep grep 필요 없음)
htop                                   # 실시간 (F9 = 시그널 보내기)

kill 12345                 # = kill -15 (SIGTERM): "정리하고 종료해" — 프로그램이 받아서 처리 가능
kill -9 12345              # SIGKILL: 커널이 즉시 없앰 — 프로그램은 알지도 못함
kill -HUP $(pgrep caddy)   # SIGHUP: 많은 데몬이 "설정 다시 읽기" 로 해석
pkill -f "vite"            # 이름 패턴으로 한꺼번에
```

`kill` 은 이름과 달리 "죽이기" 가 아니라 **시그널 보내기** 명령이다. SIGTERM(15)을 받은 프로그램은 파일을 닫고 DB 연결을 정리하고 임시 파일을 지운 뒤 나갈 기회가 있지만, SIGKILL(9)은 커널이 바로 지워 버려서 학습 체크포인트를 쓰다 말면 파일이 깨진다. `docker stop` 도 SIGTERM 을 보내고 10초 기다린 뒤 SIGKILL 을 보내는 순서이고, `systemctl stop` 도 같다. 면접에서는 "`kill -9` 와 `kill -15` 의 차이", "좀비 프로세스가 뭔가" 로 나온다.

### 자주 쓰는 시그널

| 번호 | 이름 | 뜻 |
|---|---|---|
| 1 | SIGHUP | 터미널 끊김 / 데몬은 설정 재로드 |
| 2 | SIGINT | Ctrl+C |
| 9 | SIGKILL | 강제 종료 (프로그램이 막을 수 없음) |
| 15 | SIGTERM | 정상 종료 요청 (kill 의 기본값) |

## 헷갈리기 쉬운 것

- **좀비 vs 고아**: 좀비는 끝났는데 부모가 종료 코드를 안 거둬 가서(`wait`) 명부에 남은 항목이라 `kill -9` 로도 안 지워지고 부모를 손봐야 한다. 고아는 부모가 먼저 죽어 systemd 가 입양한 정상 프로세스.
- **`kill -9` 가 안 먹는 경우**: 디스크 I/O 를 기다리는 `D` 상태(uninterruptible sleep)나 좀비. NFS 가 끊겼을 때 자주 본다.
- **ps aux vs ps -ef**: BSD 문법과 SysV 문법으로 정보는 거의 같다. `aux` 는 %CPU·%MEM 이, `-ef` 는 PPID 가 보여 트리 볼 때 편하다.
