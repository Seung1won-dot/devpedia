---
id: blue-green-canary
term: 블루-그린/카나리
aliases:
  - Blue-Green Deployment / Canary Release
  - 블루그린 배포
  - 카나리 배포
  - 무중단 배포
category: devops
tags:
  - 배포
  - 운영
level: 3
kind: pattern
related:
  - rollback
  - load-balancer
  - reverse-proxy
  - environments
  - kubernetes
  - feature-flag
  - app-store-review
status: review
created: 2026-09-25
updated: 2026-10-03
---

## 한 줄 정의

새 버전을 **옆에 띄워 두고 트래픽을 옮겨** 끊김 없이 배포하는 방법.

## 비유

블루-그린은 **새 가게를 옆에 다 차려 놓고 간판만 바꿔 다는 것**, 카나리는 손님 10명 중 1명만 새 가게로 보내 반응을 보는 것. 문제가 생기면 간판을 다시 돌리거나 그 1명을 원래 가게로 보내면 된다.

## 예시

```bash
docker compose up -d api-blue api-green         # 1.4.1 과 1.4.2 를 나란히 띄움
sed -i 's/api-blue:8000/api-green:8000/' /etc/caddy/Caddyfile
caddy reload --config /etc/caddy/Caddyfile      # 간판 교체 — 연결 안 끊김
# 문제가 있으면 sed 를 반대로 하고 reload = 롤백 끝
```

리버스 프록시(Caddy)가 "간판" 역할이라 사용자는 아무것도 모른다. 카나리는 같은 구성에서 `lb_policy weighted_round_robin 9 1` 처럼 그린 쪽에 10% 만 보내는 식이다 [확인 필요: Caddy 2.6 이상에서 지원].

## 헷갈리기 쉬운 것

- **블루-그린 vs 카나리**: 블루-그린은 한 번에 100% 전환(빠르고 단순, 서버 2배 필요), 카나리는 소수부터 점진 전환(안전하지만 두 버전이 동시에 돌아 DB 호환을 신경 써야 함).
- **롤링 배포**는 서버 여러 대를 한 대씩 교체하는 방식. 쿠버네티스의 기본값이고 별도 환경 없이 되지만, 되돌리기는 블루-그린보다 느리다.
