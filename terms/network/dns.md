---
id: dns
term: DNS
aliases:
  - Domain Name System
  - 도메인 네임 시스템
  - 네임서버
  - 도메인 이름
category: network
tags:
  - DNS
  - 프로토콜
  - 네트워크
level: 1
kind: protocol
related:
  - ip-address
  - cdn
  - static-hosting
  - tailscale
  - http
  - url-to-render
  - doh
see_also:
  - https://developer.mozilla.org/ko/docs/Glossary/DNS
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

사람이 외우는 **도메인 이름을 IP 주소로 바꿔 주는** 인터넷의 전화번호부.

## 비유

휴대폰 **연락처 앱**. "엄마"라고 누르면 저장된 번호로 걸리듯, `github.com` 을 치면 DNS 가 진짜 번호(IP)를 찾아 준다.

## 예시

```bash
dig +short lab.example.com          # 어떤 IP 로 풀리는지
dig +short app.lab.example.com CNAME  # 다른 이름으로 이어져 있는지
```

Ender Chest 를 GitHub Pages 에 올리고 내 도메인을 붙이려면 도메인 업체 관리창에 `CNAME  app  →  <계정>.github.io` 레코드를 넣는다. 자주 쓰는 레코드: A(IPv4), AAAA(IPv6), CNAME(별명), MX(메일), TXT(소유 확인). Tailscale 의 MagicDNS 는 `gpu-server` 처럼 장비 이름만으로 접속되게 해 주는 사설 DNS.

## 헷갈리기 쉬운 것

- **도메인**은 이름 그 자체(`example.com`), DNS 는 그 이름을 찾아 주는 시스템. 도메인은 사고, DNS 는 설정한다.
- **`/etc/hosts`** 는 내 컴퓨터에만 있는 수동 전화번호부. DNS 보다 먼저 보므로 테스트용으로 임시 매핑할 때 쓴다.
