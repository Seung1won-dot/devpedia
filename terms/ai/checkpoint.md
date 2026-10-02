---
id: checkpoint
term: 체크포인트
aliases:
  - Checkpoint
  - 모델 저장
  - state_dict
  - 가중치 파일
  - safetensors
category: ai
tags:
  - 딥러닝
  - 학습
  - 연구
level: 1
kind: concept
related:
  - batch-epoch
  - pytorch
  - huggingface
  - overfitting
  - experiment-tracking
  - model-parameters
see_also:
  - https://pytorch.org/tutorials/beginner/saving_loading_models.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

학습 도중 **모델 가중치와 진행 상태를 파일로 저장**해 둔 것.

## 비유

게임 세이브 파일. 도중에 꺼져도 처음부터가 아니라 마지막 저장 지점에서 이어 하고, 가장 잘 풀렸던 지점의 세이브는 따로 남겨 둔다.

## 예시

```python
# 매 에폭 끝: 이어 학습용 (가중치 + 옵티마이저 + 에폭 번호)
torch.save({"epoch": epoch, "model": model.state_dict(),
            "opt": opt.state_dict(), "val_loss": val_loss}, "ckpt/last.pt")
if val_loss < best:                                 # 검증 손실 최저 갱신 → 평가·배포용 복사본
    best = val_loss
    torch.save(model.state_dict(), "ckpt/best.pt")

# 서버가 재부팅된 뒤 이어 하기
ck = torch.load("ckpt/last.pt", map_location="cuda")
model.load_state_dict(ck["model"]); opt.load_state_dict(ck["opt"])
start_epoch = ck["epoch"] + 1
```

체크포인트는 보통 두 벌 둔다. `last` 는 **이어 하기용**이라 옵티마이저 상태까지 담고, `best` 는 검증 손실이 가장 낮았던 가중치라 최종 평가와 배포에 쓴다 — 마지막 에폭이 아니라 best 를 쓰는 것이 과적합 대비다. 공유 GPU 서버는 누가 재부팅할지 모르니 체크포인트 없이 20시간 학습을 돌리는 건 도박이다. 파일 크기는 파라미터 수 × 바이트(7B 를 fp16 으로 저장하면 약 14GB)라 git 에 올리지 말고(.gitignore) NAS 나 허브에 둔다. Hugging Face 는 pickle 기반 `.pt` 대신 임의 코드 실행 위험이 없는 `safetensors` 포맷을 쓴다.

## 헷갈리기 쉬운 것

- **state_dict 만 저장 vs 모델 통째로 저장**: `torch.save(model)` 은 클래스 정의까지 pickle 로 묶어 코드가 조금만 바뀌어도 못 연다. 가중치 사전(state_dict)만 저장하는 게 정석.
- **스냅샷(VM)**: 둘 다 "되돌릴 지점" 이지만 체크포인트는 모델 파일 하나, 스냅샷은 VM 디스크 전체(Proxmox).
- **LoRA 어댑터**: 전체 가중치가 아니라 덧붙인 작은 행렬만 담은 체크포인트. 수십 MB 로 가볍지만 원본 모델이 따로 있어야 쓴다.
