---
id: bgp
term: BGP
aliases:
  - Border Gateway Protocol
  - 경계 경로 프로토콜
  - AS(자율 시스템)
  - BGP 하이재킹
  - 경로 광고
category: network
tags:
  - 라우팅
  - 프로토콜
  - TCP/IP
  - 네트워크
level: 3
kind: protocol
related:
  - router-switch
  - gateway
  - ip-address
  - subnet-cidr
  - cdn
  - ping-traceroute
see_also:
  - https://datatracker.ietf.org/doc/html/rfc4271
  - https://www.cloudflare.com/learning/security/glossary/what-is-bgp/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

인터넷을 이루는 큰 망(AS)들이 **서로 어느 IP 대역으로 가는 길을 광고하는** 라우팅 규칙.

## 비유

나라끼리 맺는 **국제 우편 협정**. 각 나라 우체국이 "이 우편번호 묶음은 우리 거고, 저 나라로 가려면 우릴 거쳐도 돼" 하고 이웃에게 알리면, 그 소문이 번져 전 세계 배달 지도가 된다.

## 예시

```bash
whois -h whois.cymru.com " -v 8.8.8.8"                  # 15169 | 8.8.8.0/24 | GOOGLE, US ← 이 대역의 주인 AS
whois -h whois.cymru.com " -v $(curl -s ifconfig.me)"   # 우리 학교·통신사의 AS 번호
traceroute 8.8.8.8                                       # 홉 사이에서 AS 가 바뀌는 지점이 BGP 가 고른 "국경"
```

인터넷은 하나의 망이 아니라 통신사·대학·클라우드 같은 수만 개 AS 의 연합이고, 각 AS 는 이웃 AS 와 TCP 179번으로 BGP 세션을 맺어 "우리 대역은 이것, 여기로 오면 저기까지 간다" 를 교환한다. 경로 선택은 "가장 빠른 길" 이 아니라 **거치는 AS 수와 운영자 정책**(비싼 트랜짓보다 공짜 피어링 선호)으로 정해진다. 연구실에서 직접 설정할 일은 없지만 영향은 받는다: 2021년 Facebook 이 몇 시간 통째로 사라진 사고는 자기 대역의 BGP 광고를 거둬들인 것이었고, 누가 남의 대역을 잘못(또는 고의로) 광고하면 트래픽이 엉뚱한 곳으로 가는 **BGP 하이재킹**이 된다(RPKI 가 이를 막는 서명 체계). 트레이드오프: 통신사 둘에 동시에 물리는 다중 회선, CDN 의 애니캐스트, 홈랩 쿠버네티스의 MetalLB BGP 모드처럼 "길이 둘 이상" 일 때만 쓸 가치가 있고, 출구가 하나인 연구실 망은 기본 게이트웨이 한 줄이면 된다.

## 헷갈리기 쉬운 것

- **OSPF 같은 내부 라우팅(IGP)** 은 한 조직 망 안에서 가장 빠른 길을 찾고, BGP 는 조직과 조직 사이(EGP)에서 정책대로 길을 고른다.
- **DNS** 는 이름→IP, BGP 는 그 IP 로 가는 길. DNS 가 멀쩡해도 BGP 광고가 사라지면 IP 자체에 도달할 수 없다.
- **애니캐스트**(1.1.1.1 같은 것): 여러 데이터센터가 같은 대역을 BGP 로 광고해 가장 가까운 곳이 응답하는 것. 서버 한 대가 아니라 BGP 가 만드는 효과다.
