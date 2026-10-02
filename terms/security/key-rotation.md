---
id: key-rotation
term: 키 로테이션
aliases:
  - Key Rotation
  - 키 교체
  - 시크릿 로테이션
  - 크리덴셜 로테이션
category: security
tags:
  - 키관리
  - 시크릿
  - 보안정책
level: 2
kind: pattern
related:
  - secret-leak
  - secrets-management
  - kms-hsm
  - certificate
  - ssh-key
  - api-key
see_also:
  - https://cheatsheetseries.owasp.org/cheatsheets/Key_Management_Cheat_Sheet.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

비밀 키·토큰을 **주기적으로 또는 사고 직후 새것으로 바꾸고** 옛것은 폐기하는 운영 습관.

## 비유

현관 도어락 비밀번호를 **이사 올 때, 사람이 나갈 때, 그리고 반년에 한 번** 바꾸는 것. 누가 어깨너머로 봤더라도 그 번호는 곧 쓸모없어진다.

## 예시

졸업한 선배 노트북에 연구실 OpenAI 키가 남아 있다면 그 키는 "유출됐다"고 보고 돌린다. 순서가 중요하다 — **새 키를 먼저 만들고, 바꿔 끼운 뒤, 옛 키를 폐기**해야 서비스가 끊기지 않는다.

```bash
# 1. 공급자 콘솔에서 새 키 발급 (옛 키는 아직 살려 둔다)
# 2. 서버 .env 교체 → 컨테이너가 바뀐 값을 읽도록 재생성
sed -i 's/^OPENAI_API_KEY=.*/OPENAI_API_KEY=sk-새키/' /opt/labapp/.env
docker compose -f /opt/labapp/compose.yml up -d
# 3. 로그에 401 이 없는 것을 확인한 뒤 콘솔에서 옛 키 폐기
```

사람 손으로 하면 잊어버리니 자동화가 답이다. Let's Encrypt 인증서가 90일마다 알아서 갱신되는 것, 클라우드 KMS 가 정해진 주기로 키를 바꾸는 것이 자동 로테이션의 예. 어떤 키가 어디에 꽂혀 있는지 목록(.env 위치, GitHub Secrets 이름)이 없으면 로테이션 자체가 불가능하니 그 목록부터 만든다.

## 헷갈리기 쉬운 것

- **키 폐기(revocation)** 는 옛 키를 죽이는 것만 뜻한다. 재발급 없이 폐기부터 하면 서비스가 멈춘다. 로테이션은 "발급 → 교체 → 폐기" 한 묶음.
- **리프레시 토큰**도 짧은 수명의 토큰을 계속 갈아 끼우니 원리는 같지만, 사용자 로그인 세션 쪽 이야기다. 키 로테이션은 보통 서버끼리 쓰는 API 키·DB 비밀번호·인증서를 말한다.
- **시크릿 관리**는 키를 "어디에 두느냐", 로테이션은 "얼마나 자주 바꾸느냐".
