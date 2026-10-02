---
id: raid
term: RAID
aliases:
  - Redundant Array of Independent Disks
  - 레이드
  - RAID 0/1/5/10
  - 디스크 어레이
  - 미러링/스트라이핑
  - ZFS mirror/RAIDZ
category: os
tags:
  - 스토리지
  - 하드웨어
  - 백업
  - 홈랩
level: 2
kind: concept
related:
  - mount-partition
  - snapshot-backup
  - backup-321
  - nas
  - storage-types
  - proxmox
see_also:
  - https://raid.wiki.kernel.org/index.php/Linux_Raid
  - https://openzfs.github.io/openzfs-docs/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

디스크 여러 개를 **하나처럼 묶어** 속도를 높이거나 **한 개가 죽어도 버티게** 하는 기술.

## 비유

중요한 서류를 **복사해 두 캐비닛에 똑같이 두거나(RAID 1)**, 쪽수별로 여러 캐비닛에 흩어 넣고 **한 캐비닛이 타도 복원할 수 있는 요약표(패리티)** 를 따로 두는 것(RAID 5). 다만 내가 서류를 잘못 찢으면 모든 캐비닛에서 똑같이 찢긴다.

## 예시

```text
RAID 0   스트라이핑    2개 이상 → 용량·속도 n배, 하나만 죽어도 전부 날아감 (임시 스크래치용)
RAID 1   미러링        2개      → 용량 1개분, 하나 죽어도 OK (OS·DB 디스크의 기본)
RAID 5   패리티        3개 이상 → 용량 (n-1)개분, 1개 고장 허용
RAID 6   이중 패리티   4개 이상 → 용량 (n-2)개분, 2개 고장 허용
RAID 10  1+0           4개 이상 → 용량 절반, 빠르고 튼튼 (VM·DB 스토리지)
```

```bash
cat /proc/mdstat                   # 리눅스 소프트웨어 RAID(mdadm) 상태 — [UU] 정상, [U_] 하나 빠짐
sudo mdadm --detail /dev/md0
zpool status                       # Proxmox ZFS: mirror(=RAID 1), raidz1(=RAID 5), raidz2(=RAID 6)
```

연구실 Proxmox 는 SSD 두 장을 ZFS mirror 로 묶어 설치하는 게 흔하다. 디스크 하나가 죽어도 VM 은 그대로 돌고, 새 디스크로 바꾸면 자동으로 다시 채운다(resilver). 데이터셋 보관용 NAS 는 큰 HDD 여러 장을 RAID 5/6(raidz) 로 묶어 용량을 살린다. 다만 수 TB HDD 로 RAID 5 를 짜면 재구성에 하루 넘게 걸리고 그 사이 두 번째가 죽으면 끝이라, 요즘은 RAID 6 이나 RAID 10 을 권한다.

## 헷갈리기 쉬운 것

- **RAID 는 백업이 아니다.** 막아 주는 건 "디스크 고장" 하나뿐이고, 삭제 실수·랜섬웨어·화재는 모든 디스크에 똑같이 반영된다. 백업은 3-2-1 규칙으로 따로.
- **RAID 0 은 "안전" 과 반대 방향.** 디스크가 2개면 고장 확률은 2배가 된다.
- **스냅샷** 은 같은 디스크 안에서 "어제 상태로 되돌리기", RAID 는 디스크 자체를 중복시키기. 스냅샷은 삭제 실수를, RAID 는 하드웨어 고장을 각각 막는다.
- **하드웨어 RAID vs 소프트웨어 RAID(mdadm/ZFS)**: 전용 카드가 죽으면 같은 모델이 있어야 데이터를 읽지만, ZFS 는 아무 리눅스에 꽂아도 `zpool import` 로 살아난다.
