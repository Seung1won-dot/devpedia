---
id: kms-hsm
term: KMS/HSM
aliases:
  - Key Management Service
  - Hardware Security Module
  - 키 관리 서비스
  - 하드웨어 보안 모듈
  - 봉투 암호화
category: security
tags:
  - 키관리
  - 암호화
  - 클라우드
  - 시크릿
level: 3
kind: tool
related:
  - key-rotation
  - encryption-at-rest-in-transit
  - secrets-management
  - public-key-cryptography
  - iam
  - aws-core-services
see_also:
  - https://docs.aws.amazon.com/kms/latest/developerguide/overview.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

암호 키를 **꺼낼 수 없는 금고에 넣어 두고** 잠그기·풀기만 대신해 주는 서비스나 장치.

## 비유

은행 금고실 직원. 내게 열쇠를 건네는 대신 서류를 가져가면 **안에서 도장을 찍어 돌려주니**, 열쇠는 한 번도 금고 밖으로 나오지 않는다.

## 예시

HSM 은 뜯으면 스스로 키를 지우는 **물리 장치**, KMS 는 그 HSM 을 뒤에 두고 API 로 열어 둔 **클라우드 서비스**(AWS KMS, GCP Cloud KMS, Azure Key Vault). 앱은 키를 받는 게 아니라 "이것 좀 잠가 줘/풀어 줘" 요청만 보낸다.

```bash
# 키는 못 받는다 — 잠근 결과만 돌려받는다
aws kms encrypt --key-id alias/lab-emr --plaintext fileb://dek.bin \
  --query CiphertextBlob --output text > dek.enc
```

큰 파일을 매번 KMS 로 보내지는 않는다. 파일은 로컬에서 데이터 키(DEK)로 잠그고 그 DEK 만 KMS 로 잠가 파일 옆에 두는 **봉투 암호화**가 기본형이다. 누가 언제 어떤 키를 썼는지 로그, 로테이션, IAM 권한 분리를 서비스가 대신 해 준다.

**트레이드오프**: 3명 연구실의 서버 한 대라면 `.env` + 디스크 암호화로 충분하고, KMS 는 호출마다 네트워크 왕복·요금·클라우드 종속이 붙는다. 값어치를 하는 때는 "누가 키를 썼는지 증명하라"(ISMS-P 심사), 여러 서비스·사람이 한 키를 공유, 유출 시 즉시 회수가 필요할 때. 폐쇄망 병원처럼 클라우드를 못 쓰면 온프레미스 HSM 이나 HashiCorp Vault 의 Transit 엔진이 같은 역할을 하고, 개인용으로는 YubiKey 에 SSH 키를 넣는 것이 가장 싼 HSM 이다.

## 헷갈리기 쉬운 것

- **시크릿 관리자**(Vault, AWS Secrets Manager)는 API 키·DB 비밀번호 **값**을 보관했다가 꺼내 준다. KMS 는 키를 절대 꺼내 주지 않고 연산만 한다. 보통 시크릿 관리자가 자기 저장소를 KMS 로 잠근다.
- **KMS 와 HSM** — HSM 은 장치(FIPS 140 인증 하드웨어), KMS 는 그 장치를 여러 사용자가 API 로 나눠 쓰게 한 관리 서비스. 전용 HSM 을 통째로 빌리는 CloudHSM 은 시간당 과금이라 훨씬 비싸다 [확인 필요].
- **TPM** 은 노트북 메인보드에 붙은 작은 HSM 비슷한 칩. BitLocker 디스크 키가 거기 들어 있다.
