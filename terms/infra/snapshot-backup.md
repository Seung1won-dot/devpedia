---
id: snapshot-backup
term: 스냅샷/백업
aliases:
  - Snapshot
  - 스냅샷
  - 백업
  - 복원 지점
category: infra
tags:
  - 스토리지
  - 서버운영
  - 가상화
level: 1
related:
  - proxmox
  - vm
  - backup-restore
  - rollback
  - object-storage
see_also:
  - https://pve.proxmox.com/wiki/Backup_and_Restore
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**스냅샷**은 그 순간의 상태를 찍어 둔 되돌리기 지점, **백업**은 다른 곳에 둔 복사본.

## 비유

스냅샷은 게임의 **세이브 포인트**(같은 기기 안, 빠름), 백업은 세이브 파일을 **다른 기기에 복사**해 두는 것. 기기가 통째로 망가지면 세이브 포인트는 같이 사라지지만 복사본은 남는다.

## 예시

```bash
# 업그레이드 전에 스냅샷 → 문제 생기면 1분 안에 되돌리기
qm snapshot 101 pre-upgrade --description "CUDA 12.4 -> 12.6 전"
qm rollback 101 pre-upgrade        # 되돌리기
qm delsnapshot 101 pre-upgrade     # 잘 됐으면 지우기 (오래 두면 디스크 느려짐)
# 백업: 다른 저장소(NAS)에 통째로 — 매일 새벽 자동은 웹 UI Datacenter > Backup 에서 예약
vzdump 101 --storage nas-backup --mode snapshot --compress zstd
```

스냅샷은 원본과 같은 디스크에 있어서 디스크가 죽으면 같이 죽는다 — 스냅샷은 "실험 전 안전장치", 백업은 "재난 대비" 로 둘 다 한다.

## 헷갈리기 쉬운 것

- **스냅샷은 백업이 아니다.** 원본과 같은 디스크에 있어 디스크 고장·랜섬웨어에는 무력하다.
- **클론**은 스냅샷을 새 VM 으로 독립시킨 것. 스냅샷은 원본에 묶여 있어 원본 VM 을 지우면 같이 사라진다.
