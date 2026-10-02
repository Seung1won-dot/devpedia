---
id: api-key
term: API 키
aliases:
  - API Key
  - 에이피아이 키
  - 액세스 키
  - 발급 키
category: backend
tags:
  - 인증
  - API설계
  - 시크릿
  - 보안
level: 1
kind: concept
related:
  - authentication-authorization
  - secrets-management
  - secret-leak
  - rate-limit
  - key-rotation
  - oauth
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

서비스가 발급한 **비밀 문자열**을 요청에 실어 호출자를 식별하는 단순한 인증 수단.

## 비유

헬스장 출입 카드. 카드만 대면 문이 열려 편하지만 누가 들고 있든 열리니, 잃어버리면 바로 정지시키고 새로 발급받아야 한다.

## 예시

연구실 추론 API 를 외부 스크립트에서 부를 수 있게 키 하나로 막는 FastAPI 코드:

```python
import os, secrets
from fastapi import FastAPI, Depends, HTTPException, Security
from fastapi.security import APIKeyHeader

app = FastAPI()
api_key_header = APIKeyHeader(name="X-API-Key")

def require_key(key: str = Security(api_key_header)):
    if not secrets.compare_digest(key, os.environ["LAB_API_KEY"]):
        raise HTTPException(status_code=401, detail="invalid api key")

@app.get("/predict", dependencies=[Depends(require_key)])
def predict():
    return {"ok": True}
```

```bash
curl -H "X-API-Key: $LAB_API_KEY" http://localhost:8000/predict
```

Hugging Face 토큰, OpenAI 키, 기상청 공공데이터 키가 전부 이 종류다. 키는 코드가 아니라 `.env` 나 시크릿 저장소에 두고, 서버에는 해시만 저장해 유출돼도 원문을 모르게 하는 게 좋다. 키마다 레이트 리밋과 권한 범위를 걸고, 주기적으로 바꾼다(키 로테이션). GitHub 에 키가 올라가면 봇이 몇 분 안에 긁어 가니 즉시 폐기가 답이다.

## 헷갈리기 쉬운 것

- **JWT** 는 안에 사용자 정보와 만료 시각이 들어 있고 서명으로 검증한다. API 키는 뜻 없는 긴 문자열이고 보통 만료가 없다. 사람 로그인에는 세션·JWT, 서버끼리·스크립트에는 API 키.
- **OAuth** 는 사용자가 제3자 서비스에 권한을 위임하는 "절차"다. API 키는 절차 없이 발급받은 쪽이 그냥 들고 다닌다.
- **비밀번호**는 사람이 외우고, 짧고, 해싱해서 저장한다. API 키는 기계가 쓰고, 길고 랜덤이며, 여러 개 발급해 하나씩 폐기할 수 있다.
