---
id: serialization
term: 직렬화/역직렬화
aliases:
  - Serialization / Deserialization
  - 직렬화
  - 역직렬화
  - 마샬링
  - pickle
  - json.dumps
category: lang
tags:
  - 데이터
  - Python
  - API설계
level: 1
kind: concept
related:
  - json
  - csv-parquet
  - checkpoint
  - rest
  - grpc
see_also:
  - https://docs.python.org/ko/3/library/json.html
  - https://docs.python.org/ko/3/library/pickle.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

메모리 속 객체를 **저장·전송 가능한 문자열이나 바이트**로 펴는 것, 되돌리는 게 역직렬화.

## 비유

**조립 가구 포장**. 다 조립된 책장은 트럭에 안 들어가니 납작하게 분해해 상자에 담고(직렬화), 새 집에서 설명서대로 다시 조립한다(역직렬화).

## 예시

```python
import json, pickle
from datetime import date

record = {"mrn": "001", "visit": date(2026, 1, 3)}

json.dumps(record)                    # TypeError: Object of type date is not JSON serializable
json.dumps(record, default=str)       # '{"mrn": "001", "visit": "2026-01-03"}' — 모르는 타입은 str 로
json.loads('{"mrn": "001"}')          # 역직렬화 → {'mrn': '001'} (dict)

with open("cache.pkl", "wb") as f:
    pickle.dump(record, f)            # 파이썬 전용 바이너리 — date 든 DataFrame 이든 그대로 담긴다
```

```ts
const text = JSON.stringify({ mrn: '001', visit: new Date() })   // Date → ISO 문자열
const obj = JSON.parse(text)        // visit 은 다시 Date 가 아니라 string — 되돌릴 때 정보가 준다
```

FastAPI 가 응답 객체를 JSON 으로 바꾸는 것, `torch.save()` 로 모델 가중치를 파일에 쓰는 것(내부는 pickle), DataFrame 을 Parquet 으로 저장하는 것이 전부 직렬화다. JSON 은 언어를 가리지 않지만 날짜·바이트·NaN 을 표현 못 하고, pickle 은 파이썬 객체를 통째로 담는 대신 **남이 준 pickle 파일을 열면 임의 코드가 실행될 수 있어** 믿을 수 없는 출처의 파일엔 쓰면 안 된다 — Hugging Face 가 `safetensors` 포맷을 만든 이유다.

## 헷갈리기 쉬운 것

- **인코딩**(UTF-8): 문자열 ↔ 바이트 변환이 인코딩이고, 객체 ↔ 문자열/바이트가 직렬화다. `json.dumps()` 로 직렬화한 문자열을 네트워크에 태우려면 다시 `.encode("utf-8")` 로 인코딩한다.
- **JSON**: 직렬화 **포맷 중 하나**다. pickle, Protobuf(gRPC), Parquet, YAML 도 모두 직렬화 포맷이고, 무엇을 고르냐가 속도·호환성·안전성을 가른다.
- **암호화**: 둘 다 데이터를 다른 꼴로 바꾸지만 목적이 반대다. 직렬화는 누구나 되돌릴 수 있게 "옮기기", 암호화는 키 없이는 못 되돌리게 "숨기기".
