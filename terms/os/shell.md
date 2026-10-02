---
id: shell
term: 셸(bash)
aliases:
  - Shell
  - bash
  - 쉘
  - 명령 해석기
category: os
tags:
  - 셸
  - 리눅스
level: 1
kind: tool
related:
  - environment-variable
  - kernel
  - ssh
  - cron
  - file-permission
  - regex
  - pipe-redirection
see_also:
  - https://www.gnu.org/software/bash/manual/
status: review
created: 2026-09-25
updated: 2026-09-29
---

## 한 줄 정의

사용자가 친 **명령을 읽어 커널에 전달하고 결과를 보여주는** 프로그램.

## 비유

관리사무소(커널) 앞의 **민원 창구 직원**. 내가 "3층 불 켜 주세요" 라고 말하면 알아듣고 사무소에 전달하며, 자주 하는 말은 줄임말(alias)로 등록해 둘 수도 있다.

## 예시

```bash
echo $SHELL                        # /bin/bash 또는 /bin/zsh
ssh lab@gpu-server                 # 접속하면 원격 서버의 셸이 열린다
```

```bash
#!/usr/bin/env bash
# backup.sh — 명령 여러 개를 파일로 묶은 셸 스크립트 (Hermes 크론잡이 이렇게 돈다)
set -euo pipefail                  # 에러 나면 즉시 멈춤
docker compose -f /srv/hermes/docker-compose.yml exec -T db \
  pg_dump -U postgres app | gzip > /backup/db-$(date +%F).sql.gz
```

```bash
chmod +x backup.sh && ./backup.sh  # 실행 권한 주고 돌리기
```

## 헷갈리기 쉬운 것

- **터미널**은 글자를 입출력하는 창(화면), 셸은 그 안에서 명령을 해석하는 프로그램. 터미널 앱을 바꿔도(Windows Terminal, iTerm) 셸은 bash 그대로일 수 있다.
- **bash vs zsh vs sh**: 다 셸의 종류. 스크립트 첫 줄 `#!/usr/bin/env bash` 가 어떤 셸로 실행할지 정한다.
