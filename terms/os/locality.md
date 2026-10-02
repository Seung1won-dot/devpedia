---
id: locality
term: 지역성(시간/공간)
aliases:
  - Locality of Reference
  - 참조 지역성
  - 시간 지역성
  - 공간 지역성
  - 참조의 국소성
category: os
tags:
  - 메모리
  - 캐시
  - 성능
level: 2
kind: concept
related:
  - cache-memory
  - page-replacement
  - memory-hierarchy
  - array
  - linked-list
  - ecs
status: review
created: 2026-09-29
updated: 2026-10-03
---

## 한 줄 정의

프로그램이 **방금 쓴 것과 그 근처를 다시 쓰는** 경향.

## 비유

도서관에서 공부할 때 **방금 본 책은 또 볼 확률이 높고(시간)**, **그 책 옆에 꽂힌 책도 볼 확률이 높다(공간)**. 그래서 그 책과 옆 책들을 책상에 미리 갖다 두면 서가를 훨씬 덜 오간다.

## 예시

```c
#define N 4096
static int a[N][N];          // C 는 행 우선(row-major): a[i][0], a[i][1], ... 이 이어져 있음

long sum_rows(void) {        // 안쪽 루프가 j → 이어진 주소를 순서대로 → 캐시 라인 재사용
    long s = 0;
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++) s += a[i][j];
    return s;
}
long sum_cols(void) {        // 안쪽 루프가 i → 매번 16 KB 씩 건너뜀 → 캐시 미스 연발
    long s = 0;
    for (int j = 0; j < N; j++)
        for (int i = 0; i < N; i++) s += a[i][j];
    return s;
}
```

두 함수는 같은 값을 계산하지만 `sum_cols` 가 몇 배 느리다. 캐시는 한 번에 64바이트(int 16개)를 통째로 가져오는데, 행 순회는 그 16개를 다 쓰고 열 순회는 1개만 쓰고 버리기 때문이다. 캐시·페이지 교체·CDN 이 효과를 보는 이유가 전부 지역성이고, 지역성이 없는 완전 무작위 접근에는 캐시가 무력하다. 면접에서는 "캐시 히트율을 높이려면 코드를 어떻게 짜야 하나?" 로 나온다.

## 헷갈리기 쉬운 것

- **시간 지역성 vs 공간 지역성**: 시간은 "같은 주소를 곧 다시", 공간은 "옆 주소를 곧". 루프 변수 `s` 는 시간 지역성, 배열 순회는 공간 지역성.
- **배열 vs 연결 리스트**: 이론상 둘 다 순회 O(n) 이지만 연결 리스트는 노드가 메모리에 흩어져 공간 지역성이 없어 실제로는 배열이 훨씬 빠르다.
- **NumPy 도 같다**: `a[i, :]` 순회가 `a[:, j]` 보다 빠른 이유가 이것이고, PyTorch 텐서에서 `.contiguous()` 를 부르는 것도 지역성을 되찾는 일이다.
