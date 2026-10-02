---
id: on-premise-vs-cloud
term: 온프레미스/클라우드
aliases:
  - On-premise vs Cloud
  - 온프레미스
  - 온프렘
  - 자체 서버 vs 클라우드
category: infra
tags:
  - 클라우드
  - 서버운영
level: 1
kind: concept
related:
  - server
  - homelab
  - proxmox
  - serverless
  - static-hosting
  - cloud-providers
status: review
created: 2026-09-25
updated: 2026-09-29
---

## 한 줄 정의

서버를 **내 공간에 직접 두느냐**, 남의 데이터센터를 **빌려 쓰느냐**의 차이.

## 비유

집을 **사서 직접 관리**하느냐, **월세로 살면서** 고장 나면 집주인을 부르느냐. 사면 내 마음대로지만 보일러 고장도 내 몫이고, 월세는 편하지만 매달 돈이 나가고 벽에 못도 마음대로 못 박는다.

## 예시

```bash
# 온프레미스: 연구실 Proxmox 에 VM 하나 (하드웨어·전기·백업 전부 우리 몫)
qm create 101 --name gpu-worker --memory 32768 --cores 8

# 클라우드: AWS 에 비슷한 사양 VM 한 대 (시간당 과금, 하드웨어는 남의 것)
aws ec2 run-instances --instance-type g4dn.xlarge --image-id ami-xxxxxxxx
```

GPU 학습처럼 24시간 몇 달씩 돌리는 건 온프레미스가 압도적으로 싸고, 발표용 데모 사이트처럼 잠깐 쓰거나 전 세계에서 접속하는 건 클라우드가 편하다 — 연구실은 보통 데이터·GPU 는 온프레미스, 공개 웹은 클라우드로 섞는다.

## 헷갈리기 쉬운 것

- **홈랩**은 온프레미스의 개인 버전. 규모만 다르지 "내 장비를 내가 관리"한다는 점은 같다.
- **서버리스**는 클라우드 중에서도 서버 관리 자체를 안 보이게 감춘 것. 클라우드 VM(EC2)은 여전히 OS 를 내가 관리한다.
