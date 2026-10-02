---
id: privilege-escalation
term: 권한 상승
aliases:
  - Privilege Escalation
  - PrivEsc
  - 권한 상승 공격
  - 수직/수평 권한 상승
category: security
tags:
  - 보안
  - 접근제어
  - 리눅스운영
  - 컨테이너
level: 3
kind: concept
related:
  - least-privilege
  - sudo-root
  - file-permission
  - rbac
  - kernel-user-mode
  - penetration-test
see_also:
  - https://attack.mitre.org/tactics/TA0004/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

낮은 권한으로 들어온 공격자가 **설정의 틈을 타 root·관리자 권한까지 올라가는** 단계.

## 비유

**로비 출입증**으로 들어온 사람이, 잠그지 않은 경비실 서랍에서 **마스터키**를 꺼내는 것. 문제는 출입증이 아니라 잠그지 않은 서랍이다.

## 예시

공격은 보통 한 번에 root 가 되지 않는다. 웹앱 취약점으로 `www-data` 같은 낮은 계정부터 잡고, 그다음 서버 안에서 올라갈 틈을 찾는다. 연구실 서버에서 흔한 틈을 스스로 점검하는 명령:

```bash
sudo -l                                  # 이 계정이 비밀번호 없이 root 로 돌릴 수 있는 명령
find / -perm -4000 -type f 2>/dev/null   # SUID 실행 파일 — 모르는 게 있으면 의심
getent group docker                      # docker 그룹 = 사실상 root (호스트 디스크를 마운트할 수 있다)
```

`NOPASSWD: ALL`, root 가 돌리는 크론 스크립트인데 아무나 고칠 수 있는 파일, 편하다고 모두를 `docker` 그룹에 넣은 것 — 셋 다 "들어오기만 하면 root" 로 가는 사다리다. 웹에서 `?user_id=1234` 를 `1235` 로 바꾸면 남의 환자 기록이 보이는 것은 **수평** 권한 상승(IDOR), root 가 되는 것은 **수직** 권한 상승이다.

**트레이드오프**: 연구실 전원에게 sudo ALL 을 주면 편하지만 계정 하나 털리면 서버 전체가 넘어간다. 서비스별 전용 계정에 필요한 명령만 sudoers 로 열고, docker 그룹 대신 rootless Docker 나 Podman 을 쓰면 사다리가 사라진다 — 대신 GPU 패스스루·80번 포트 바인딩 같은 설정이 번거로워진다. 어디까지 조일지는 "뚫렸을 때 잃는 것" (환자 데이터인가, 테스트 VM 인가) 으로 정한다.

## 헷갈리기 쉬운 것

- **sudo/root** 는 정당한 권한 상승 수단이다. 공격으로서의 권한 상승은 그 수단의 설정 실수나 소프트웨어 결함을 타는 것.
- **최소 권한 원칙**은 권한 상승이 일어나도 올라갈 곳이 없게 만드는 예방책. 원인과 처방의 관계다.
- **수평 권한 상승**은 레벨이 올라가지 않고 같은 레벨의 남의 데이터에 손대는 것. 서버 설정이 아니라 백엔드의 인가 검사 누락이 원인이라 고치는 곳도 다르다.
