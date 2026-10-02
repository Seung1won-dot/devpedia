---
id: url-to-render
term: 브라우저에 URL 을 입력하면
aliases:
  - What happens when you type a URL
  - URL 입력부터 화면 렌더링까지
  - 주소창에 URL 을 치면 일어나는 일
  - 웹 페이지 로딩 과정
category: network
tags:
  - HTTP
  - DNS
  - 브라우저
  - 면접
level: 2
kind: concept
related:
  - dns
  - three-way-handshake
  - tls
  - http
  - http-status-code
  - browser-rendering
  - cdn
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

주소창에 친 이름이 **DNS → TCP → TLS → HTTP → 렌더링**을 거쳐 화면이 되는 과정.

## 비유

친구 집에 놀러 가는 길. 이름으로 **주소를 찾고**(DNS), 초인종을 눌러 **문을 열고**(TCP), 서로 **신분을 확인한 뒤**(TLS), **용건을 말하고 물건을 받아**(HTTP), 받은 재료로 **요리를 차린다**(렌더링).

## 예시

`https://devpedia.lab.example.com/` 을 치고 엔터를 누르면:

| 단계 | 무슨 일 | 관련 카드 |
|---|---|---|
| 1. URL 해석 | 스킴(https)·호스트·경로로 쪼갬. 브라우저 캐시에 있으면 여기서 끝날 수도 | http, cache |
| 2. DNS | 호스트 이름 → IP. 브라우저 캐시 → OS 캐시 → 공유기 → ISP 리졸버 → 루트·TLD·권한 서버 순 | dns |
| 3. TCP | 그 IP 의 443 포트로 3-way handshake | three-way-handshake, port |
| 4. TLS | 인증서 확인 + 세션 키 교환. HTTP/3 이면 QUIC 이 3·4 를 한 번에 | tls, certificate, http-versions |
| 5. HTTP 요청 | `GET / HTTP/2` + 헤더(Host, Cookie, Accept 등) | http, http-methods |
| 6. 서버 처리 | Caddy(리버스 프록시) → 앱 → DB, 또는 CDN 이 캐시로 바로 응답 | reverse-proxy, cdn |
| 7. HTTP 응답 | 상태 코드 + 헤더 + HTML 본문 | http-status-code |
| 8. 렌더링 | HTML 파싱(DOM) → CSS(CSSOM) → 렌더 트리 → 레이아웃 → 페인트. 만나는 JS·CSS·이미지마다 2~7 반복 | browser-rendering, dom |

```bash
curl -v https://devpedia.lab.example.com/ 2>&1 | grep -E '^\*|^> |^< HTTP'
# * Trying 203.0.113.10:443 (DNS 결과)  → * Connected (TCP)  → * SSL connection using TLSv1.3 (TLS)
# > GET / HTTP/2 (요청)                  → < HTTP/2 200 (응답)
```

Devpedia 는 정적 사이트라 6번에서 서버가 `index.html` 과 `terms.json` 을 그대로 주고, 검색과 카드 표시는 8번 이후 브라우저 안에서 React 가 처리한다.

면접 최빈출 질문이다. 8단계를 순서대로 말하되 **각 단계가 왜 필요한지** 한 마디씩 붙이면(DNS 는 사람 이름을 기계 주소로, TCP 는 빠짐없이 전달, TLS 는 도청 방지) 꼬리 질문("DNS 캐시는 어디에?", "3-way 는 왜 3번?")으로 이어져도 버틸 수 있다.

## 헷갈리기 쉬운 것

- **DNS 조회는 매번 하지 않는다.** 브라우저·OS·리졸버 단계마다 TTL 만큼 캐시하므로 두 번째 접속은 2번을 건너뛰고, keep-alive 연결이 살아 있으면 3·4 도 건너뛴다.
- **HTTP 와 HTTPS 의 차이는 4번 유무**뿐이다. 나머지 단계는 같다.
- **렌더링은 네트워크가 아니라 브라우저의 일.** 여기까지가 "요청이 어떻게 오가나" 이고, 그 뒤 파싱·레이아웃·페인트는 `browser-rendering` 카드가 다룬다.
