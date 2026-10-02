---
id: symlink
term: 심볼릭 링크
aliases:
  - Symbolic Link
  - 심링크
  - 소프트 링크
  - ln -s
  - 하드링크
category: os
tags:
  - 파일시스템
  - 리눅스
  - 셸
level: 1
kind: concept
related:
  - file-system
  - file-permission
  - linux-basic-commands
  - mount-partition
  - docker-volume
  - dotfiles
see_also:
  - https://man7.org/linux/man-pages/man7/symlink.7.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

다른 파일의 **경로를 적어 둔 바로가기 파일**로, 열면 원본이 대신 열린다.

## 비유

책상 위에 붙여 둔 **"서류는 3층 캐비닛에 있음" 쪽지**. 쪽지를 버려도 서류는 멀쩡하지만, 서류를 치우면 쪽지는 빈 곳을 가리키는 종이가 된다.

## 예시

```bash
ln -s /mnt/data/datasets ~/datasets     # 순서: ln -s <원본> <링크 이름>
ls -l ~/datasets                        # lrwxrwxrwx ... datasets -> /mnt/data/datasets
readlink -f ~/datasets                  # 링크를 끝까지 따라간 실제 경로
ln -s ~/dotfiles/.bashrc ~/.bashrc      # 설정 파일을 git 저장소에 두고 홈에는 링크만
ln /mnt/data/a.csv b.csv                # -s 가 없으면 하드링크
ls -l /usr/bin/python3                  # python3 -> python3.12  (시스템 파이썬도 심링크)
```

큰 데이터셋은 용량 넉넉한 디스크(`/mnt/data`)에 두고 홈 디렉터리에는 링크만 걸어 두면, 코드에서는 `~/datasets/ct` 로 짧게 쓰면서 디스크를 바꿔도 링크만 다시 걸면 된다. 인자 순서를 거꾸로 쓰는 실수가 가장 흔하고, `ls -l` 첫 글자가 `l` 이면 링크다. 원본을 지우거나 옮기면 링크는 남아 있지만 열 때 `No such file` 이 난다(깨진 링크).

## 헷갈리기 쉬운 것

- **하드링크** 는 같은 데이터 덩어리(inode)에 이름을 하나 더 붙이는 것이라 원본을 지워도 데이터가 남는다. 대신 다른 디스크(파일 시스템)나 디렉터리에는 못 건다. 심볼릭 링크는 어디든 되지만 원본이 사라지면 깨진다.
- **복사(cp)** 는 독립된 두 번째 파일이라 한쪽을 고쳐도 다른 쪽은 그대로다. 링크는 하나의 파일을 두 이름으로 보는 것.
- **Windows 바로가기(.lnk)** 는 탐색기만 이해하는 파일이고, 프로그램이 열면 .lnk 자체가 열린다. 심볼릭 링크는 OS 수준이라 모든 프로그램이 원본처럼 본다(Windows 도 `mklink` 로 만들 수 있다).
