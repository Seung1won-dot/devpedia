---
id: virtualenv
term: 가상환경(venv)
aliases:
  - Virtual Environment
  - 파이썬 가상환경
  - venv
  - conda 환경
category: lang
tags:
  - Python
  - 개발도구
level: 1
related:
  - package-manager
  - environment-variable
  - docker
  - gpu-cuda
  - gitignore
see_also:
  - https://docs.python.org/3/library/venv.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

프로젝트마다 **파이썬과 패키지를 따로 깔아** 서로 섞이지 않게 하는 격리 폴더.

## 비유

과목별로 **따로 쓰는 필통**. 수학 필통엔 컴퍼스, 미술 필통엔 붓을 넣어 두면 한 과목 준비물을 바꿔도 다른 과목엔 영향이 없다.

## 예시

```bash
python -m venv .venv               # 프로젝트 폴더 안에 .venv 생성
source .venv/bin/activate          # 켜기 (Windows: .venv\Scripts\activate)
pip install torch pandas           # 이제 이 폴더에만 설치됨
which python                       # → .../.venv/bin/python
deactivate                         # 끄기
# .venv 는 .gitignore 에 넣고, requirements.txt 만 커밋한다
```

## 헷갈리기 쉬운 것

- **conda** 도 가상환경이지만 파이썬 버전과 CUDA 같은 비파이썬 라이브러리까지 함께 관리한다. GPU 서버에서 CUDA 버전을 묶어 두려고 자주 쓴다.
- **Docker** 는 OS 수준까지 통째로 격리, venv 는 파이썬 패키지만 격리. 배포엔 Docker, 개발 중엔 venv.
