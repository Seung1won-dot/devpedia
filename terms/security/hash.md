---
id: hash
term: 해시(SHA-256)
aliases:
  - Hash
  - 해시 함수
  - 해시값
  - SHA-256
category: security
tags:
  - 암호화
  - 해시
level: 1
related:
  - encryption
  - password-hashing
  - salt
  - hash-table
  - digital-signature
see_also:
  - https://developer.mozilla.org/en-US/docs/Glossary/Hash
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

어떤 데이터든 **고정 길이 지문**으로 바꾸되 되돌릴 수는 없는 함수.

## 비유

사람의 **지문**. 지문으로 "그 사람이 맞다" 는 확인할 수 있지만, 지문만 보고 그 사람을 만들어낼 수는 없다.

## 예시

받아 둔 Proxmox 설치 ISO 가 손상되거나 바뀌지 않았는지 확인한다.

```bash
sha256sum proxmox-ve.iso
# 출력된 64자리 값이 공식 사이트에 적힌 값과 한 글자라도 다르면 다시 받는다
```

```python
import hashlib
hashlib.sha256(b"hello").hexdigest()    # 항상 64자리, b"hello!" 는 완전히 다른 값이 나온다
```

## 헷갈리기 쉬운 것

- **암호화**는 열쇠로 되돌릴 수 있다. 해시는 되돌리는 열쇠 자체가 없다.
- **해시 테이블**은 같은 아이디어(값을 짧은 번호로)를 "빠른 검색" 에 쓰는 자료구조. 보안용 해시는 "충돌을 못 찾게" 만드는 데 집중한다.
