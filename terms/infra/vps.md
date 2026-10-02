---
id: vps
term: VPS
aliases:
  - Virtual Private Server
  - 가상 사설 서버
  - 가상 서버 호스팅
  - 브이피에스
category: infra
tags:
  - 클라우드
  - 가상화
  - 서버운영
level: 1
kind: concept
related:
  - vm
  - server
  - iaas-paas-saas
  - cloud-providers
  - aws-core-services
  - on-premise-vs-cloud
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

업체의 큰 서버를 **쪼개서 한 칸만 월정액으로 빌려 쓰는** 가상 서버.

## 비유

**오피스텔 한 호실 임대**. 건물(물리 서버)은 남의 것이지만 내 호실 안은 벽지부터 가구까지 내 마음대로 꾸미고, 매달 월세만 낸다.

## 예시

```bash
# 업체 콘솔에서 Ubuntu 를 골라 만들면 공인 IP 와 root 비밀번호(또는 SSH 키)가 나온다
ssh root@203.0.113.10
apt update && apt install -y docker.io caddy
# 이제부터는 연구실 VM 과 똑같이 다룬다 — compose 로 서비스 띄우고 Caddy 로 HTTPS
```

Vultr·Hetzner·Lightsail 같은 업체에서 vCPU 1개·RAM 1GB 급이 월 5달러 안팎부터 시작한다 [확인 필요]. 연구실은 Proxmox 로 서버를 직접 쪼개 VM 을 만들지만, VPS 는 그 "쪼갠 VM 한 칸" 을 남의 데이터센터에서 빌리는 것이라 쓰는 법은 같다. 연구실 서버는 포트를 안 열어 두니, 외부에 공개할 랜딩 페이지나 업타임 모니터처럼 **24시간 밖에서 닿아야 하는 작은 것**은 VPS 한 대에 두는 편이 편하다.

## 헷갈리기 쉬운 것

- **VM** 은 기술 이름이고 VPS 는 그 기술로 만든 **상품** 이름. 내 Proxmox 의 VM 을 남에게 월세 받고 빌려주면 그게 VPS 다.
- **공유 호스팅**은 웹 서버 하나를 여러 고객이 폴더만 나눠 쓰는 것이라 root 권한이 없다. VPS 는 OS 째로 내 것이라 뭐든 깔 수 있다.
- **EC2** 같은 클라우드 인스턴스도 본질은 VPS 지만 시간·초 단위 과금에 S3·RDS 같은 주변 서비스가 붙는다. 서버 한 대만 오래 쓸 거면 VPS 가 보통 더 싸다.
