---
id: page-fault
term: 페이지 폴트
aliases:
  - Page Fault
  - 페이지 부재
  - 페이지 폴트 예외
  - 스래싱
  - Thrashing
category: os
tags:
  - 메모리
  - 메모리관리
  - 성능
level: 2
kind: concept
related:
  - virtual-memory
  - paging-segmentation
  - page-replacement
  - locality
  - ram
  - interrupt
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

필요한 페이지가 RAM 에 없어 **디스크에서 가져오느라 멈추는** 사건.

## 비유

책상(RAM)에서 책을 펴려는데 그 페이지가 **창고(디스크)에 있어서 가지러 다녀오는 것**. 가끔이면 괜찮지만 매 장마다 창고를 오가면 책은 못 읽고 왕복만 한다.

## 예시

```bash
ps -o pid,min_flt,maj_flt,rss,cmd -p $(pgrep -f "ollama serve" | head -1)
#  PID  MINFL  MAJFL    RSS CMD
# 2143 812345   1207 6.5g   ollama serve
/usr/bin/time -v python train.py 2>&1 | grep -i "page faults"
#   Major (requiring I/O) page faults: 3
#   Minor (reclaiming a frame) page faults: 48211
vmstat 1        # si/so 열이 계속 0 이 아니면 스왑 왕복 = 스래싱 신호
```

프로그램이 없는 페이지를 건드리면 MMU 가 예외를 던지고, 커널의 처리기가 (1) 주소가 정당한지 확인 → (2) 빈 프레임을 구하고(없으면 페이지 교체) → (3) 디스크에서 읽어 채우고 → (4) 페이지 테이블 갱신 → (5) 멈췄던 명령어를 다시 실행한다. GPU 서버에서 RAM 보다 큰 데이터셋을 통째로 올리면 major fault 가 폭증하면서 CPU 사용률은 낮은데 모든 게 느려지는 **스래싱**이 온다. 면접에서는 "페이지 폴트 처리 과정을 순서대로", "스래싱이 뭐고 어떻게 해결하나?(프로세스 수 줄이기, 워킹셋)" 로 나온다.

## 헷갈리기 쉬운 것

- **Minor vs Major fault**: minor 는 페이지가 이미 RAM 어딘가에 있어(파일 캐시, 공유 라이브러리) 테이블만 연결하면 끝. major 는 진짜 디스크 I/O 가 필요해 수천 배 느리다. 성능 문제는 major 를 본다.
- **세그폴트**는 아예 접근하면 안 되는 주소를 건드린 것이라 프로세스가 죽는다. 페이지 폴트는 정당한 주소인데 아직 안 올라온 것이라 채워 주고 계속 간다.
- **스래싱 vs 그냥 느림**: CPU 사용률이 낮은데 디스크 I/O 만 치솟으면 스래싱. RAM 을 늘리거나 동시에 도는 프로세스를 줄여야지 CPU 를 올려 봐야 소용없다.
