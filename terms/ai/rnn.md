---
id: rnn
term: RNN
aliases:
  - Recurrent Neural Network
  - 순환 신경망
  - LSTM
  - GRU
  - 알엔엔
category: ai
tags:
  - 딥러닝
  - 학습
level: 2
kind: concept
related:
  - transformer
  - neural-network
  - cnn
  - backpropagation
  - llm
  - ecg
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

앞 시점의 **기억을 다음 입력과 함께** 넣어 순서 있는 데이터를 다루는 신경망.

## 비유

소설을 한 문장씩 읽으며 머릿속 요약 메모를 계속 고쳐 쓰는 것. 다음 문장을 읽을 땐 그 메모와 새 문장을 같이 보는데, 메모가 한 줄뿐이라 100쪽 전 내용은 흐려진다.

## 예시

```python
import torch, torch.nn as nn
# 환자 1명, 24시간 동안 매시간 [심박, 수축기혈압, 체온, SpO2] → 다음 시간 악화 여부
x = torch.randn(1, 24, 4)                # (batch, 시간 길이, 특징 수)
rnn = nn.GRU(input_size=4, hidden_size=32, batch_first=True)
out, h = rnn(x)                          # out: (1, 24, 32) 매 시점의 기억, h: 마지막 기억
risk = nn.Linear(32, 1)(h[-1])           # 마지막 기억으로 악화 점수 하나
```

"이전 기억 h 와 지금 입력 x 를 섞어 새 기억 h 를 만든다" 를 같은 가중치로 24번 반복하는 구조다. 기본 RNN 은 역전파 때 1 보다 작은 값을 24번 곱하면서 기울기가 0 에 가까워져(기울기 소실) 앞쪽 시점을 못 배우는데, LSTM/GRU 는 "무엇을 잊고 무엇을 남길지" 정하는 게이트를 둬서 이걸 완화했다. 그래도 순서대로 하나씩 처리해야 해서 GPU 병렬화가 안 되고 긴 문맥은 여전히 흐려지므로 문장 전체를 한 번에 보는 Transformer 로 대체됐고, 환자 바이탈처럼 짧은 시계열이나 가벼운 장비에서는 아직 GRU 가 쓸 만하다.

면접에서는 "RNN 의 한계와 LSTM 이 그걸 어떻게 풀었나?", "Transformer 가 RNN 을 대체한 이유는?" 으로 나온다. 기울기 소실 → 게이트 → 병렬화·긴 문맥, 이 순서로 답한다.

## 헷갈리기 쉬운 것

- **LSTM / GRU** 는 RNN 의 개량형이다. LSTM 은 게이트 3개, GRU 는 2개로 더 가볍고 성능은 비슷한 경우가 많다.
- **Transformer** 는 순환 없이 어텐션으로 모든 시점을 한 번에 본다. 길이가 길어도 앞 내용이 흐려지지 않고 병렬 학습이 된다.
- **1D CNN** 도 시계열에 쓴다. 짧은 창 안의 파형 모양엔 1D CNN, 멀리 떨어진 시점 사이의 관계엔 RNN/Transformer.
