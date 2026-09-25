---
id: exception
term: 예외 처리
aliases:
  - Exception Handling
  - 예외
  - try-catch
  - 에러 핸들링
category: lang
tags:
  - Python
  - JavaScript
level: 1
related:
  - http-status-code
  - logging
  - promise-async-await
  - static-dynamic-typing
  - testing-levels
see_also:
  - https://docs.python.org/3/tutorial/errors.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

실행 중 생긴 문제를 **던지고(throw) 받아서(catch)** 프로그램이 죽지 않게 처리하는 구조.

## 비유

**택배 반송**. 배송(코드 실행) 중 문제가 생기면 그 자리에서 멈추는 게 아니라 "반송" 딱지(예외)를 붙여 되돌리고, 받은 쪽(catch)이 재배송할지 고객에게 알릴지 정한다.

## 예시

```python
import json

def load_config(path):
    try:
        with open(path) as f:
            return json.load(f)
    except FileNotFoundError:
        return {}                                             # 없으면 기본값
    except json.JSONDecodeError as e:
        raise ValueError(f"설정 파일이 깨짐: {path}") from e    # 감싸서 다시 던짐
    finally:
        print("load_config 끝")                               # 성공하든 실패하든 실행
```

## 헷갈리기 쉬운 것

- **에러 코드 반환**(C 스타일 `return -1`, HTTP 상태 코드)은 호출자가 확인을 깜빡할 수 있다. 예외는 무시하면 프로그램이 멈추니 강제로 다루게 된다.
- `except Exception:` 으로 **전부 삼키는 것**은 처리가 아니다. 로그라도 남기고, 못 고치는 건 다시 던진다.
