---
id: sudo-root
term: sudo/root
aliases:
  - sudo
  - root
  - 루트 계정
  - 관리자 권한
  - superuser
  - sudoers
category: os
tags:
  - 리눅스
  - 리눅스운영
  - 접근제어
  - 보안
level: 1
kind: concept
related:
  - least-privilege
  - file-permission
  - kernel-user-mode
  - apt
  - ssh-key
  - privilege-escalation
see_also:
  - https://man7.org/linux/man-pages/man8/sudo.8.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

모든 권한을 가진 **관리자 계정(root)** 과, 그 권한을 **명령 하나만 잠깐 빌려 쓰는 sudo**.

## 비유

건물 **마스터키(root)** 와, 경비실에서 **잠깐 빌려 쓰고 바로 반납하는 열쇠(sudo)**. 마스터키를 늘 들고 다니면 잃어버렸을 때 건물 전체가 뚫린다.

## 예시

```bash
sudo apt install tmux            # 이 명령만 root 로 실행. 내(로그인 사용자) 비밀번호를 묻는다
sudo -u postgres psql            # root 가 아니라 postgres 사용자로 실행
sudo -i                          # root 셸로 들어가기 (프롬프트가 # 로 바뀜) — 나올 땐 exit
groups                           # 내가 sudo 그룹(Ubuntu) / wheel 그룹(RHEL 계열) 에 있는지
sudo visudo                      # /etc/sudoers 편집 — 문법 검사를 해 주니 직접 열지 말 것
journalctl _COMM=sudo | tail     # 누가 언제 무슨 명령을 sudo 로 돌렸나
```

Ubuntu 는 root 로 직접 로그인하는 것을 막아 두고, 설치 때 만든 첫 사용자를 sudo 그룹에 넣는다. 연구실 서버도 같은 방식이라 각자 자기 계정으로 SSH 접속한 뒤 필요할 때만 `sudo` 를 붙인다. 그래야 로그에 "누가" 했는지 남고, 실수로 `rm -rf` 를 쳐도 자기 홈 밖은 안 지워진다. `pip install` 이나 `npm install` 앞에 `sudo` 를 붙이는 건 시스템 파이썬·노드를 망가뜨리는 지름길이고, 가상환경이나 `nvm` 을 쓰는 게 맞다.

## 헷갈리기 쉬운 것

- **su** 는 아예 다른 사용자로 갈아타는 것이라 **그 사용자(root)의 비밀번호**를 알아야 하고 기록도 안 남는다. sudo 는 **내 비밀번호**로 허가받은 명령만 실행하고 로그가 남는다.
- **chmod/chown** 은 파일의 권한 표를 바꾸는 것, sudo 는 표를 안 바꾸고 잠깐 root 가 되는 것. `Permission denied` 를 sudo 로 덮으면 다음 사람도 계속 sudo 를 써야 하니, 소유자(chown)를 고치는 게 근본 해결이다.
- **docker 그룹** 에 들어가면 `sudo` 없이 docker 를 쓸 수 있지만, 컨테이너로 호스트 디스크를 마운트할 수 있어 사실상 root 와 같다. 편하다고 아무에게나 주면 안 된다.
