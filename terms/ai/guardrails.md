---
id: guardrails
term: 가드레일
aliases:
  - Guardrails
  - LLM 가드레일
  - 안전 장치
  - 입출력 필터
category: ai
tags:
  - LLM
  - 보안
  - 에이전트
level: 2
kind: concept
related:
  - prompt-injection
  - system-prompt
  - hallucination
  - structured-output
  - input-validation
  - agent
see_also:
  - https://github.com/NVIDIA/NeMo-Guardrails
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

LLM 의 입력과 출력을 **규칙으로 걸러** 위험한 요청·답변을 막는 안전장치.

## 비유

볼링장의 범퍼 레인. 공(모델)이 아무리 비뚤게 굴러도 도랑에 빠지지 않게 양옆에서 받쳐 주는 장치라, 선수를 바꾸는 게 아니라 레인에 뭔가를 덧다는 것이다.

## 예시

```python
import re
BLOCK_IN = [r"시스템 프롬프트.*(출력|보여)", r"지시를? 무시"]   # 인젝션·탈옥 패턴
PII_OUT  = r"\d{6}-[1-4]\d{6}"                                 # 주민등록번호 꼴

def guarded_chat(user_msg: str) -> str:
    if any(re.search(p, user_msg) for p in BLOCK_IN):
        return "요청을 처리할 수 없습니다."
    answer = llm(user_msg)                          # Ollama/vLLM 호출(생략)
    return re.sub(PII_OUT, "[마스킹]", answer)      # 출력에서 한 번 더 거른다
```

모델 앞뒤에 검문소를 두는 구조다. 입력 쪽은 인젝션·금지 주제, 출력 쪽은 개인정보·형식 위반·"진단 단정" 같은 문장을 잡는다. 정규식 → 작은 분류 모델 → 판정용 LLM 순으로 비용이 올라가니 싼 것부터 겹쳐 쓴다. 연구실 환자 상담 챗봇이라면 "약 용량을 바꾸라" 는 답을 출력 단계에서 막고, 주민번호는 무조건 마스킹하는 식.

## 헷갈리기 쉬운 것

- **시스템 프롬프트**는 모델에게 "하지 마" 라고 부탁하는 것이라 설득당해 뚫릴 수 있다. 가드레일은 모델 바깥의 코드라 모델이 아무리 말을 잘해도 통과 못 한다.
- **프롬프트 인젝션**은 공격 이름, 가드레일은 그걸 막는 방어 장치 중 하나.
- **RLHF/정렬**은 모델 자체를 안전하게 학습시키는 것이고, 가드레일은 이미 만들어진 모델 밖에 두르는 울타리. 둘은 겹쳐 쓴다.
