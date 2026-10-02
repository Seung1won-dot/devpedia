---
id: zero-trust
term: 제로 트러스트
aliases:
  - Zero Trust
  - 제로 트러스트
  - 제로 트러스트 아키텍처
  - ZTNA
category: security
tags:
  - 보안정책
  - 네트워크보안
level: 3
kind: pattern
related:
  - least-privilege
  - vpn
  - tailscale
  - mfa
  - firewall
see_also:
  - https://csrc.nist.gov/pubs/sp/800/207/final
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**내부망이라도 믿지 않고** 접속마다 신원과 기기를 확인하는 보안 모델.

## 비유

성벽 하나로 지키는 **성**(문만 통과하면 어디든 자유)이 아니라, 방마다 카드키를 대야 열리는 **사무실**. 로비를 통과했다고 서버실 문이 열리지는 않는다.

## 예시

연구실 와이파이에 붙어 있다고 GPU 서버 SSH 가 열리면 안 된다. Tailscale ACL 로 "누가(SSO 로그인 + MFA) 어떤 기기에서 어디로" 를 서비스 단위로 정한다.

```json
{
  "acls": [
    { "action": "accept", "src": ["group:lab"],           "dst": ["tag:gpu:22"] },
    { "action": "accept", "src": ["autogroup:member"],    "dst": ["tag:web:443"] }
  ]
}
```

여기서 `group:lab` 이 아닌 사람은 같은 네트워크에 있어도 GPU 서버 22번 포트가 아예 보이지 않는다. 핵심 세 가지: 매 요청 검증, 최소 권한, "이미 뚫렸다" 고 가정하고 피해 범위를 좁게 설계.

## 헷갈리기 쉬운 것

- **VPN** 은 "일단 들어오면 내부" 라는 성벽 모델의 대표. 제로 트러스트는 VPN 안에서도 서비스마다 다시 확인한다. Tailscale 은 VPN 기술 위에 ACL 로 제로 트러스트를 얹는 셈.
- **최소 권한 원칙**은 제로 트러스트가 기대는 부품 중 하나. 원칙 하나가 아니라 "네트워크 위치를 신뢰 근거로 쓰지 않는다" 는 설계 전체가 제로 트러스트.
