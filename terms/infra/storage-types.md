---
id: storage-types
term: 스토리지 유형 비교
aliases:
  - Block / File / Object Storage
  - 블록 스토리지
  - 파일 스토리지
  - 오브젝트 스토리지 비교
  - EBS/EFS/S3
category: infra
tags:
  - 스토리지
  - 클라우드
  - 서버운영
level: 2
kind: concept
related:
  - object-storage
  - nas
  - file-system
  - docker-volume
  - raid
  - aws-core-services
see_also:
  - https://www.redhat.com/en/topics/data-storage/file-block-object-storage
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

저장소를 **디스크처럼(블록)·폴더처럼(파일)·보관함처럼(오브젝트)** 쓰는 세 방식.

## 비유

블록은 **빈 외장하드**(포맷해서 내 마음대로, 한 컴퓨터에만 꽂음), 파일은 **공유 폴더**(여럿이 같은 서랍을 열어 봄). 오브젝트는 **코인 로커**(보관증 번호로 통째로 맡기고 통째로 찾음)다.

## 예시

```bash
# 블록: Proxmox 가 VM 에 꽂아 주는 "빈 디스크" — VM 안에서 포맷해서 쓴다
qm set 101 --scsi1 local-lvm:200                      # 200GB 디스크 추가
# 파일: NAS 의 NFS 공유를 GPU 서버 여러 대가 같은 경로로 마운트해 데이터셋 공유
sudo mount -t nfs nas.lab:/volume1/datasets /mnt/datasets
# 오브젝트: 학습 결과물을 S3 호환(MinIO) 에 키 이름으로 올린다 — 마운트 없이 HTTP
aws --endpoint-url http://nas:9000 s3 cp model.safetensors s3://models/qwen-ft/v3/model.safetensors
```

| | 블록 | 파일 | 오브젝트 |
|---|---|---|---|
| 보이는 모양 | 빈 디스크(/dev/sdb) | 폴더 트리(NFS/SMB) | 키 → 바이트 덩어리 |
| 동시 접근 | 한 서버 | 여러 서버 | 어디서나(HTTP) |
| 부분 수정 | 됨 | 됨 | 안 됨(통째로 교체) |
| 어울리는 것 | DB 데이터 디렉터리, VM 디스크 | 공유 데이터셋, 홈 디렉터리 | 백업, 모델 가중치, 로그 보관 |
| AWS 이름 | EBS | EFS | S3 |

연구실 기준: Postgres 는 블록(빠르고 파일 락이 확실), GPU 서버 4대가 같이 읽는 DICOM 데이터셋은 NFS, 한 번 쓰고 오래 두는 백업·체크포인트는 오브젝트로 간다.

## 헷갈리기 쉬운 것

- **NAS 와 SAN**: NAS 는 파일 스토리지를 네트워크로(NFS/SMB), SAN 은 블록 스토리지를 네트워크로(iSCSI). 연구실 Synology 는 NAS 지만 iSCSI 로 블록도 내줄 수 있다.
- **오브젝트 스토리지는 마운트하는 게 아니다.** s3fs 로 폴더처럼 흉내 낼 수는 있지만 느리고, 파일 1바이트만 바꿔도 전체를 다시 올린다.
- **RAID** 는 이 셋 중 어느 것도 아니고, 블록 장치 여러 개를 하나로 묶는 아래층 기술이다.
