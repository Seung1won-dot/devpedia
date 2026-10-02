---
id: systemd
term: systemd
aliases:
  - 시스템디
  - systemctl
  - 서비스 매니저
  - init 시스템
category: os
tags:
  - 리눅스
  - 리눅스운영
level: 2
kind: tool
related:
  - process
  - cron
  - docker-compose
  - logging
  - kernel
  - daemon
  - boot-process
see_also:
  - https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

리눅스 부팅 후 **서비스들을 순서대로 켜고, 죽으면 다시 살리고, 관리**하는 프로그램.

## 비유

아침에 건물 문 열고 **조명·보일러·엘리베이터를 정해진 순서로 켜는 당직 관리인**. 뭐 하나 꺼지면 알아서 다시 켜고, 일지(journal)도 남긴다.

## 예시

```ini
# /etc/systemd/system/ollama.service
[Unit]
Description=Ollama Server
After=network-online.target

[Service]
ExecStart=/usr/local/bin/ollama serve
User=ollama
Environment="OLLAMA_HOST=0.0.0.0:11434"
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload          # 유닛 파일 바꿨으면 반드시
sudo systemctl enable --now ollama    # 부팅 시 자동 시작 + 지금 시작
systemctl status caddy                # 살아 있나, 왜 죽었나
journalctl -u ollama -f               # 그 서비스 로그만 실시간
```

Caddy, Tailscale, Docker 데몬 모두 systemd 서비스로 돈다. 리부팅해도 리버스 프록시가 알아서 뜨는 이유.

## 헷갈리기 쉬운 것

- **크론**은 "정해진 시간에 한 번 실행", systemd 서비스는 "항상 떠 있어야 하는 것" 관리. 크론 대신 systemd 타이머를 쓸 수도 있다.
- **Docker Compose 의 `restart: always`** 는 컨테이너 수준에서 같은 역할. 그 Docker 데몬 자체는 systemd 가 살린다.
