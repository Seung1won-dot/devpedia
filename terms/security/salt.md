---
id: salt
term: 솔트
aliases:
  - Salt
  - 솔트
  - 솔팅
  - 랜덤 솔트
category: security
tags:
  - 비밀번호
  - 암호화
level: 2
kind: concept
related:
  - hash
  - password-hashing
  - brute-force
  - encryption
see_also:
  - https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

비밀번호를 해시하기 전에 **사용자마다 다른 무작위 값**을 섞는 것.

## 비유

같은 김치찌개라도 집마다 **다른 양념**을 조금씩 넣으면 맛이 전부 달라진다. 그러면 "이 맛이면 그 레시피" 하고 미리 만들어 둔 표로 한 번에 알아맞힐 수 없다.

## 예시

솔트가 있으면 같은 비밀번호를 쓰는 두 사람의 해시가 서로 다르다.

```python
import bcrypt
h1 = bcrypt.hashpw(b"lab-pw-2026", bcrypt.gensalt())
h2 = bcrypt.hashpw(b"lab-pw-2026", bcrypt.gensalt())
print(h1 == h2)                        # False — 솔트가 달라 해시도 다르다
bcrypt.checkpw(b"lab-pw-2026", h1)     # True — 솔트는 해시 안에 함께 저장돼 검증은 된다
```

솔트는 비밀이 아니라 DB 에 해시와 같이 둬도 된다. 목적은 "미리 계산해 둔 해시 표(레인보우 테이블)" 를 쓸모없게 만드는 것.

## 헷갈리기 쉬운 것

- **페퍼(pepper)** 는 서버 전체에 하나뿐인 비밀값이고 DB 밖(환경변수 등)에 둔다. 솔트는 사용자마다 다르고 DB 에 같이 저장한다.
- **비밀번호 해싱**은 전체 방법이고, 솔트는 그 재료 중 하나. bcrypt·argon2 는 솔트를 알아서 만들어 넣는다.
