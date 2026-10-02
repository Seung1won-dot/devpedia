---
id: scale-up-out
term: 스케일 업/스케일 아웃
aliases:
  - Scale Up / Scale Out
  - Vertical / Horizontal Scaling
  - 수직 확장
  - 수평 확장
  - 스케일업
  - 스케일아웃
category: infra
tags:
  - 아키텍처
  - 성능
  - 분산시스템
level: 2
kind: pattern
related:
  - load-balancer
  - session-auth
  - cache
  - replication
  - sharding
  - kubernetes
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

트래픽이 늘 때 **서버 한 대를 더 세게**(업) 만들거나 **서버 대수를 늘리는**(아웃) 두 가지 확장법.

## 비유

손님이 늘어난 식당. 스케일 업은 **주방장 한 명을 더 빠른 사람으로 바꾸는** 것이고, 스케일 아웃은 **같은 주방을 옆에 하나 더 차리고 안내 직원(로드 밸런서)이 손님을 나누는** 것이다.

## 예시

```bash
# 스케일 업: Proxmox 에서 VM 사양을 올린다 (재부팅 필요, 호스트 한계 이상은 불가)
qm set 101 --cores 16 --memory 65536
# 스케일 아웃: 같은 이미지로 API 컨테이너를 3개로 늘리고 Caddy 가 나눠 준다
docker compose up -d --scale api=3
```

```caddyfile
api.lab.example.com {
    reverse_proxy {
        dynamic a api 8000        # Compose 내부 DNS 가 api 컨테이너 3개의 IP 를 돌려준다
        lb_policy round_robin
    }
}
```

| | 스케일 업(수직) | 스케일 아웃(수평) |
|---|---|---|
| 방법 | CPU·RAM·GPU 를 더 좋은 것으로 | 같은 서버를 여러 대 |
| 장점 | 코드 안 바꿔도 됨, 단순 | 한계가 사실상 없음, 한 대 죽어도 서비스 유지 |
| 단점 | 하드웨어 상한, 비용이 가파르게 증가, 그 한 대가 죽으면 끝 | 로드 밸런서 필요, 서버끼리 상태를 공유하면 안 됨 |
| 어울리는 것 | DB(특히 쓰기), GPU 학습 | 웹·API 서버, 읽기 트래픽 |

스케일 아웃의 전제는 **무상태(stateless) 설계**다. 로그인 세션을 서버 메모리에 두면 다음 요청이 다른 서버로 가는 순간 로그아웃되므로, 세션은 Redis 나 JWT 로, 업로드 파일은 S3 같은 공용 저장소로 빼야 한다. DB 는 아웃이 어려워(데이터를 쪼개야 함) 먼저 업으로 버티고, 읽기는 복제본(레플리카)으로 나누고, 그래도 안 되면 샤딩으로 간다.

"대용량 트래픽을 어떻게 처리하겠나?" 는 백엔드 면접 단골이다. 답의 뼈대: 캐시·CDN 으로 요청 자체를 줄이고 → 무상태 API 서버를 스케일 아웃(로드 밸런서·오토스케일링) → DB 는 읽기 복제본·캐시로 부하 분산 → 마지막에 샤딩.

## 헷갈리기 쉬운 것

- **스케일 아웃과 로드 밸런서**: 아웃은 "대수를 늘리는 것", 로드 밸런서는 늘린 대수에 "요청을 나누는 장치". 아웃에는 거의 항상 LB 가 따라온다.
- **고가용성(HA)** 은 "죽지 않게", 스케일 아웃은 "많이 받게". 서버 2대로 아웃하면 덤으로 HA 도 얻지만 목적이 다르다.
- **오토스케일링**은 스케일 아웃을 트래픽에 따라 자동으로 늘렸다 줄이는 것(AWS Auto Scaling Group, Kubernetes HPA).
