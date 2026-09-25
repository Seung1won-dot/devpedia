---
id: system-call
term: 시스템 콜
aliases:
  - System Call
  - 시스템 호출
  - syscall
category: os
tags:
  - 리눅스
  - 프로세스
level: 2
related:
  - kernel
  - process
  - file-system
  - api
  - docker
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

프로그램이 파일·네트워크 같은 자원을 쓰려고 **커널에 부탁하는 정식 창구**.

## 비유

은행 창구. 금고(하드웨어)에 손님이 직접 들어갈 수 없으니 **창구 직원(커널)에게 "출금해 주세요" 라고 신청**하는 것이 시스템 콜이다.

## 예시

```bash
strace -c -f python -c "open('/etc/hostname').read()"
# read, openat, mmap, close ... 어떤 시스템 콜을 몇 번 불렀는지 집계
strace -e trace=network curl -s https://api.lab.example.com/health
# socket, connect, sendto, recvfrom — 네트워크 요청의 실체
```

파이썬의 `open()`, `requests.get()` 은 결국 `openat`, `connect` 같은 시스템 콜로 내려간다. 그래서 Docker 의 `seccomp` 프로파일은 컨테이너가 부를 수 있는 시스템 콜 목록을 제한해 보안을 높인다.

## 헷갈리기 쉬운 것

- **라이브러리 함수**(`printf`, 파이썬 `open()`)는 사용자 공간에서 돌다가 필요할 때 시스템 콜을 부른다. 시스템 콜은 커널로 넘어가는 경계 자체.
- **API** 와 비슷한 개념이지만, 시스템 콜은 커널이 제공하는 API 이고 웹 API 는 서버가 제공하는 것.
