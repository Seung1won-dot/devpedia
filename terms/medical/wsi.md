---
id: wsi
term: 병리 WSI
aliases:
  - Whole Slide Image
  - 전체 슬라이드 이미지
  - 디지털 병리 영상
  - 디지털 슬라이드
  - WSI
category: medical
tags:
  - 의료영상
  - 의료AI
  - 의료데이터
level: 2
kind: concept
related:
  - dicom
  - pacs
  - medical-image-segmentation
  - imaging-modality
  - labeling
  - cnn
  - object-storage
see_also:
  - https://openslide.org/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

현미경 유리 슬라이드 전체를 **고배율로 스캔한 기가픽셀 병리 영상**.

## 비유

**도시 전체를 찍은 초대형 위성 지도**. 한 번에 다 펼칠 수는 없어서 지도 앱처럼 축소본으로 보다가 필요한 구역만 확대해서 본다.

## 예시

```python
import openslide
slide = openslide.OpenSlide("TCGA-xx.svs")
print(slide.dimensions, slide.level_count)        # (98304, 76800) 4  ← 원본 픽셀 크기, 피라미드 단계 수
print(slide.properties.get("openslide.mpp-x"))   # 0.25 → 픽셀 하나가 0.25µm (약 40배율)
tile = slide.read_region((40960, 20480), 0, (256, 256)).convert("RGB")  # 원본 배율 256x256 패치
```

한 장이 10만×10만 픽셀, 파일 1~3GB 쯤이라 [확인 필요] 통째로 메모리에 올리거나 CNN 에 넣을 수 없다. 그래서 조직이 있는 영역만 256~512 픽셀 패치로 잘라 학습하고, 슬라이드 하나에 "암/정상" 라벨 하나만 있는 경우가 많아 패치 묶음 단위로 배우는 약지도 학습(MIL)이 흔하다. 스캐너 회사마다 포맷(.svs, .ndpi, .mrxs)이 달라 OpenSlide 같은 라이브러리로 읽고, 병원마다 염색 색감이 달라 색 정규화가 전처리의 단골이다. 용량이 커서 연구용 저장은 NAS 나 오브젝트 스토리지에 두는 편이다.

## 헷갈리기 쉬운 것

- **CT/MRI DICOM** 은 흑백 슬라이스를 쌓은 3D 볼륨, WSI 는 컬러 2D 한 장이 거대한 것. DICOM 에도 WSI 규격이 있지만 현장은 아직 스캐너 전용 포맷이 많다 [확인 필요].
- **디지털 병리**는 스캔·판독·보관 전체 업무 흐름, WSI 는 그 결과물인 영상 파일.
- **패치 라벨**과 **슬라이드 라벨**은 다른 층. 병리 보고서의 진단은 슬라이드 단위라, 패치 하나하나가 암인지는 모른 채 학습하는 경우가 많다.
