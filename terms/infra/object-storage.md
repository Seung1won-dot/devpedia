---
id: object-storage
term: 오브젝트 스토리지(S3)
aliases:
  - Object Storage
  - S3
  - 오브젝트 스토리지
  - 객체 스토리지
category: infra
tags:
  - 스토리지
  - 클라우드
level: 2
related:
  - file-system
  - backup-restore
  - static-hosting
  - cdn
  - api
see_also:
  - https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

파일을 폴더 대신 **키 이름 하나로 HTTP 로 넣고 꺼내는** 대용량 저장소.

## 비유

**물품 보관소(코인 로커)**. 서랍 구조 없이 "보관증 번호(키)" 하나로 맡기고 찾으며, 칸이 모자라면 로커가 알아서 늘어난다.

## 예시

```bash
# 연구실 NAS 에 MinIO(S3 호환) 띄우고 학습 데이터셋 올리기
docker run -d -p 9000:9000 -p 9001:9001 -v /data/minio:/data \
  -e MINIO_ROOT_USER=admin -e MINIO_ROOT_PASSWORD='change-me' \
  minio/minio server /data --console-address ":9001"
aws --endpoint-url http://nas:9000 s3 mb s3://datasets
aws --endpoint-url http://nas:9000 s3 cp ./ct-scans.tar.zst s3://datasets/ct/v1/ct-scans.tar.zst
aws --endpoint-url http://nas:9000 s3 ls s3://datasets/ct/
```

경로처럼 보이는 `ct/v1/...` 도 사실은 키 문자열 하나이고, 같은 명령이 진짜 AWS S3 에서는 `--endpoint-url` 만 빼면 그대로 돌아간다.

## 헷갈리기 쉬운 것

- **파일 시스템(NFS/SMB)**은 폴더·권한·파일 일부 수정이 되지만, 오브젝트 스토리지는 파일 전체를 통째로 올리고 내린다(부분 수정 없음).
- **블록 스토리지(디스크/EBS)**는 VM 에 꽂는 "빈 하드디스크". 오브젝트 스토리지는 API 로 쓰는 "보관소" 라 OS 에 마운트하지 않는다.
