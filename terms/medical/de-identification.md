---
id: de-identification
term: 마스킹/익명화/가명화
aliases:
  - De-identification
  - 비식별화
  - 가명처리
  - 익명처리
category: medical
tags:
  - 의료데이터
  - 규제
  - 보안
  - 연구실
level: 2
kind: concept
related:
  - medical-data-law
  - irb
  - hash
  - salt
  - dicom
  - data-lineage
  - mrn
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

데이터에서 **누구인지 알아볼 수 있는 정보를 지우거나 바꿔** 개인을 특정 못 하게 하는 처리.

## 비유

단체 사진에서 **얼굴을 가리거나 다른 얼굴로 바꿔 붙이는 것**. 완전히 지우면 누군지 영영 모르고(익명), 원본 대조표를 금고에 따로 두면 필요할 때만 되찾을 수 있다(가명).

## 예시

```text
원본                                     가명화 후
환자번호  이름    생년월일    진단          환자키(해시)    이름  출생연도  진단
P0421    홍길동  1980-03-14  I10           a91f3c…2e     -     1980     I10
```

```python
import hashlib
def pseudonymize(patient_id: str, salt: str) -> str:
    # 솔트는 병원 안 금고(대조표)에만 보관 — 연구실은 해시값만 받는다
    return hashlib.sha256((salt + patient_id).encode()).hexdigest()[:12]
```

연구실 흐름: IRB 승인 → 병원 안에서 가명화(이름·주민번호 삭제, 환자번호는 솔트 붙여 해시, 생년월일은 연도만) → 폐쇄망 연구 서버로 반출. DICOM 은 픽셀뿐 아니라 헤더 태그(PatientName, PatientID 등)도 지워야 하고, 초음파 캡처처럼 영상 안에 이름이 찍힌 경우도 있어 픽셀 마스킹까지 필요하다.

## 헷갈리기 쉬운 것

- **익명화(익명처리)** 는 되돌릴 수 없게 만드는 것으로, 더 이상 개인정보가 아니라 법 적용을 벗어난다. **가명화(가명처리)** 는 추가 정보(대조표)와 합치면 되돌릴 수 있어 여전히 개인정보지만, 과학적 연구 목적이면 동의 없이 쓸 수 있는 근거가 개인정보보호법에 있다 [확인 필요].
- **마스킹** 은 화면에서 일부를 `*` 로 가리는 표시 방법(홍*동, 010-****-1234). 저장된 데이터 자체는 그대로일 수 있어 익명화·가명화와 다르다.
