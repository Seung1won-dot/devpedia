---
id: pytorch
term: PyTorch
aliases:
  - 파이토치
  - torch
  - 텐서
  - autograd
  - nn.Module
category: ai
tags:
  - 딥러닝
  - GPU
  - Python
level: 2
kind: tool
related:
  - neural-network
  - backpropagation
  - gradient-descent
  - gpu-cuda
  - vram
  - pandas-numpy
  - generator-iterator
see_also:
  - https://pytorch.org/tutorials/beginner/basics/intro.html
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

숫자 배열 계산에 **자동 미분과 GPU** 를 붙여 신경망을 만들고 학습시키는 파이썬 라이브러리.

## 비유

레고 세트. 층(블록)을 끼워 모델을 만들면 어느 블록을 얼마나 고쳐야 하는지(미분)는 세트가 알아서 계산해 주고, 조립을 큰 작업대(GPU)로 옮기는 것도 한 줄이다.

## 예시

```python
import torch, torch.nn as nn
device = "cuda" if torch.cuda.is_available() else "cpu"    # 연구실 GPU 서버면 cuda
model = nn.Sequential(nn.Linear(4, 32), nn.ReLU(), nn.Linear(32, 1)).to(device)
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.BCEWithLogitsLoss()

for epoch in range(10):
    for x, y in loader:                        # DataLoader 가 미니배치를 준다
        x, y = x.to(device), y.to(device)      # 데이터도 같은 장치로
        loss = loss_fn(model(x), y)            # 1) 순전파 → 손실
        opt.zero_grad()                        # 2) 이전 기울기 비우기
        loss.backward()                        # 3) 역전파 (autograd)
        opt.step()                             # 4) 경사하강 한 걸음
```

텐서는 GPU 로 보낼 수 있는 NumPy 배열이고, `requires_grad` 가 켜진 텐서로 계산하면 autograd 가 연산 순서를 기록해 두었다가 `backward()` 때 기울기를 채워 준다. 모델은 `nn.Module` 을 상속해 `forward()` 만 쓰면 되고, 위 4단계(순전파 → zero_grad → backward → step)는 어떤 모델이든 똑같다. 모델과 데이터는 같은 장치에 있어야 해서 `Expected all tensors to be on the same device` 는 `.to(device)` 를 빼먹은 것이고, `CUDA out of memory` 는 배치 크기를 줄이라는 뜻이다. TensorFlow 는 구글 쪽 프레임워크로 배포·모바일 생태계가 강하지만, 논문·연구 코드는 PyTorch 가 압도적이라 연구실 코드도 대부분 PyTorch 다.

면접에서는 "학습 루프에서 `zero_grad()` 를 왜 부르나?"(기울기가 기본적으로 누적되기 때문), "PyTorch 와 TensorFlow 의 차이는?" 으로 나온다.

## 헷갈리기 쉬운 것

- **TensorFlow / Keras**: 같은 일을 하는 경쟁 프레임워크. Keras 는 `model.fit()` 한 줄로 끝나 입문이 쉽고, PyTorch 는 루프를 직접 써서 자유도가 높다.
- **텐서 vs NumPy 배열**: 거의 같은 API 지만 텐서는 GPU 에 올릴 수 있고 기울기를 기억한다. `.cpu().numpy()` 로 돌아온다.
- **`model.eval()` / `torch.no_grad()`**: 추론 때는 둘 다 켠다. eval 은 dropout·BatchNorm 동작을 추론용으로 바꾸고, no_grad 는 기울기 기록을 꺼서 메모리를 아낀다.
