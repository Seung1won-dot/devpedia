---
id: region-az
term: 리전/가용영역
aliases:
  - Region
  - Availability Zone
  - AZ
  - 리전
  - 가용영역
  - 멀티 AZ
category: infra
tags:
  - 클라우드
  - 아키텍처
  - 운영
level: 2
kind: concept
related:
  - vpc
  - aws-core-services
  - cloud-providers
  - latency-bandwidth
  - load-balancer
  - replication
see_also:
  - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

리전은 클라우드의 **지리적 위치**(서울·도쿄), 가용영역은 그 안의 **독립된 데이터센터 묶음**.

## 비유

리전은 **도시**, 가용영역은 그 도시 안 **서로 다른 동네의 지점**. 한 지점이 정전돼도 옆 동네 지점은 멀쩡하지만, 도시 전체를 덮는 재해에는 다른 도시의 지점이 있어야 한다.

## 예시

```bash
aws ec2 describe-availability-zones --region ap-northeast-2 \
  --query 'AvailabilityZones[].ZoneName'          # ap-northeast-2a, 2b, 2c, 2d
# 웹 서버는 AZ 두 곳에, 앞에 로드 밸런서, DB 는 Multi-AZ 로 대기 복제본
aws ec2 run-instances --subnet-id subnet-in-2a --image-id ami-xxx --instance-type t3.small
aws ec2 run-instances --subnet-id subnet-in-2c --image-id ami-xxx --instance-type t3.small
aws rds create-db-instance --db-instance-identifier lab-db --engine postgres --multi-az \
  --db-instance-class db.t3.micro --allocated-storage 20 --master-username admin --master-user-password 'change-me'
```

`ap-northeast-2` 가 서울 리전, 뒤의 `a/b/c/d` 가 가용영역이다. 서브넷은 AZ 하나에 속하므로 "고가용성" 은 곧 AZ 마다 서브넷을 두고 양쪽에 인스턴스를 놓는 것이고, 로드 밸런서가 죽은 쪽을 빼 준다. 리전은 사용자와의 거리(지연시간)·요금·규제로 고르며, 의료 데이터는 개인정보 국외 이전 문제로 국내 리전이 기본이다 [확인 필요]. AZ 간 트래픽에는 요금이 붙고 [확인 필요] 멀티 리전은 동기화와 비용이 몇 배로 뛰니 연구실 규모는 "서울 리전, AZ 두 곳" 이 현실적인 상한이다. 연구실 Proxmox 한 대는 가용영역 하나짜리라 정전 한 번에 전부 꺼지므로 UPS 와 외부 백업이 그 빈자리를 메운다.

## 헷갈리기 쉬운 것

- **멀티 AZ** 는 같은 도시 안 이중화(지연 수 ms, 자동 전환), **멀티 리전**은 다른 도시로의 재해 복구(지연 수십 ms, 데이터 복제 설계 필요). 대부분은 멀티 AZ 로 충분하다.
- **엣지 로케이션**은 CDN 캐시가 놓인 더 작은 거점으로 수백 곳이 있다. 서버를 띄우는 곳이 아니라 콘텐츠를 가까이 복사해 두는 곳.
- **서브넷**은 가용영역 하나에 묶이고 **VPC** 는 리전 하나에 묶인다. VPC 하나가 여러 AZ 에 걸치는 것이 정상 구조다.
