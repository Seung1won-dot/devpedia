---
id: doh
term: DNS over HTTPS
aliases:
  - DoH
  - DoT(DNS over TLS)
  - 암호화 DNS
  - 보안 DNS
  - 비공개 DNS
category: network
tags:
  - DNS
  - HTTPS
  - 보안통신
  - 프로토콜
level: 3
kind: protocol
related:
  - dns
  - https
  - tls
  - firewall
  - vpn
  - dns-record
see_also:
  - https://datatracker.ietf.org/doc/html/rfc8484
  - https://datatracker.ietf.org/doc/html/rfc7858
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

평문으로 다니던 **DNS 질문을 HTTPS 안에 숨겨** 중간에서 못 보고 못 바꾸게 하는 방식.

## 비유

"이 집 주소 어디예요?" 라고 적은 쪽지를 **봉인된 봉투(HTTPS)**에 넣어 보내는 것. 집배원(통신사·공용 Wi-Fi 주인)이 쪽지를 읽거나 답을 바꿔치기할 수 없다.

## 예시

```bash
dig +short example.com @1.1.1.1                   # 평문 UDP 53 — 중간에서 다 보인다
curl -s -H 'accept: application/dns-json' \
  'https://cloudflare-dns.com/dns-query?name=example.com&type=A'   # 같은 질문을 HTTPS 443 안으로
dig +https @1.1.1.1 example.com                   # 최근 dig(BIND 9.18+)에는 DoH 옵션이 있다 [확인 필요]
```

Firefox·Chrome 설정의 "보안 DNS", Windows 11 네트워크 설정의 "DNS over HTTPS", Android 의 "비공개 DNS"(이쪽은 DoT)가 전부 이것이다. 평문 DNS 는 공용 Wi-Fi 에서 누가 어떤 사이트에 가는지 다 보이고 답을 바꿔치기(DNS 스푸핑)할 수도 있는데, DoH 는 그 질문을 일반 HTTPS 트래픽과 구분되지 않게 섞는다. 트레이드오프: 사생활은 지키지만 **질문이 Cloudflare·Google 같은 몇 곳으로 모이고**, 연구실·병원처럼 내부 DNS 가 있는 망에선 브라우저 DoH 가 `*.lab.example.com` 이나 Tailscale MagicDNS 이름을 **건너뛰어 내부 주소가 안 풀리는** 문제가 생긴다. 그래서 폐쇄망·사내망은 브라우저 DoH 를 끄거나 내부 리졸버를 DoH 서버로 지정한다. 또 숨기는 건 질문뿐이라 목적지 IP 와 TLS SNI 는 여전히 보인다.

## 헷갈리기 쉬운 것

- **DoT** 는 전용 853 포트를 쓰는 형제. 포트가 달라 관리자가 식별·차단하기 쉽고, DoH 는 443 에 섞여 들어가 구분이 어렵다 — 같은 특징이 사생활엔 장점, 망 관리엔 단점.
- **VPN** 은 모든 트래픽을 암호화하고 IP 까지 숨긴다. DoH 는 DNS 질문 하나만 감싼다.
- **DNSSEC** 은 답이 위조되지 않았음을 서명으로 검증하는 것(무결성)이지 암호화가 아니다. 둘은 경쟁이 아니라 보완 관계.
