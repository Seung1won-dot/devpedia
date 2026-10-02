---
id: aws-core-services
term: AWS 기본 서비스(EC2/S3/RDS/Lambda/VPC)
aliases:
  - AWS Core Services
  - EC2
  - S3
  - RDS
  - Lambda
  - 아마존 웹 서비스 기본 서비스
category: infra
tags:
  - 클라우드
  - 서버운영
level: 1
kind: tool
related:
  - cloud-providers
  - iaas-paas-saas
  - vpc
  - object-storage
  - serverless
  - rdbms
  - vm
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

AWS 에서 **가상 서버·파일 저장·DB·함수 실행·가상 네트워크**를 맡는 다섯 가지 기본 부품.

## 비유

가게를 차릴 때 필요한 것들. **점포(EC2)**, **창고(S3)**, **장부(RDS)**, **부르면 오는 알바(Lambda)**, 그리고 이것들을 묶는 **담장 쳐진 부지(VPC)**.

## 예시

| 서비스 | 한 줄 | 홈랩 대응물 |
|---|---|---|
| EC2 | 시간당 과금하는 가상 서버(VM). OS 부터 내가 관리 | Proxmox VM |
| S3 | 키 이름으로 넣고 꺼내는 오브젝트 스토리지. 용량 무제한, 정적 사이트 호스팅도 됨 | MinIO / NAS |
| RDS | 관리형 관계형 DB(Postgres·MySQL). 백업·패치·장애 복구를 AWS 가 | Docker 로 띄운 Postgres, Supabase |
| Lambda | 서버 없이 함수만 올려 요청·이벤트 때만 실행, 실행 시간만큼 과금 | Supabase Edge Function, 크론 스크립트 |
| VPC | 내 계정 전용 가상 네트워크. 서브넷·방화벽(보안 그룹)·인터넷 출입구를 여기서 정함 | Proxmox 의 vmbr 브리지 + ufw |

```bash
aws ec2 describe-instances --query 'Reservations[].Instances[].[InstanceId,State.Name]'
aws s3 cp ./dist s3://devpedia-site/ --recursive          # Vite 빌드 결과를 S3 에 (정적 호스팅)
aws rds describe-db-instances --query 'DBInstances[].Endpoint.Address'
aws lambda invoke --function-name notify-slack --payload '{"text":"배포 완료"}' out.json
```

Ender Chest 를 AWS 로 옮긴다면 프론트는 S3(+CloudFront CDN), DB 는 RDS Postgres, Slack 알림은 Lambda, 전부 VPC 안에서 — 라고 대응시켜 보면 다섯 개가 어떻게 맞물리는지 보인다. 연구실은 같은 구조를 Proxmox 위에 직접 짠 것이라 개념은 그대로 통한다. 함께 자주 나오는 IAM(누가 무엇을 할 수 있나)과 CloudFront(CDN)까지 알면 기본은 된다.

면접에서는 "AWS 써 본 서비스는?" 에 이 다섯을 자기 프로젝트에 붙여 답하고, 꼬리로 "EC2 와 Lambda 는 언제 골라 쓰나?"(상시 vs 간헐, 실행 시간 제한) 가 온다.

## 헷갈리기 쉬운 것

- **S3 vs EBS**: S3 는 API 로 쓰는 보관소, EBS 는 EC2 에 꽂는 가상 디스크. OS 가 마운트하는 건 EBS.
- **RDS vs EC2 에 직접 깐 Postgres**: 기능은 같지만 RDS 는 root 셸이 없고 대신 백업·복제·패치가 자동. 비용은 RDS 가 비싸다.
- **Lambda vs EC2**: Lambda 는 요청이 없으면 0원이지만 실행 시간 상한(15분)과 콜드 스타트가 있다. 24시간 도는 서버는 EC2.
