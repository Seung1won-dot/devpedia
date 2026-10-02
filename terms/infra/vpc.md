---
id: vpc
term: VPC
aliases:
  - Virtual Private Cloud
  - 가상 사설 클라우드
  - 브이피씨
  - 클라우드 가상 네트워크
category: infra
tags:
  - 클라우드
  - 네트워크
  - 네트워크보안
level: 2
kind: concept
related:
  - subnet-cidr
  - private-ip
  - firewall
  - nat
  - aws-core-services
  - cloud-providers
  - region-az
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

클라우드 안에 만든 **나만의 가상 네트워크**로, IP 대역·서브넷·출입 규칙을 내가 정한다.

## 비유

큰 공단(AWS) 안에 **담장을 두른 내 부지**. 부지 안을 도로 앞 구역(퍼블릭 서브넷)과 안쪽 구역(프라이빗 서브넷)으로 나누고, 정문(인터넷 게이트웨이)과 건물마다의 경비(보안 그룹)를 내가 세운다.

## 예시

```bash
aws ec2 create-vpc --cidr-block 10.0.0.0/16                                            # 부지: 주소 65,536개
aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.1.0/24 --availability-zone ap-northeast-2a  # 퍼블릭
aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.2.0/24 --availability-zone ap-northeast-2c  # 프라이빗
aws ec2 attach-internet-gateway --vpc-id vpc-xxx --internet-gateway-id igw-xxx          # 정문
# 보안 그룹: DB 는 웹 서버 보안 그룹에서 오는 5432 만 허용
aws ec2 authorize-security-group-ingress --group-id sg-db --protocol tcp --port 5432 --source-group sg-web
```

전형적인 구성은 이렇다. **퍼블릭 서브넷**(라우팅 테이블이 인터넷 게이트웨이를 향함)에는 로드 밸런서·웹 서버를 두고, **프라이빗 서브넷**(인터넷 게이트웨이로 가는 길이 없음)에는 RDS·내부 API 를 둔다. 프라이빗 쪽이 패키지 업데이트 등으로 밖에 나가야 하면 **NAT 게이트웨이**를 거친다 — 나가는 건 되지만 밖에서 들어올 수는 없다. **보안 그룹**은 인스턴스마다 붙는 상태 저장 방화벽이고, 서브넷 단위로 거는 **NACL** 도 있다.

연구실 Proxmox 에서 `vmbr0`(외부 브리지)와 `vmbr1`(내부 전용 브리지)을 만들고, 웹 VM 만 둘 다에 붙이고 DB VM 은 내부 브리지에만 붙인 뒤 ufw 로 5432 를 웹 VM 에만 열면, VPC 의 퍼블릭/프라이빗 서브넷을 손으로 짠 것과 같다.

면접에서는 "DB 를 왜 프라이빗 서브넷에 두나?", "보안 그룹과 NACL 의 차이는?" 으로 나온다. 앞은 "인터넷에서 직접 닿는 길을 없애 공격 면을 줄이려고", 뒤는 "인스턴스 단위·허용 규칙만·상태 저장 vs 서브넷 단위·허용과 거부·상태 비저장" 이 답.

## 헷갈리기 쉬운 것

- **VPN 과 VPC**: 이름은 비슷하지만 VPN 은 두 네트워크를 잇는 암호화 터널, VPC 는 클라우드 안에 만든 네트워크 그 자체. 집에서 VPC 안으로 들어가려고 VPN 을 쓴다.
- **서브넷과 가용영역**: 서브넷 하나는 AZ 하나에 속한다. 고가용성을 원하면 AZ 마다 서브넷을 하나씩 만든다.
- **보안 그룹과 방화벽(ufw)**: 하는 일은 같지만 보안 그룹은 VM 바깥(가상 네트워크 층)에서 걸려서 VM 이 뚫려도 살아 있다.
