---
id: file-descriptor
term: 파일 디스크립터
aliases:
  - File Descriptor
  - FD
  - stdin/stdout/stderr
  - 표준 입출력
  - 표준 입력/표준 출력/표준 에러
category: os
tags:
  - 리눅스
  - 프로세스
  - 파일시스템
  - 셸
level: 2
kind: concept
related:
  - pipe-redirection
  - process
  - system-call
  - kernel
  - socket
  - logging
see_also:
  - https://man7.org/linux/man-pages/man2/open.2.html
  - https://man7.org/linux/man-pages/man3/stdin.3.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

프로세스가 연 **파일·소켓·파이프를 가리키는 정수 번호**로, 0·1·2 는 표준 입출력.

## 비유

식당 **번호표**. 손님이 테이블(파일)을 직접 들고 다니는 대신 번호로 부르고, 0·1·2번은 입장할 때 이미 배정돼 있는 자리(입력·출력·에러)다.

## 예시

```bash
ls -l /proc/$$/fd                        # 지금 이 셸이 연 것들: 0,1,2 → /dev/pts/0 (터미널)
ls -l /proc/$(pgrep -n python)/fd | wc -l   # 학습 스크립트가 지금 연 파일 개수
ulimit -n                                # 프로세스 하나가 열 수 있는 FD 상한 (보통 1024)
lsof -p $(pgrep -n uvicorn) | tail       # API 서버가 연 파일·소켓 목록
python train.py > out.log 2>&1           # 1번을 파일로, 2번은 "1번이 가는 곳" 으로
```

```python
f = open("patients.csv")
print(f.fileno())     # 3 — 0,1,2 다음으로 비어 있는 번호
f.close()             # 안 닫으면 번호가 계속 쌓인다 → with 문을 쓰는 이유
```

리눅스에서는 소켓·파이프·장치도 전부 "파일" 로 취급해서 똑같이 FD 번호로 읽고 쓴다. 그래서 `Too many open files` 에러는 진짜 파일뿐 아니라 DB 커넥션이나 HTTP 연결을 닫지 않을 때도 난다 — 반복문 안에서 `open()` 하고 안 닫는 코드가 단골이다. 동시 접속이 많은 FastAPI 서버는 `ulimit -n` 을 올려 줘야 할 때가 있다. Docker 컨테이너의 로그는 그 프로세스의 1번(stdout)·2번(stderr) 에 쓴 것이라, 파일 대신 표준 출력으로 찍어야 `docker logs` 에 보인다.

## 헷갈리기 쉬운 것

- **파일 경로 vs FD**: 경로는 이름이고 FD 는 그 파일을 "연 뒤" 받는 번호다. 같은 파일을 두 번 열면 FD 가 둘 생기고, 각자 읽는 위치가 따로 간다.
- **파일 객체/핸들**: 파이썬 `open()` 이 돌려주는 객체는 FD 를 감싼 껍데기이고, Windows 는 같은 개념을 핸들이라 부른다.
- **`2>&1` 의 순서**: `> log 2>&1` 과 `2>&1 > log` 는 다르다. 뒤쪽은 2번을 "그때의 1번 = 화면" 에 먼저 묶어서 에러가 파일에 안 들어간다(파이프/리다이렉션 카드 참고).
