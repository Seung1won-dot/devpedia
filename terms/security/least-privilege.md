---
id: least-privilege
term: 최소 권한 원칙
aliases:
  - Principle of Least Privilege
  - 최소 권한 원칙
  - 최소 권한
  - PoLP
category: security
tags:
  - 보안정책
  - 인가
level: 1
related:
  - file-permission
  - rls
  - zero-trust
  - authentication-authorization
  - ssh
see_also:
  - https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

사람이든 프로그램이든 **일에 꼭 필요한 권한만** 주는 원칙.

## 비유

청소 담당자에게 건물 **마스터키** 대신 담당 층 열쇠만 주는 것. 열쇠를 잃어버려도 피해가 그 층에서 끝난다.

## 예시

배포 봇에게 root 를 주지 말고, 전용 계정에 "그 서비스 재시작" 명령 하나만 sudo 로 허용한다.

```bash
sudo useradd -r -s /usr/sbin/nologin deploy
echo 'deploy ALL=(root) NOPASSWD: /bin/systemctl restart labapp' | sudo tee /etc/sudoers.d/deploy
```

Supabase 에서는 anon 키가 새어도 남의 데이터를 못 보게 RLS 로 "자기 행만" 허용한다.

```sql
create policy "own rows" on notes for select using (auth.uid() = owner_id);
```

같은 이유로 service_role 키는 서버 코드에서만 쓰고 프론트엔드에는 절대 넣지 않는다.

## 헷갈리기 쉬운 것

- **인증/인가**에서 인가가 "무엇을 할 수 있나" 를 정하는 단계라면, 최소 권한은 그 인가를 얼마나 좁게 줄지에 대한 기준이다.
- **제로 트러스트**는 이 원칙을 네트워크 전체로 넓힌 사고방식. 최소 권한이 부품, 제로 트러스트가 설계도.
