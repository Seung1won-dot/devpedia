---
id: imaging-modality
term: 영상 모달리티(CT/MRI/X-ray)
aliases:
  - Imaging Modality
  - 모달리티
  - 촬영 장비 종류
  - CT/MRI/X-ray/초음파
category: medical
tags:
  - 의료영상
  - 병원시스템
  - 의료AI
level: 1
kind: concept
related:
  - dicom
  - pacs
  - medical-image-segmentation
  - cnn
  - wsi
  - multimodal
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

CT·MRI·X-ray·초음파처럼 **의료 영상을 찍는 장비와 방식의 종류**.

## 비유

같은 집을 보는 **여러 종류의 카메라**. 일반 사진은 겉모습, 열화상은 온도, 투시 카메라는 벽 안의 배관을 보여 주듯, 모달리티마다 몸의 다른 면을 보여 준다.

## 예시

```text
모달리티      원리            결과물                       연구 데이터에서의 특징
X-ray(CR/DX)  X선 투과        2D 한 장                     파일 1개, 해상도 큼
CT            X선 단층 회전   3D 볼륨(수백 슬라이스)        HU 단위, 슬라이스 두께가 중요
MRI           자기장·전파     3D, 시퀀스 여러 개(T1/T2…)    장비마다 밝기 스케일이 다름
US(초음파)    음파 반사       2D 동영상/캡처               화면에 환자 이름이 찍혀 있음
```

DICOM 헤더의 `Modality` 태그(CT, MR, CR, DX, US…)가 바로 이 값이라, PACS 에서 연구 데이터를 추출할 때 첫 필터 조건이 된다. 모달리티가 다르면 전처리도 다르다 — CT 는 HU 값 기준으로 창(window)을 잡아 정규화하고, MRI 는 절대 단위가 없어 영상마다 강도 정규화를 하며, X-ray 는 2D 라 가볍지만 해상도가 커서 리사이즈 전략이 중요하다. 한 모달리티로 학습한 모델은 다른 모달리티에 거의 안 통한다.

## 헷갈리기 쉬운 것

- **멀티모달(AI)** 은 영상+텍스트처럼 **데이터 종류**가 여럿이라는 뜻, 의료의 **모달리티** 는 촬영 장비 종류. 두 단어가 한 논문에 섞여 나오니 문맥을 봐야 한다.
- **시퀀스(MRI)** 는 MRI 라는 한 모달리티 안에서 촬영 설정이 다른 것(T1, T2, FLAIR). 모달리티보다 한 단계 아래 개념이다.
- **DICOM** 은 파일 규격이고 모달리티는 그 파일을 만든 장비 종류. 어느 모달리티든 PACS 에는 DICOM 으로 저장된다.
