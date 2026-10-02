---
id: file-system
term: 파일 시스템
aliases:
  - File System
  - 파일시스템
  - ext4
  - ZFS
category: os
tags:
  - 파일시스템
  - 리눅스
level: 1
kind: concept
related:
  - file-permission
  - kernel
  - snapshot-backup
  - object-storage
  - proxmox
  - symlink
  - mount-partition
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

디스크에 데이터를 **파일과 폴더 형태로 정리해 저장하고 찾는** 규칙.

## 비유

도서관의 **서가 배치와 색인 카드**. 책(데이터)을 어느 서가 몇 번째 칸에 꽂을지, 제목으로 어떻게 찾을지 정해 둔 규칙이라 규칙이 다른 도서관끼리는 카드가 안 맞는다.

## 예시

```bash
df -hT                     # 마운트된 파일 시스템과 종류(ext4, zfs, nfs)
lsblk -f                   # 디스크·파티션별 파일 시스템
ls -la /var/lib/docker     # Docker 이미지 레이어가 실제로 쌓이는 곳
```

```text
Filesystem     Type  Size  Used Avail Use% Mounted on
rpool/ROOT/pve-1 zfs 1.8T  420G  1.4T  24% /
/dev/sda1      ext4  916G  200G  670G  23% /data
```

Proxmox 를 ZFS 로 설치하면 파일 시스템 자체가 스냅샷을 지원해서 VM 백업이 몇 초면 된다. 반면 윈도우에서 NTFS 로 포맷한 외장하드는 리눅스에 꽂아도 권한(chmod)이 제대로 안 먹는다.

## 헷갈리기 쉬운 것

- **디스크/파티션**은 물리적인 저장 공간, 파일 시스템은 그 위에 씌우는 정리 규칙. 포맷 = 파일 시스템을 새로 까는 것.
- **오브젝트 스토리지(S3)** 는 폴더 구조가 없고 키 하나로 통째 저장. 파일 시스템처럼 파일 중간만 고쳐 쓰는 게 안 된다.
