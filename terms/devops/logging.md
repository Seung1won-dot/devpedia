---
id: logging
term: 로깅
aliases:
  - Logging
  - 로그
  - 로그 기록
  - 로그 수집
category: devops
tags:
  - 로깅
  - 서버운영
level: 1
kind: concept
related:
  - monitoring
  - docker
  - systemd
  - cron
  - exception
  - elk-stack
  - log-level
see_also:
  - https://12factor.net/logs
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

프로그램이 **무슨 일을 했는지 시간 순으로** 글로 남기는 것.

## 비유

배의 **항해 일지**. 언제 어디서 무슨 일이 있었는지 적어 두면, 사고가 난 뒤에 그때 무슨 일이었는지 되짚을 수 있다.

## 예시

```bash
# Hermes 크론잡 — 실행 결과를 파일에 덧붙여 남긴다 (crontab 한 줄)
0 3 * * * /opt/hermes/run.sh >> /var/log/hermes.log 2>&1
tail -f /var/log/hermes.log             # 실시간으로 보기
grep -c ERROR /var/log/hermes.log       # 에러가 몇 번 났는지
docker logs -f --tail 100 grafana       # 컨테이너는 stdout 이 곧 로그
```

로그 한 줄에는 최소 **시각·레벨(INFO/WARN/ERROR)·메시지**를 넣는다. 크론잡이 왜 새벽 3시에 실패했는지는 로그가 없으면 알 길이 없다.

## 헷갈리기 쉬운 것

- **모니터링**은 숫자(메트릭)를 그래프로, 로깅은 사건을 글로. "디스크가 찼다"는 모니터링이 먼저 알리고, "누가 뭘 써서 찼는지"는 로그로 찾는다.
- **print 디버깅**은 개발 중 잠깐 보고 지우지만, 로그는 레벨·시각을 붙여 운영 중에도 계속 남긴다.
