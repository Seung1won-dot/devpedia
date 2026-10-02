---
id: log-rotation
term: 로그 로테이션
aliases:
  - Log Rotation
  - 로그 순환
  - logrotate
  - 로그 압축/삭제
  - journald vacuum
category: os
tags:
  - 로깅
  - 리눅스운영
  - 운영
  - 서버운영
level: 2
kind: concept
related:
  - logging
  - cron
  - systemd
  - docker-compose
  - log-level
  - monitoring
see_also:
  - https://man7.org/linux/man-pages/man8/logrotate.8.html
  - https://docs.docker.com/engine/logging/drivers/json-file/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

로그 파일이 무한정 커지지 않게 **주기적으로 자르고 압축하고 오래된 것은 지우는** 것.

## 비유

**일기장을 달마다 새 권으로 바꾸고**, 지난 권은 상자에 눌러 담아 두다가 1년 넘은 건 버리는 것. 안 하면 책상(디스크)이 일기장으로 꽉 찬다.

## 예시

```text
# /etc/logrotate.d/labapp
/var/log/labapp/*.log {
    daily              # 매일 자른다
    rotate 14          # 14개(=2주치)만 보관, 그 전 것은 삭제
    compress           # 지난 것은 gzip
    delaycompress      # 바로 직전 것은 압축 보류 (아직 쓰고 있을 수 있어서)
    missingok
    notifempty
    copytruncate       # 복사한 뒤 원본을 비움 — 프로그램이 파일을 계속 잡고 있어도 됨
}
```

```bash
sudo logrotate -d /etc/logrotate.d/labapp    # 드라이런: 실제로 안 자르고 뭘 할지만 출력
journalctl --disk-usage                      # systemd 저널이 차지하는 용량
sudo journalctl --vacuum-time=30d            # 30일 넘은 저널 삭제
```

```yaml
# docker-compose.yml — 컨테이너 stdout 로그도 돌려야 한다 (기본값은 무제한!)
services:
  api:
    logging:
      driver: json-file
      options: { max-size: "50m", max-file: "5" }
```

logrotate 는 보통 cron 이나 systemd 타이머로 하루 한 번 돈다. 연구실 서버 디스크가 100% 가 되는 가장 흔한 원인이 로테이션 없는 Docker 컨테이너 로그(`/var/lib/docker/containers/*/*-json.log`)라서, compose 파일에 `logging` 블록을 넣는 걸 습관으로 한다. `copytruncate` 대신 파일을 이름 바꿔 자를 때는 `postrotate` 에서 프로그램에 `SIGHUP` 이나 `systemctl reload` 를 보내 새 파일을 열게 해야 한다.

## 헷갈리기 쉬운 것

- **로그 레벨 조절** 은 애초에 적게 쓰는 것(DEBUG→INFO), 로테이션은 쌓인 것을 치우는 것. 둘 다 필요하다.
- **로그 파일을 `rm` 했는데 용량이 안 돌아온다**: 프로세스가 그 파일을 아직 열고 있으면(FD 유지) 디스크 공간은 프로세스가 끝나야 풀린다. `lsof | grep deleted` 로 확인하고, 그래서 `rm` 대신 `truncate` 나 `copytruncate` 를 쓴다.
- **중앙 로그 수집(ELK/Loki)** 으로 보내더라도 로컬 파일 로테이션은 따로 해야 한다. 보낸 뒤에는 로컬 보관 기간을 짧게 잡으면 된다.
