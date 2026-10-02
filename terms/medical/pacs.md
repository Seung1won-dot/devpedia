---
id: pacs
term: PACS
aliases:
  - Picture Archiving and Communication System
  - 의료영상저장전송시스템
  - 팍스
category: medical
tags:
  - 병원시스템
  - 의료영상
level: 1
kind: concept
related:
  - dicom
  - medical-image-segmentation
  - object-storage
  - his
  - emr-ehr
  - imaging-modality
  - wsi
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

CT·MRI·X-ray 영상을 **저장하고 판독실·진료실로 보내주는** 병원 영상 서버.

## 비유

필름 보관실과 배달 직원을 합친 **거대한 사진 창고**. 촬영실에서 찍은 사진이 자동으로 창고에 들어가고, 의사가 방에서 "이 환자 사진" 하면 바로 화면에 뜬다.

## 예시

```text
CT 장비(모달리티) ──DICOM 전송──▶ PACS 서버(저장·색인) ──▶ 판독실 워크스테이션
                                        └──▶ 외래 진료실 뷰어 (EMR 화면에서 "영상" 버튼)
```

연구용 CT 데이터는 PACS 에서 DICOM 파일로 내보낸 뒤 환자 정보를 가명화해 폐쇄망 GPU 서버로 옮겨 학습에 쓴다. 병원 PACS 는 수십 TB 급이라 저장소 설계(오브젝트 스토리지·오래된 영상은 느린 디스크로 옮기는 계층 저장)가 핵심 인프라 문제다. 연구실에서 PACS 에 직접 붙는 일은 드물고, 보통 영상의학과가 반출해 준 파일을 받는다.

## 헷갈리기 쉬운 것

- **DICOM** 은 영상 파일·전송 규격(언어), **PACS** 는 그 규격으로 영상을 저장·배달하는 시스템(건물). PACS 는 DICOM 으로 말한다.
- **EMR** 은 글로 된 진료 기록, PACS 는 영상. 진료실에서 EMR 화면의 영상 버튼을 누르면 PACS 뷰어가 뜨는 식으로 연동된다.
