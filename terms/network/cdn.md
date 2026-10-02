---
id: cdn
term: CDN
aliases:
  - Content Delivery Network
  - 콘텐츠 전송 네트워크
  - 씨디엔
  - 엣지 캐시
category: network
tags:
  - 캐시
  - 네트워크
  - 성능
level: 2
kind: concept
related:
  - dns
  - cache
  - static-hosting
  - latency-bandwidth
  - load-balancer
  - ddos
see_also:
  - https://developer.mozilla.org/ko/docs/Glossary/CDN
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

이미지·JS 같은 파일을 **전 세계 여러 곳에 복사해 두고 가까운 곳에서** 주는 서버망.

## 비유

본사 창고 하나 대신 **동네마다 둔 편의점**. 같은 물건을 미리 갖다 놔서 서울 손님은 서울에서, 부산 손님은 부산에서 바로 받는다.

## 예시

```html
<!-- 라이브러리를 CDN 에서 불러오기: 내 서버 대역폭을 안 쓴다 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
```

GitHub Pages 에 올린 Ender Chest 도 뒤에서는 CDN(Fastly) 이 뿌린다 [확인 필요]. Vite 빌드 결과물에 `index-a1b2c3.js` 처럼 해시가 붙는 이유가 이것: 내용이 바뀌면 파일명도 바뀌니, CDN 이 옛 파일을 오래 저장해 둬도 새 버전이 섞이지 않는다.

## 헷갈리기 쉬운 것

- **캐시(Redis)** 는 서버 안쪽에서 DB 결과를 잠깐 저장하는 것, CDN 은 서버 바깥·사용자 가까이에서 파일을 저장하는 것. 둘 다 "다시 만들지 말고 저장한 걸 줘"지만 위치가 다르다.
- **정적 호스팅**(Vercel/Pages)은 파일을 올려 두는 서비스이고, 그 서비스가 CDN 을 써서 뿌린다. 보통 세트로 온다.
