---
id: port-mapping
term: 포트 매핑(-p)
aliases:
  - Port Mapping
  - 포트 매핑
  - 포트 퍼블리시
  - 포트 바인딩
  - docker -p
category: infra
tags:
  - 컨테이너
  - 네트워크
  - 흔한실수
level: 1
kind: concept
related:
  - port-forwarding
  - port
  - docker
  - docker-compose
  - docker-network
  - nat
see_also:
  - https://docs.docker.com/engine/network/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

호스트의 포트를 **컨테이너 안의 포트에 이어 주어** 밖에서 들어올 수 있게 하는 설정.

## 비유

아파트 **공동현관의 호출 번호**. 밖에서 "8080" 을 누르면 안쪽 "80번 집" 으로 연결되고, 번호를 안 붙여 둔 집은 밖에서 부를 방법이 없다.

## 예시

```bash
docker run -d -p 8080:80 nginx               # 호스트 8080 → 컨테이너 80
docker run -d -p 127.0.0.1:8000:8000 my-api  # 호스트의 로컬에서만 → Caddy 뒤에 둘 때
docker port my-api                           # 지금 매핑된 포트 확인
```

```yaml
# compose.yml — 같은 뜻
services:
  api:
    image: my-api
    ports:
      - "127.0.0.1:8000:8000"
```

순서는 항상 **호스트:컨테이너**다. 연구실은 Caddy 만 80/443 을 열고 나머지 서비스는 `127.0.0.1:` 을 붙여 바깥 인터페이스에서 안 보이게 한다 — `-p 8000:8000` 처럼 IP 를 생략하면 0.0.0.0 에 열리는 데다, Docker 가 iptables 규칙을 직접 넣기 때문에 ufw 로 막아 둔 포트도 그대로 뚫린다. 또 하나 흔한 함정은 앱이 컨테이너 안에서 `127.0.0.1` 에만 리슨하는 경우로, 이러면 `-p` 를 걸어도 밖에서 연결이 안 되니 앱은 `0.0.0.0` 에 바인드해야 한다.

## 헷갈리기 쉬운 것

- **포트 포워딩**은 공유기(NAT)가 공인 IP 의 포트를 안쪽 PC 로 넘기는 것, 포트 매핑은 한 호스트 안에서 호스트 포트를 컨테이너로 넘기는 것. 밖에서 컨테이너까지 오려면 둘 다 거친다.
- **EXPOSE**(Dockerfile)·**expose:**(compose) 는 "이 포트를 쓴다" 는 메모일 뿐 실제로 열지 않는다. 여는 건 `-p`/`ports:` 뿐이다.
- **도커 네트워크** 안의 컨테이너끼리는 포트 매핑 없이 `db:5432` 처럼 바로 통한다. 포트 매핑은 네트워크 밖(호스트·외부)에서 들어올 때만 필요하다.
