---
id: virtual-memory
term: 가상 메모리
aliases:
  - Virtual Memory
  - 가상메모리
  - 페이징
  - 스왑
category: os
tags:
  - 메모리
  - 리눅스
level: 2
related:
  - ram
  - process
  - kernel
  - cache-memory
  - stack-heap-memory
see_also:
  - https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

프로그램마다 **전용 메모리가 있는 것처럼 보이게** 하고 실제 RAM 은 OS 가 나눠 쓰는 기법.

## 비유

호텔의 **방 번호**. 손님(프로그램)은 "내 방은 301호" 만 알고 살지만, 실제로 어느 건물 어느 층인지는 프런트(OS)가 정하고, 안 쓰는 짐은 창고(디스크)로 잠깐 옮겨 둔다.

## 예시

```bash
free -h | grep -i swap        # 스왑(디스크로 밀어낸 메모리) 사용량
grep -E "VmSize|VmRSS" /proc/$(pgrep -f "ollama serve" | head -1)/status
# VmSize: 프로세스가 '가진 것처럼 보이는' 가상 주소 크기
# VmRSS : 실제로 RAM 에 올라와 있는 크기
```

GPU 서버에서 Ollama 로 큰 모델을 띄웠는데 RAM 이 모자라면 스왑을 쓰기 시작하고 갑자기 느려진다. `dmesg` 에 `Out of memory: Killed process` 가 뜨면 OS 가 스왑마저 포기하고 프로세스를 죽인 것.

## 헷갈리기 쉬운 것

- **스왑(swap)** 은 RAM 이 부족할 때 디스크로 밀어내는 공간. 가상 메모리 = 전체 구조, 스왑 = 그중 디스크 부분.
- **가상화(VM)** 와는 이름만 비슷하다. 가상 메모리는 한 OS 안에서 프로세스별 주소를 나누는 것, VM 은 컴퓨터 한 대를 통째로 흉내 내는 것.
