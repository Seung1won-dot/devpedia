---
id: ddos
term: DDoS
aliases:
  - Distributed Denial of Service
  - 분산 서비스 거부 공격
  - 디도스
  - DoS
  - 서비스 거부 공격
category: security
tags:
  - 네트워크보안
  - 보안
  - 면접
level: 1
kind: concept
related:
  - rate-limit
  - cdn
  - firewall
  - load-balancer
  - ids-ips
  - iptables
see_also:
  - https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

수많은 컴퓨터가 **한꺼번에 요청을 퍼부어** 서비스를 마비시키는 공격.

## 비유

가게 앞에 **살 생각 없는 사람 수천 명**이 몰려와 줄을 서면 진짜 손님이 못 들어오는 것. 한 명 한 명은 멀쩡한 손님처럼 보여서 골라 쫓아내기도 어렵다.

## 예시

공격자는 악성코드로 장악한 PC·IoT 기기 수만 대(봇넷)에 "이 주소로 계속 접속해" 라고 명령한다. 회선을 가득 채우는 쪽(UDP 플러드), 연결 절차를 반쯤 열어 두고 서버 자원을 묶는 쪽(SYN 플러드), 멀쩡해 보이는 HTTP 요청을 초당 수십만 건 보내는 쪽(HTTP 플러드)으로 나뉜다.

서버 한 대에서 할 수 있는 건 "한 IP 가 너무 자주 오면 천천히 받기" 정도다.

```nginx
# Nginx: IP 당 초당 10건, 순간 20건까지만 허용 — 소수 IP 의 폭주(DoS)는 여기서 막힌다
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
server {
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://127.0.0.1:8000;
    }
}
```

진짜 DDoS 는 Nginx 가 요청을 보기도 전에 회선부터 막히기 때문에, 서버 앞단의 CDN·클라우드 사업자가 트래픽을 흡수해 걸러 주는 것(스크러빙) 말고는 답이 없다. 연구실 서버는 포트를 아예 열지 않고 Tailscale 로만 들어오게 두는 게 가장 싼 방어이고, 공개할 것은 GitHub Pages 나 Cloudflare 뒤에 둔다.

## 헷갈리기 쉬운 것

- **DoS** 는 공격 출처가 한 곳이라 그 IP 만 막으면 끝난다. **DDoS** 는 출처가 수만 곳이라 IP 차단으로는 못 막고, 그래서 앞에 D(분산) 가 붙는다.
- **브루트포스**는 "뚫고 들어가는" 게 목적이고 DDoS 는 "못 쓰게 만드는" 게 목적. 둘 다 요청이 쏟아지지만 막는 방법이 다르다.
- **레이트 리밋**은 애플리케이션 계층 방어라 "로그인 API 폭주" 는 막아도, 회선을 채우는 공격 앞에선 서버가 응답할 기회조차 없다.
