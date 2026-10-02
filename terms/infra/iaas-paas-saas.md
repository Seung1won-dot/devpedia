---
id: iaas-paas-saas
term: IaaS/PaaS/SaaS
aliases:
  - Infrastructure as a Service
  - Platform as a Service
  - Software as a Service
  - 서비스형 인프라
  - 서비스형 플랫폼
  - 서비스형 소프트웨어
  - 클라우드 서비스 모델
category: infra
tags:
  - 클라우드
  - 아키텍처
level: 1
kind: concept
related:
  - cloud-providers
  - aws-core-services
  - baas
  - serverless
  - on-premise-vs-cloud
  - static-hosting
  - vps
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

클라우드가 **어디까지 대신 관리해 주느냐**에 따라 나눈 세 단계.

## 비유

**피자 먹는 법**. 재료를 사서 집에서 굽는 게 온프레미스, 냉동 피자를 사서 내 오븐에 굽는 게 IaaS, 배달시켜 내 식탁에서 먹는 게 PaaS, 피자집에 가서 앉기만 하는 게 SaaS 다.

## 예시

| | 내가 관리 | 제공자가 관리 | 예 | 홈랩 대응 |
|---|---|---|---|---|
| 온프레미스 | 전부 | 없음 | 연구실 서버 | Proxmox 호스트 |
| IaaS | OS 부터 위 | 하드웨어·네트워크·가상화 | EC2, GCE, Azure VM | Proxmox 가 만들어 주는 VM |
| PaaS | 내 코드·데이터만 | OS·런타임·스케일링까지 | Vercel, Heroku, Supabase, Lambda | Docker Compose 로 내가 짠 배포 환경 |
| SaaS | 사용만 | 전부 | Gmail, Notion, GitHub, Slack | 자체 호스팅 Nextcloud 등 |

```bash
# 같은 React 앱(Devpedia)을 IaaS 와 PaaS 에 올린다면
# IaaS: EC2 에 SSH 로 들어가 OS 부터 직접 세팅
ssh ubuntu@ec2-3-35-x-x.ap-northeast-2.compute.amazonaws.com
sudo apt install caddy && npm run build && sudo cp -r dist/* /srv/www
# PaaS: 코드만 밀면 빌드·배포·HTTPS 를 알아서
vercel --prod
```

Ender Chest 를 보면 층이 섞여 있다. 프론트는 GitHub Pages(PaaS 성격의 정적 호스팅), 백엔드는 Supabase(BaaS — PaaS 의 한 갈래), 연구실 LLM 은 Proxmox VM(온프레미스 IaaS 흉내) 위의 Ollama. 위로 갈수록 편하고 빠르지만 **커스터마이징 여지와 이식성이 줄고**, 아래로 갈수록 자유롭지만 패치·백업·보안이 내 몫이다.

면접에서는 "IaaS 와 PaaS 의 차이를 예를 들어 설명해 보라", "서버리스는 어디에 속하나?"(PaaS/FaaS) 로 나온다. "OS 를 내가 만지느냐" 가 IaaS 와 PaaS 를 가르는 가장 쉬운 기준이다.

## 헷갈리기 쉬운 것

- **BaaS·FaaS(서버리스)** 는 PaaS 를 더 잘게 나눈 이름. BaaS 는 인증·DB 를 완제품으로, FaaS 는 함수 한 조각만 올리는 것.
- **컨테이너(Docker)** 는 층이 아니라 포장 방식. EC2 위에 직접 띄우면 IaaS, ECS·Cloud Run 에 맡기면 PaaS 처럼 쓰는 것이다.
- **온프레미스**는 이 분류의 바깥(0단계). 홈랩 Proxmox 로 VM 을 찍어 내면 "내가 나에게 IaaS 를 제공" 하는 셈이다.
