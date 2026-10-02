---
id: docker-volume
term: 볼륨/바인드 마운트
aliases:
  - Docker Volume
  - 도커 볼륨
  - Bind Mount
  - 바인드 마운트
  - -v 옵션
category: infra
tags:
  - 컨테이너
  - 스토리지
  - 백업
level: 1
kind: concept
related:
  - docker
  - docker-compose
  - docker-image
  - file-system
  - backup-restore
  - mount-partition
see_also:
  - https://docs.docker.com/engine/storage/volumes/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

컨테이너를 지워도 **데이터가 남도록** 호스트의 저장 공간을 컨테이너 안에 붙이는 것.

## 비유

호텔 방(컨테이너)은 체크아웃하면 싹 치워지지만, 방에 들여놓은 **내 캐리어**(볼륨)는 그대로 들고 나온다. 바인드 마운트는 집 서랍장을 호텔 방에 통째로 끌어다 놓고 쓰는 것.

## 예시

```yaml
# compose.yml — DB 데이터는 네임드 볼륨, 설정 파일은 바인드 마운트
services:
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data        # 네임드 볼륨: 도커가 위치를 관리
  caddy:
    image: caddy:2
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro    # 바인드 마운트: 호스트 파일 그대로, 읽기 전용
      - caddy_data:/data                        # 인증서 보관 — 지우면 재발급
volumes:
  pgdata:
  caddy_data:
```

```bash
docker volume ls
docker volume inspect pgdata        # 실제 경로: /var/lib/docker/volumes/pgdata/_data
# 볼륨 백업: 임시 컨테이너로 tar 로 묶어 호스트에 떨어뜨리기
docker run --rm -v pgdata:/from -v "$PWD":/to alpine tar czf /to/pgdata.tgz -C /from .
```

컨테이너 자체의 쓰기 영역은 컨테이너를 지우고 다시 만들면 사라진다 — `volumes:` 없이 Postgres 를 띄웠다가 데이터가 통째로 날아가는 것이 신입이 가장 자주 겪는 사고다. 내가 편집할 파일(설정·소스·데이터셋 폴더)은 바인드 마운트, 프로그램만 건드리는 데이터(DB·인증서·모델 캐시)는 네임드 볼륨이 기본 선택이다.

## 헷갈리기 쉬운 것

- **네임드 볼륨**은 도커가 경로를 정해 관리하고 어느 서버로 옮겨도 똑같이 동작한다. **바인드 마운트**는 내가 호스트 경로를 직접 지정해 바로 열어 볼 수 있지만, 경로가 없거나 소유자(UID)가 달라 권한 오류가 나기 쉽다.
- **이미지**는 읽기 전용 설계도, 볼륨은 그 위에서 돌아가는 동안 쌓이는 데이터. 이미지를 새 버전으로 바꿔도 볼륨은 그대로 붙는다.
- **볼륨은 백업이 아니다.** 같은 디스크에 있으니 디스크가 죽으면 같이 죽는다. 위처럼 tar 로 묶어 NAS 로 옮겨야 백업이다.
