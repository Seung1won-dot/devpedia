---
id: semantic-analysis
term: 의미 분석 · 타입 검사
aliases:
  - Semantic Analysis
  - Type Checking
  - 타입 체크
  - 의미 분석
category: compiler
tags:
  - 컴파일러
  - 타입
level: 2
kind: concept
related:
  - static-dynamic-typing
  - type-inference
  - symbol-table
  - parser
  - ast
  - typescript
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

문법은 맞는 코드가 **뜻도 맞는지**(선언·타입)를 검사하는 단계.

## 비유

"사과가 노래를 마셨다" 는 문장 성분은 다 갖췄지만 말이 안 된다. 맞춤법 검사기(파서)는 통과해도 **국어 선생님(의미 분석)** 이 빨간 펜을 드는 지점이다.

## 예시

```c
/* bad.c */
int main(void) {
    char *name = "kim";
    return y + name * 2;
}
```

```bash
gcc -c bad.c
# error: 'y' undeclared (first use in this function)     ← 선언 확인
# error: invalid operands to binary * (have 'char *' and 'int')  ← 타입 확인
```

파서가 만든 AST 를 돌면서 이름이 선언됐는지 심볼 테이블에서 찾고, 연산의 양쪽 타입이 맞는지 따진다. `tsc --noEmit`, `mypy` 가 하는 일이 바로 이 단계만 떼어 낸 것이다. 타입을 안 써도 되는 언어는 이 단계에서 **타입 추론**으로 빈칸을 채운다.

## 헷갈리기 쉬운 것

- **정적 vs 동적 타입**: 정적 타입 언어는 이 검사를 실행 전에, 동적 타입 언어(Python)는 실행 중에 `TypeError` 로 한다. 자세한 비교는 static-dynamic-typing 카드.
- **구문 오류 vs 의미 오류**: `x = (1 + 2` 는 파서가, `1 + "a"` 는 의미 분석(또는 런타임)이 잡는다.
