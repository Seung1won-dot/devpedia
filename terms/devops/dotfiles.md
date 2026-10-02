---
id: dotfiles
term: dotfiles
aliases:
  - 닷파일
  - 점 파일
  - 개인 설정 파일(.bashrc/.gitconfig)
  - 개발 환경 설정 동기화
category: devops
tags:
  - 셸
  - 리눅스
  - 개발도구
  - 연구실
level: 2
kind: concept
related:
  - shell
  - environment-variable
  - git
  - ssh
  - devcontainer
  - symlink
see_also:
  - https://dotfiles.github.io/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

홈 폴더의 **점으로 시작하는 개인 설정 파일들**을 Git 으로 모아 관리하는 것.

## 비유

이사 갈 때 챙기는 **내 책상 세팅 메모**. 모니터 높이, 의자 각도, 자주 쓰는 펜 위치를 적어 두면 어느 자리에 앉아도 10분 만에 "내 자리"가 된다.

## 예시

```bash
# ~/dotfiles 저장소에 원본을 두고, 원래 위치에는 심볼릭 링크만 남긴다
mkdir -p ~/dotfiles && cd ~/dotfiles && git init
mv ~/.bashrc ~/.gitconfig ~/.tmux.conf .
ln -s ~/dotfiles/.bashrc    ~/.bashrc
ln -s ~/dotfiles/.gitconfig ~/.gitconfig
ln -s ~/dotfiles/.tmux.conf ~/.tmux.conf
git add -A && git commit -m "init dotfiles"
```

새 GPU 서버에 계정을 받으면 `git clone` 하고 링크 스크립트 한 번이면 평소 쓰던 alias·프롬프트·git 이름이 그대로 따라온다. `~/.ssh/config` 의 Host 별칭도 넣기 좋지만 **개인키·토큰은 절대 넣지 말 것** — 공개 저장소면 곧 유출이다. 파일이 많아지면 GNU stow 나 chezmoi(템플릿·암호화 지원) 같은 전용 도구가 링크를 대신 관리해 준다. Windows 쪽도 Git Bash 의 `~/.bashrc`, PowerShell 의 `$PROFILE` 을 같은 식으로 넣으면 된다.

## 헷갈리기 쉬운 것

- **환경변수**는 설정 "값" 하나이고, dotfiles 는 그 값들을 적어 두는 "파일" 쪽이다. `.bashrc` 안에 `export` 줄이 들어간다.
- **프로젝트 설정 파일**(`.gitignore`, `.prettierrc`)도 점으로 시작하지만 저장소에 속한 팀 공용 설정이다. dotfiles 는 보통 홈 폴더의 "내 개인" 취향만 가리킨다.
- **Dev Container** 는 프로젝트 쪽 환경을 통일하고, dotfiles 는 사람 쪽 취향을 따라다니게 한다. VS Code 는 컨테이너 안에 내 dotfiles 를 자동 적용하는 설정이 있다.
