---
id: mount-partition
term: 마운트/파티션
aliases:
  - Mount
  - Partition
  - 마운트
  - 파티션
  - fstab
  - lsblk
category: os
tags:
  - 파일시스템
  - 리눅스
  - 스토리지
  - 리눅스운영
level: 1
kind: concept
related:
  - file-system
  - symlink
  - raid
  - docker-volume
  - nas
  - storage-types
see_also:
  - https://man7.org/linux/man-pages/man5/fstab.5.html
  - https://man7.org/linux/man-pages/man8/mount.8.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

디스크를 **구역(파티션)으로 나누고** 각 구역을 **폴더에 붙여(마운트)** 쓰는 것.

## 비유

새로 산 **책장(디스크)** 을 칸막이로 나누고(파티션) 각 칸을 방 안의 특정 문(폴더)과 이어 두는 것(마운트). 리눅스에는 C:나 D: 드라이브가 없고, 모든 디스크가 `/` 아래 어딘가의 폴더로 들어온다.

## 예시

```bash
lsblk -f                                  # 디스크 → 파티션 → 파일시스템 → 마운트 위치를 트리로
sudo mkfs.ext4 /dev/sdb1                  # 새 파티션 포맷 (안의 데이터는 전부 사라짐!)
sudo mkdir -p /mnt/data
sudo mount /dev/sdb1 /mnt/data            # 수동 마운트 — 재부팅하면 풀린다
df -h /mnt/data                           # 붙었는지, 남은 용량은
sudo umount /mnt/data                     # 떼기 (누가 쓰는 중이면 "target is busy")
blkid /dev/sdb1                           # UUID 확인 → fstab 에 적을 값
```

```text
# /etc/fstab — 부팅 때 자동 마운트. 장치 이름(sdb)은 순서가 바뀔 수 있으니 UUID 로 적는다
UUID=3f2a9c1e-...   /mnt/data   ext4   defaults,nofail   0   2
```

Proxmox 에서 VM 에 디스크를 하나 더 달면 VM 안에서는 `/dev/sdb` 로 보일 뿐 아무 폴더에도 안 나타난다. 파티션을 만들고(`fdisk`/`parted`), 포맷하고(`mkfs`), 마운트해야 비로소 `ls` 로 보인다. fstab 에 `nofail` 없이 외장 디스크를 적어 두면 디스크를 뺐을 때 부팅이 복구 모드에서 멈추니 데이터 디스크에는 꼭 넣는다. 데이터셋은 이렇게 큰 디스크를 `/mnt/data` 에 붙이고 홈에는 심볼릭 링크만 거는 게 연구실 관례다.

## 헷갈리기 쉬운 것

- **파티션 vs 파일 시스템 vs 마운트**: 파티션은 디스크를 나눈 구역, 파일 시스템은 그 구역을 포맷해 입힌 정리 규칙, 마운트는 그걸 폴더 트리에 붙이는 동작. 셋은 순서대로 일어난다.
- **Docker 볼륨/바인드 마운트** 는 같은 "마운트" 라는 말을 쓰고 원리도 비슷하다 — 다만 디스크가 아니라 호스트 폴더를 컨테이너 안 경로에 붙인다.
- **NAS(NFS/SMB) 마운트** 도 같은 `mount` 명령으로 네트워크 저장소를 폴더에 붙인다. 네트워크가 끊기면 멈추므로 fstab 에는 `_netdev,nofail` 을 함께 쓴다.
- **lsblk vs df**: lsblk 는 장치 중심(안 붙은 디스크도 보임), df 는 마운트된 것만 용량과 함께 보여 준다.
