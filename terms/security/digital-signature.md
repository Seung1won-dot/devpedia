---
id: digital-signature
term: 디지털 서명
aliases:
  - Digital Signature
  - 전자 서명
  - 디지털 서명
  - 코드 서명
category: security
tags:
  - 암호화
  - 키관리
level: 2
kind: concept
related:
  - public-key-cryptography
  - hash
  - certificate
  - git
  - jwt
  - e-consent
  - app-signing
see_also:
  - https://developer.mozilla.org/en-US/docs/Glossary/Signature/Security
status: review
created: 2026-09-25
updated: 2026-10-03
---

## 한 줄 정의

개인키로 찍고 공개키로 확인해 **누가 보냈고 안 바뀌었는지** 증명하는 표시.

## 비유

**인감 도장**. 도장(개인키)은 나만 갖고 있고 인감증명(공개키)은 누구나 대조할 수 있어서, 처음 보는 사람도 "진짜 이 사람이 찍었고 문서가 바뀌지 않았다" 를 믿을 수 있다.

## 예시

연구실 저장소의 커밋에 SSH 키로 서명해서, 남이 내 이름으로 커밋을 끼워 넣지 못하게 한다.

```bash
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git commit -S -m "feat: add RLS policy"     # 개인키로 서명이 붙는다
# GitHub 계정에 같은 .pub 를 "Signing key" 로 등록하면 커밋 옆에 Verified 배지가 뜬다
```

실제로는 문서 전체가 아니라 문서의 **해시**에 서명한다. JWT 도 마지막 조각이 서명이라 내용을 한 글자만 바꿔도 검증에 실패한다.

## 헷갈리기 쉬운 것

- **암호화**는 내용을 숨기는 것. 서명은 내용을 숨기지 않고 "출처와 변조 여부" 만 보증한다. 서명된 커밋도 누구나 읽을 수 있다.
- **인증서**는 "이 공개키가 진짜 이 사람(도메인) 것" 이라고 CA 가 서명해 준 문서. 서명이 재료이고 인증서는 그 재료로 만든 신분증.
