---
id: cloud-providers
term: 클라우드 3사(AWS/GCP/Azure)
aliases:
  - Cloud Providers
  - AWS
  - Amazon Web Services
  - Google Cloud Platform
  - Microsoft Azure
  - 퍼블릭 클라우드
category: infra
tags:
  - 클라우드
  - 서버운영
level: 1
kind: tool
related:
  - on-premise-vs-cloud
  - iaas-paas-saas
  - aws-core-services
  - vpc
  - homelab
  - proxmox
  - region-az
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

서버·저장소·네트워크를 **전 세계 데이터센터에서 쓴 만큼 빌려주는** 대형 사업자들.

## 비유

전기를 직접 발전기로 만들지 않고 **한전에서 쓴 만큼 내는** 것. AWS·GCP·Azure 는 컴퓨팅을 그렇게 파는 세 개의 "발전소" 이고, 어느 회사 콘센트에 꽂느냐만 다르다.

## 예시

```bash
# 같은 일(VM 한 대 만들기)을 3사 CLI 로 — 이름만 다르고 개념은 같다
aws ec2 run-instances --image-id ami-xxxx --instance-type t3.micro --region ap-northeast-2   # 서울
gcloud compute instances create web --machine-type e2-micro --zone asia-northeast3-a       # 서울
az vm create -g lab -n web --image Ubuntu2404 --size Standard_B1s --location koreacentral  # 중부
```

| | AWS | GCP | Azure |
|---|---|---|---|
| 강점 | 서비스 폭·국내 점유율 1위·자료량 최다 | 데이터·ML(BigQuery, TPU), Kubernetes 원조 | MS 생태계(AD, Office), 공공·대기업 |
| 서울 리전 | ap-northeast-2 | asia-northeast3 | Korea Central |
| VM 이름 | EC2 | Compute Engine | Virtual Machines |

공통 개념 두 가지는 **리전**(Region, 서울·도쿄 같은 지역)과 **가용영역**(AZ, 한 리전 안에서 물리적으로 떨어진 데이터센터 여러 개)이다. 서비스를 두 AZ 에 나눠 두면 데이터센터 하나가 정전돼도 살아남는다. 세 회사 모두 신규 계정에 무료 구간(프리티어)을 주지만 기간·한도 조건이 자주 바뀌고 넘으면 과금되니 예산 알림부터 건다 [확인 필요].

연구실 관점에서는 Proxmox 홈랩이 "내가 운영하는 1인 클라우드" 다. VM 을 만들고 네트워크를 나누고 스냅샷을 찍는 개념이 같아서, 홈랩을 굴려 봤으면 AWS 콘솔에서 EC2·VPC 를 처음 봐도 낯설지 않다. 국내 채용 공고에서는 AWS 경험을 가장 많이 요구한다 [확인 필요].

면접에서는 "AWS 써 봤나? 리전과 AZ 의 차이는?" 정도로 가볍게 나오고, 인프라 직군이면 "왜 멀티 AZ 로 배포하나?" 로 깊어진다.

## 헷갈리기 쉬운 것

- **온프레미스/홈랩**은 내 장비, 클라우드는 남의 장비를 빌리는 것. 24시간 GPU 학습은 온프렘이 싸고, 잠깐 쓰거나 전 세계 서비스면 클라우드가 편하다.
- **IaaS/PaaS/SaaS** 는 "얼마나 관리해 주느냐" 의 분류이고, 3사는 그 세 층을 전부 판다. EC2 는 IaaS, Lambda 는 PaaS 에 가깝다.
- **네이버 클라우드·KT 클라우드** 같은 국내 사업자도 있다. 공공기관·의료처럼 데이터가 국내에 있어야 하는 곳에서 쓴다.
