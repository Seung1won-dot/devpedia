---
id: dns-record
term: DNS 레코드(A/CNAME)
aliases:
  - DNS Record
  - A 레코드
  - CNAME
  - AAAA
  - MX 레코드
  - TXT 레코드
category: network
tags:
  - DNS
  - 서버운영
  - 홈랩
level: 1
kind: concept
related:
  - dns
  - ip-address
  - ipv4-ipv6
  - static-hosting
  - caddy
  - lets-encrypt
see_also:
  - https://www.cloudflare.com/learning/dns/dns-records/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

도메인 이름에 **어떤 IP 나 다른 이름을 연결할지** 적어 둔 DNS 의 한 줄.

## 비유

연락처 앱의 **항목 하나하나**. "엄마 → 010-…"(A), "집 → 엄마와 같은 번호"(CNAME), "엄마 메일은 이 주소로"(MX) 처럼 종류별 칸이 따로 있다.

## 예시

```bash
dig +short lab.example.com A           # 203.0.113.10
dig +short www.lab.example.com CNAME   # lab.example.com.  ← "저 이름 보고 따라가"
dig +short lab.example.com TXT         # "v=spf1 ..."  소유 확인·메일 정책
```

자주 쓰는 종류는 A(IPv4), AAAA(IPv6), CNAME(다른 이름으로), MX(메일 서버), TXT(소유 확인·SPF), NS(이 도메인은 어느 네임서버가 관리). 연구실은 `*.lab.example.com` 와일드카드 A 레코드 하나를 Caddy 서버 IP 로 두고, Caddy 가 호스트 이름별로 서비스를 나눠 준다. Let's Encrypt 와일드카드 인증서를 받을 때 `_acme-challenge` TXT 레코드를 넣으라는 것도 이것이다. TTL 은 이 한 줄의 캐시 수명 — 서버 이사 전날 TTL 을 300 으로 낮춰 두면 전환이 빠르다.

## 헷갈리기 쉬운 것

- **A 와 CNAME**: A 는 IP 를 직접 적고, CNAME 은 "저 이름을 보라"는 별명. 루트 도메인(`example.com`)에는 CNAME 을 둘 수 없다는 규칙 때문에 ALIAS/ANAME 같은 업체별 변종이 생겼다.
- **네임서버(NS) 변경**은 전화번호부 자체를 다른 회사로 옮기는 것, 레코드 수정은 그 안의 항목 하나를 고치는 것. 도메인을 Cloudflare 로 옮긴다는 게 NS 변경이다.
