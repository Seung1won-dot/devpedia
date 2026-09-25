---
id: public-key-cryptography
term: 공개키/개인키
aliases:
  - Public-key Cryptography
  - 공개키 암호
  - 비대칭키 암호
  - 키 쌍
category: security
tags:
  - 암호화
  - 키관리
level: 1
related:
  - encryption
  - digital-signature
  - certificate
  - ssh
  - tls
see_also:
  - https://developer.mozilla.org/en-US/docs/Glossary/Public-key_cryptography
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**공개키로 잠그면 개인키로만** 열리는, 열쇠가 둘인 암호 방식.

## 비유

누구나 편지를 넣을 수 있는 **우체통**(공개키)과 그 우체통을 여는 **열쇠**(개인키). 우체통 위치는 온 동네에 알려도 되지만, 편지를 꺼내는 건 열쇠 주인뿐이다.

## 예시

연구실 Proxmox 서버에 비밀번호 대신 키로만 접속하게 만든다.

```bash
ssh-keygen -t ed25519 -C "may@lab"   # ~/.ssh/id_ed25519(개인키, 절대 공유 X) + id_ed25519.pub(공개키)
ssh-copy-id root@proxmox.lab         # 공개키만 서버의 ~/.ssh/authorized_keys 에 복사
# 이후 서버 /etc/ssh/sshd_config 에서 PasswordAuthentication no 로 바꾸면 비밀번호 추측이 아예 불가능
```

개인키 파일이 유출되면 열쇠를 잃어버린 것과 같으니, GitHub 에 올리지 말고 권한은 `chmod 600` 으로.

## 헷갈리기 쉬운 것

- **대칭키 암호화**는 잠그고 여는 열쇠가 하나. 빠르지만 그 열쇠를 상대에게 안전하게 전달하는 게 문제라, 그 전달에 공개키 방식을 쓴다.
- **디지털 서명**은 같은 키 쌍을 거꾸로 쓰는 것. 개인키로 "찍고" 공개키로 "확인" 한다.
