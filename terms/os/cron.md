---
id: cron
term: 크론
aliases:
  - Cron
  - crontab
  - 크론잡
  - 크론탭
category: os
tags:
  - 크론
  - 리눅스
level: 1
kind: tool
related:
  - shell
  - systemd
  - github-actions
  - backup-restore
  - environment-variable
  - background-job
  - orchestration
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

**정해진 시각·주기에 명령을 자동 실행**해 주는 리눅스의 예약 실행기.

## 비유

**매일 아침 7시에 울리는 알람 시계**에 "울리면 쓰레기 버리기" 까지 붙여 둔 것. 사람이 안 깨어 있어도 시계가 대신 일을 시킨다.

## 예시

```bash
crontab -e          # 내 크론 표 편집
crontab -l          # 등록된 것 보기
```

```text
# 분  시  일  월  요일   명령
  0   3   *   *   *      /srv/hermes/backup.sh >> /var/log/hermes-backup.log 2>&1
  */10 *  *   *   *      curl -fsS https://ender-chest.lab.example.com/ || /srv/hermes/notify.sh "EC down"
```

Hermes 크론잡이 매일 새벽 3시에 DB 를 덤프하는 게 위 첫 줄. 주의할 점 두 가지: 크론은 **내 셸의 환경변수를 안 읽으니** 스크립트 안에서 PATH 와 `.env` 를 직접 지정하고, 시간대는 서버 기준(UTC 인 경우 많음)이다.

## 헷갈리기 쉬운 것

- **systemd 타이머**는 같은 일을 systemd 로 하는 것. 로그(journal)와 "놓친 실행 따라잡기" 가 필요하면 타이머, 한 줄로 끝내려면 크론.
- **GitHub Actions 의 `schedule`** 도 크론 문법을 그대로 쓰지만, 내 서버가 아니라 GitHub 러너에서 돈다. 서버 백업은 크론, 리포지토리 작업은 Actions.
