---
id: compiler-optimization
term: 컴파일러 최적화
aliases:
  - Compiler Optimization
  - "-O2"
  - 상수 접기
  - 인라이닝
  - Constant Folding
category: compiler
tags:
  - 컴파일러
  - 성능최적화
  - 저수준
level: 3
kind: concept
related:
  - ir
  - llvm
  - register-allocation
  - jit
  - profiling
  - compilation-pipeline
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

결과는 그대로 두고 **더 빠르거나 작은** 코드로 바꾸는 컴파일러 작업.

## 비유

길 찾기 앱이 "A 들렀다 다시 출발점 들렀다 B" 라는 동선을 보고 **같은 목적지로 가는 지름길**로 바꿔 주는 것이다. 도착지(결과)는 같고 걸리는 시간만 줄어든다.

## 예시

```c
/* sq.c */
int square_sum(void) {
    int s = 0;
    for (int i = 0; i < 10; i++) s += i * i;
    return s;
}
```

```bash
gcc -O0 -S sq.c -o sq_O0.s   # 반복문이 그대로 남은 긴 코드
gcc -O2 -S sq.c -o sq_O2.s   # 계산이 컴파일 중에 끝나 movl $285, %eax / ret 만 남는다
```

대표 기법은 **상수 접기**(`2*3` → `6`), **인라이닝**(작은 함수 호출을 본문으로 치환), **죽은 코드 제거**, **루프 불변식 이동**, 벡터화(SIMD) 등이다. 대부분 IR 단계에서 여러 패스로 돌린다.

## 헷갈리기 쉬운 것

- **트레이드오프**: `-O2` 이상은 빠르지만 컴파일이 느려지고, 변수가 레지스터로 사라져 디버거에서 `<optimized out>` 이 뜬다. 개발 중엔 `-O0 -g`, 배포엔 `-O2` 가 보통이고, `-O3` 는 코드가 커져 오히려 느린 경우도 있어 프로파일링으로 확인하고 쓴다.
- **정의되지 않은 동작(UB)** 이 있는 C 코드는 `-O0` 에선 되다가 `-O2` 에서 깨질 수 있다. 최적화 탓이 아니라 코드 탓이다.
- **JIT** 은 같은 최적화를 실행 중에 실제 입력을 보며 한다. AOT(미리) 컴파일러보다 정보는 많지만 실행 시간을 빼앗는다.
