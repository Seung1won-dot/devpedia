---
id: ids-ips
term: IDS/IPS
aliases:
  - Intrusion Detection System
  - Intrusion Prevention System
  - 침입 탐지 시스템
  - 침입 방지 시스템
  - 침입 차단 시스템
  - Snort
  - Suricata
category: security
tags:
  - 네트워크보안
  - 모니터링
  - 보안정책
level: 2
kind: concept
related:
  - firewall
  - brute-force
  - logging
  - monitoring
  - zero-trust
  - cve
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

오가는 트래픽에서 **공격 패턴을 찾아 알리거나(IDS) 바로 끊는(IPS)** 감시 장치.

## 비유

건물의 **CCTV 관제실**(IDS)과 **순찰 경비원**(IPS). 관제실은 수상한 행동을 보면 무전으로 알리기만 하고, 경비원은 그 자리에서 붙잡아 내보낸다 — 출입증 검사(방화벽)를 통과해 들어온 사람이 안에서 뭘 하는지 보는 것이다.

## 예시

```bash
# 홈랩의 가장 작은 IPS: fail2ban — sshd 로그에서 실패 패턴을 보고 iptables 로 IP 를 차단
sudo fail2ban-client status sshd
#  |- Currently failed: 3
#  `- Banned IP list: 45.xx.xx.xx 185.xx.xx.xx
# 네트워크 전체를 보는 IDS: Suricata 를 Proxmox 브리지에 붙인다
sudo suricata -c /etc/suricata/suricata.yaml -i vmbr0
tail -f /var/log/suricata/fast.log     # [**] ET SCAN Nmap Scripting Engine ... 같은 경보
```

동작 방식은 두 갈래다. **시그니처 기반**은 알려진 공격의 패턴(특정 바이트열, `/etc/passwd` 요청, Nmap 스캔 특징)을 룰 목록과 대조한다 — 정확하지만 새 공격(제로데이)은 못 잡는다. **이상 탐지 기반**은 평소 트래픽을 학습해 두고 벗어나면 경보한다 — 새 공격도 잡지만 오탐이 많다. Snort 와 Suricata 는 같은 룰 문법을 쓰는 오픈소스 대표 주자이고, 설정에 따라 IDS(미러 포트에서 보기만)로도 IPS(인라인으로 끼어들어 차단)로도 돈다. 클라우드에서는 AWS GuardDuty 가 관리형 IDS 역할이다.

IPS 는 오탐이 곧 서비스 장애라서 실무는 보통 IDS 로 먼저 돌려 룰을 다듬고, 확신이 서는 룰만 차단으로 올린다. 의료 IT 처럼 환자 데이터를 다루는 망은 IDS 로그 보관이 보안 점검 항목에 들어가는 경우가 많다 [확인 필요].

면접에서는 "방화벽·IDS·IPS 의 차이는?" 으로 나온다. 한 줄 답: 방화벽은 **규칙(포트·IP)으로 문을 여닫고**, IDS 는 **내용을 보고 알리며**, IPS 는 **내용을 보고 막는다**.

## 헷갈리기 쉬운 것

- **방화벽**은 "어디서 어디로, 몇 번 포트" 만 본다(허용된 443 으로 들어오는 SQL 인젝션은 못 막음). IDS/IPS 는 패킷 내용까지 들여다본다. 웹 전용으로 좁힌 것이 **WAF**.
- **IDS vs IPS 의 위치**: IDS 는 트래픽 복사본을 옆에서 보므로(미러링) 죽어도 서비스에 영향이 없고, IPS 는 경로 한가운데 서므로(인라인) 죽거나 느려지면 서비스도 같이 멈춘다.
- **fail2ban** 은 로그 기반의 아주 단순한 호스트형 IPS(HIPS). 네트워크 전체를 보는 Suricata 같은 NIDS/NIPS 와 층이 다르다.
