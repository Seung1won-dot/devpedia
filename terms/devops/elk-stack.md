---
id: elk-stack
term: ELK 스택
aliases:
  - ELK Stack
  - Elastic Stack
  - Elasticsearch/Logstash/Kibana
  - 엘라스틱 스택
  - 로그 중앙화
category: devops
tags:
  - 로깅
  - 모니터링
  - 서버운영
level: 2
kind: tool
related:
  - logging
  - monitoring
  - docker-compose
  - message-queue
  - index
  - log-level
see_also:
  - https://www.elastic.co/elastic-stack
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

여러 서버의 로그를 **한곳에 모아 검색하고 그래프로 보는** 세 도구 묶음.

## 비유

각 병동의 수기 차트를 **중앙 기록실로 모아(Logstash) 색인을 붙여 보관하고(Elasticsearch) 벽면 상황판에 띄우는(Kibana) 것**. 어느 병동에서 무슨 일이 있었는지 한 자리에서 찾는다.

## 예시

```yaml
# docker-compose.yml — Proxmox 위 LXC 하나에 올리는 최소 구성
services:
  elasticsearch:
    image: elasticsearch:8.15.0
    environment: ["discovery.type=single-node", "xpack.security.enabled=false"]
  logstash:
    image: logstash:8.15.0
    volumes: ["./pipeline:/usr/share/logstash/pipeline"]   # 입력 → 필터(grok 파싱) → 출력(ES)
  kibana:
    image: kibana:8.15.0
    ports: ["5601:5601"]
    environment: ["ELASTICSEARCH_HOSTS=http://elasticsearch:9200"]
```

흐름은 **수집(Logstash 또는 가벼운 Filebeat) → 저장·검색(Elasticsearch) → 시각화(Kibana)**. Caddy·FastAPI·Ollama 컨테이너 로그를 한곳에 모으면 "어제 새벽 500 에러가 어느 서비스에서 몇 번 났나" 를 Kibana 검색창 한 줄로 찾는다. Elasticsearch 가 메모리를 많이 먹어서 홈서버에서는 **Loki + Grafana**(라벨만 색인해 가볍다)를 대안으로 많이 쓴다. 면접에서는 "로그와 메트릭은 어떻게 수집하고 확인했나요?" 로 나온다.

## 헷갈리기 쉬운 것

- **Prometheus/Grafana(메트릭)** 는 CPU 사용률 같은 숫자를 시계열로, ELK(로그)는 사건을 글로 저장한다. 실무에선 둘 다 두고 Grafana 하나에서 같이 보는 경우가 많다.
- **Logstash vs Filebeat**: Logstash 는 파싱·변환까지 하는 무거운 수집기, Filebeat 는 파일을 읽어 넘기기만 하는 가벼운 에이전트. 요즘은 Beats → (Logstash) → Elasticsearch 구성이 흔하다.
- **Elasticsearch 단독**: 로그뿐 아니라 쇼핑몰 상품 검색 같은 검색 엔진으로도 쓴다. ELK 는 그중 로그 용도로 묶은 조합의 이름이다.
