---
id: paging-segmentation
term: 페이징/세그멘테이션
aliases:
  - Paging and Segmentation
  - 페이징
  - 세그멘테이션
  - 세그먼테이션
  - 단편화
category: os
tags:
  - 메모리
  - 메모리관리
level: 2
kind: concept
related:
  - virtual-memory
  - page-fault
  - page-replacement
  - ram
  - stack-heap-memory
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

프로세스 메모리를 **고정 크기 페이지**로 자르느냐 **가변 크기 세그먼트**로 자르느냐의 차이.

## 비유

이삿짐을 **똑같은 크기 상자(페이징)** 에 담으면 트럭에 빈틈없이 쌓이지만 마지막 상자는 반쯤 비고, **물건 종류별로 크기가 다른 상자(세그멘테이션)** 에 담으면 낭비는 없지만 트럭에 어중간한 틈이 생긴다.

## 예시

```python
PAGE = 4096                              # getconf PAGESIZE → 4096
vaddr = 0x7f3a_1234_5678                 # 가상 주소 하나
page_no, offset = divmod(vaddr, PAGE)    # 페이지 번호 / 페이지 안 위치
print(hex(page_no), hex(offset))         # 0x7f3a12345 0x678
# MMU 는 page_no 를 페이지 테이블에서 찾아 실제 프레임 번호로 바꾸고
# offset 은 그대로 붙인다 → 물리 주소
```

```bash
getconf PAGESIZE                          # 4096
grep -i hugepages_total /proc/meminfo     # 2 MB 대형 페이지 (DB·LLM 서버가 씀)
```

리눅스·윈도우 모두 실제로는 **페이징**을 쓴다. 가상 주소는 위쪽 비트가 페이지 번호, 아래 12비트가 오프셋이고 페이지 테이블이 번호를 물리 프레임으로 바꿔 준다. x86 의 세그먼트 레지스터는 아직 남아 있지만 64비트에선 사실상 전부 0 부터 시작하는 평평한 주소 공간이라 이름만 남았다. 면접에서는 "내부 단편화와 외부 단편화 차이, 각각 어느 방식에서 생기나?" 가 단골이다.

## 헷갈리기 쉬운 것

- **내부 단편화**: 페이지 안이 남는 것. 4100 바이트가 필요하면 페이지 2장(8192)을 받아 4092 바이트가 논다 → 페이징의 낭비.
- **외부 단편화**: 빈 공간은 충분한데 조각나 있어서 큰 덩어리를 못 넣는 것 → 세그멘테이션(가변 크기 할당)의 낭비. 압축(compaction)으로 모아야 한다.
- **세그먼테이션 폴트(Segfault)** 는 이름과 달리 페이징 환경에서도 난다. 허용되지 않은 주소에 접근했을 때 MMU 가 던지는 예외의 옛 이름이 그대로 남은 것.
