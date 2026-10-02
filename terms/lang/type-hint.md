---
id: type-hint
term: 타입 힌트
aliases:
  - Type Hint
  - 타입 어노테이션
  - Type Annotation
  - typing 모듈
  - 타입 주석
category: lang
tags:
  - 타입
  - Python
  - 개발도구
level: 1
kind: concept
related:
  - static-dynamic-typing
  - type-inference
  - null-handling
  - generics
  - validation
  - linter-formatter
see_also:
  - https://docs.python.org/ko/3/library/typing.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

동적 언어 코드에 **이 값은 이 타입**이라고 적어 두는 메모로, 실행 자체에는 영향이 없다.

## 비유

**콘센트 옆에 붙인 "220V 전용" 스티커**. 전기가 스티커를 읽고 알아서 막아 주진 않지만, 꽂는 사람과 점검 도구는 스티커를 보고 잘못 꽂는 일을 미리 막는다.

## 예시

```python
from pathlib import Path
import pandas as pd

def load_vitals(path: Path, patient_ids: list[str] | None = None) -> pd.DataFrame:
    df = pd.read_csv(path)
    if patient_ids is not None:
        df = df[df["mrn"].isin(patient_ids)]
    return df

load_vitals("vitals.csv")        # 잘 돌아간다 — 파이썬은 힌트를 검사하지 않는다
```

```bash
pip install pyright
pyright vitals.py
# error: Argument of type "Literal['vitals.csv']" cannot be assigned to parameter "path" of type "Path"
```

힌트의 효과는 세 군데서 난다. 에디터 **자동완성**(`df.` 뒤에 DataFrame 메서드가 뜬다), `pyright`/`mypy` 의 **실행 전 검사**, 그리고 FastAPI·pydantic 처럼 힌트를 **읽어서 동작하는 라이브러리**(요청 바디 검증, API 문서 자동 생성). 함수 시그니처(매개변수·반환값)에만 적어도 효과의 대부분을 얻으니, 모든 변수에 다 적으려 하지 않아도 된다.

## 헷갈리기 쉬운 것

- **정적 타입 언어**(TypeScript): TS 는 타입이 틀리면 컴파일이 안 되지만, 파이썬 힌트는 틀려도 그냥 돈다. 검사기를 따로 돌리지 않으면 힌트는 주석일 뿐이다.
- **pydantic / dataclass**: pydantic 모델은 힌트를 **실행 시점에 실제로 검사**해 `"abc"` 를 `int` 필드에 넣으면 에러를 낸다. 일반 힌트는 그런 일을 하지 않는다.
- **타입 추론**: 힌트는 사람이 적는 것, 추론은 도구가 코드를 보고 알아내는 것이다. `x = 1` 에 힌트가 없어도 pyright 는 `int` 로 안다.
