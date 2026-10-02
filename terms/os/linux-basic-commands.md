---
id: linux-basic-commands
term: 리눅스 기본 명령(cd/ls/grep)
aliases:
  - Linux Basic Commands
  - 리눅스 명령어
  - 기본 명령어
  - cd ls pwd
  - grep find
  - 절대 경로/상대 경로
category: os
tags:
  - 리눅스
  - 셸
level: 1
kind: tool
related:
  - shell
  - file-permission
  - file-system
  - pipe-redirection
  - ps-kill
  - ssh
  - symlink
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

터미널에서 **폴더를 오가고 파일을 보고 찾는** 최소한의 리눅스 명령 세트.

## 비유

낯선 건물에서 **지금 어디인지 보고(pwd), 방 목록을 보고(ls), 이동하고(cd), 서류를 펼쳐 보고(cat), 특정 단어가 적힌 서류를 찾는(grep)** 것. 이 다섯 가지만 되면 어느 건물이든 길은 안 잃는다.

## 예시

```bash
pwd                                    # /home/lab  ← 지금 위치
cd /srv/hermes && ls -lah              # 절대 경로로 이동, 숨김 파일·크기까지 목록
cd ../backup                           # 상대 경로: 한 단계 위의 backup 폴더
cd -                                   # 직전 폴더로, cd 만 치면 홈(~)으로
cat docker-compose.yml                 # 파일 내용 전체
less /var/log/syslog                   # 긴 파일은 페이지 단위로 (q 로 나감)
tail -f logs/app.log                   # 파일 끝을 실시간으로 따라가기

grep -rn "OLLAMA_HOST" .               # 현재 폴더 아래 전부에서 문자열 찾기 (줄 번호 포함)
grep -i "error" app.log | wc -l        # 대소문자 무시, 몇 줄인지 세기
find . -name "*.dcm" -mtime -1         # 이름·수정 시각으로 파일 찾기 (어제 이후 DICOM)
cp -r src/ backup/ ; mv old.txt new.txt ; rm -rf ./tmp/   # 복사·이동·삭제
mkdir -p data/raw/2026 ; chmod +x run.sh                  # 폴더 만들기, 실행 권한
```

`/` 로 시작하면 **절대 경로**(루트부터), 아니면 지금 위치 기준 **상대 경로**다. `.` 은 현재 폴더, `..` 은 상위 폴더, `~` 은 내 홈. 스크립트나 크론에서는 실행 위치를 믿을 수 없으니 절대 경로를 쓰는 게 안전하다. 모르는 명령은 `man ls` 나 `ls --help`, 그리고 `tldr ls` 가 빠르다. 면접·실기에서는 "특정 문자열이 든 파일을 폴더 안에서 찾는 명령은?"(`grep -rl`), "절대 경로와 상대 경로의 차이" 로 나온다.

## 헷갈리기 쉬운 것

- **grep vs find**: grep 은 파일 **내용**에서 문자열을, find 는 파일 **이름·속성**으로 파일 자체를 찾는다. 둘을 이으면 `find . -name "*.py" | xargs grep -l "TODO"`.
- **rm -rf 는 휴지통이 없다**: 되돌릴 수 없고 `rm -rf /` 계열 실수는 서버를 날린다. 변수와 함께 쓸 땐(`rm -rf "$DIR"/`) 변수가 비었을 때를 먼저 생각한다.
- **ls -l 의 첫 열**은 권한 문자열(`-rw-r--r--`)이고 이걸 읽고 고치는 게 `chmod`/`chown`. 별도 카드(권한)에서 다룬다.
