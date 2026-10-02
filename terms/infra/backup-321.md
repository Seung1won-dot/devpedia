---
id: backup-321
term: 백업 3-2-1 규칙
aliases:
  - 3-2-1 Backup Rule
  - 3-2-1 규칙
  - 3-2-1 백업
  - 3-2-1-1-0
category: infra
tags:
  - 백업
  - 스토리지
  - 서버운영
level: 2
kind: pattern
related:
  - backup-restore
  - snapshot-backup
  - nas
  - object-storage
  - ransomware
  - raid
see_also:
  - https://www.backblaze.com/blog/the-3-2-1-backup-strategy/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

데이터 **복사본 3개를 매체 2종류에, 그중 1개는 다른 장소에** 두라는 백업 원칙.

## 비유

**졸업논문 파일**을 노트북에 하나, USB 에 하나, 집 밖(클라우드나 부모님 집)에 하나 두는 것. 노트북이 죽고 USB 를 잃어버리고 집에 불이 나도 하나는 남는다.

## 예시

```bash
# 1번째 복사본: 원본 — Proxmox 위의 VM 디스크
# 2번째: 매일 새벽 vzdump 로 NAS(다른 매체) 에 — 웹 UI Datacenter > Backup 에서 예약
vzdump 101 --storage nas-backup --mode snapshot --compress zstd
# 3번째: NAS 의 백업 폴더를 다른 장소(S3 호환 클라우드)로 — 주 1회 cron
rclone sync /volume1/pve-backup remote-b2:eclab-backup --transfers 4
# 복구 연습 — 분기에 한 번은 실제로 꺼내 본다 (999번으로 복원해서 켜 보고 지운다)
qm restore 999 /mnt/pve/nas-backup/dump/vzdump-qemu-101-2026_10_01-03_00_00.vma.zst --storage local-lvm
```

같은 디스크의 복사본은 디스크가 죽으면 같이 죽고, 같은 건물의 복사본은 화재·도난·랜섬웨어에 같이 당한다 — 그래서 "매체 2종류" 와 "다른 장소 1개" 다. 요즘은 **3-2-1-1-0**(하나는 오프라인 또는 수정 불가, 복구 테스트 오류 0건)으로 늘려 말한다. 병원 데이터는 외부 반출이 안 되는 경우가 많아 "다른 장소" 가 같은 병원의 다른 건물 NAS 가 되기도 한다.

## 헷갈리기 쉬운 것

- **RAID 는 백업이 아니다.** 디스크 한 개 고장은 버티지만 실수로 지운 것·랜섬웨어 암호화는 그대로 미러링된다. 복사본 3개에 안 들어간다.
- **스냅샷**도 원본과 같은 디스크에 있어서 복사본 수에 안 들어간다.
- **동기화**(Dropbox, `rsync --delete`)는 원본에서 지우면 사본도 지워진다. 백업은 지운 것도 일정 기간 남겨야 한다.
