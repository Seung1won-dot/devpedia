---
id: backup-restore
term: 백업/복구
aliases:
  - Backup/Restore
  - 백업
  - 복원
  - pg_dump
category: database
tags:
  - 운영
  - 스토리지
  - 백업
level: 1
kind: concept
related:
  - snapshot-backup
  - replication
  - cron
  - scp-rsync
  - migration
  - backup-321
  - raid
see_also:
  - https://www.postgresql.org/docs/current/backup.html
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

DB 내용을 **파일로 떠서 따로 보관**하고, 사고가 나면 그 파일로 되돌리는 일.

## 비유

중요한 서류를 **복사해서 다른 건물 금고에** 넣어 두는 것. 복사만 하고 한 번도 꺼내 본 적 없으면, 정작 불이 났을 때 복사본이 빈 종이일 수도 있다.

## 예시

Proxmox VM 에 올린 Postgres 를 매일 새벽에 덤프하는 crontab 한 줄과, 복구 명령.

```bash
# 매일 03:00 덤프 (-Fc: 압축된 custom 포맷)
0 3 * * * pg_dump -Fc -U postgres enderchest > /backup/enderchest_$(date +\%F).dump

# 복구: 빈 DB 를 만들고 그 안에 되살리기
createdb -U postgres enderchest_restored
pg_restore -U postgres -d enderchest_restored /backup/enderchest_2026-09-25.dump
```

덤프 파일은 VM 안에만 두지 말고 rsync 로 다른 머신(NAS 등)에 복사한다. Supabase 호스팅은 자동 백업이 있지만, `supabase db dump` 로 내 손에 사본을 하나 더 두는 게 안전하다. 복구 연습을 한 번은 해 봐야 백업이라 부를 수 있다.

## 헷갈리기 쉬운 것

- **스냅샷**은 Proxmox 가 VM 디스크 전체를 특정 시점으로 찍는 것. DB 가 파일을 쓰는 도중에 찍히면 깨질 수 있어서, DB 는 `pg_dump` 로 따로 뜨는 게 정석.
- **레플리케이션**은 실시간 사본이라 실수(DROP)도 같이 복사된다. 백업은 "그 실수 전으로 돌아가기" 용.
