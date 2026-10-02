---
id: hashing-vs-encryption
term: 해싱 vs 암호화
aliases:
  - Hashing vs Encryption
  - 해시와 암호화의 차이
  - 해싱 암호화 인코딩 차이
  - 단방향 vs 양방향
category: security
tags:
  - 암호화
  - 해시
  - 비밀번호
level: 1
kind: concept
related:
  - hash
  - encryption
  - password-hashing
  - salt
  - digital-signature
  - tls
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

해싱은 **되돌릴 수 없는 지문 만들기**, 암호화는 **열쇠로 되돌릴 수 있는 잠그기**다.

## 비유

해싱은 종이를 **파쇄기**에 넣는 것(같은 종이면 같은 조각 더미가 나오지만 다시 붙일 수는 없다), 암호화는 **자물쇠 상자**에 넣는 것(열쇠만 있으면 꺼낸다). 인코딩은 그냥 **다른 언어로 번역**해 둔 것이라 사전만 있으면 누구나 읽는다.

## 예시

```python
import hashlib, base64
from cryptography.fernet import Fernet          # pip install cryptography

pw = b"lab-pw-2026"
hashlib.sha256(pw).hexdigest()                  # 해싱: 항상 64자, 되돌릴 방법 없음 → 같은지 비교만 가능
key = Fernet.generate_key()                     # 암호화: 열쇠가 있어야
token = Fernet(key).encrypt(pw)                 #   잠그고
Fernet(key).decrypt(token) == pw                #   풀 수 있다 (True)
base64.b64encode(pw)                            # 인코딩: b'bGFiLXB3LTIwMjY=' — 누구나 b64decode 로 되돌림
```

| | 해싱 | 암호화 | 인코딩 |
|---|---|---|---|
| 되돌리기 | 불가(단방향) | 열쇠로 가능(양방향) | 누구나 가능 |
| 열쇠 | 없음 | 있음(대칭/비대칭) | 없음 |
| 출력 길이 | 고정 | 입력에 비례 | 입력에 비례 |
| 쓰는 곳 | 비밀번호 저장, 파일 무결성, 서명 | 통신(TLS), 디스크·백업 보관 | 바이너리를 문자로(이미지→Base64, JWT 본문) |

고르는 기준은 "**나중에 원문이 필요한가**". 비밀번호는 원문이 필요 없고 "같은지" 만 보면 되니 해싱(bcrypt/argon2 + 솔트). 환자 진료 기록은 나중에 읽어야 하니 암호화(AES)하고 열쇠를 따로 관리한다. JWT 의 본문은 Base64 인코딩일 뿐이라 **누구나 읽을 수 있다** — 그래서 토큰에 비밀을 넣으면 안 되고, 위조만 서명으로 막는다.

면접 단골: "비밀번호를 암호화해서 저장하면 안 되나?" — 안 된다. 열쇠가 새면 전부 원문으로 풀리고, 애초에 서버가 원문을 알 필요가 없기 때문. "Base64 는 암호화인가?" — 아니다, 열쇠 없이 되돌아가는 건 암호화가 아니다.

## 헷갈리기 쉬운 것

- **해시 충돌**: 입력은 무한한데 출력은 고정 길이라 이론상 겹칠 수 있다. SHA-256 은 사실상 못 찾게 설계됐고, MD5·SHA-1 은 충돌이 실제로 발견돼 보안용으로 퇴출됐다.
- **HMAC·전자서명**은 해시에 열쇠를 섞어 "누가 만들었나" 까지 보장하는 것. 해시 단독은 무결성만, 서명은 무결성 + 출처.
- **해싱 ≠ 비밀번호 해싱**: SHA-256 은 너무 빨라 비밀번호에 부적합하고, bcrypt·argon2 처럼 일부러 느린 함수를 쓴다.
