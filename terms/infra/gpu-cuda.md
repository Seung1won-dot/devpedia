---
id: gpu-cuda
term: GPU 서버/CUDA
aliases:
  - GPU Server
  - CUDA
  - 쿠다
  - GPU 서버
category: infra
tags:
  - GPU
  - 서버운영
  - 하드웨어
level: 1
related:
  - vram
  - training-inference
  - local-llm
  - docker
  - quantization
see_also:
  - https://docs.nvidia.com/cuda/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

단순 계산을 수천 개 코어로 **한꺼번에** 하는 GPU 와, 그걸 코드에서 쓰게 하는 **CUDA**.

## 비유

CPU 가 어려운 문제를 푸는 **교수 4명**이라면 GPU 는 단순 계산만 하는 **학생 수천 명**. CUDA 는 그 학생들에게 일을 나눠 주는 말(NVIDIA 전용 언어)이다.

## 예시

```bash
nvidia-smi                       # 드라이버·GPU·VRAM 사용량·누가 점유 중인지
watch -n 1 nvidia-smi            # 학습 중 실시간 감시
nvcc --version                   # CUDA 툴킷 버전 (드라이버 버전과 별개)
python -c "import torch; print(torch.cuda.is_available(), torch.cuda.get_device_name(0))"
# Docker 컨테이너에 GPU 물리기 (nvidia-container-toolkit 설치 후)
docker run --rm --gpus all nvidia/cuda:12.6.0-base-ubuntu22.04 nvidia-smi
```

`nvidia-smi` 에 뜨는 `CUDA Version: 12.6` 은 "드라이버가 지원하는 최고 버전" 이지 설치된 툴킷이 아니다 — PyTorch 가 CUDA 를 못 잡으면 대부분 이 둘의 버전 궁합 문제다.

## 헷갈리기 쉬운 것

- **VRAM** 은 GPU 에 달린 메모리. 모델이 "안 올라간다" 는 대부분 코어가 아니라 VRAM 부족이다.
- **드라이버 vs CUDA 툴킷**: 드라이버는 OS 가 GPU 를 인식하게 하는 것, 툴킷(nvcc·라이브러리)은 개발용. PyTorch 는 자기 CUDA 런타임을 들고 오므로 보통 드라이버만 맞으면 된다.
