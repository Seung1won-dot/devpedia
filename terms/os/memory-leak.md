---
id: memory-leak
term: 메모리 누수
aliases:
  - Memory Leak
  - 메모리 릭
  - 메모리 누출
  - OOM
category: os
tags:
  - 메모리
  - 메모리관리
  - 흔한실수
  - 성능
level: 2
kind: concept
related:
  - garbage-collection
  - stack-heap-memory
  - vram
  - ram
  - monitoring
  - profiling
see_also:
  - https://docs.python.org/3/library/tracemalloc.html
  - https://pytorch.org/docs/stable/notes/faq.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

프로그램이 다 쓴 메모리를 **돌려주지 않아 돌릴수록 사용량이 쌓이는** 버그.

## 비유

회의실을 **예약만 하고 끝나도 반납 안 하는** 직원. 한 번은 티가 안 나지만 매일 반복되면 어느 날 예약할 회의실이 하나도 없다.

## 예시

```python
# PyTorch 에서 가장 흔한 누수: 계산 그래프가 붙은 텐서를 리스트에 모으기
losses = []
for batch in loader:
    loss = model(batch).mean()
    loss.backward(); opt.step(); opt.zero_grad()
    losses.append(loss)          # 나쁨: loss 가 그래프 전체를 붙잡아 VRAM 이 에폭마다 늘어난다
    # losses.append(loss.item()) # 좋음: 숫자만 떼어 저장
```

```bash
watch -n 5 'free -m; nvidia-smi --query-gpu=memory.used --format=csv'   # 시간이 갈수록 늘기만 하나
docker stats                              # 컨테이너별 메모리 — 재시작 뒤부터 계속 우상향이면 의심
dmesg | grep -i "out of memory"           # OOM killer 가 누구를 죽였나
```

증상은 "서버가 며칠 지나면 느려지다가 죽고, 재시작하면 멀쩡" 이다. 가비지 컬렉션이 있는 언어에서도 생기는데, 전역 dict 캐시에 키만 계속 추가하거나 이벤트 리스너·콜백을 등록만 하고 해제 안 하거나 파일·DB 커넥션을 닫지 않으면 참조가 남아 GC 가 "아직 쓰는 중" 으로 본다. 주기적 재시작은 임시방편이고, 근본은 `tracemalloc` 이나 메모리 프로파일러로 어디서 쌓이는지 찾는 것이다.

## 헷갈리기 쉬운 것

- **메모리 부족(OOM) vs 누수**: OOM 은 증상, 누수는 원인 중 하나. 모델이 그냥 커서 처음부터 안 올라가는 건 누수가 아니라 용량 문제다. 누수는 "처음엔 되다가 점점" 이 특징.
- **GC 가 있으면 누수가 없다?**: 아니다. GC 는 "아무도 안 가리키는" 것만 치우므로, 안 쓰는데 가리키고 있는 것은 영원히 남는다.
- **캐시 vs 누수**: 의도적으로 들고 있으면 캐시지만, 상한(LRU 크기·TTL)이 없는 캐시는 결과적으로 누수와 똑같이 행동한다.
