---
id: rtos
term: RTOS(실시간 운영체제)
aliases:
  - Real-Time Operating System
  - 실시간 운영체제
  - FreeRTOS
  - Zephyr
category: embedded
tags:
  - 펌웨어
  - 스케줄링
  - 마이크로컨트롤러
level: 3
kind: concept
related:
  - scheduler
  - bare-metal-programming
  - thread
  - mutex
  - interrupt
  - watchdog-timer
see_also:
  - https://www.freertos.org/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

작업이 **정해진 시간 안에 반드시** 실행되도록 보장하는 작은 운영체제.

## 비유

**구급차가 오면 길을 비키는 도로**. 다른 차가 아무리 많아도 가장 급한 차는 정해진 시간 안에 지나가게 규칙이 짜여 있다.

## 예시

```c
// FreeRTOS: 센서 읽기는 높은 우선순위, BLE 전송은 낮은 우선순위
void sensorTask(void *p) {
  for (;;) { read_ppg(); vTaskDelay(pdMS_TO_TICKS(10)); }   // 100Hz
}
void bleTask(void *p) {
  for (;;) { send_batch(); vTaskDelay(pdMS_TO_TICKS(1000)); }
}
int main(void) {
  xTaskCreate(sensorTask, "sensor", 256, NULL, 3, NULL);
  xTaskCreate(bleTask,    "ble",    512, NULL, 1, NULL);
  vTaskStartScheduler();
}
```

RTOS 의 핵심은 빠름이 아니라 **예측 가능함**이다. 우선순위 기반 선점 스케줄러가 급한 태스크를 바로 실행해서, "센서는 10ms 마다 반드시 읽힌다" 를 보장한다. 태스크 간 통신은 큐·세마포어로 한다.

트레이드오프: 태스크가 3~4개를 넘고 타이밍 요구가 섞이면 RTOS 가 코드를 깔끔하게 만든다. 반대로 하는 일이 단순하면 RAM·플래시를 더 먹고 우선순위 역전·스택 오버플로 같은 새 버그를 부르므로 **베어메탈** 루프가 낫다.

## 헷갈리기 쉬운 것

- **리눅스**는 평균 처리량에 최적화된 범용 OS 라 "보통 빠르지만 가끔 늦는다". RTOS 는 최악의 경우 지연(데드라인)을 지키는 게 목표다.
- **하드 실시간**(놓치면 사고, 예: 인공호흡기 제어)과 **소프트 실시간**(가끔 늦어도 품질만 저하, 예: 영상 재생)을 구분한다.
