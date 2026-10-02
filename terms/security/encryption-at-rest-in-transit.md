---
id: encryption-at-rest-in-transit
term: 저장/전송 중 암호화
aliases:
  - Encryption at Rest
  - Encryption in Transit
  - 저장 데이터 암호화
  - 전송 구간 암호화
  - 디스크 암호화
category: security
tags:
  - 암호화
  - HTTPS
  - 의료데이터
  - 보안
level: 2
kind: concept
related:
  - encryption
  - tls
  - https
  - kms-hsm
  - medical-data-law
  - snapshot-backup
see_also:
  - https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html
  - https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

데이터를 **디스크에 둘 때와 네트워크로 옮길 때** 각각 잠가 두는 두 암호화 지점.

## 비유

귀중품을 **금고에 넣어 두는 것**(저장 중)과 옮길 때 **현금수송차에 싣는 것**(전송 중). 둘 중 하나만 하면 나머지 구간에서 털린다.

## 예시

EMR 추출 CSV 가 든 VM 디스크를 떠올리면 두 구간이 보인다. 전송 중은 Caddy 의 HTTPS, `psql` 의 TLS, `scp`/`rsync` 가 타는 SSH 가 맡는다. 저장 중은 OS 의 디스크 암호화(LUKS), DB 의 컬럼 암호화, 백업 파일 암호화가 맡는다.

```bash
# 전송 중: DB 접속에 TLS 를 강제한다 (서버가 TLS 를 안 켰으면 접속 자체가 실패)
psql "host=db.lab.internal dbname=emr sslmode=require"
# 저장 중: 이 서버 디스크가 LUKS 로 잠겨 있는지 확인
lsblk -o NAME,FSTYPE,MOUNTPOINT | grep -i luks
```

둘이 막는 위협이 다르다. 저장 중 암호화는 **디스크를 뽑아 가거나 백업 파일이 새는** 경우를 막지만, 켜져 있는 서버에 로그인한 공격자에게는 이미 풀린 상태로 보인다. 전송 중 암호화는 중간 도청을 막지만 받는 쪽 서버에서는 평문이 된다. 그래서 둘 다 해도 앱 자체의 취약점은 별개로 막아야 한다. 개인정보보호법의 안전성 확보조치 기준은 고유식별정보·민감정보에 대해 두 구간 모두 암호화를 요구한다 [확인 필요].

## 헷갈리기 쉬운 것

- **종단간 암호화(E2EE)** 는 보내는 사람과 받는 사람만 열쇠를 가져 중간 서버조차 못 읽는다. 전송 중 암호화(TLS)는 서버에 도착하면 서버가 읽는다.
- **디스크 전체 암호화**(LUKS·BitLocker)와 **컬럼 암호화**(pgcrypto 로 주민번호 컬럼만)는 둘 다 "저장 중" 이지만, 후자는 서버에 침입당해도 키 없이는 못 읽는 대신 그 컬럼으로 검색·인덱스가 안 된다.
- **해싱**은 되돌릴 필요가 없는 값(비밀번호)에만. 나중에 읽어야 하는 데이터는 암호화다.
