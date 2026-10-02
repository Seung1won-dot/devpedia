---
id: pcb
term: PCB
aliases:
  - Process Control Block
  - 프로세스 제어 블록
  - 프로세스 컨트롤 블록
  - task_struct
category: os
tags:
  - 프로세스
  - 스케줄링
level: 2
kind: concept
related:
  - process
  - context-switching
  - scheduler
  - register
  - kernel
  - zombie-process
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

커널이 프로세스 하나마다 만들어 두는 **신상 카드(PID·상태·레지스터 값)**.

## 비유

병원의 **환자 차트**. 의사(CPU)가 다른 환자를 보러 갔다 와도 차트에 "어디까지 진료했고 지금 상태가 어떤지" 적혀 있어 바로 이어서 볼 수 있다.

## 예시

```bash
cat /proc/$(pgrep -f "ollama serve" | head -1)/status | head -12
# Name:   ollama
# State:  S (sleeping)      ← 프로세스 상태
# Pid:    2143              ← PID
# PPid:   1                 ← 부모 (systemd)
# VmRSS:  6812340 kB        ← 메모리 정보
cat /proc/2143/stat | cut -d" " -f1-5,14,15   # 상태·부모·CPU 사용 시간
```

리눅스에서 PCB 의 실체는 커널의 `task_struct` 구조체이고, `/proc/<PID>/` 는 그 내용을 파일처럼 보여주는 창이다. 컨텍스트 스위칭 때 커널은 떠나는 프로세스의 PC·레지스터·스택 포인터를 이 PCB 에 저장하고, 들어오는 프로세스의 PCB 에서 값을 꺼내 CPU 에 복원한다. 면접에서는 "PCB 에 뭐가 들어가고 컨텍스트 스위칭 때 무엇을 저장하나?" 로 묻는다.

### PCB 에 들어가는 것

| 항목 | 예 |
|---|---|
| 식별 | PID, PPID, 소유자(UID) |
| 상태 | New / Ready / Running / Waiting / Terminated |
| CPU 문맥 | PC(프로그램 카운터), 레지스터 값, 스택 포인터 |
| 스케줄링 | 우선순위, 사용한 CPU 시간 |
| 메모리 | 페이지 테이블 위치, 코드·데이터·힙 영역 크기 |
| 자원 | 열린 파일 목록, 시그널 처리 방법 |

## 헷갈리기 쉬운 것

- **PCB vs TCB**: 스레드마다는 TCB(스레드 제어 블록)가 따로 있다. 레지스터·스택은 스레드별(TCB), 메모리 공간·열린 파일은 프로세스 공용(PCB).
- **PCB 는 유저 프로그램이 못 건드린다**: 커널 메모리에 있고 시스템 콜이나 `/proc` 으로 읽기만 가능하다. 아무나 고치면 남의 프로세스로 둔갑할 수 있으니.
