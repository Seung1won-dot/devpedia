---
id: nas
term: NAS
aliases:
  - Network Attached Storage
  - 네트워크 저장장치
  - 나스
  - 네트워크 스토리지
  - Synology
category: infra
tags:
  - 스토리지
  - 홈랩
  - 백업
  - 네트워크
level: 1
kind: concept
related:
  - homelab
  - snapshot-backup
  - object-storage
  - file-system
  - raid
  - storage-types
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

네트워크에 꽂아 두고 여러 컴퓨터가 **공용 폴더처럼 함께 쓰는** 파일 저장 장치.

## 비유

사무실 한구석의 **공용 서류 캐비닛**. 누구 책상 서랍도 아니라서 모두가 같은 캐비닛에 넣고 꺼내고, 퇴근해도 거기 그대로 있다.

## 예시

```bash
# Ubuntu VM 에서 NAS 의 데이터셋 폴더를 NFS 로 붙이기
sudo apt install -y nfs-common
sudo mount -t nfs nas.lab.internal:/volume1/datasets /mnt/datasets
# 부팅 때마다 자동으로 붙이려면 /etc/fstab 에 한 줄
echo "nas.lab.internal:/volume1/datasets /mnt/datasets nfs defaults,_netdev 0 0" | sudo tee -a /etc/fstab
```

Windows 노트북에서는 탐색기에 `\nas.lab.internal\datasets` 라고 치면 같은 폴더가 SMB 로 열린다. 연구실에서는 DICOM 데이터셋과 Proxmox 백업(`vzdump --storage nas-backup`)을 NAS 에 두어, GPU 서버와 노트북이 파일을 복사하지 않고 같은 데이터를 본다. 디스크 2개 이상을 RAID 로 묶어 한 개가 죽어도 버티게 하지만, 실수로 지운 파일이나 랜섬웨어는 RAID 가 못 막으니 NAS 자체도 다른 곳에 백업한다.

## 헷갈리기 쉬운 것

- **외장 하드(DAS)** 는 USB 로 컴퓨터 한 대에만 꽂힌다. NAS 는 네트워크에 꽂혀 여러 대가 동시에 쓰고, 그 자체가 작은 리눅스 서버라 Docker 도 돌린다.
- **오브젝트 스토리지(S3)** 는 폴더 대신 키 이름으로 HTTP API 로 넣고 꺼낸다. NAS 는 OS 에 폴더로 마운트해 일반 파일처럼 다룬다 (NAS 위에 MinIO 를 올리면 둘 다 된다).
- **RAID 는 백업이 아니다.** 디스크 고장만 견디는 장치지, 삭제·암호화·화재는 못 막는다.
