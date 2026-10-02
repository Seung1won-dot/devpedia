---
id: socket
term: 소켓
aliases:
  - Socket
  - 네트워크 소켓
  - 소켓 프로그래밍
  - 유닉스 도메인 소켓
  - BSD 소켓
category: network
tags:
  - TCP/IP
  - 네트워크
  - 리눅스
  - 면접
level: 2
kind: concept
related:
  - port
  - ip-address
  - tcp-udp
  - file-descriptor
  - websocket
  - three-way-handshake
see_also:
  - https://docs.python.org/ko/3/library/socket.html
  - https://man7.org/linux/man-pages/man7/socket.7.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

프로그램이 네트워크 통신을 **파일처럼 읽고 쓰게 해 주는 끝점**(IP+포트).

## 비유

전화기의 **수화기**. 번호(IP)와 내선(포트)으로 연결이 되고 나면 상대가 어디 있든 신경 쓰지 않고, 수화기에 대고 말하고(write) 듣기만(read) 하면 된다.

## 예시

```python
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)   # IPv4 + TCP
s.connect(("192.168.10.20", 11434))                       # GPU 서버의 Ollama 포트
s.sendall(b"GET /api/tags HTTP/1.0\r\nHost: gpu-server\r\n\r\n")
print(s.recv(4096).decode())                              # HTTP 응답이 그냥 바이트로 돌아온다
s.close()
```

```bash
ss -tnp | grep 11434
# ESTAB  192.168.10.5:52310  192.168.10.20:11434  users:(("python3",pid=4133,fd=3))
```

HTTP 라이브러리 없이도 소켓에 바이트를 쓰면 HTTP 요청이 된다 — `requests` 나 `curl` 이 속에서 하는 일이 이것이다. 연결 하나는 (내 IP, 내 포트, 상대 IP, 상대 포트) 네 값으로 구분되고, `fd=3` 처럼 프로세스 안에서는 파일 디스크립터 하나다. 서버 쪽(FastAPI 를 띄우는 uvicorn)은 `bind → listen → accept` 순서로 포트를 잡고 접속마다 소켓을 하나씩 더 만든다. 서버를 껐다 바로 켤 때 나오는 `Address already in use` 는 이전 소켓이 아직 그 포트를 쥐고 있다는 뜻이다.

## 헷갈리기 쉬운 것

- **포트**는 번호일 뿐이고, 소켓은 그 번호를 붙잡고 실제로 읽고 쓰는 프로그램 쪽 객체. 포트 8000 하나에 listen 소켓 1개 + 접속자 수만큼의 소켓이 붙는다.
- **WebSocket** 은 이름만 비슷한 HTTP 위의 프로토콜. 브라우저 JS 는 진짜 소켓을 열 수 없어서 WebSocket 이 대신 그 느낌을 준다.
- **유닉스 도메인 소켓**(`/var/run/docker.sock`, PostgreSQL 의 `.s.PGSQL.5432`)은 같은 컴퓨터 안에서 IP·포트 대신 파일 경로로 연결하는 소켓. 네트워크를 안 타서 빠르고, 파일 권한으로 접근을 막는다.
