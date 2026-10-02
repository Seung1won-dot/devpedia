---
id: bare-metal-programming
term: 베어메탈 프로그래밍
aliases:
  - Bare-metal Programming
  - 베어메탈 펌웨어
  - Super Loop
  - 슈퍼 루프
  - No-OS
category: embedded
tags:
  - 펌웨어
  - 저수준
  - 마이크로컨트롤러
level: 3
kind: concept
related:
  - rtos
  - interrupt
  - firmware
  - register
  - bare-metal
  - cross-compile
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

OS 없이 **내 코드가 하드웨어 레지스터를 직접** 다루며 칩 위에서 혼자 도는 방식.

## 비유

매니저 없이 **혼자 운영하는 1인 가게**. 손님 응대·계산·청소를 직접 순서대로 다 하니 빠르고 군더더기가 없지만, 일이 늘면 정신이 없다.

## 예시

```c
// 슈퍼 루프 + 인터럽트: 가장 흔한 베어메탈 구조
volatile int sample_ready = 0;

void TIM2_IRQHandler(void) {      // 타이머가 4ms 마다 호출
  TIM2->SR &= ~TIM_SR_UIF;        // 인터럽트 플래그 지우기
  sample_ready = 1;
}

int main(void) {
  clock_init(); gpio_init(); timer_init();
  for (;;) {                      // 끝나지 않는 메인 루프
    if (sample_ready) { sample_ready = 0; read_ecg(); filter(); }
    if (ble_tx_free()) send_pending();
    __WFI();                      // 할 일 없으면 다음 인터럽트까지 잠
  }
}
```

스케줄러가 없으니 "언제 무엇을 할지" 는 메인 루프 순서와 인터럽트로 직접 짠다. 인터럽트에서는 플래그만 세우고 실제 일은 루프에서 하는 게 정석이다.

트레이드오프: 메모리가 아주 작거나, 동작이 단순하거나, 지연을 완벽히 손에 쥐어야 하면 베어메탈이 가볍고 분석하기 쉽다. 하지만 기능이 늘어 한 작업이 루프를 오래 붙잡기 시작하면 다른 작업이 밀리므로, 그 시점이 **RTOS** 로 넘어갈 신호다.

## 헷갈리기 쉬운 것

- 인프라의 **베어메탈**(bare-metal)은 "가상화 없이 물리 서버를 통째로 쓰는 것" 이다. 서버에는 여전히 리눅스가 돈다. 여기서 말하는 베어메탈은 **OS 자체가 없는** 펌웨어 구조다.
- **RTOS** 는 태스크·스케줄러를 제공하는 OS 이고, 베어메탈은 그것조차 없이 루프 하나로 돈다.
