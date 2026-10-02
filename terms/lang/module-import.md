---
id: module-import
term: 모듈/import
aliases:
  - Module / Import
  - 모듈
  - 임포트
  - import/export
  - 모듈 시스템
category: lang
tags:
  - Python
  - JavaScript
  - 흔한실수
level: 1
kind: concept
related:
  - scope
  - package-manager
  - virtualenv
  - bundler
  - tree-shaking
see_also:
  - https://docs.python.org/ko/3/tutorial/modules.html
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

코드를 **파일 단위로 쪼개 두고** 필요한 것만 꺼내 쓰는 구조.

## 비유

**이름표 붙은 공구 서랍**. 드라이버는 드라이버 서랍, 톱은 톱 서랍에 넣어 두고, 작업할 때는 필요한 서랍 하나만 열어 꺼내 쓴다.

## 예시

```text
emr_tool/
├── __init__.py          # 이 폴더를 패키지로 만드는 표시 (비어 있어도 됨)
├── main.py
└── utils/
    ├── __init__.py
    └── deid.py          # def mask_mrn(mrn: str) -> str: ...
```

```python
# main.py
from emr_tool.utils.deid import mask_mrn   # 절대 import — 프로젝트 루트 기준
from .utils import deid                     # 상대 import — 패키지 안에서만 쓸 수 있다

print(mask_mrn("12345678"))
```

```bash
python emr_tool/main.py       # ModuleNotFoundError: No module named 'emr_tool' — 흔한 실수
python -m emr_tool.main       # 프로젝트 루트에서 모듈로 실행하면 경로가 맞는다
```

```ts
// utils/deid.ts
export function maskMrn(mrn: string) { return mrn.slice(0, 2) + '******' }
// main.ts
import { maskMrn } from './utils/deid'     // 내 파일은 ./ 로, 설치한 패키지는 이름만
import axios from 'axios'
```

파이썬은 "파일 하나 = 모듈 하나" 이고 폴더에 `__init__.py` 가 있으면 패키지다. `import` 는 그 파일을 **한 번만 실행**해서 결과를 캐시하므로, 모듈 최상단에 둔 코드(모델 로딩 등)는 처음 import 할 때 딱 한 번 돈다. `ModuleNotFoundError` 의 대부분은 "어느 폴더에서 실행했나" 문제라, 가상환경이 맞는지와 실행 위치부터 본다.

## 헷갈리기 쉬운 것

- **패키지 매니저**(pip/npm): 남의 코드를 **설치**하는 도구다. `import` 는 설치하지 않고 이미 있는 것을 **불러올** 뿐이라, `import requests` 가 실패하면 먼저 `pip install requests` 가 됐는지 본다.
- **ESM vs CommonJS**: JS 의 `import/export` 가 표준(ESM)이고, `require()/module.exports` 는 Node 의 옛 방식(CJS)이다. 둘을 한 프로젝트에서 섞으면 "Cannot use import statement outside a module" 류의 오류가 난다.
- **절대 import vs 상대 import**: `.`/`..` 로 시작하면 상대 import 인데, 스크립트로 직접 실행되는 파일에서는 쓸 수 없다. 라이브러리 코드는 상대, 실행 진입점은 절대가 보통이다.
