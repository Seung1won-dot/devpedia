---
id: tmux
term: tmux/screen
aliases:
  - tmux
  - screen
  - GNU Screen
  - 터미널 멀티플렉서
  - 세션 유지
  - 티먹스
category: os
tags:
  - 셸
  - 원격접속
  - 리눅스
  - 연구실
level: 1
kind: tool
related:
  - ssh
  - shell
  - daemon
  - ps-kill
  - systemd
  - dotfiles
see_also:
  - https://github.com/tmux/tmux/wiki
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

SSH 가 끊겨도 **터미널 세션을 서버에 살려 두고** 다시 붙게 해 주는 도구.

## 비유

사무실에 **켜 두고 퇴근하는 내 자리 모니터**. 집에 가도(접속이 끊겨도) 화면은 서버에 그대로 켜져 있고, 다음 날 어느 자리에서 로그인하든 그 화면을 이어서 본다.

## 예시

```bash
sudo apt install tmux
tmux new -s train                 # train 이라는 이름의 세션 열기
python train.py                   # 안에서 학습 시작
#  Ctrl+b 를 누른 뒤 d  →  세션은 살려 둔 채 빠져나오기(detach)
tmux ls                           # 살아 있는 세션 목록
tmux attach -t train              # 노트북을 바꿔 SSH 해도 그 화면에 다시 붙기
tmux kill-session -t train        # 끝났으면 정리
```

노트북 덮개를 닫아 SSH 가 끊기면 그 터미널에서 돌던 `python train.py` 는 종료 신호(SIGHUP)를 받고 죽는다 — 밤새 돌린 학습을 날리는 1순위 사고다. tmux 안에서 돌리면 프로그램의 부모가 내 SSH 셸이 아니라 서버에 상주하는 tmux 서버라서 접속이 끊겨도 멀쩡하다. `Ctrl+b` 다음 `%` 나 `"` 로 화면을 나눠 왼쪽엔 학습 로그, 오른쪽엔 `nvidia-smi` 를 띄워 두는 식으로도 쓴다. screen 은 같은 역할의 더 오래된 도구로 단축키가 `Ctrl+a` 이며, 요즘은 tmux 가 기본값에 가깝다.

## 헷갈리기 쉬운 것

- **`nohup cmd &`** 도 접속이 끊겨도 살지만, 한 번 던지고 끝이라 출력은 로그 파일로만 보고 입력은 못 준다. tmux 는 다시 붙어서 그대로 상호작용할 수 있다.
- **systemd 서비스** 는 "항상 떠 있어야 하는 서버" 용, tmux 는 "지금 한 번 돌리는 실험·학습" 용. 매번 재부팅 후 손으로 tmux 를 열어야 한다면 서비스로 만들 때다.
- **VS Code Remote-SSH 터미널** 도 창을 닫으면 끊긴다. 그 안에서 긴 작업을 할 때도 tmux 를 먼저 여는 게 안전하다.
