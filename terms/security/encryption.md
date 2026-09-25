---
id: encryption
term: 암호화(대칭/비대칭)
aliases:
  - Encryption
  - 암호화
  - 대칭키 암호화
  - 비대칭키 암호화
category: security
tags:
  - 암호화
  - 보안
level: 1
related:
  - hash
  - public-key-cryptography
  - tls
  - https
  - ssh
see_also:
  - https://developer.mozilla.org/en-US/docs/Glossary/Encryption
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

데이터를 **열쇠가 있어야만 다시 읽을 수 있게** 뒤섞는 기술.

## 비유

자물쇠 달린 **상자**. 대칭키는 잠글 때와 열 때 같은 열쇠 하나를 쓰는 것이고, 비대칭키는 잠그는 열쇠(공개키)와 여는 열쇠(개인키)가 따로 있는 것이다.

## 예시

연구실 백업을 외부 스토리지에 올리기 전에 대칭키(비밀번호 하나)로 잠근다.

```bash
gpg --symmetric --cipher-algo AES256 lab-backup.tar.gz   # → lab-backup.tar.gz.gpg
gpg --decrypt lab-backup.tar.gz.gpg > lab-backup.tar.gz   # 같은 비밀번호로 푼다
```

HTTPS 는 둘을 섞어 쓴다. 처음 만날 때는 비대칭키로 "오늘 쓸 열쇠" 를 안전하게 나눠 갖고, 그다음부터는 빠른 대칭키로 통신한다.

## 헷갈리기 쉬운 것

- **해시**는 되돌릴 수 없다. 암호화는 열쇠만 있으면 원문으로 되돌린다. 비밀번호 저장에는 해시, 파일 보관·통신에는 암호화.
- **인코딩**(base64 등)은 열쇠가 없어도 누구나 되돌린다. 숨기는 게 아니라 형식을 바꾸는 것일 뿐이라 보안 수단이 아니다.
