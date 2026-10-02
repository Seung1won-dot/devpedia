---
id: aws-certification
term: AWS 자격증
aliases:
  - AWS Certification
  - AWS SAA
  - AWS Certified Solutions Architect
  - AWS 솔루션스 아키텍트
  - 클라우드 자격증
category: career
tags:
  - 자격증
  - 클라우드
level: 2
kind: regulation
related:
  - aws-core-services
  - cloud-providers
  - iaas-paas-saas
  - vpc
  - scale-up-out
  - linux-master
  - homelab
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

AWS 서비스를 **어떤 상황에 어떻게 조합**하는지 아는지를 검증하는 아마존의 공식 자격증.

## 비유

레고 공식 설계사 인증. 블록(서비스) 이름을 외우는 시험이 아니라 "이 집에는 어떤 블록을 어떻게 쌓아야 튼튼하고 싼가"를 고르는 시험이다.

## 예시

| 단계 | 시험 | 누가 | 응시료 |
| --- | --- | --- | --- |
| 입문 | CLF (Cloud Practitioner) | 비전공·기획·영업, 클라우드가 처음인 사람 | 100 USD [확인 필요] |
| 어소시에이트 | **SAA** (Solutions Architect), DVA (Developer), SOA (SysOps) | 학생·신입이 목표로 삼는 급, SAA 가 가장 대중적 | 150 USD [확인 필요] |
| 프로페셔널 | SAP, DOP | 실무 몇 년 뒤 | 300 USD [확인 필요] |
| 스페셜티 | Security, Machine Learning, Networking 등 | 해당 분야 전문 | 300 USD [확인 필요] |

유효기간 3년, 학생 할인 바우처 제도가 있다 [확인 필요]. 전공자는 CLF 를 건너뛰고 SAA 로 바로 가는 경우가 많다.

SAA 공부의 핵심은 **홈랩에서 하던 일을 AWS 용어로 번역**하는 것이라 프리티어 실습과 병행해야 붙는다.

| 홈랩(Proxmox) | AWS | 실습 과제 |
| --- | --- | --- |
| VM | EC2 | t3.micro 하나에 Docker Compose + Caddy 로 Devpedia 배포 |
| 스냅샷·백업 | AMI, EBS 스냅샷 | 스냅샷 찍고 다른 가용 영역에 복원 |
| Caddy 리버스 프록시 | ALB + Route 53 | 도메인 붙이고 헬스체크 |
| NAS 정적 파일 | S3 + CloudFront | Vite 빌드 결과물 정적 호스팅 |
| 로컬 Postgres | RDS | 프리티어 인스턴스, 보안 그룹으로 EC2 만 허용 |
| 브리지 네트워크 | VPC 퍼블릭/프라이빗 서브넷 | DB 는 프라이빗에 두고 NAT 로 나가게 |

실습 전에 **Budgets 알림(예: 5 USD)** 부터 걸어라. 프리티어 한도를 넘긴 채 인스턴스를 끄지 않아 과금되는 사례가 흔하다. 클라우드·인프라·백엔드 직무에서 우대 항목으로 자주 보이고, 면접에서는 "S3 와 EBS 차이는?", "리전과 가용 영역 차이는?", "EC2 하나가 죽어도 서비스가 살아 있으려면?" 같은 설계 질문으로 이어진다.

## 헷갈리기 쉬운 것

- **SAA vs DVA vs SOA**: 아키텍트는 "어떤 서비스를 고를까", 개발자는 SDK·Lambda·배포 파이프라인, SysOps 는 모니터링·운영. 신입은 SAA 하나면 된다.
- **Azure(AZ-900·AZ-104)·GCP(ACE)** 도 같은 층위의 자격이 있다. 국내 채용 공고에는 AWS 가 가장 자주 등장한다 [확인 필요].
- **자격증 ≠ 운영 경험**: 덤프 외워서 딴 SAA 는 "VPC 직접 구성해 보셨어요?" 한 마디에 드러난다. 실습 없이 따지 않는 게 낫다.
