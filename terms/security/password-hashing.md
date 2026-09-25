---
id: password-hashing
term: 비밀번호 해싱(bcrypt/argon2)
aliases:
  - Password Hashing
  - 비밀번호 해싱
  - bcrypt
  - Argon2
category: security
tags:
  - 비밀번호
  - 암호화
level: 2
related:
  - hash
  - salt
  - brute-force
  - authentication-authorization
  - encryption
see_also:
  - https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

비밀번호를 원문 대신 **일부러 느린 해시**로 바꿔 저장하는 방법.

## 비유

비밀번호를 그대로 적어 두지 않고 **믹서기에 간 결과**만 보관하는 것. 훔쳐가도 원래 재료로 못 돌리고, 믹서가 일부러 느려서 재료를 하나씩 넣어 보며 맞추기도 오래 걸린다.

## 예시

직접 로그인을 만든다면 argon2 (OWASP 1순위 권장) 나 bcrypt 를 쓰고, DB 에는 해시만 저장한다.

```python
from argon2 import PasswordHasher          # pip install argon2-cffi
ph = PasswordHasher()                      # 기본값이 argon2id, OWASP 권장 수준 이상
hashed = ph.hash("lab-pw-2026")            # 솔트 자동 포함 — DB 에는 이것만 저장
ph.verify(hashed, "lab-pw-2026")           # 맞으면 True, 틀리면 예외
```

Supabase Auth 를 쓰면 비밀번호를 알아서 bcrypt 로 저장하므로 직접 다룰 일이 없다. 어느 쪽이든 원문 비밀번호는 로그에도 남기지 않는다.

## 헷갈리기 쉬운 것

- **SHA-256 같은 일반 해시**는 너무 빨라서(초당 수십억 번) 브루트포스에 약하다. 비밀번호용 해시는 일부러 느리고 메모리도 많이 쓰게 설계돼 있다.
- **암호화**는 열쇠로 되돌릴 수 있으니 비밀번호 저장에 쓰면 안 된다. 열쇠가 새면 전부 원문으로 풀린다.
