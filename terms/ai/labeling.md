---
id: labeling
term: 레이블링
aliases:
  - Labeling
  - Annotation
  - 라벨링
  - 어노테이션
  - 정답 데이터
  - 태깅
category: ai
tags:
  - ML기초
  - 데이터
  - 의료영상
  - 의료AI
level: 1
kind: concept
related:
  - learning-paradigms
  - classification-regression
  - medical-image-segmentation
  - data-augmentation
  - train-validation-test
  - dicom
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

모델이 배울 수 있도록 **데이터 하나하나에 정답을 붙이는** 작업.

## 비유

문제집에 답안지를 만들어 주는 일. 답안지가 없으면 채점이 안 되고, 채점이 안 되면 공부(지도학습)도 안 된다.

## 예시

```csv
image_id,label,annotator,labeled_at
CXR_000123,pneumonia,rad_A,2026-03-02
CXR_000124,normal,rad_A,2026-03-02
CXR_000125,pneumonia,rad_B,2026-03-03
```

흉부 X-ray 2,000장을 "정상/폐렴" 으로 나누는 분류 과제의 레이블 파일. 영상 분류면 한 장에 라벨 하나(CSV 한 줄)로 끝나지만, 검출이면 박스 좌표, 세그멘테이션이면 픽셀 마스크(NIfTI/PNG)를 그려야 해서 한 장당 시간이 몇 초에서 수십 분으로 늘어난다. 의료 어노테이션은 **전문의가 직접 해야** 하므로 프로젝트에서 가장 비싼 공정이고, 판독자마다 기준이 달라 2명 이상이 보고 불일치 정도(Cohen's kappa)를 확인하는 게 정석이다. 시작 전에 "폐렴의 정의, 애매할 때의 규칙" 을 적은 라벨 가이드를 먼저 만들어야 중간에 기준이 흔들리지 않는다. 도구는 영상용 3D Slicer·ITK-SNAP, 범용 Label Studio·CVAT.

## 헷갈리기 쉬운 것

- **레이블 vs 피처**: 피처는 입력(픽셀, 검사 수치), 레이블은 맞혀야 할 출력. 같은 CSV 에 둘 다 들어 있어도 역할이 다르다.
- **어노테이션 vs 레이블링**: 거의 같은 말이지만 어노테이션은 박스·마스크처럼 위치까지 그리는 쪽에 더 쓴다.
- **약한 레이블(weak label)**: 판독문의 키워드로 자동 추출하거나 모델이 미리 찍어 준 라벨. 싸지만 틀린 게 섞여 있어 학습에는 써도 최종 채점용 테스트 데이터에는 쓰면 안 된다.
