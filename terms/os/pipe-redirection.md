---
id: pipe-redirection
term: 파이프/리다이렉션
aliases:
  - Pipe and Redirection
  - 파이프
  - 리다이렉션
  - 리다이렉트
  - "2>&1"
  - 표준 입출력
category: os
tags:
  - 셸
  - 리눅스
level: 1
kind: concept
related:
  - shell
  - linux-basic-commands
  - ps-kill
  - logging
  - regex
  - file-descriptor
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

명령의 출력을 **다음 명령의 입력이나 파일로 흘려보내는** 셸 문법.

## 비유

주방의 **배관**. 싱크대 물(출력)을 하수구로 보낼지(`>`), 양동이에 모아 둘지(`>>`), 옆 싱크대로 넘겨서 거기서 다시 씻게 할지(`|`) 호스를 어디에 꽂느냐의 문제다.

## 예시

```bash
docker compose logs --no-color caddy | grep -i error | tail -20   # 파이프: 출력 → 입력
ps aux | grep -v grep | grep ollama | awk '{print $2, $4"%"}'      # 여러 개 이어 붙이기

python train.py > train.log            # 표준 출력(1)을 파일로 (덮어씀)
python train.py >> train.log           # 파일 끝에 이어 붙임
python train.py > train.log 2>&1       # 에러(2)도 표준 출력이 가는 곳(1)으로 → 한 파일에
python train.py 2> /dev/null           # 에러만 버리기
nohup python train.py > out.log 2>&1 & # 밤새 돌릴 때의 정석 조합
python check.py < input.txt            # 파일을 표준 입력으로
```

모든 프로세스는 표준 입력(0)·표준 출력(1)·표준 에러(2) 세 통로를 갖고 시작한다. `|` 는 앞 명령의 1번을 뒤 명령의 0번에 연결하고, `>` 는 1번을 파일로 돌린다. `2>&1` 은 순서가 중요해서 `2>&1 > log` 로 쓰면 에러는 여전히 화면에 나온다(2번을 "그때의 1번 = 화면" 에 먼저 묶어 버리므로). 면접·실기에서는 "`2>&1` 이 무슨 뜻인가?", "로그에서 에러 줄만 세는 명령을 한 줄로" 같은 식으로 나온다.

## 헷갈리기 쉬운 것

- **`|` vs `||`**: 하나는 파이프, 둘은 "앞이 실패하면 뒤 실행". `&&` 는 "앞이 성공하면 뒤 실행".
- **`>` vs `>>`**: `>` 는 파일을 비우고 새로 쓰고, `>>` 는 뒤에 붙인다. 로그 파일에 `>` 를 쓰면 기존 로그가 날아간다.
- **`tee`**: 화면에도 보이고 파일에도 남기고 싶을 때 `cmd | tee log.txt`. 파이프 중간에서 물을 두 갈래로 나누는 T자 관.
