---
id: file-permission
term: 권한(chmod/chown)
aliases:
  - File Permission
  - 파일 권한
  - chmod
  - chown
category: os
tags:
  - 파일시스템
  - 리눅스
level: 1
related:
  - file-system
  - shell
  - least-privilege
  - ssh
  - docker-compose
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

파일마다 **누가(소유자·그룹·그 외) 읽기·쓰기·실행을 할 수 있는지** 정한 표.

## 비유

연구실 **문 열쇠 배분**. 방 주인은 열쇠를 다 갖고, 같은 팀은 들어와 볼 수만 있고, 남은 아예 못 들어오게 방마다 정해 둔 것.

## 예시

```bash
ls -l ~/.ssh/id_ed25519
# -rw------- 1 lab lab 419 ... id_ed25519   → 소유자만 읽고 쓸 수 있음 (600)
chmod 600 ~/.ssh/id_ed25519       # SSH 는 키 권한이 느슨하면 아예 거부한다
chmod +x deploy.sh                # 실행 권한 추가
sudo chown -R 1000:1000 ./data    # Docker 볼륨 폴더 주인을 컨테이너 uid 로 맞추기
```

```text
r=4  w=2  x=1        rwx r-x r--  =  7 5 4  =  754
                     소유자 그룹 그외
```

Docker Compose 로 띄운 컨테이너가 `Permission denied` 를 뱉으면 십중팔구 볼륨 폴더의 소유자(uid)가 컨테이너 안 사용자와 다른 것. `chown` 으로 맞추거나 compose 에 `user: "1000:1000"` 을 준다.

## 헷갈리기 쉬운 것

- **chmod vs chown**: chmod 는 "무엇을 할 수 있나"(rwx)를, chown 은 "누구 것인가"(소유자·그룹)를 바꾼다.
- **sudo** 는 권한을 바꾸는 게 아니라 잠깐 root 로 실행하는 것. 권한 문제를 `sudo` 로 덮으면 최소 권한 원칙이 깨진다.
