---
id: multimodal
term: 멀티모달/비전 모델
aliases:
  - Multimodal
  - Vision-Language Model
  - VLM
  - 멀티모달 모델
  - 비전 언어 모델
  - 이미지 입력
category: ai
tags:
  - LLM
  - 딥러닝
  - 의료영상
  - 의료AI
level: 2
kind: concept
related:
  - llm
  - cnn
  - transformer
  - token
  - local-llm
  - dicom
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

글뿐 아니라 **이미지·소리도 함께 입력받아** 이해하고 답하는 모델.

## 비유

전화 상담원과 화상 상담원의 차이. 말로만 듣던 상담원이 화면을 같이 보게 되면서 "그 빨간 불 깜빡이는 거요" 를 알아듣게 된 것.

## 예시

```python
import base64, requests
img = base64.b64encode(open("cxr_000123.png", "rb").read()).decode()
r = requests.post("http://localhost:11434/api/chat", json={
    "model": "qwen2.5vl:7b",
    "messages": [{"role": "user",
                  "content": "이 흉부 X-ray 에서 보이는 소견을 나열해라. 진단은 내리지 마라.",
                  "images": [img]}],                 # 이미지는 base64 문자열로
    "stream": False})
print(r.json()["message"]["content"])
```

Ollama 에 올라온 비전 모델 태그(`qwen2.5vl`, `llama3.2-vision`, `gemma3`)는 바뀔 수 있으니 ollama.com/library 에서 확인한다 [확인 필요]. 비전 언어 모델은 이미지를 작은 패치로 잘라 토큰처럼 바꾸는 **비전 인코더**(ViT 계열)를 LLM 앞에 붙인 구조라, 이미지 한 장이 수백~수천 토큰을 차지해 컨텍스트와 VRAM 을 많이 먹는다. DICOM 은 그대로 못 넣고 윈도잉을 거쳐 PNG 로 바꿔야 하는데, 12~16bit 영상이 8bit 로 눌리면서 정보가 사라진다. 범용 VLM 은 영상 종류 구분·글자 읽기·보고서 초안에는 유용하지만 미세 병변 판독은 그 과제만 배운 CNN 분류기보다 못한 경우가 많으므로, 진단 근거가 아니라 **보조·전처리** 용도로 쓴다. 의료 특화 VLM(LLaVA-Med, MedGemma)도 있다.

## 헷갈리기 쉬운 것

- **CNN 분류기 vs VLM**: CNN 은 "폐렴 확률 0.93" 숫자 하나를 내고, VLM 은 말로 설명한다. 정량 평가·인허가는 CNN 쪽이 훨씬 쉽다.
- **이미지 생성 모델(Stable Diffusion)**: 글 → 이미지 방향. 넓게는 멀티모달이지만 "멀티모달 LLM" 이라 하면 보통 이미지를 **입력**으로 읽는 쪽이다.
- **OCR**: 글자만 뽑는다. VLM 은 글자도 읽고 그림도 이해하지만 느리고 비싸서, 스캔 문서의 글자만 필요하면 OCR 이 낫다.
