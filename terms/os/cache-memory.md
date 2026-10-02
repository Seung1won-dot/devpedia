---
id: cache-memory
term: 캐시 메모리
aliases:
  - Cache Memory
  - CPU 캐시
  - L1/L2/L3 캐시
category: os
tags:
  - 하드웨어
  - 메모리
level: 2
kind: concept
related:
  - cpu
  - ram
  - cache
  - virtual-memory
  - array
  - locality
status: review
created: 2026-09-25
updated: 2026-09-29
---

## 한 줄 정의

CPU 가 **자주 쓰는 데이터를 바로 옆에 복사해 두는** 아주 작고 빠른 메모리.

## 비유

요리사 손 옆의 **양념 선반**. 매번 창고(RAM)까지 가지 않도록 자주 쓰는 소금·후추만 손 닿는 곳에 두는데, 선반이 작으니 뭘 둘지가 중요하다.

## 예시

```bash
lscpu | grep -i cache
# L1d cache: 32 KiB / L2 cache: 1 MiB / L3 cache: 32 MiB  (GPU 서버 예시)
```

```python
import numpy as np
a = np.random.rand(4096, 4096)

# 행 단위로 읽으면 메모리가 이어져 있어 캐시에 잘 맞는다
s1 = sum(a[i, :].sum() for i in range(4096))   # 빠름
# 열 단위로 읽으면 매번 멀리 뛰어 캐시 미스가 난다
s2 = sum(a[:, j].sum() for j in range(4096))   # 훨씬 느림
```

같은 계산인데 메모리를 읽는 순서만 달라도 속도 차이가 나는 이유가 캐시다. 배열이 연결 리스트보다 빠른 것도 같은 이유.

## 헷갈리기 쉬운 것

- **캐시(Redis 등)** 는 소프트웨어 차원에서 "자주 쓰는 결과를 저장해 두는" 같은 아이디어. 캐시 메모리는 CPU 칩 안의 하드웨어. 원리는 같고 층이 다르다.
- **RAM** 은 GB 단위, 캐시 메모리는 KB~MB 단위. 대신 캐시가 수십 배 빠르다.
