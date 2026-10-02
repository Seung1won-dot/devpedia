---
id: dicom
term: DICOM
aliases:
  - Digital Imaging and Communications in Medicine
  - 다이콤
  - 의료영상 표준
category: medical
tags:
  - 표준
  - 의료영상
level: 2
kind: protocol
related:
  - pacs
  - medical-image-segmentation
  - fhir
  - de-identification
  - object-storage
  - imaging-modality
  - wsi
see_also:
  - https://www.dicomstandard.org/
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

의료 영상의 **파일 형식과 장비 간 전송 방식**을 정한 국제 표준.

## 비유

사진 위에 **환자 이름·촬영 조건이 적힌 이름표가 붙어 있는 봉투**. 어느 병원 장비로 찍었든 봉투 규격이 같아서 다른 병원 프로그램도 열어볼 수 있다.

## 예시

```python
import pydicom
ds = pydicom.dcmread("ct_0001.dcm")
print(ds.PatientName, ds.Modality, ds.SliceThickness)  # 홍길동 CT 1.0
img = ds.pixel_array                                   # numpy 배열 (512, 512)
```

파일 안은 (그룹,요소) 번호가 붙은 태그의 나열이다:

```text
(0010,0010) PatientName      홍길동
(0010,0020) PatientID        P2026-0421
(0008,0060) Modality         CT
(0018,0050) SliceThickness   1.0
(7FE0,0010) PixelData        [픽셀 바이트]
```

한 파일 = 슬라이스 한 장이라 CT 한 번에 수백 개 파일이 나온다. 연구용으로 쓸 때는 헤더의 환자 이름·ID·생년월일 태그를 지우는 가명화를 먼저 하고, 학습용으로는 한 볼륨이 한 파일인 NIfTI 로 변환하는 일이 많다.

## 헷갈리기 쉬운 것

- **PACS** 는 DICOM 파일을 저장·전송하는 시스템. DICOM 은 규격, PACS 는 그 규격을 쓰는 서버.
- **NIfTI(.nii)** 는 연구용 3D 영상 포맷. 환자 정보 헤더가 없고 한 볼륨이 한 파일이라 딥러닝 학습에 편하지만, 병원 장비는 NIfTI 를 모른다.
