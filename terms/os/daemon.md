---
id: daemon
term: 데몬
aliases:
  - Daemon
  - 데몬 프로세스
  - 백그라운드 서비스
  - 상주 프로세스
  - sshd/dockerd
category: os
tags:
  - 프로세스
  - 리눅스
  - 리눅스운영
level: 1
kind: concept
related:
  - systemd
  - process
  - cron
  - ps-kill
  - tmux
  - docker
see_also:
  - https://man7.org/linux/man-pages/man7/daemon.7.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

사용자 터미널 없이 **뒤에서 늘 떠서 요청을 기다리는** 서버형 프로세스.

## 비유

24시간 **편의점 야간 알바**. 손님이 없어도 자리를 지키다가 누가 오면 응대하고, 점장(systemd)이 퇴근해도 혼자 가게를 돌린다.

## 예시

```bash
ps -eo pid,ppid,tty,cmd | grep -E 'sshd|dockerd|caddy|tailscaled' | grep -v grep
#  912   1  ?  /usr/sbin/sshd -D        ← TTY 가 ? (터미널 없음), 부모가 PID 1
systemctl list-units --type=service --state=running   # systemd 가 관리 중인 데몬 목록
systemctl status docker                               # 살아 있나, 언제부터 떠 있나
```

이름이 `d` 로 끝나는 프로그램(sshd, dockerd, tailscaled, systemd 자체)은 거의 데몬이다. SSH 접속을 받는 sshd, 컨테이너를 돌리는 dockerd, 자동 HTTPS 를 해 주는 Caddy 모두 로그인한 사람이 없어도 서버에서 계속 돌아야 하므로 데몬으로 띄운다. 직접 만든 FastAPI 서버도 `python app.py` 로 터미널에서 띄우면 창을 닫는 순간 죽지만, systemd 유닛으로 등록하면 재부팅해도 알아서 뜨는 데몬이 된다.

## 헷갈리기 쉬운 것

- **백그라운드 작업(`&`)** 은 터미널에 아직 묶여 있어서 SSH 가 끊기면 같이 죽는다. 데몬은 터미널과 완전히 분리돼 있다.
- **systemd 서비스** 는 데몬을 "누가 어떻게 켜고 살리나" 를 적은 설정이고, 데몬은 그 결과로 떠 있는 프로세스 자체다.
- **크론** 은 정해진 시각에 잠깐 실행되고 끝나는 작업, 데몬은 항상 떠 있는 것. 크론 데몬(crond) 자체는 데몬이다.
